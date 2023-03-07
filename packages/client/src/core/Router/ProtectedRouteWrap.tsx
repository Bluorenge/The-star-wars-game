import { routes } from 'constants/routes';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProtectedRouteWrap = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      return navigate(location.state?.from?.pathname || routes.MAIN_PAGE_PATH, {
        replace: true,
      });
    }
  }, []);

  return children;
};

export default ProtectedRouteWrap;
