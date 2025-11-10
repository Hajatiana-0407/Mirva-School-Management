import axios, { AxiosResponse } from "axios"
import { navigate } from "./navigate";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + 'api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
export const setupInterceptors = (): void => {
    // 🔹 Requête → ajoute le token
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // 🔹 Réponse → gère les erreurs 401
    api.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error) => {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/signin');
            }
            return Promise.reject(error);
        }
    );
};

export default api; 