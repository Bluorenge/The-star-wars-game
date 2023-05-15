import { FC, ReactNode } from 'react';
import { theme } from 'antd';

import { Header } from 'components/Header';

export const Layout: FC<{ className?: string; children: ReactNode }> = ({
  className,
  children,
}) => {
  const { token } = theme.useToken();

  return (
    <div
      className={className}
      style={{ background: token.colorBgContainer, height: '100vh' }}
    >
      <Header />
      {children}
    </div>
  );
};
