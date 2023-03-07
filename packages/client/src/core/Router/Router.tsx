import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ForumMainPage } from 'pages/ForumMainPage';
import { ROUTES } from 'constants/routes';
import { Layout } from 'layouts/Layout';
import {
  // ErrorPage,
  GamePage,
  LeaderboardPage,
  LoginPage,
  MainPage,
  ProfileChangePasswordPage,
  ProfilePage,
  RegisterPage,
} from 'pages';

export const Router = () => (
  <RouterProvider
    router={createBrowserRouter([
      {
        path: ROUTES.MAIN_PAGE_PATH,
        element: <Layout />,
        // errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: ROUTES.FORUM_MAIN_PAGE_PATH,
            element: <ForumMainPage />,
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
            path: ROUTES.LOGIN_PAGE,
            element: <LoginPage />,
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
            path: ROUTES.REGISTER_PAGE_PATH,
            element: <RegisterPage />,
          },
        ],
      },
    ])}
  />
);
