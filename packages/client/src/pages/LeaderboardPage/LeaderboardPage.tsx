import { Layout } from 'layouts/Layout';
import { en } from 'translations';
import { Table, Typography } from 'antd';

import './Leaderboard.scss';

interface IData {
  name: string;
  score: string;
  key: number;
}

const columns = [
  {
    title: en['leaderboard.table.name'],
    dataIndex: 'name',
  },
  {
    title: 'Очки',
    dataIndex: en['leaderboard.table.score'],
  },
];

const data: IData[] = [
  {
    name: 'Example 1',
    score: '5',
    key: 1,
  },
  {
    name: 'Example 2',
    score: '4',
    key: 2,
  },
  {
    name: 'Example 3',
    score: '3',
    key: 3,
  },
  {
    name: 'Example 4',
    score: '2',
    key: 4,
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
