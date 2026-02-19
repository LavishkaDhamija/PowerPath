import axios from 'axios';

// Create a centralized Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Centralized base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach Token Automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle Global Errors (Optional but recommended)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Example: If token expired, redirect to login
        if (error.response && error.response.status === 401) {
            // localStorage.removeItem('token');
            // window.location.href = '/login'; 
            console.warn('Unauthorized access - potential token expiry');
        }
        return Promise.reject(error);
    }
);

export default api;
