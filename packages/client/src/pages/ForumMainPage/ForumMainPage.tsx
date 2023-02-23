import { Typography, Col, Row, Space, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { AddTopicModal } from 'components/Forum/AddTopicModal';
import './ForumMainPage.scss';

import { forums } from './mock';

const { Title, Link } = Typography;
const plusCircleOutlinedIcon = (
  <PlusCircleOutlined
    style={{
      display: 'flex',
      justifyContent: 'center',
      fontSize: 16,
    }}
  />
);

export const ForumMainPage = () => {
  const [isModalAddTopicOpen, setIsModalAddTopicOpen] =
    useState<boolean>(false);

  const toggleOpenModalCreateTopic = () => {
    setIsModalAddTopicOpen((prevState) => !prevState);
  };

  return (
    <div className="forumPage">
      <Title style={{ marginTop: 0 }}>Форум</Title>

      <Space direction="vertical" size={20} style={{ display: 'flex' }}>
        <Row gutter={[20, 50]}>
          <Col span={19}>
            <Title level={4}>Форумы</Title>
          </Col>

          <Col span={3}>
            <Title level={4} className="text-center">
              Темы
            </Title>
          </Col>

          <Col span={2}>
            <Title level={4} className="text-center">
              Ответы
            </Title>
          </Col>
        </Row>

        {forums.map((topic) => (
          <Row key={topic.id} align="middle" gutter={[20, 50]}>
            <Col span={19}>
              <Link>{topic.title}</Link>
            </Col>

            <Col span={3}>
              <div className="forumPage__topicQuantityWrap">
                <span className="forumPage__topicQuantity">
                  {topic.topicQuantity}
                </span>

                <Button
                  type="primary"
                  shape="circle"
                  icon={plusCircleOutlinedIcon}
                  onClick={toggleOpenModalCreateTopic}
                />
              </div>
            </Col>

            <Col span={2}>
              <div className="forumPage__answerQuantity">
                {topic.answerQuantity}
              </div>
            </Col>
          </Row>
        ))}
      </Space>

      <AddTopicModal
        isModalAddTopicOpen={isModalAddTopicOpen}
        toggleOpenModalCreateTopic={toggleOpenModalCreateTopic}
      />
    </div>
  );
};
