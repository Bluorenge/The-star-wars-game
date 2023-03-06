import { routes } from 'constants/routes';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const withRedirect = (Component: React.FC) => (props: any) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      return navigate(routes.LOGIN_PAGE, { state: { from: location } });
    }
  }, []);

  return <Component {...props} />;
};

export default withRedirect;
