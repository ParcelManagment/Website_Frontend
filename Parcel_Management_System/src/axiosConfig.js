import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // backend base URL (here the proxy)
});

export default axiosInstance;
