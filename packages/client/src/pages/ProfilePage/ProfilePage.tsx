import { ProfileForm } from 'components/Profile';
import { Layout } from 'layouts/Layout';

import './ProfilePage.scss';

export const ProfilePage = () => {
  // some logic

  return (
    <Layout>
      <div className="wrapperProfilePage">
        <ProfileForm />
      </div>
    </Layout>
  );
};
