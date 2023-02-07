import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import * as ROUTES from 'constants/routes'
import MainPage from 'pages/MainPage'
import AuthPage from 'pages/AuthPage'
import RegistryPage from 'pages/RegistryPage'
import GamePage from 'pages/GamePage'
import LeaderboardPage from 'pages/LeaderboardPage'
import ProfilePage from 'pages/ProfilePage'

export const Router = () => (
  <RouterProvider
    router={createBrowserRouter([
      {
        path: ROUTES.MAIN_PAGE_PATH,
        element: <MainPage />,
      },
      {
        path: ROUTES.AUTH_PAGE_PATH,
        element: <AuthPage />,
      },
      {
        path: ROUTES.REGISTRY_PAGE_PATH,
        element: <RegistryPage />,
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
    ])}
  />
)
