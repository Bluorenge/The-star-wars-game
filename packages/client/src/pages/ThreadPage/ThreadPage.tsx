import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from 'layouts/Layout';
import { ThreadMain } from 'components/Forum/ThreadMain';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getThreadById } from 'core/store/actions/forumActions';

export const ThreadPage = () => {
  const { threadId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (threadId) {
      dispatch(getThreadById(Number(threadId)));
    }
  }, [dispatch, threadId]);

  return (
    <Layout>
      <ThreadMain />
    </Layout>
  );
};
