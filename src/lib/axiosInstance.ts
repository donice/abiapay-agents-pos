import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = axios.defaults.headers.common['Authorization'];
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
