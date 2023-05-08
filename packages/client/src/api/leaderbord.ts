import { yandexApi } from 'api';

import {
  LeaderboardNewLeaderRequest,
  LeaderboardRequest,
} from 'models/leaderboard.model';
import { LEADERBOARD_NAME } from 'constants/main';

export const leaderBoardApi = {
  getAllLeaders(data: LeaderboardRequest) {
    return yandexApi.post(`/leaderboard/${LEADERBOARD_NAME}`, data);
  },

  addNewLeader(data: LeaderboardNewLeaderRequest) {
    return yandexApi.post('/leaderboard', data);
  },
};
