import { Typography, Modal, Input, Space } from 'antd';
import { useState } from 'react';
import { AddTopicModalProps } from 'models/forum.model';

const { Title, Text } = Typography;

export const AddTopicModal: React.FC<AddTopicModalProps> = ({
  selectedForum,
  isModalAddTopicOpen,
  toggleOpenModalCreateTopic,
}) => {
  const [isAddTopicLoading, setIsAddTopicLoading] = useState<boolean>(false);
  const [addTopicErrorText, setAddTopicErrorText] = useState<string>('');

  const handleAddTopic = async () => {
    setIsAddTopicLoading(true);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      });

      toggleOpenModalCreateTopic();
      setAddTopicErrorText('');
    } catch {
      setAddTopicErrorText('Произошла ошибка при создании темы');
    }

    setIsAddTopicLoading(false);
  };

  return (
    <Modal
      title={
        <Title level={3} style={{ marginTop: 10, marginBottom: 20 }}>
          Добавление новой темы для форума "{selectedForum?.title}"
        </Title>
      }
      open={isModalAddTopicOpen}
      onOk={handleAddTopic}
      confirmLoading={isAddTopicLoading}
      onCancel={toggleOpenModalCreateTopic}
      okText="Добавить тему"
      cancelText="Отмена"
    >
      <Space direction="vertical" size={16} style={{ display: 'flex' }}>
        <Input placeholder="Введите название темы"></Input>
        <Text type="danger">{addTopicErrorText}</Text>
      </Space>
    </Modal>
  );
};
