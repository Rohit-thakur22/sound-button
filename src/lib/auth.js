import api from './api';

// Key for storing user data in localStorage
const USER_STORAGE_KEY = 'logged_in_user';
const AUTH_TOKEN_KEY = 'authToken';
// Separate key for admin authentication to avoid conflicts
const ADMIN_AUTH_TOKEN_KEY = 'adminAuthToken';

/**
 * Get the current authentication token
 */
export const getAuthToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Get the current logged-in user from localStorage or API
 */
export const getCurrentUser = async () => {
    try {
        if (typeof window === 'undefined') return null;

        // Check if user data exists in localStorage
        const localUser = localStorage.getItem(USER_STORAGE_KEY);
        const token = getAuthToken();

        if (localUser && token) {
            try {
                const userData = JSON.parse(localUser);
                // Optionally verify token is still valid
                return userData;
            } catch (e) {
                // Invalid JSON, clear and fetch fresh
                localStorage.removeItem(USER_STORAGE_KEY);
            }
        }

        // If no token, user is not logged in
        if (!token) {
            return null;
        }

        // Fetch user data from API
        try {
            const response = await api.get('/auth/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const userData = response.data?.user || response.data;
            if (userData) {
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
                return userData;
            }
        } catch (error) {
            // Token might be invalid, clear it
            if (error.response?.status === 401) {
                clearAuth();
            }
            throw error;
        }

        return null;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    const token = getAuthToken();
    return !!token;
};

/**
 * Clear authentication data
 */
export const clearAuth = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem('userName');
    localStorage.removeItem('userImage');
};

/**
 * Logout user
 */
export const logout = async () => {
    try {
        const token = getAuthToken();
        if (token) {
            // Optionally call logout endpoint
            try {
                await api.post('/auth/logout', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (error) {
                // Continue with logout even if API call fails
                console.error('Logout API call failed:', error);
            }
        }
    } catch (error) {
        console.error('Error during logout:', error);
    } finally {
        clearAuth();
    }
};

/**
 * Check if current user is admin
 */
export const checkIsAdmin = async () => {
    try {
        const user = await getCurrentUser();
        if (!user) return false;

        // Check if user has admin role or is_admin flag
        return user.is_admin === true || user.role === 'admin' || user.admin === true;
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
};

/**
 * ============================================
 * ADMIN AUTHENTICATION FUNCTIONS
 * Separate functions for admin authentication
 * ============================================
 */

/**
 * Get the admin authentication token
 */
export const getAdminAuthToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ADMIN_AUTH_TOKEN_KEY);
};

/**
 * Check if admin is authenticated
 */
export const isAdminAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    const token = getAdminAuthToken();
    return !!token;
};

/**
 * Clear admin authentication data
 */
export const clearAdminAuth = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ADMIN_AUTH_TOKEN_KEY);
};

/**
 * Logout admin
 */
export const adminLogout  = () => {
    clearAdminAuth();
};



