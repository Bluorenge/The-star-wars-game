import { useState } from 'react';
import { Typography, Modal, Input, message, Form } from 'antd';
import { defineMessages, useIntl } from 'react-intl';
import { handleErrorFromServer } from 'helpers/errorNotification';
import { ForumAddTopicModalProps } from 'models/forum.model';

import './ForumAddTopicModal.scss';

const messages = defineMessages({
  buttonAddTopic: {
    id: 'forum.add-topic-modal.ok-text',
    defaultMessage: 'Add topic',
  },
  buttonCancel: { id: 'universal.cancel', defaultMessage: 'Cancel' },
  modalAddTopicTitle: {
    id: 'forum.add-topic-modal.title',
    defaultMessage: 'Adding a new topic for the forum',
  },
  notificationAddTopicSuccess: {
    id: 'forum.add-topic-modal.success-message',
    defaultMessage: 'New topic successfully created',
  },
  placeholderAddTopic: {
    id: 'forum.add-topic-modal.input-placeholder',
    defaultMessage: 'Enter a topic name',
  },
  validationRequiredField: {
    id: 'forum.add-topic-modal.input-error-required',
    defaultMessage: 'Enter a topic name',
  },
});

export const ForumAddTopicModal: React.FC<ForumAddTopicModalProps> = ({
  selectedForum,
  isForumAddTopicModalOpen,
  toggleOpenModalCreateTopic,
}) => {
  const { formatMessage: fm } = useIntl();

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
        content: fm(messages.notificationAddTopicSuccess),
      });

      toggleOpenModalCreateTopic();
    } catch (err) {
      handleErrorFromServer(err);
    }

    setIsAddTopicLoading(false);
  };

  return (
    <Modal
      title={
        <Typography.Title level={3} className="forumAddTopicModal__title">
          {fm(messages.modalAddTopicTitle)} "{selectedForum?.title}"
        </Typography.Title>
      }
      open={isForumAddTopicModalOpen}
      okText={fm(messages.buttonAddTopic)}
      onOk={formAddTopic.submit}
      confirmLoading={isAddTopicLoading}
      cancelText={fm(messages.buttonCancel)}
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
              message: fm(messages.validationRequiredField),
            },
          ]}
        >
          <Input placeholder={fm(messages.placeholderAddTopic)} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
