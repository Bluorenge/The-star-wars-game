import { useState } from 'react';
import { Typography, Button, Space, Form, Input, Spin } from 'antd';

import { createMessage } from 'app/actions/forumActions';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import dateFormater from 'helpers/dateFormatter';
import { INPUT_MESSAGE_NAME } from 'constants/forum';
import { MessageModel } from 'models/forum.model';

import './ThreadMain.scss';

export const ThreadMain: React.FC = () => {
  const dispatch = useAppDispatch();
  const forum = useAppSelector((state) => state.forum);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [formCreateMessage] = Form.useForm();
  const { TextArea } = Input;
  const [isCreateLoading, setIsCreateLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    setIsCreateLoading(true);

    try {
      const messageText = formCreateMessage.getFieldValue(INPUT_MESSAGE_NAME);

      await dispatch(
        createMessage({
          nickname: currentUser!.login,
          message: messageText,
          threadId: forum.thread?.id,
        })
      );
    } finally {
      setIsCreateLoading(false);
    }
  };

  return (
    <div className="threadMain">
      <Typography.Title className="threadMain__title">
        Тема "{forum.thread?.name}"
      </Typography.Title>

      {forum.thread && forum.thread.messages!.length > 0 && (
        <Space
          direction="vertical"
          size={20}
          className="threadMain__messagesWrap"
        >
          {forum.thread.messages!.map((message: MessageModel) => (
            <div className="threadMain__message" key={message.id}>
              <p>{message.message}</p>

              <div className="threadMain__messageInfo">
                <span>Автор: {message.nickname}</span>
                <span> — </span>
                <span>{dateFormater(message.createdAt)}</span>
              </div>
            </div>
          ))}
        </Space>
      )}

      <Form form={formCreateMessage} onFinish={handleCreate}>
        <p>Текст сообщения:</p>
        <Form.Item
          name={INPUT_MESSAGE_NAME}
          rules={[
            {
              required: true,
              message: 'Введите текст сообщения',
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="threadMain__submitBtn"
          >
            Отправить
          </Button>

          {isCreateLoading ? <Spin /> : null}
        </Form.Item>
      </Form>
    </div>
  );
};
