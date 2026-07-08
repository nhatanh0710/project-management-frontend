'use client';

import { Card, Statistic } from 'antd';

import styles from './styles.module.scss';

interface Props {
  title: string;

  value: number;

  color?: string;
}

export default function DashboardStatCard({
  title,
  value,
  color,
}: Props) {
  return (
    <Card className={styles.statCard}>
      <Statistic
        title={title}
        value={value}
        styles={{
    content: {
      color,
    },
  }}
      />
    </Card>
  );
}