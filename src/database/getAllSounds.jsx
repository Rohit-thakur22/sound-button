// import { collection, query, where, getDocs, limit, startAfter } from 'firebase/firestore';
// import { db } from '../../firebase';
// import { allCategories } from './allCategories'; // Cached categories

// export const getAllSounds = async (page = 0, limitPerPage = 50) => {
//     try {
//         // Fetch cached category names
//         const cachedCategories = await allCategories();
//         const catList = cachedCategories.reduce((acc, category) => {
//             acc[category.value] = category.label;
//             return acc;
//         }, {});

//         // Fetch sounds with pagination
//         let lastVisible = null;
//         if (page > 0) {
//             const previousQuery = query(
//                 collection(db, 'SOUNDS'),
//                 where('is_deleted', '==', false),
//                 limit(page * limitPerPage)
//             );
//             const previousSnapshot = await getDocs(previousQuery);
//             const docs = previousSnapshot.docs;
//             if (docs.length > 0) {
//                 lastVisible = docs[docs.length - 1];
//             }
//         }

//         const soundQuery = lastVisible
//             ? query(
//                 collection(db, 'SOUNDS'),
//                 where('is_deleted', '==', false),
//                 startAfter(lastVisible),
//                 limit(limitPerPage)
//             )
//             : query(
//                 collection(db, 'SOUNDS'),
//                 where('is_deleted', '==', false),
//                 limit(limitPerPage)
//             );

//         const querySnapshot = await getDocs(soundQuery);

//         const sounds = querySnapshot.docs.map(doc => ({
//             id: doc.id,
//             cat: (doc.data().category || []).map(catId => catList[catId] || catId),
//             ...doc.data(),
//         }));

//         return sounds;
//     } catch (error) {
//         console.error('Error fetching sounds:', error);
//         throw new Error('Failed to fetch sounds');
//     }
// };



// import {
//   collection, getCountFromServer, getDocs, limit, query, startAfter, where, orderBy
// } from "firebase/firestore";
// import { db } from "../../firebase";
// import { allCategories } from "./allCategories"; // Cached categories

// export const getAllSounds = async (searchTerm = "", lastDoc = null, limitPerPage = 50, categoryId) => {
//   return getSounds({ categoryId, searchTerm, lastDoc, limitPerPage });
// };

// /**
//  * Fetches sounds from the database with optional category filtering
//  * @param {Object} options - Query options
//  * @param {string|null} options.categoryId - Category to filter by (e.g. "anime_soundboard")
//  * @param {string} options.searchTerm - Search term to filter results
//  * @param {FirebaseDocumentSnapshot|null} options.lastDoc - Last document for pagination
//  * @param {number} options.limitPerPage - Number of records per page
//  * @returns {Object} - Object containing sounds array, last document reference, and total count
//  */
// export const getSounds = async (options = {}) => {
//   const {
//     categoryId = '',  // Optional category filter (null means all categories)
//     searchTerm = "",    // Optional search term
//     lastDoc = null,     // For pagination
//     limitPerPage = 50   // Number of records per page
//   } = options;

//   try {
//     // Fetch cached category names
//     const cachedCategories = await allCategories();
//     const catList = cachedCategories.reduce((acc, category) => {
//       acc[category.value] = category.label;
//       return acc;
//     }, {});

//     // Normalize search input
//     const normalizedSearchString = searchTerm.trim().toLowerCase();
//     const searchTerms = normalizedSearchString.split(/\s+/).filter(term => term.length > 0);

//     // Base query components
//     const baseConstraints = [where("is_deleted", "==", false)];

//     // Add category filter if specified
//     if (categoryId) {
//       // Handle both string and array inputs for category
//       const categoryValue = typeof categoryId === 'string' ? categoryId : categoryId[0];
//       baseConstraints.push(where("category", "array-contains", categoryValue));
//     }

//     // Base query with common filters
//     let soundQuery;

//     // Apply Search Filtering
//     if (searchTerms.length > 0) {
//       // When searching, add search constraint
//       soundQuery = query(
//         collection(db, "SOUNDS"),
//         ...baseConstraints,
//         where("search_keywords", "array-contains-any", searchTerms),
//         orderBy("downloads", "desc"),
//         limit(limitPerPage)
//       );
//     } else {
//       // No search terms - just use base constraints
//       soundQuery = query(
//         collection(db, "SOUNDS"),
//         ...baseConstraints,
//         orderBy("downloads", "desc"),
//         limit(limitPerPage)
//       );
//     }

//     // Apply Pagination
//     if (lastDoc) {
//       soundQuery = query(soundQuery, startAfter(lastDoc));
//     }

//     // Fetch data
//     const querySnapshot = await getDocs(soundQuery);
//     const sounds = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       cat: (doc.data().category || []).map((catId) => catList[catId] || catId),
//       ...doc.data(),
//     }));

//     // Get total count of records with appropriate filters
//     const countQuery = query(
//       collection(db, "SOUNDS"),
//       ...baseConstraints
//     );

//     // Only get count when not searching (for performance)
//     // or when specifically filtering by category
//     let totalRecords = 0;
//     if (!searchTerms.length || categoryId) {
//       const countSnapshot = await getCountFromServer(countQuery);
//       totalRecords = countSnapshot.data().count;
//     }

//     return {
//       sounds,
//       lastDoc: querySnapshot.docs.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : null,
//       totalRecords,
//       category: categoryId // Return the selected category for reference
//     };

