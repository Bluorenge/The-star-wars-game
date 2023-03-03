import { Table, Typography } from 'antd';
import { Layout } from 'layouts/Layout';
import { en } from 'translations';
import { data } from './mock';

import './Leaderboard.scss';

const columns = [
  {
    title: en['leaderboard.table.name'],
    dataIndex: 'name',
  },
  {
    title: en['leaderboard.table.score'],
    dataIndex: 'score',
  },
];

export const LeaderboardPage = () => {
  return (
    <div>
      <Layout>
        <section className="leaderboard">
          <div className="leaderboard__wrapper">
            <Typography.Title className="leaderboard__title">
              {en['leaderboard.title']}
            </Typography.Title>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              rowKey="key"
            />
          </div>
        </section>
      </Layout>
    </div>
  );
};
