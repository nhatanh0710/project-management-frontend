'use client';

import { Row, Col, Skeleton } from 'antd';

import { useDashboard } from '@/contexts/project-dashboard.context';
import { useCurrentProject } from '@/contexts/current-project.context';

import ProjectProgress from '../common/project-progress';

import DashboardStatCard from './dashboard-stat-card';
import DashboardRecentTask from './dashboard-recent-task';
import styles from './styles.module.scss';

export default function DashboardOverview() {
  const {
    statistics,
    loading,
  } = useDashboard();

  const { project } =
    useCurrentProject();

  if (loading || !statistics || !project) {
    return <Skeleton active />;
  }

  return (
    <div className={styles.dashboard}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <DashboardStatCard
            title="Total Tasks"
            value={statistics.total}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <DashboardStatCard
            title="Todo"
            value={statistics.todo}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <DashboardStatCard
            title="In Progress"
            value={
              statistics.in_progress
            }
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <DashboardStatCard
            title="Review"
            value={statistics.review}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <DashboardStatCard
            title="Done"
            value={statistics.done}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <DashboardStatCard
            title="Overdue"
            value={statistics.overdue}
          />
        </Col>
      </Row>

      <div
        className={
          styles.progressSection
        }
      >
        <ProjectProgress
          progress={
            project.progress
          }
          status={project.status}
        />
      </div>

      <div
        className={
          styles.recentTaskSection
        }
      >
        <DashboardRecentTask />
      </div>
    </div>
  );
}