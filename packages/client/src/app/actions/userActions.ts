import { createAsyncThunk } from '@reduxjs/toolkit';
import { UploadRequestOption } from 'rc-upload/lib/interface';

import { authApi } from 'api/auth';
import { profileApi } from 'api/profile';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { handleErrorFromServer } from 'helpers/errorNotification';
import { IUserService } from 'models/auth.model';
import window from 'helpers/window';

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, thunkApi) => {
    const service: IUserService = thunkApi.extra as IUserService;

    try {
      const response = await service.getCurrentUser();

      if (response) {
        return response;
      }
    } catch (err) {
      window.localStorage.setItem(LOCAL_STORAGE_IS_AUTH_KEY, 'false');
      handleErrorFromServer(err);
    }
  }
);

export const signOut = createAsyncThunk('user/signOut', async () => {
  try {
    const response = await authApi.signOut();

    if (response.status === 200) {
      window.localStorage.removeItem(LOCAL_STORAGE_IS_AUTH_KEY);
    }
  } catch (err) {
    window.localStorage.setItem(LOCAL_STORAGE_IS_AUTH_KEY, 'false');
    handleErrorFromServer(err);
  }
});

export const updateUserAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (data: UploadRequestOption) => {
    try {
      const formData = new FormData();
      formData.append('avatar', data.file);

      const response = await profileApi.changeProfileAvatar(formData);

      if (response.status === 200) {
        return { ...response.data };
      }
    } catch (err) {
      handleErrorFromServer(err);
    }
  }
);