//   } catch (error) {
//     console.error("Error fetching sounds:", error);
//     throw new Error(categoryId
//       ? `Failed to fetch sounds from category: ${categoryId}`
//       : "Failed to fetch sounds");
//   }
// };


import {
  collection, getDocs, limit, query, startAfter, where, orderBy,
  getCountFromServer, doc, getDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import { allCategories } from "./allCategories"; // Cached categories

// Cache for total counts to avoid repeated count queries
const countCache = {
  // Format: { categoryId: { timestamp: Date, count: number } }
  // Example: { "anime_soundboard": { timestamp: 1620000000000, count: 1500 } }
};

// Cache expiration time (12 hours in milliseconds)
const CACHE_EXPIRATION = 12 * 60 * 60 * 1000;

/**
 * Get cached count or fetch new count if needed
 * @param {string|null} categoryId - Category ID or null for all categories
 * @param {Array} baseConstraints - Query constraints
 * @returns {Promise<number>} - Total count of documents
 */
const getCachedCount = async (categoryId, baseConstraints) => {
  const cacheKey = categoryId || 'all';
  
  // Check if we have a valid cached count
  if (
    countCache[cacheKey] && 
    (Date.now() - countCache[cacheKey].timestamp) < CACHE_EXPIRATION
  ) {
    return countCache[cacheKey].count;
  }
  
  // Otherwise fetch new count
  const countQuery = query(
    collection(db, "SOUNDS"),
    ...baseConstraints
  );
  
  const countSnapshot = await getCountFromServer(countQuery);
  const count = countSnapshot.data().count;
  
  // Cache the new count
  countCache[cacheKey] = {
    timestamp: Date.now(),
    count
  };
  
  return count;
};

/**
 * Get categorized counts from a specialized document (if available)
 * This assumes you create a single document that stores counts for all categories
 * @returns {Promise<Object|null>} - Object with counts or null if not available
 */
const getQuickCounts = async () => {
  try {
    const countsDoc = await getDoc(doc(db, "METADATA", "category_counts"));
    if (countsDoc.exists()) {
      return countsDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching quick counts:", error);
    return null;
  }
};

/**
 * Main function to get sounds with optimized queries
 */
export const getSounds = async (options = {}) => {
  const {
    categoryId = '',
    searchTerm = "",
    lastDoc = null,
    limitPerPage = 50
  } = options;

  try {
    // Fetch cached category names
    const cachedCategories = await allCategories();
    const catList = cachedCategories.reduce((acc, category) => {
      acc[category.value] = category.label;
      return acc;
    }, {});

    // Normalize search input
    const normalizedSearchString = searchTerm.trim().toLowerCase();
    const searchTerms = normalizedSearchString.split(/\s+/).filter(term => term.length > 0);

    // Base query components
    const baseConstraints = [where("is_deleted", "==", false)];

    // Add category filter if specified
    if (categoryId) {
      // Handle both string and array inputs for category
      const categoryValue = typeof categoryId === 'string' ? categoryId : categoryId[0];
      baseConstraints.push(where("category", "array-contains", categoryValue));
    }

    // Build query
    let soundQuery;
    
    // Apply Search Filtering
    if (searchTerms.length > 0) {
      // When searching, add search constraint
      // Note: For better performance, consider implementing a more
      // efficient search mechanism (e.g., Algolia or ElasticSearch)
      soundQuery = query(
        collection(db, "SOUNDS"),
        ...baseConstraints,
        where("search_keywords", "array-contains-any", searchTerms),
        orderBy("downloads", "desc"),
        limit(limitPerPage)
      );
    } else {
      // No search terms - just use base constraints
      soundQuery = query(
        collection(db, "SOUNDS"),
        ...baseConstraints,
        orderBy("downloads", "desc"),
        limit(limitPerPage)
      );
    }

    // Apply Pagination
    if (lastDoc) {
      soundQuery = query(soundQuery, startAfter(lastDoc));
    }

    // Fetch data
    const querySnapshot = await getDocs(soundQuery);
    const sounds = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      cat: (doc.data().category || []).map((catId) => catList[catId] || catId),
      ...doc.data(),
    }));

    // Get total count strategy
    let totalRecords = 0;
    
    // First try to get quick counts from metadata document
    const quickCounts = await getQuickCounts();
    
    if (quickCounts) {
      // If we have quick counts and we're filtering by category, use that
      if (categoryId && quickCounts[categoryId]) {
        totalRecords = quickCounts[categoryId];
      } 
      // If we're showing all and have a total count
      else if (!categoryId && quickCounts.total) {
        totalRecords = quickCounts.total;
      }
      // Fall back to cached count if quick count not available
      else if (!searchTerms.length) {
        totalRecords = await getCachedCount(categoryId, baseConstraints);
      }
    } 
    // If no quick counts, use cached count (but only when not searching)
    else if (!searchTerms.length) {
      totalRecords = await getCachedCount(categoryId, baseConstraints);
    }
    
    // For search queries, we don't get the total count (too expensive)
    // Instead, client can implement "load more" functionality without needing the total

    return {
      sounds,
      lastDoc: querySnapshot.docs.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : null,
      totalRecords,
      category: categoryId
    };

  } catch (error) {
    console.error("Error fetching sounds:", error);
    throw new Error(categoryId
      ? `Failed to fetch sounds from category: ${categoryId}`
      : "Failed to fetch sounds");
  }
};

/**
 * Helper function - Alias for getSounds
 */
export const getAllSounds = async (searchTerm = "", lastDoc = null, limitPerPage = 50, categoryId) => {
  return getSounds({ categoryId, searchTerm, lastDoc, limitPerPage });
};