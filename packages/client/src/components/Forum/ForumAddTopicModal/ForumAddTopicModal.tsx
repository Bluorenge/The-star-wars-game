import { Typography, Modal, Input, message } from 'antd';
import { useState } from 'react';

import { ForumAddTopicModalProps } from 'models/forum.model';
import { en } from 'translations';
import './ForumAddTopicModal.scss';

export const ForumAddTopicModal: React.FC<ForumAddTopicModalProps> = ({
  selectedForum,
  isForumAddTopicModalOpen,
  toggleOpenModalCreateTopic,
}) => {
  const [isAddTopicLoading, setIsAddTopicLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddTopic = async () => {
    setIsAddTopicLoading(true);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      });

      messageApi.open({
        type: 'success',
        content: en['forum.add-topic-modal.success-message'],
      });
      toggleOpenModalCreateTopic();
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: en['forum.add-topic-modal.error-message'],
      });
    }

    setIsAddTopicLoading(false);
  };

  return (
    <Modal
      title={
        <Typography.Title level={3} className="forumAddTopicModal__title">
          {en['forum.add-topic-modal.title']} "{selectedForum?.title}"
        </Typography.Title>
      }
      open={isForumAddTopicModalOpen}
      onOk={handleAddTopic}
      confirmLoading={isAddTopicLoading}
      onCancel={toggleOpenModalCreateTopic}
      okText={en['forum.add-topic-modal.ok-text']}
      cancelText={en['forum.add-topic-modal.cancel-text']}
      className="forumAddTopicModal"
    >
      {contextHolder}
      <Input placeholder={en['forum.add-topic-modal.input-placeholder']} />
    </Modal>
  );
};
