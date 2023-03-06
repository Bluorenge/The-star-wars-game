import { ProfileForm } from 'components/Profile';
import './ProfilePage.scss';
import withRedirect from 'hocs/withRedirect';

const ProfilePage = () => {
  // some logic

  return (
    <div className="wrapperProfilePage">
      <ProfileForm />
    </div>
  );
};

export const withRedirectProfilePage = withRedirect(ProfilePage);
