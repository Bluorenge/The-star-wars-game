import { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Avatar, Table, Typography } from 'antd';
import { AlignType } from 'rc-table/lib/interface';

import { Layout } from 'layouts/Layout';
import { getAllLeaders } from 'core/store/actions/leaderboardAction';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { YANDEX_API_URL } from 'constants/main';

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
      title: 'Аватар',
      dataIndex: 'avatar',
      width: 80,
      align: 'center' as AlignType,
      render: (avatar: string) => {
        return (
          <Avatar
            size={30}
            src={avatar ? `${YANDEX_API_URL}/resources${avatar}` : undefined}
          />
        );
      },
    },
    {
      title: fm(messages.titleColumnName),
      dataIndex: 'user_name',
    },
    {
      title: fm(messages.titleColumnScore),
      dataIndex: 'score',
    },
  ];

  const dispatch = useAppDispatch();
  const { leaders, loading } = useAppSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(getAllLeaders({ ratingFieldName: 'score', cursor: 0, limit: 10 }));
  }, []);

  return (
    <Layout className="leaderboard">
      <div className="leaderboard__wrapper">
        <Typography.Title className="leaderboard__title">
          {fm(messages.titleMain)}
        </Typography.Title>

        <Table
          columns={columns}
          dataSource={leaders}
          pagination={false}
          loading={loading}
          locale={{
            emptyText: 'нет данных',
          }}
        />
      </div>
    </Layout>
  );
};
