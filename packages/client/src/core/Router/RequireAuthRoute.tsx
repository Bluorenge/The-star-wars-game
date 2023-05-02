import { useLocation, useNavigate } from 'react-router-dom';

import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { ROUTES } from 'constants/routes';
import window from 'helpers/window';
import { useEffect } from 'react';

const RequireAuthRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth =
    window.localStorage.getItem(LOCAL_STORAGE_IS_AUTH_KEY) === 'true';
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      return navigate(`${ROUTES.LOGIN_PAGE}${location?.search}`, {
        replace: true,
        state: location,
      });
    }
  });

  return children;
};

export default RequireAuthRoute;
