import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Typography, Button, Col, Row, Space } from 'antd';

import { ForumsListItem } from 'components/Forum/ForumsListItem';
import { ForumCreateModal } from 'components/Forum/ForumCreateModal';
import { Loader } from 'components-ui/Loader';
import { ForumModel } from 'models/forum.model';
import { useAppSelector } from 'hooks/useAppSelector';

import './ForumsMain.scss';

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

export const ForumsMain: React.FC = () => {
  const { formatMessage: fm } = useIntl();
  const { forums, loading } = useAppSelector((state) => state.forum);

  const [isCreateModalOpen, setisCreateModalOpen] = useState<boolean>(false);

  const toggleOpenCreateModal = () => {
    setisCreateModalOpen((prevState) => !prevState);
  };

  return (
    <Loader loading={loading} spinning>
      <div className="forumsMain">
        <Typography.Title className="forumsMain__title">
          {fm(messages.titleMain)}
        </Typography.Title>

        <Space
          direction="vertical"
          size={20}
          className="forumsMain__mainContentWrap"
        >
          {forums.length !== 0 && (
            <>
              <Row gutter={[20, 50]}>
                <Col span={19}>
                  <Typography.Title level={4} className="forumsMain__colTitle">
                    {fm(messages.titleColumnForums)}
                  </Typography.Title>
                </Col>

                <Col span={3}>
                  <Typography.Title
                    level={4}
                    className="forumsMain__colTitle forumsMain__colTitle_centered"
                  >
                    {fm(messages.titleColumnTopics)}
                  </Typography.Title>
                </Col>

                <Col span={2}>
                  <Typography.Title
                    level={4}
                    className="forumsMain__colTitle forumsMain__colTitle_centered"
                  >
                    {fm(messages.titleColumnReplies)}
                  </Typography.Title>
                </Col>
              </Row>

              {forums.map((thread: ForumModel, index: number) => (
                <ForumsListItem key={index} forumsListItemData={thread} />
              ))}
            </>
          )}
          <Button onClick={toggleOpenCreateModal}>Создать форум</Button>
        </Space>

        <ForumCreateModal
          isCreateModalOpen={isCreateModalOpen}
          toggleOpenCreateModal={toggleOpenCreateModal}
        />
      </div>
    </Loader>
  );
};
