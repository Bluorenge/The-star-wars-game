import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from 'layouts/Layout';
import { ForumMain } from 'components/Forum/ForumMain';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getForumById } from 'app/actions/forumActions';
import { ForumCreateModal } from 'components/Forum/ForumCreateModal';

export const ForumPage = () => {
  const { forumId } = useParams();
  const dispatch = useAppDispatch();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const toggleOpenCreateModal = () => {
    setIsCreateModalOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (forumId) {
      dispatch(getForumById(Number(forumId)));
    }
  }, [forumId]);

  return (
    <>
      <Layout />
      <ForumMain onCreateBtnClick={toggleOpenCreateModal} />
      <ForumCreateModal
        isCreateModalOpen={isCreateModalOpen}
        toggleOpenCreateModal={toggleOpenCreateModal}
      />
    </>
  );
};
