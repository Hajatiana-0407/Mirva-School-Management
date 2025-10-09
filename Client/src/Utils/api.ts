import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
});

export default api; 