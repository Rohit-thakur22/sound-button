// lib/api.js
import axios from "axios";

/**
 * Axios instance with:
 * - baseURL from NEXT_PUBLIC_API_BASE_URL (fallback provided)
 * - retry on network/timeouts
 * - request interceptor to attach token (admin vs user)
 * - response interceptor to handle retries and 401 logout/redirect
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://sound-effect-buttons-xi.vercel.app";

const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 1000; // multiplied by attempt

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper: Determine whether a route is admin route from URL string
function isAdminRouteFromUrl(url = "") {
  return url.includes("/admin/") || url.includes("/auth/admin/");
}

// Helper: get token from localStorage based on route
function getTokenForUrl(url = "") {
  if (typeof window === "undefined") return null;
  const isAdmin = isAdminRouteFromUrl(url);
  return isAdmin ? localStorage.getItem("adminAuthToken") : localStorage.getItem("authToken");
}

// Helper: perform logout + clear storage + redirect
function handleLogout({ isAdmin = false, clearAll = true } = {}) {
  if (typeof window === "undefined") return;

  try {
    // Remove specific tokens
    if (isAdmin) {
      localStorage.removeItem("adminAuthToken");
    } else {
      localStorage.removeItem("authToken");
    }

    // Optionally clear all localStorage — change to false if you don't want that
    if (clearAll) {
      localStorage.clear();
    }

    // Prevent redirect loop: if user is already on login page, don't redirect
    const pathname = window.location.pathname || "";
    const loginPath = isAdmin ? "/en/admin/login" : "/en/login";

    if (!pathname.startsWith(loginPath)) {
      // use replace so user can't go back to an invalid session page
      window.location.replace(loginPath);
    }
  } catch (err) {
    // Failsafe: still try to redirect even if localStorage operations error
    window.location.replace(isAdmin ? "/admin/login" : "/login");
  }
}

/* ---------------- Request Interceptor ---------------- */
api.interceptors.request.use(
  (config) => {
    // In SSR environments, skip
    if (typeof window === "undefined") return config;

    const url = config.url || "";
    const token = getTokenForUrl(url);

    if (token) {
      // ensure headers object exists
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Initialize retry meta if not present (we'll store on config.__retryCount)
    if (!config.__retryCount && config.__retryCount !== 0) {
      config.__retryCount = 0;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------- Response Interceptor ---------------- */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config || {};
    // If there's no config, nothing we can do here
    if (!config) return Promise.reject(error);

    // Ensure __retryCount exists
    if (typeof config.__retryCount === "undefined") config.__retryCount = 0;

    // Do NOT retry for 401 responses (we'll handle logout instead)
    const status = error.response?.status;

    // Retry for network errors, timeouts, or no response
    const shouldRetry =
      (error.code === "ECONNABORTED" || // timeout
        error.code === "ENETDOWN" ||
        error.code === "ENETUNREACH" ||
        error.code === "ECONNRESET" ||
        !error.response) && // no response (network)
      config.__retryCount < MAX_RETRIES;

    if (shouldRetry) {
      config.__retryCount += 1;
      const delay = RETRY_BASE_DELAY_MS * config.__retryCount;
      await new Promise((res) => setTimeout(res, delay));
      // Re-send the request using the axios instance
      return api(config);
    }

    // Handle Unauthorized explicitly
    if (status === 401) {
      if (typeof window !== "undefined") {
        const url = config.url || "";
        const isAdmin = isAdminRouteFromUrl(url);

        // Clear tokens and redirect to login
        handleLogout({ isAdmin, clearAll: true });

        // Reject error after logout (so callers can handle if needed)
        return Promise.reject(error);
      }
    }

    // For other errors or exhausted retries, reject
    return Promise.reject(error);
  }
);

export default api;
