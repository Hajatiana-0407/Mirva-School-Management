import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost/Mirva/Server/api',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export default api; 