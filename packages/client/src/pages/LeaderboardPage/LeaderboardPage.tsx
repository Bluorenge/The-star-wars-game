import { defineMessages, useIntl } from 'react-intl';
import { Table, Typography } from 'antd';
import { data } from './mock';

import './Leaderboard.scss';

const messages = defineMessages({
  titleMain: { id: 'leaderboard.main-title', defaultMessage: 'Leaderboard' },
  titleColumnName: {
    id: 'leaderboard.table.col-title.name',
    defaultMessage: 'Name',
  },
  titleColumnScore: {
    id: 'leaderboard.table.col-title.score',
    defaultMessage: 'Score',
  },
});

export const LeaderboardPage = () => {
  const { formatMessage: fm } = useIntl();

  const columns = [
    {
      title: fm(messages.titleColumnName),
      dataIndex: 'name',
    },
    {
      title: fm(messages.titleColumnScore),
      dataIndex: 'score',
    },
  ];

  return (
    <div>
      <section className="leaderboard">
        <div className="leaderboard__wrapper">
          <Typography.Title className="leaderboard__title">
            {fm(messages.titleMain)}
          </Typography.Title>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="key"
          />
        </div>
      </section>
    </div>
  );
};
