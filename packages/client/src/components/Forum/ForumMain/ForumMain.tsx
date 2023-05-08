import { defineMessages, useIntl } from 'react-intl';
import { Typography, Button, Col, Row, Space } from 'antd';

import { ForumListItem } from 'components/Forum/ForumListItem';
import { Loader } from 'components/ui/Loader';
import { ThreadModel } from 'models/forum.model';
import { useAppSelector } from 'hooks/useAppSelector';

import './ForumMain.scss';

const messages = defineMessages({
  titleMain: { id: 'forum.main-title', defaultMessage: 'Forum' },
  titleColumnForums: {
    id: 'forum.main-page.col-title.forums',
    defaultMessage: 'Forums',
  },
  titleColumnReplies: {
    id: 'forum.main-page.col-title.replies',
    defaultMessage: 'Replies',
  },
});

export const ForumMain: React.FC<{ onCreateBtnClick: () => void }> = ({
  onCreateBtnClick,
}) => {
  const { formatMessage: fm } = useIntl();
  const { forum, loading } = useAppSelector((state) => state.forum);

  return (
    <Loader loading={loading} spinning>
      <div className="forumMain">
        <Typography.Title className="forumMain__title">
          {fm(messages.titleMain)} {forum?.title}
        </Typography.Title>

        <Space
          direction="vertical"
          size={20}
          className="forumMain__mainContentWrap"
        >
          {forum?.threads?.length !== 0 && (
            <>
              <Row gutter={[20, 50]}>
                <Col span={20}>
                  <Typography.Title level={4} className="forumMain__colTitle">
                    {fm(messages.titleColumnForums)}
                  </Typography.Title>
                </Col>

                <Col span={4}>
                  <Typography.Title
                    level={4}
                    className="forumMain__colTitle forumMain__colTitle_centered"
                  >
                    {fm(messages.titleColumnReplies)}
                  </Typography.Title>
                </Col>
              </Row>

              {forum?.threads?.map((thread: ThreadModel, index: number) => (
                <ForumListItem key={index} forumListItemData={thread} />
              ))}
            </>
          )}

          <Button onClick={onCreateBtnClick}>Создать тред</Button>
        </Space>
      </div>
    </Loader>
  );
};
