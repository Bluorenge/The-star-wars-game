import { Navigate } from 'react-router-dom';

import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { ROUTES } from 'constants/routes';

const AuthRedirectRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = localStorage.getItem(LOCAL_STORAGE_IS_AUTH_KEY);

  if (isAuth) {
    return <Navigate to={ROUTES.MAIN_PAGE_PATH} />;
  }

  return children;
};

export default AuthRedirectRoute;
