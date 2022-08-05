import axios from 'axios';
import queryString from 'query-string';

const HttpClient = axios.create({
  baseURL: '/api',
  paramsSerializer: (params) => {
    return queryString.stringify(params, { arrayFormat: 'bracket' });
  },
});

export default HttpClient;
