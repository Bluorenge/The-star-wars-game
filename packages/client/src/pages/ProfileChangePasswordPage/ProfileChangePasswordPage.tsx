import { ProfileChangePassword } from 'components/Profile/ProfileChangePassword';

import './ProfileChangePasswordPage.scss';
import { Layout } from 'layouts/Layout';

export const ProfileChangePasswordPage = () => {
  // some logic

  return (
    <Layout>
      <div className="wrapperProfileChangePasswordPage">
        <ProfileChangePassword />
      </div>
    </Layout>
  );
};
