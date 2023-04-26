import { useEffect } from 'react';

import { Layout } from 'layouts/Layout';
import { ForumsMain } from 'components/Forum/ForumsMain';
import { getForums } from 'app/actions/forumActions';
import { useAppDispatch } from 'hooks/useAppDispatch';

import './ForumsPage.scss';

export const ForumsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getForums());
  }, [dispatch]);

  return (
    <>
      <Layout />
      <ForumsMain />
    </>
  );
};
