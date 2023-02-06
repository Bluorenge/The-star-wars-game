import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import * as ROUTES from "../../constants/routes";
import MainPage from '../../Pages/MainPage'
import AuthPage from '../../Pages/AuthPage'
import RegistryPage from '../../Pages/RegistryPage'
import GamePage from '../../Pages/GamePage'
import LeaderboardPage from '../../Pages/LeaderboardPage'
import ProfilePage from '../../Pages/ProfilePage'

export const Router = () => <RouterProvider router={createBrowserRouter([
  {
    path: ROUTES.MAIN_PAGE_PATH,
    element: <MainPage/>,
  },
  {
    path: ROUTES.AUTH_PAGE_PATH,
    element: <AuthPage/>,
  },
  {
    path: ROUTES.REGISTRY_PAGE_PATH,
    element: <RegistryPage/>,
  },
  {
    path: ROUTES.GAME_PAGE_PATH,
    element: <GamePage/>,
  },
  {
    path: ROUTES.LEADERBOARD_PAGE_PATH,
    element: <LeaderboardPage/>,
  },
  {
    path: ROUTES.PROFILE_PAGE_PATH,
    element: <ProfilePage/>,
  }
])}/>
