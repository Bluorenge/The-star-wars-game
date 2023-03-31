import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UploadRequestOption } from 'rc-upload/lib/interface';

import { authApi } from 'api/auth';
import { profileApi } from 'api/profile';
import { handleErrorFromServer } from 'helpers/errorNotification';

import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { CurrentUser, CurrentUserDto } from 'models/auth.model';

const initialState: {
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
  async () => {
    try {
      const response = await authApi.getCurrentUser();

      if (response.status === 200) {
        localStorage.setItem(LOCAL_STORAGE_IS_AUTH_KEY, 'true');
        return { ...response.data };
      }
    } catch (err) {
      localStorage.setItem(LOCAL_STORAGE_IS_AUTH_KEY, 'false');
      handleErrorFromServer(err);
    }
  }
);

export const signOut = createAsyncThunk('user/signOut', async () => {
  try {
    const resopnse = await authApi.signOut();

    if (resopnse.status === 200) {
      localStorage.removeItem(LOCAL_STORAGE_IS_AUTH_KEY);
    }
  } catch (err) {
    localStorage.setItem(LOCAL_STORAGE_IS_AUTH_KEY, 'false');
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
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<CurrentUserDto, string>) => {
          if (action.payload?.id) {
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
          }
        }
      )
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
