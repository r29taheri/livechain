import ApiClient from './client';
import { User } from '@prisma/client';

const user = {
  login(params: { address: string }) {
    return ApiClient.post('/user', params);
  },
  update(params: Partial<User>, address: string) {
    return ApiClient.post(`/user/${address}`, params);
  },
};

export default user;
