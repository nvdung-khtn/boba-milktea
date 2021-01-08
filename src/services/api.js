import axios from 'axios';
import { baseURL } from 'configs/index';
const AUTH_TOKEN = localStorage.getItem('token');
const configs = {
    baseURL: "http://localhost:8080",//temp
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
};

const axiosInstance = axios.create(configs);

//axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
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