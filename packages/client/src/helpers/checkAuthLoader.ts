import { redirect } from 'react-router-dom';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { routes } from 'constants/routes';

const checkAuthLoader = () => {
  const currentUser = localStorage.getItem(LOCAL_STORAGE_IS_AUTH_KEY);

  if (!currentUser) {
    return redirect(routes.LOGIN_PAGE);
  }
  return null;
};

export default checkAuthLoader;
