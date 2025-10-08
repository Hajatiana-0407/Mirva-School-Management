import axios from "axios"

const api = axios.create({
    // baseURL: 'http://localhost/Mirva-School-Management/Server/api',
    baseURL: 'http://127.0.0.1:8000/api',
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