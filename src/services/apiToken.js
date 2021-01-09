import axiosInstance from './api'
const AUTH_TOKEN = localStorage.getItem(token)
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;

export default axiosInstanceToken;