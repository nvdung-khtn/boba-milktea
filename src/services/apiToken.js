import axiosInstance from './api'
import { isAuthenticated } from 'services/auth'
const { token } = isAuthenticated();

const axiosInstanceToken = axiosInstance;
axiosInstanceToken.defaults.headers.common['Authorization'] = token;

export default axiosInstanceToken 