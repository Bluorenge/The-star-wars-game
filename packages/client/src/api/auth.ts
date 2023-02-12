import { api } from 'api';
import {
  LoginInput,
  LoginInputDto,
  RegisterInput,
  RegisterInputDto,
} from 'models/auth.model';

export const authApi = {
  register: (data: RegisterInput) => {
    return api.post('/auth/signup', new RegisterInputDto(data));
  },
  login: (data: LoginInput) => {
    return api.post('/auth/signin', new LoginInputDto(data));
  },
};
