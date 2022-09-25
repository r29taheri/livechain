import ApiClient from './client';
import { Media } from '@prisma/client';

const media = {
  create(params: Partial<Media>) {
    return ApiClient.post('/media', params);
  },
  createNft(params: Partial<Media>, key: string) {
    return ApiClient.patch(`/asset/${key}`, params);
  },
};

export default media;
