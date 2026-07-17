'use client';

import { Card } from 'antd';

import {
  ApartmentOutlined,
  CheckCircleOutlined,
  FolderOpenOutlined,
  ProjectOutlined,
  WarningOutlined,
} from '@ant-design/icons';

import type {
  DashboardStatisticsResponse,
} from '@/types/dashboard.type';

import styles from './styles.module.scss';

interface Props {
  statistics: DashboardStatisticsResponse;
}

export default function DashboardStatistics({
  statistics,
}: Props) {
  const items = [
    {
      title: 'Workspaces',
      value: statistics.total_workspaces,
      description: 'Your active workspaces',
      icon: <ApartmentOutlined />,
      color: styles.primary,
    },
    {
      title: 'Owned Projects',
      value: statistics.owned_projects,
      description: 'Projects you manage',
      icon: <ProjectOutlined />,
      color: styles.success,
    },
    {
      title: 'Joined Projects',
      value: statistics.joined_projects,
      description: 'Projects you joined',
      icon: <FolderOpenOutlined />,
      color: styles.secondary,
    },
    {
      title: 'Completed Tasks',
      value: statistics.completed_tasks,
      description: 'Finished successfully',
      icon: <CheckCircleOutlined />,
      color: styles.completed,
    },
    {
      title: 'Overdue Tasks',
      value: statistics.overdue_tasks,
      description: 'Need your attention',
      icon: <WarningOutlined />,
      color: styles.danger,
    },
  ];

  return (
    <section className={styles.statisticsGrid}>
      {items.map((item) => (
        <Card
          key={item.title}
          className={styles.statisticsCard}
          bordered={false}
        >
          <div className={styles.statisticsTop}>
            <div
              className={`${styles.statisticsIcon} ${item.color}`}
            >
              {item.icon}
            </div>

            <div className={styles.statisticsValue}>
              {item.value}
            </div>
          </div>

          <div className={styles.statisticsBottom}>
            <div className={styles.statisticsTitle}>
              {item.title}
            </div>

            <div className={styles.statisticsDescription}>
              {item.description}
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
}