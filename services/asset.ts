import ApiClient from './client';

const asset = {
  create(params: FormData) {
    return ApiClient.post('/asset', params);
  },
};

export default asset;
