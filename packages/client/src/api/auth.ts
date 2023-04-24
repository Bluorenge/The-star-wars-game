import { api } from 'api';
import {
  LoginInput,
  LoginInputDto,
  RegisterInput,
  RegisterInputDto,
} from 'models/auth.model';

export const authApi = {
  getCurrentUser: async () => {
    return api.get('/auth/user');
  },
  login: (data: LoginInput) => {
    return api.post('/auth/signin', new LoginInputDto(data));
  },
  oAuth: (data: any) => {
    return api.post('/oauth/yandex', data);
  },
  register: (data: RegisterInput) => {
    return api.post('/auth/signup', new RegisterInputDto(data));
  },
  signOut: () => {
    return api.post('/auth/logout');
  },
};
