import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UploadRequestOption } from 'rc-upload/lib/interface';

import { authApi } from 'api/auth';
import { profileApi } from 'api/profile';
import { handleErrorFromServer } from 'helpers/errorNotification';

import window from 'helpers/window';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { CurrentUser, CurrentUserDto, IUserService } from 'models/auth.model';

export const initialState: {
  isAuth: boolean;
  isFetching: boolean;
  currentUser: CurrentUser | null;
} = {
  isAuth: false,
  isFetching: false,
  currentUser: null,
};

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, thunkApi) => {
    const service: IUserService = thunkApi.extra as IUserService;
    return service.getCurrentUser();
  }
);

export const signOut = createAsyncThunk('user/signOut', async () => {
  try {
    const resopnse = await authApi.signOut();

    if (resopnse.status === 200) {
      window.localStorage.removeItem(LOCAL_STORAGE_IS_AUTH_KEY);
    }
  } catch (err) {
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser | null>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * getCurrentUser
     */
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action: any) => {
        const {
          id,
          first_name,
          second_name,
          display_name,
          login,
          email,
          phone,
          avatar,
        } = action.payload;

        state.isAuth = true;
        state.isFetching = false;
        state.currentUser = {
          id,
          firstName: first_name,
          secondName: second_name,
          displayName: display_name,
          login,
          email,
          phone,
          avatar,
        } as CurrentUser;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isFetching = false;
      });
    /**
     * signOut
     */
    builder
      .addCase(signOut.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isFetching = false;
        state.isAuth = false;
        state.currentUser = null;
      })
      .addCase(signOut.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
