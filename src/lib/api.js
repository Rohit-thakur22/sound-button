import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sound-effect-buttons-7cv7.onrender.com',
  timeout: 30000, // 30 seconds timeout for better reliability
  headers: {
    'Content-Type': 'application/json',
  },
  // Add retry configuration
  retry: 3,
  retryDelay: 1000,
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage or sessionStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add retry interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;
    
    // Retry logic for timeout and network errors
    if (!config || !config.retry) {
      config.retry = 0;
    }
    
    if (config.retry < 3 && (
      error.code === 'ECONNABORTED' || // Timeout
      error.code === 'NETWORK_ERROR' || // Network error
      !error.response // No response (network issue)
    )) {
      config.retry += 1;
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, config.retry * 1000));
      
      console.log(`Retrying request (${config.retry}/3):`, config.url);
      return api(config);
    }
    
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        // You can add redirect logic here if needed
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;



