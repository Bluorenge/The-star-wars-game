import { ProfileForm } from 'components/Profile';
import { Layout } from 'layouts/Layout';

import './ProfilePage.scss';

export const ProfilePage = () => {
  // some logic

  return (
    <div className="wrapperProfilePage">
      <Layout></Layout>
      <ProfileForm />
    </div>
  );
};
