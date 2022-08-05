import ApiClient from './client';

const stream = {
  get(id: string) {
    return ApiClient.get(`/livepeer/${id}`);
  },
  create(params: { name: string }) {
    return ApiClient.post('/livepeer/create', params);
  },
};

export default stream;
