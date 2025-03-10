import axios from 'axios';

const apiUrl = import.meta.env.VITE_BASE_URL || 'https://67bc0cf4ed4861e07b38fca1.mockapi.io/';

const api = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

export default api;