import { useState } from 'react';
import { Typography, Col, Row, Space, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { defineMessages, useIntl } from 'react-intl';

import { Layout } from 'layouts/Layout';
import { ForumAddTopicModal } from 'components/Forum/ForumAddTopicModal';
import { ForumListItem } from 'models/forum.model';
import { forums } from './mock';

import './ForumMainPage.scss';

const messages = defineMessages({
  titleMain: { id: 'forum.main-title', defaultMessage: 'Forum' },
  titleColumnForums: {
    id: 'forum.main-page.col-title.forums',
    defaultMessage: 'Forums',
  },
  titleColumnTopics: {
    id: 'forum.main-page.col-title.topics',
    defaultMessage: 'Topics',
  },
  titleColumnReplies: {
    id: 'forum.main-page.col-title.replies',
    defaultMessage: 'Replies',
  },
});

export const ForumMainPage = () => {
  const { formatMessage: fm } = useIntl();

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
      <Layout></Layout>

      <Typography.Title className="forumPage__title">
        {fm(messages.titleMain)}
      </Typography.Title>

      <Space
        direction="vertical"
        size={20}
        className="forumPage__mainContentWrap"
      >
        <Row gutter={[20, 50]}>
          <Col span={19}>
            <Typography.Title level={4} className="forumPage__colTitle">
              {fm(messages.titleColumnForums)}
            </Typography.Title>
          </Col>

          <Col span={3}>
            <Typography.Title
              level={4}
              className="forumPage__colTitle forumPage__colTitle_centered"
            >
              {fm(messages.titleColumnTopics)}
            </Typography.Title>
          </Col>

          <Col span={2}>
            <Typography.Title
              level={4}
              className="forumPage__colTitle forumPage__colTitle_centered"
            >
              {fm(messages.titleColumnReplies)}
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
