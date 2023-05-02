import { useEffect, useState } from 'react';

import { Layout } from 'layouts/Layout';
import { ForumsMain } from 'components/Forum/ForumsMain';
import { getForums } from 'app/actions/forumActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { ForumCreateModal } from 'components/Forum/ForumCreateModal';

import './ForumsPage.scss';

export const ForumsPage = () => {
  const dispatch = useAppDispatch();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const toggleOpenCreateModal = () => {
    setIsCreateModalOpen((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(getForums());
  }, [dispatch]);

  return (
    <>
      <Layout />
      <ForumsMain onCreateBtnClick={toggleOpenCreateModal} />
      <ForumCreateModal
        isCreateModalOpen={isCreateModalOpen}
        toggleOpenCreateModal={toggleOpenCreateModal}
      />
    </>
  );
};
