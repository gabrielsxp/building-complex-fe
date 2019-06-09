import axios from 'axios';
import { getToken } from "./services/auth";

const instance = axios.create({});

instance.headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*"
}

instance.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error.response.data.error);
});

export default instance;