import { redirect } from 'react-router-dom';

import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { ROUTES } from 'constants/routes';

const checkAuthLoader = () => {
  const isAuth = localStorage.getItem(LOCAL_STORAGE_IS_AUTH_KEY) === 'true';

  if (isAuth) {
    return redirect(ROUTES.MAIN_PAGE_PATH);
  }

  return redirect(ROUTES.LOGIN_PAGE);
};

export default checkAuthLoader;
