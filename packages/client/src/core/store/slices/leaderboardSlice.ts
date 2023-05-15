import { createSlice } from '@reduxjs/toolkit';

import { getAllLeaders } from 'core/store/actions/leaderboardAction';
import { LeaderboardData, Leader } from 'models/leaderboard.model';

const initialState: {
  leaders: Leader[];
  loading: boolean;
} = {
  leaders: [],
  loading: true,
};

export const leaderboardSlice = createSlice({
  name: 'leaders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeaders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllLeaders.fulfilled, (state, action) => {
      state.loading = false;
      state.leaders = action.payload.map(
        (item: LeaderboardData, index: number) => ({
          key: index,
          ...item.data,
        })
      );
    });
    builder.addCase(getAllLeaders.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default leaderboardSlice.reducer;
