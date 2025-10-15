import axios, { AxiosResponse } from "axios"
import { RootStateType } from "../Redux/store";
import { logout } from "../Pages/Auth/redux/AuthSlice";
import { Store } from "@reduxjs/toolkit";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + 'api/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token && config.headers) {
//         config.headers.set('Authorization', `Bearer ${token}`);
//     }
//     return config;
// });

// api.interceptors.response.use((response) => response, async (error) => {
//     if (error?.response && error?.response?.status === 401) {
//         console.warn('Token expiré ou invalide , déconnexion');
//         store.dispatch(logout());
//         localStorage.removeItem('token');
//     }
//     return Promise.reject(error);
// })


export const setupInterceptors = (store: Store<RootStateType>): void => {
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
                store.dispatch(logout());
                window.location.href = "/login";
            }
            return Promise.reject(error);
        }
    );
};

export default api; 