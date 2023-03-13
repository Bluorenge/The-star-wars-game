import { Navigate, useLocation } from 'react-router-dom';

import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { ROUTES } from 'constants/routes';

const ProtectedRouteWrap = ({ children }: { children: JSX.Element }) => {
  const isAuth = localStorage.getItem(LOCAL_STORAGE_IS_AUTH_KEY);
  const location = useLocation();

  if (isAuth) {
    return (
      <Navigate
        to={location.state?.from?.pathname || ROUTES.MAIN_PAGE_PATH}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRouteWrap;
