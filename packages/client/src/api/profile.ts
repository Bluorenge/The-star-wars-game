import { api } from 'api';
import {
  ProfileChangePasswordInput,
  ProfileChangePasswordInputDto,
  ProfileInput,
  ProfileInputDto,
} from 'models/profile.model';

export const profileApi = {
  changeProfileInfo: (data: ProfileInput) => {
    return api.put('/user/profile', new ProfileInputDto(data));
  },
  changeProfileAvatar: (data: FormData) => {
    return api.put('/user/profile/avatar', data);
  },
  changeProfilePassword: (data: ProfileChangePasswordInput) => {
    return api.put('/user/password', new ProfileChangePasswordInputDto(data));
  },
};
