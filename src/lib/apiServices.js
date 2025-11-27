import api from './api';

// API Service functions for sounds
export const soundsAPI = {
  // Get all sounds with search parameters
  getAllSounds: (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append('search', params.search);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const queryString = queryParams.toString();
    return api.get(`/sounds${queryString ? `?${queryString}` : ''}`);
  },

  // Get sounds grouped by category
  getSoundsGroupedByCategory: (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.soundsLimit) queryParams.append('soundsLimit', params.soundsLimit);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const queryString = queryParams.toString();
    return api.get(`/sounds/grouped-by-category${queryString ? `?${queryString}` : ''}`);
  },

  // Get top users
  getTopUsers: () => api.get('/sounds/top-users'),

  // Get sounds by user ID
  getSoundsByUser: (userId) => api.get(`/sounds/user/${userId}`),

  // Get sounds by category
  getSoundsByCategory: (categoryName, payload = { search: "", page: 1, limit: 10 }) =>
    api.post(`/sounds/${categoryName}`, payload),

  // Get all categories
  getCategories: () => api.get('/sounds/categories'),

  // Get all tags
  getTags: () => api.get('/sounds/tags'),

  // Get trending sounds
  getTrendingSounds: () => api.get('/sounds/trending'),

  // Get just added sounds
  getJustAddedSounds: (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.page) queryParams.append('page', params.page);

    const queryString = queryParams.toString();
    return api.get(`/sounds/just-added${queryString ? `?${queryString}` : ''}`);
  },

  // Get sound by ID
  getSoundById: (soundId) => api.get(`/sounds/detail/${soundId}`),

  // Create new sound with multipart/form-data
  createSound: (formData) => {
    // Axios will automatically set Content-Type with boundary for FormData
    // Delete the default application/json Content-Type header
    const config = {
      headers: {
        'Content-Type': undefined, // Let Axios set it automatically with boundary
      },
    };
    return api.post('/sounds', formData, config);
  },

  // Create sound in specific category
  createSoundInCategory: (categoryName, soundData) => api.post(`/sounds/${categoryName}`, soundData),

  // Update sound
  updateSound: (soundId, soundData) => api.put(`/sounds/${soundId}`, soundData),

  // Delete sound (soft delete)
  deleteSound: (soundId) => api.delete(`/sounds/delete/${soundId}`),

  // Hard delete sound
  hardDeleteSound: (soundId) => api.delete(`/sounds/${soundId}/hard`),

  // Increment download count
  incrementDownload: (soundId) => api.post(`/sounds/${soundId}/increment-download`),

  // Toggle favorite
  toggleFavorite: (soundId) => api.post(`/sounds/${soundId}/toggle-favorite`),

  // Search sounds
  searchSounds: (query, params = {}) => {
    const searchParams = new URLSearchParams({ q: query, ...params });
    return api.get(`/sounds/search?${searchParams}`);
  }
};

// API Service functions for users
export const usersAPI = {
  // Get user by ID
  getUserById: (userId) => api.get(`/users/${userId}`),

  // Update user profile
  updateUser: (userId, userData) => api.put(`/users/${userId}`, userData),

  // Get user sounds
  getUserSounds: (userId) => api.get(`/users/${userId}/sounds`),

  // Get user favorites
  getUserFavorites: (userId) => api.get(`/users/${userId}/favorites`),
};

// API Service functions for categories
export const categoriesAPI = {
  // Get all categories
  getAllCategories: () => api.get('/sounds/categories'),

  // Create category
  createCategory: (categoryData) => api.post('/categories', categoryData),

  // Update category
  updateCategory: (categoryId, categoryData) => api.put(`/categories/${categoryId}`, categoryData),

  // Delete category
  deleteCategory: (categoryId) => api.delete(`/categories/${categoryId}`),
};

// API Service functions for tags
export const tagsAPI = {
  // Get all tags
  getAllTags: () => api.get('/sounds/tags'),

  // Create tag
  createTag: (tagData) => api.post('/tags', tagData),

  // Update tag
  updateTag: (tagId, tagData) => api.put(`/tags/${tagId}`, tagData),

  // Delete tag
  deleteTag: (tagId) => api.delete(`/tags/${tagId}`),
};

// API Service functions for admin
export const adminAPI = {
  // Get all users
  getAllUsers: () => api.get('/admin/users'),

  // Ban user
  banUser: (userId) => api.patch(`/admin/ban-user/${userId}`),

  // Unban user (assuming similar endpoint structure)
  unbanUser: (userId) => api.patch(`/admin/unban-user/${userId}`),

  // Get admin dashboard stats
  getDashboardStats: () => api.get('/admin/dashboard'),

  // Get dashboard sounds with filters
  getDashboardSounds: (params = {}, config = {}) => {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append('search', params.search);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.categoryIds) queryParams.append('categoryIds', params.categoryIds);

    const queryString = queryParams.toString();
    return api.get(`/admin/dashboard-sounds${queryString ? `?${queryString}` : ''}`, config);
  },

  // Get dashboard users with filters
  getDashboardUsers: (params = {}, config = {}) => {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append('search', params.search);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const queryString = queryParams.toString();
    return api.get(`/admin/dashboard-users${queryString ? `?${queryString}` : ''}`, config);
  },

  // Delete sound (admin endpoint)
  deleteSound: (soundId) => api.delete(`/admin/delete-sound/${soundId}`),

  // Edit sound (admin endpoint)
  editSound: (soundId, soundData) => api.patch(`/admin/edit-sound/${soundId}`, soundData),

  // Bulk upload sounds (admin endpoint)
  bulkUploadSounds: (formData) => {
    // Axios will automatically set Content-Type with boundary for FormData
    // Delete the default application/json Content-Type header
    const config = {
      headers: {
        'Content-Type': undefined, // Let Axios set it automatically with boundary
      },
    };
    return api.post('/admin/upload-multiple-mp3', formData, config);
  },

  // Create single sound (admin endpoint)
  createSound: (formData) => {
    // Get admin token manually since endpoint doesn't include /admin/
    const adminToken = typeof window !== 'undefined' ? localStorage.getItem('adminAuthToken') : null;
    
    // Axios will automatically set Content-Type with boundary for FormData
    // Delete the default application/json Content-Type header
    const config = {
      headers: {
        'Content-Type': undefined, // Let Axios set it automatically with boundary
      },
    };
    
    // Manually add admin authorization token
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    
    return api.post('/sounds', formData, config);
  },

  // Create tag (admin endpoint)
  createTag: (tagData) => {
    // Get admin token manually since endpoint doesn't include /admin/
    const adminToken = typeof window !== 'undefined' ? localStorage.getItem('adminAuthToken') : null;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    // Manually add admin authorization token
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    
    return api.post('/sounds/add/tag', tagData, config);
  },
};

// Export all API services
export default {
  sounds: soundsAPI,
  users: usersAPI,
  categories: categoriesAPI,
  tags: tagsAPI,
  admin: adminAPI,
};
