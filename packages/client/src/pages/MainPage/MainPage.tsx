import { FC, useEffect } from 'react';

import { Welcome } from 'components/Welcome';
import { Layout } from 'layouts/Layout';

export const MainPage: FC = () => {
  return (
    <>
      <Layout />
      <Welcome />
    </>
  );
};
