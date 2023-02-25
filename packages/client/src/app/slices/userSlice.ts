import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { authApi } from 'api/auth';
import { profileApi } from 'api/profile';
import { CurrentUser, CurrentUserDto } from 'models/auth.model';

const initialState: {
  isAuth: boolean;
  isFetching: boolean;
  currentUser: CurrentUser | null;
} = {
  isAuth: false,
  isFetching: false,
  currentUser: {
    id: 0,
    firstName: '',
    secondName: '',
    displayName: '',
    login: '',
    email: '',
    phone: '',
    avatar: '',
  },
};

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async () => {
    try {
      const response = await authApi.getCurrentUser();

      if (response.status === 200) {
        return { ...response.data };
      }
    } catch (err) {
      console.error({ err });
    }
  }
);

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
      console.error({ err });
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
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(
      getCurrentUser.fulfilled,
      (state, action: PayloadAction<CurrentUserDto, string>) => {
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
    );
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.isFetching = false;
    });
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
