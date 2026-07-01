'use client';

import { Empty, Skeleton } from 'antd';

import styles from './styles.module.scss';

interface Props {
  loading?: boolean;

  empty?: boolean;

  description?: string;

  children?: React.ReactNode;
}

export default function ProjectState({
  loading,
  empty,
  description = 'No data',
  children,
}: Props) {
  if (loading) {
    return (
      <div className={styles.state}>
        <Skeleton
          active
          paragraph={{
            rows: 6,
          }}
        />
      </div>
    );
  }

  if (empty) {
    return (
      <div className={styles.state}>
        <Empty
          description={description}
        />
      </div>
    );
  }

  return <>{children}</>;
}