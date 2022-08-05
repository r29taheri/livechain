import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://livepeer.studio/api',
  headers: {
    authorization: 'Bearer ' + process.env.LIVEPEER_API_KEY,
  },
});

export default axiosInstance;
