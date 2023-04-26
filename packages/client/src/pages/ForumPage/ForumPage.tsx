import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from 'layouts/Layout';
import { ForumMain } from 'components/Forum/ForumMain';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getForumById } from 'app/actions/forumActions';

export const ForumPage = () => {
  const { forumId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (forumId) {
      dispatch(getForumById(Number(forumId)));
    }
  }, [dispatch, forumId]);

  return (
    <>
      <Layout />
      <ForumMain />
    </>
  );
};
