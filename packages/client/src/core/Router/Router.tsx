import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from 'constants/routes';
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
        path: routes.MAIN_PAGE_PATH,
        element: <MainPage />,
      },
      {
        path: routes.LOGIN_PAGE,
        element: <LoginPage />,
      },
      {
        path: routes.REGISTER_PAGE_PATH,
        element: <RegisterPage />,
      },
      {
        path: routes.GAME_PAGE_PATH,
        element: <GamePage />,
      },
      {
        path: routes.LEADERBOARD_PAGE_PATH,
        element: <LeaderboardPage />,
      },
      {
        path: routes.PROFILE_PAGE_PATH,
        element: <ProfilePage />,
      },
      {
        path: routes.PROFILE_CHANGE_PASSWORD_PAGE_PATH,
        element: <ProfileChangePasswordPage />,
      },
      {
        path: routes.FORUM_MAIN_PAGE_PATH,
        element: <ForumMainPage />,
      },
    ])}
  />
);
