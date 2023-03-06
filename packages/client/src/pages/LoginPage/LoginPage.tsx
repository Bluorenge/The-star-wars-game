import { Login } from 'components/Login';

import './LoginPage.scss';
import withRedirect from 'hocs/withRedirect';

const LoginPage = () => {
  // some logic

  return (
    <div className="wrapperLoginPage">
      <Login />
    </div>
  );
};

export const withRedirectLoginPage = withRedirect(LoginPage);
