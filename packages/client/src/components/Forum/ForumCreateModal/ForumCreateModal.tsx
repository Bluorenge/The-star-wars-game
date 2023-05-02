import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Typography, Modal, Input, message, Form } from 'antd';
import { useParams } from 'react-router-dom';

import { ForumCreateModalProps } from 'models/forum.model';
import { INPUT_CREATE_NAME } from 'constants/forum';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { createForum, createThread } from 'app/actions/forumActions';

import './ForumCreateModal.scss';

const messages = defineMessages({
  buttonAddTopic: {
    id: 'forum.add-thread-modal.ok-text',
    defaultMessage: 'Add thread',
  },
  buttonCancel: { id: 'universal.cancel', defaultMessage: 'Cancel' },
  modalAddTopicTitle: {
    id: 'forum.add-thread-modal.title',
    defaultMessage: 'Adding a new thread for the forum',
  },
  notificationAddTopicSuccess: {
    id: 'forum.add-thread-modal.success-message',
    defaultMessage: 'New thread successfully created',
  },
  placeholderAddTopic: {
    id: 'forum.add-thread-modal.input-placeholder',
    defaultMessage: 'Enter a thread name',
  },
  validationRequiredField: {
    id: 'forum.add-thread-modal.input-error-required',
    defaultMessage: 'Enter a thread name',
  },
});

export const ForumCreateModal: React.FC<ForumCreateModalProps> = ({
  isCreateModalOpen,
  toggleOpenCreateModal,
}) => {
  const { formatMessage: fm } = useIntl();
  const dispatch = useAppDispatch();
  const { forumId } = useParams();

  const [isCreateLoading, setIsCreateLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [formCreate] = Form.useForm();

  const handleCreate = async () => {
    setIsCreateLoading(true);

    try {
      const threadName = formCreate.getFieldValue(INPUT_CREATE_NAME);

      if (forumId) {
        await dispatch(
          createThread({ name: threadName, forumId: Number(forumId) })
        );
      } else {
        await dispatch(createForum({ title: threadName }));
      }

      messageApi.open({
        type: 'success',
        content: fm(messages.notificationAddTopicSuccess),
      });

      toggleOpenCreateModal();
    } finally {
      setIsCreateLoading(false);
    }
  };

  return (
    <Modal
      title={
        <Typography.Title level={3} className="forumCreateModal__title">
          {fm(messages.modalAddTopicTitle)}
        </Typography.Title>
      }
      open={isCreateModalOpen}
      okText={fm(messages.buttonAddTopic)}
      onOk={formCreate.submit}
      confirmLoading={isCreateLoading}
      cancelText={fm(messages.buttonCancel)}
      onCancel={toggleOpenCreateModal}
      afterClose={formCreate.resetFields}
      className="forumCreateModal"
    >
      {contextHolder}

      <Form form={formCreate} onFinish={handleCreate}>
        <Form.Item
          name={INPUT_CREATE_NAME}
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
