import { FC, ReactNode } from 'react';
import { Spin } from 'antd';

import './Loader.scss';

interface LoaderProps {
  children: ReactNode;
  loading: boolean;
  showChildrenWhileFetching?: boolean;
  spinning?: boolean;
}

export const Loader: FC<LoaderProps> = ({
  children,
  loading,
  showChildrenWhileFetching = false,
  spinning = false,
}) => {
  return (
    <>
      {loading ? (
        <div className="loader">
          <Spin spinning={Boolean(spinning)} className="loader__spinner" />
          {showChildrenWhileFetching && (
            <div className="loader__childrenContainer">{children}</div>
          )}
        </div>
      ) : (
        children
      )}
    </>
  );
};
