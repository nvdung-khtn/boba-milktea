import axios from 'axios';
import { API } from 'configs/index';
const AUTH_TOKEN = localStorage.getItem('token');
const configs = {
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
};

const axiosInstanceToken = axios.create(configs);

axiosInstanceToken.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
axiosInstanceToken.interceptors.request.use(
    function (config) {
        config.headers = { ...config.headers };
        // you can also do other modification in config
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axiosInstanceToken.interceptors.response.use(
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
export default axiosInstanceToken;