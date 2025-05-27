import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
  baseURL: 'http://3.27.6.171:5001', // live
  //baseURL: 'http://3.26.96.188:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
