import { yandexApi } from 'api';
import {
  ProfileChangePasswordInput,
  ProfileChangePasswordInputDto,
  ProfileInput,
  ProfileInputDto,
} from 'models/profile.model';

export const profileApi = {
  changeProfileInfo: (data: ProfileInput) => {
    return yandexApi.put('/user/profile', new ProfileInputDto(data));
  },
  changeProfileAvatar: (data: FormData) => {
    return yandexApi.put('/user/profile/avatar', data);
  },
  changeProfilePassword: (data: ProfileChangePasswordInput) => {
    return yandexApi.put(
      '/user/password',
      new ProfileChangePasswordInputDto(data)
    );
  },
};
