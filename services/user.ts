import ApiClient from './client';
import { User } from '@prisma/client';

const user = {
  login(params: { address: string }) {
    return ApiClient.post('/user', params);
  },
  logout() {
    return ApiClient.get('/user/logout');
  },
  update(params: Partial<User>, address: string) {
    return ApiClient.patch(`/user/${address}`, params);
  },
  check(params: { field: string; value: string; address: string }) {
    return ApiClient.post('/user/check', params);
  },
  follow(params: { followerId: string; followingId: string }) {
    return ApiClient.patch('/user/follow', params);
  },
};

export default user;
