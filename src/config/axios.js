import axios from 'axios';

const API_BASE_URL = 'https://67bc0cf4ed4861e07b38fca1.mockapi.io/';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchOrchids = async () => {
    try {
        const res = await axiosInstance.get('/orchid');
        return res.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error while fetching orchid data');
    }
};

export default axiosInstance;