import { yandexApi } from 'api';
import {
  LoginInput,
  LoginInputDto,
  RegisterInput,
  RegisterInputDto,
} from 'models/auth.model';

export const authApi = {
  getCurrentUser: async () => {
    return yandexApi.get('/auth/user');
  },
  login: (data: LoginInput) => {
    return yandexApi.post('/auth/signin', new LoginInputDto(data));
  },
  oAuth: (data: any) => {
    return yandexApi.post('/oauth/yandex', data);
  },
  register: (data: RegisterInput) => {
    return yandexApi.post('/auth/signup', new RegisterInputDto(data));
  },
  signOut: () => {
    return yandexApi.post('/auth/logout');
  },
};
