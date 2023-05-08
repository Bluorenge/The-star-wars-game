import { createAsyncThunk } from '@reduxjs/toolkit';

import { leaderBoardApi } from 'api/leaderbord';
import { handleErrorFromServer } from 'helpers/errorNotification';
import {
  LeaderboardNewLeaderRequest,
  LeaderboardRequest,
} from 'models/leaderboard.model';

export const getAllLeaders = createAsyncThunk(
  'leaders/all',
  async (payload: LeaderboardRequest) => {
    try {
      const { data } = await leaderBoardApi.getAllLeaders(payload);

      return data;
    } catch (err) {
      handleErrorFromServer(err);
    }
  }
);

export const addNewLeader = createAsyncThunk(
  'leaders/new',
  async (payload: LeaderboardNewLeaderRequest) => {
    try {
      const { data } = await leaderBoardApi.addNewLeader(payload);

      return data;
    } catch (err) {
      handleErrorFromServer(err);
    }
  }
);
