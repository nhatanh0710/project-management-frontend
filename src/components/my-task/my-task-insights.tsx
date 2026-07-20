'use client';

import { Card } from 'antd';

import {
  CrownOutlined,
  FireOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

import { useMyTask } from '@/contexts/my-task.context';

import styles from './styles.module.scss';

export default function MyTaskInsights() {
  const { summary } = useMyTask();

  const items = [
    {
      title: 'Leader Tasks',
      value: summary.leader_tasks,
      icon: <CrownOutlined />,
    },
    {
      title: 'Due Today',
      value: summary.due_today,
      icon: <CalendarOutlined />,
    },
    {
      title: 'High Priority',
      value: summary.high_priority,
      icon: <FireOutlined />,
    },
    {
      title: 'Remaining Hours',
      value: `${summary.remaining_hours}h`,
      icon: <ClockCircleOutlined />,
    },
  ];

  return (
    <div className={styles.insightGrid}>
      {items.map((item) => (
        <Card
          key={item.title}
          className={styles.insightCard}
        >
          <div className={styles.insightIcon}>
            {item.icon}
          </div>

          <div>
            <div className={styles.insightValue}>
              {item.value}
            </div>

            <div className={styles.insightLabel}>
              {item.title}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}