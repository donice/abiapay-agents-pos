import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    // 'Cookie': "PHPSESSID=064028fce513f2b30e805964ddd54846",
    // 'Content-Type': 'application/json',
    'Host': process.env.NEXT_PUBLIC_REQUEST_HOST,
  },
});

console.log(process.env.NEXT_PUBLIC_REQUEST_HOST)

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
