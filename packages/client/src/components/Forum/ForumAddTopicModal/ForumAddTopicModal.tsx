import { Typography, Modal, Input, message, Form } from 'antd';
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
  const [formAddTopic] = Form.useForm();

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

      formAddTopic.resetFields();
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
      okText={en['forum.add-topic-modal.ok-text']}
      onOk={formAddTopic.submit}
      confirmLoading={isAddTopicLoading}
      cancelText={en['forum.add-topic-modal.cancel-text']}
      onCancel={toggleOpenModalCreateTopic}
      afterClose={formAddTopic.resetFields}
      className="forumAddTopicModal"
    >
      {contextHolder}

      <Form form={formAddTopic} onFinish={handleAddTopic}>
        <Form.Item
          name="topic-name"
          rules={[
            {
              required: true,
              message: en['forum.add-topic-modal.input-error-required'],
            },
          ]}
        >
          <Input placeholder={en['forum.add-topic-modal.input-placeholder']} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
