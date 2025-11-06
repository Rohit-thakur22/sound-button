// database/soundsService.js - Optimized Firebase interaction
import {
  collection, getDocs, limit, query, startAfter, where, orderBy,
  getCountFromServer, doc, getDoc, onSnapshot
} from "firebase/firestore";
import { db } from "../../firebase";

// Global memory cache with TTL management
const memoryCache = {
  // Format: { cacheKey: { data, timestamp, totalCount } }
  data: {},
  // Cache expiration times (in milliseconds)
  TTL: {
    counts: 12 * 60 * 60 * 1000, // 12 hours for counts
    categories: 30 * 60 * 1000,  // 30 minutes for categories
    searchResults: 5 * 60 * 1000, // 5 minutes for search results
    soundData: 10 * 60 * 1000    // 10 minutes for sound data
  },
  
  /**
   * Get item from cache with expiration check
   * @param {string} key - Cache key
   * @param {string} type - Cache type for TTL check
   * @returns {any|null} - Cached data or null if expired/missing
   */
  get(key, type) {
    const item = this.data[key];
    if (!item) return null;
    
    // Check if expired
    if ((Date.now() - item.timestamp) > this.TTL[type]) {
      delete this.data[key];
      return null;
    }
    
    return item.data;
  },
  
  /**
   * Save item to cache
   * @param {string} key - Cache key
   * @param {any} data - Data to cache
   * @param {number} totalCount - Optional total count for paginated data
   */
  set(key, data, totalCount = null) {
    this.data[key] = {
      data,
      timestamp: Date.now(),
      totalCount: totalCount
    };
  },
  
  /**
   * Get total count from cache
   * @param {string} key - Cache key
   * @param {string} type - Cache type for TTL check
   * @returns {number|null} - Cached count or null if expired/missing
   */
  getCount(key, type) {
    const item = this.data[key];
    if (!item) return null;
    
    // Check if expired
    if ((Date.now() - item.timestamp) > this.TTL[type]) {
      delete this.data[key];
      return null;
    }
    
    return item.totalCount;
  }
};

/**
 * Create a cache key from query parameters
 * @param {object} params - Query parameters
 * @returns {string} - Cache key
 */
const createCacheKey = (params) => {
  const { categoryId = "", searchTerm = "", page = 1, limitPerPage = 50 } = params;
  return `sounds_${categoryId || "all"}_${searchTerm || "nosearch"}_${page}_${limitPerPage}`;
};

/**
 * Get document count with caching
 * @param {Array} constraints - Query constraints 
 * @param {string} cacheKey - Cache key
 * @returns {Promise<number>} - Total count
 */
const getDocumentCount = async (constraints, cacheKey) => {
  // Try to get from cache first
  const cachedCount = memoryCache.getCount(cacheKey, "counts");
  if (cachedCount !== null) return cachedCount;
  
  // Fetch count from Firestore
  const countQuery = query(collection(db, "SOUNDS"), ...constraints);
  const countSnapshot = await getCountFromServer(countQuery);
  const count = countSnapshot.data().count;
  
  // Update cache
  memoryCache.set(cacheKey, null, count);
  
  return count;
};

/**
 * Get sounds with optimized caching strategy
 * @param {object} options - Query options
 * @returns {Promise<object>} - Results with sounds, pagination data, and totals
 */
export const getSounds = async (options = {}) => {
  const {
    categoryId = "",
    searchTerm = "",
    lastDoc = null,
    page = 1,
    limitPerPage = 50,
    forceRefresh = false
  } = options;
  
  try {
    // Create cache keys
    const cacheKey = createCacheKey({ categoryId, searchTerm, page, limitPerPage });
    const countCacheKey = `count_${categoryId || "all"}_${searchTerm || "nosearch"}`;
    
    // Check cache if not forcing refresh
    if (!forceRefresh) {
      const cachedData = memoryCache.get(cacheKey, "soundData");
      if (cachedData) {
        return {
          sounds: cachedData,
          lastDoc: cachedData.length > 0 ? cachedData[cachedData.length - 1]._firestoreDoc : null,
          totalRecords: memoryCache.getCount(countCacheKey, "counts") || 0,
          category: categoryId,
          fromCache: true
        };
      }
    }
    
    // Normalize search terms
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const searchTerms = normalizedSearch.split(/\s+/).filter(term => term.length > 0);
    
    // Base query constraints
    const baseConstraints = [where("is_deleted", "==", false)];
    
    // Add category filter if specified
    if (categoryId) {
      baseConstraints.push(where("category", "array-contains", categoryId));
    }
    
    // Search functionality
    if (searchTerms.length > 0) {
      // For simple searches, we can use array-contains-any
      // For more complex searches, consider Algolia or ElasticSearch
      baseConstraints.push(where("search_keywords", "array-contains-any", searchTerms));
    }
    
    // Create the query
    let soundQuery = query(
      collection(db, "SOUNDS"),
      ...baseConstraints,
      orderBy("downloads", "desc"),
      limit(limitPerPage)
    );
    
    // Apply pagination cursor
    if (lastDoc) {
      soundQuery = query(soundQuery, startAfter(lastDoc));
    }
    
    // Execute query
    const querySnapshot = await getDocs(soundQuery);
    
    // Process results
    const sounds = querySnapshot.docs.map(doc => {
      const data = doc.data();
      
      // Store the Firestore document reference for pagination
      return {
        id: doc.id,
        _firestoreDoc: doc, // Keep doc reference for pagination
        ...data
      };
    });
    
    // Get total count - only if we don't have it cached
    let totalRecords = memoryCache.getCount(countCacheKey, "counts");
    if (totalRecords === null && (!searchTerms.length || page === 1)) {
      // Only get count for non-search queries or first page of search
      totalRecords = await getDocumentCount(baseConstraints, countCacheKey);
    }
    
    // Cache the results
    memoryCache.set(cacheKey, sounds, totalRecords);
    
    return {
      sounds,
      lastDoc: querySnapshot.docs.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : null,
      totalRecords: totalRecords || 0,
      category: categoryId,
      fromCache: false
    };
  } catch (error) {
    console.error("Error fetching sounds:", error);
    throw new Error("Failed to fetch sounds");
  }
};

/**
 * Get all categories with caching
 * @param {boolean} forceRefresh - Force a refresh from server
 * @returns {Promise<Array>} - Categories
 */
export const getCategories = async (forceRefresh = false) => {
  const cacheKey = "all_categories";
  
  // Check cache first
  if (!forceRefresh) {
    const cachedCategories = memoryCache.get(cacheKey, "categories");
    if (cachedCategories) return cachedCategories;
  }
  
  try {
    // Fetch categories from Firestore
    const categoriesSnapshot = await getDocs(collection(db, "CATEGORIES"));
    const categories = categoriesSnapshot.docs.map(doc => ({
      value: doc.id,
      label: doc.data().name
    }));
    
    // Cache results
    memoryCache.set(cacheKey, categories);
    
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

/**
 * Compatibility function for previous implementation
 */
export const getAllSounds = async (searchTerm = "", lastDoc = null, limitPerPage = 50, categoryId = "") => {
  return getSounds({ categoryId, searchTerm, lastDoc, limitPerPage });
};