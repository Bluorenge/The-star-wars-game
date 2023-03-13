import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import ProtectedRouteWrap from './ProtectedRouteWrap';
import checkAuthLoader from 'helpers/checkAuthLoader';

import { LoginPage } from 'pages/LoginPage';
import { GamePage } from 'pages/GamePage';
import { LeaderboardPage } from 'pages/LeaderboardPage';
import { MainPage } from 'pages/MainPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RegisterPage } from 'pages/RegisterPage';
import { ProfileChangePasswordPage } from 'pages/ProfileChangePasswordPage';
import { ForumMainPage } from 'pages/ForumMainPage';

export const Router = () => (
  <RouterProvider
    router={createBrowserRouter([
      {
        path: ROUTES.MAIN_PAGE_PATH,
        element: <MainPage />,
        loader: checkAuthLoader,
      },
      {
        path: ROUTES.LOGIN_PAGE,
        element: (
          <ProtectedRouteWrap>
            <LoginPage />
          </ProtectedRouteWrap>
        ),
      },
      {
        path: ROUTES.REGISTER_PAGE_PATH,
        element: (
          <ProtectedRouteWrap>
            <RegisterPage />
          </ProtectedRouteWrap>
        ),
      },
      {
        path: ROUTES.GAME_PAGE_PATH,
        element: <GamePage />,
        loader: checkAuthLoader,
      },
      {
        path: ROUTES.LEADERBOARD_PAGE_PATH,
        element: <LeaderboardPage />,
        loader: checkAuthLoader,
      },
      {
        path: ROUTES.PROFILE_PAGE_PATH,
        element: <ProfilePage />,
        loader: checkAuthLoader,
      },
      {
        path: ROUTES.PROFILE_CHANGE_PASSWORD_PAGE_PATH,
        element: <ProfileChangePasswordPage />,
        loader: checkAuthLoader,
      },
      {
        path: ROUTES.FORUM_MAIN_PAGE_PATH,
        element: <ForumMainPage />,
        loader: checkAuthLoader,
      },
      {
        path: '*',
        element: <p>404</p>,
      },
    ])}
  />
);
