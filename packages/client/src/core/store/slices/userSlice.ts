import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getCurrentUser, signOut } from 'core/store/actions/userActions';
import { CurrentUser } from 'models/auth.model';

export const initialState: {
  isAuth: boolean;
  isFetching: boolean;
  currentUser: CurrentUser | null;
} = {
  isAuth: false,
  isFetching: false,
  currentUser: null,
};

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
