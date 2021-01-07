import axios from 'axios';
import { baseURL } from '../config/api';
const AUTH_TOKEN = localStorage.getItem('token');
const configs = {
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
};