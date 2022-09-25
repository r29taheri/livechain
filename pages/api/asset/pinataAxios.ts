import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.pinata.cloud',
  // maxBodyLength: 'Infinity',
  headers: {
    Authorization: 'Bearer ' + process.env.PINATA_API_KEY,
  },
});

export default axiosInstance;
