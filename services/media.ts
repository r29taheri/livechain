import ApiClient from './client';
import { Media } from '@prisma/client';

const media = {
  create(params: Partial<Media>) {
    return ApiClient.post('/media', params);
  },
};

export default media;
