import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (name, email, password) => api.post('/auth/register', { name, email, password });
export const getProgress = (studentId, token) => api.get(`/progress/${studentId}`, { headers: { Authorization: `Bearer ${token}` } });
// Add other API calls here...

export default api;
