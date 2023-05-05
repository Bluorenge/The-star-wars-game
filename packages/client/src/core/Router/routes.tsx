import type { RouteObject } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

import checkAuthLoader from 'helpers/checkAuthLoader';

import { LoginPage } from 'pages/LoginPage';
import { LeaderboardPage } from 'pages/LeaderboardPage';
import { MainPage } from 'pages/MainPage';
import { GamePage } from 'pages/GamePage';
import { ProfilePage } from 'pages/ProfilePage';
import { RegisterPage } from 'pages/RegisterPage';
import { ProfileChangePasswordPage } from 'pages/ProfileChangePasswordPage';
import { ForumsPage } from 'pages/ForumsPage';
import { ForumPage } from 'pages/ForumPage';
import { ThreadPage } from 'pages/ThreadPage';

export const routes = [
  {
    path: ROUTES.LOGIN_PAGE,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER_PAGE_PATH,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.MAIN_PAGE_PATH,
    element: <MainPage />,
  },
  {
    path: ROUTES.GAME_PAGE_PATH,
    element: <GamePage />,
  },
  {
    path: ROUTES.LEADERBOARD_PAGE_PATH,
    element: <LeaderboardPage />,
  },
  {
    path: ROUTES.PROFILE_PAGE_PATH,
    element: <ProfilePage />,
  },
  {
    path: ROUTES.PROFILE_CHANGE_PASSWORD_PAGE_PATH,
    element: <ProfileChangePasswordPage />,
  },
  {
    path: ROUTES.FORUM_MAIN_PAGE_PATH,
    element: <ForumsPage />,
  },
  {
    path: `${ROUTES.FORUM_MAIN_PAGE_PATH}/:forumId`,
    element: <ForumPage />,
  },
  {
    path: `${ROUTES.FORUM_THREAD_PAGE_PATH}/:threadId`,
    element: <ThreadPage />,
  },
  {
    path: '*',
    element: <p>404</p>,
  },
];
