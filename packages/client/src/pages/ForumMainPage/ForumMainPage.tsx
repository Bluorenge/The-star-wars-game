import { Typography, Col, Row, Space, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { ForumAddTopicModal } from 'components/Forum/ForumAddTopicModal';
import { en } from 'translations';
import './ForumMainPage.scss';

import { forums } from './mock';
import { ForumListItem } from 'models/forum.model';

export const ForumMainPage = () => {
  const [isForumAddTopicModalOpen, setIsForumAddTopicModalOpen] =
    useState<boolean>(false);
  const [selectedForum, setSelectedForum] = useState<ForumListItem | null>(
    null
  );

  const toggleOpenModalCreateTopic = () => {
    setIsForumAddTopicModalOpen((prevState) => !prevState);
  };

  return (
    <div className="forumPage">
      <Typography.Title className="forumPage__title">
        {en['forum.main-title']}
      </Typography.Title>

      <Space
        direction="vertical"
        size={20}
        className="forumPage__mainContentWrap"
      >
        <Row gutter={[20, 50]}>
          <Col span={19}>
            <Typography.Title level={4} className="forumPage__colTitle">
              {en['forum.main-page.col-title.forums']}
            </Typography.Title>
          </Col>

          <Col span={3}>
            <Typography.Title
              level={4}
              className="forumPage__colTitle forumPage__colTitle--centered"
            >
              {en['forum.main-page.col-title.topics']}
            </Typography.Title>
          </Col>

          <Col span={2}>
            <Typography.Title
              level={4}
              className="forumPage__colTitle forumPage__colTitle--centered"
            >
              {en['forum.main-page.col-title.answers']}
            </Typography.Title>
          </Col>
        </Row>

        {forums.map((topic) => (
          <Row key={topic.id} align="middle" gutter={[20, 50]}>
            <Col span={19}>
              <Typography.Link>{topic.title}</Typography.Link>
            </Col>

            <Col span={3}>
              <div className="forumPage__topicQuantityWrap">
                <span className="forumPage__topicQuantity">
                  {topic.topicQuantity}
                </span>

                <Button
                  type="primary"
                  shape="circle"
                  icon={
                    <PlusCircleOutlined className="forumPage__addBtnIcon" />
                  }
                  onClick={() => {
                    toggleOpenModalCreateTopic();
                    setSelectedForum(topic);
                  }}
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

      <ForumAddTopicModal
        selectedForum={selectedForum}
        isForumAddTopicModalOpen={isForumAddTopicModalOpen}
        toggleOpenModalCreateTopic={toggleOpenModalCreateTopic}
      />
    </div>
  );
};
