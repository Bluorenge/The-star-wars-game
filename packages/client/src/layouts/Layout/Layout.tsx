import { FC, ReactNode } from 'react';
import { theme } from 'antd';

import { Header } from 'components/Header';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = theme.useToken();

  return (
    <div style={{ background: token.colorBgContainer, height: '100vh' }}>
      <Header />
      {children}
    </div>
  );
};
