import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api-hmg.lecupon.com/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default axiosInstance;
