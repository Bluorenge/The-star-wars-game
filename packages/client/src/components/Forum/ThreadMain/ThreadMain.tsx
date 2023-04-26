import { useState } from 'react';
import { Typography, Button, Space, Form, Input, Spin } from 'antd';

import { createMessage } from 'app/actions/forumActions';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { INPUT_MESSAGE_NAME } from 'constants/forum';

import './ThreadMain.scss';

export const ThreadMain: React.FC = () => {
  const dispatch = useAppDispatch();
  const { thread } = useAppSelector((state) => state.forum);
  const { login } = useAppSelector((state) => state.user.currentUser);

  const [formCreateMessage] = Form.useForm();
  const { TextArea } = Input;
  const [isCreateLoading, setIsCreateLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    setIsCreateLoading(true);

    try {
      const messageText = formCreateMessage.getFieldValue(INPUT_MESSAGE_NAME);

      await dispatch(
        createMessage({
          nickname: login,
          message: messageText,
          threadId: thread.id,
        })
      );
    } finally {
      setIsCreateLoading(false);
    }
  };

  return (
    <div className="forumsMain">
      <Typography.Title className="forumsMain__title">
        Тема "{thread?.name}"
      </Typography.Title>

      <Space
        direction="vertical"
        size={20}
        className="forumsMain__mainContentWrap"
      >
        <Form form={formCreateMessage} onFinish={handleCreate}>
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
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
            {isCreateLoading ? <Spin /> : null}
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};
