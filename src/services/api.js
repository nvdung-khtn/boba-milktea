import axios from 'axios';
require('dotenv').config();
const configs = {
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
};

const axiosInstance = axios.create(configs);

axiosInstance.interceptors.request.use(
    function (config) {
        config.headers = { ...config.headers };
        // you can also do other modification in config
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    function (response) {
        if (response.status === 401) {
            // your failure logic
            console.error('ERROR-401', response);
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    },
);
export default axiosInstance;