import { Typography, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

import { ROUTES } from 'constants/routes';
import { ForumModel } from 'models/forum.model';

import './ForumsListItem.scss';

export const ForumsListItem: React.FC<{ forumsListItemData: ForumModel }> = ({
  forumsListItemData,
}) => {
  return (
    <Row key={forumsListItemData.id} align="middle" gutter={[20, 50]}>
      <Col span={19}>
        <Link to={`${ROUTES.FORUM_MAIN_PAGE_PATH}/${forumsListItemData.id}`}>
          <Typography.Text>{forumsListItemData.title}</Typography.Text>
        </Link>
      </Col>

      <Col span={3}>
        <div className="forumsListItem__topicQuantityWrap">
          <span className="forumsListItem__topicQuantity">
            {forumsListItemData.threadCount}
          </span>
        </div>
      </Col>

      <Col span={2}>
        <div className="forumsListItem__answerQuantity">
          {forumsListItemData.messageCount}
        </div>
      </Col>
    </Row>
  );
};
