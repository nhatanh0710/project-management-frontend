'use client';

import dayjs from 'dayjs';
import { Card, Skeleton } from 'antd';

import { useDashboard } from '@/contexts/dashboard.context';

import DashboardStatistics from './dashboard-statistics';
import DashboardProjectSummary from './dashboard-project-summary';
import DashboardRecentProjects from './dashboard-recent-projects';
import DashboardRecentTasks from './dashboard-recent-tasks';

import styles from './styles.module.scss';

export default function DashboardOverview() {
  const { dashboard, loading } = useDashboard();

  if (loading || !dashboard) {
    return <Skeleton active />;
  }

  return (
    <div className={styles.dashboard}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>
            🤖 AI PROJECT MANAGEMENT
          </span>

          <h1 className={styles.heroTitle}>
            Dashboard
          </h1>

          <p className={styles.heroDescription}>
            Manage your projects smarter with AI-powered insights,
            real-time collaboration and intelligent task tracking.
          </p>

          <div className={styles.heroFooter}>
            <span>AI Monitoring Enabled</span>
            <span>•</span>
            <span>
              {dashboard.statistics.owned_projects +
                dashboard.statistics.joined_projects}{' '}
              Active Projects
            </span>
            <span>•</span>
            <span>
              {dashboard.statistics.overdue_tasks} Overdue Tasks
            </span>
          </div>
        </div>

        <div className={styles.heroDate}>
          <span className={styles.heroDay}>
            {dayjs().format('dddd')}
          </span>

          <span className={styles.heroFullDate}>
            {dayjs().format('DD MMM YYYY')}
          </span>
        </div>
      </section>

      <DashboardStatistics
        statistics={dashboard.statistics}
      />

      <section className={styles.mainGrid}>
        <DashboardProjectSummary
          summary={dashboard.project_summary}
        />

        <DashboardRecentTasks
          tasks={dashboard.recent_tasks}
        />

        <DashboardRecentProjects
          projects={dashboard.recent_projects}
        />

        <Card className={styles.aiCard}>
          <div className={styles.aiHeader}>
            ✨ AI Insight
          </div>

          <p className={styles.aiDescription}>
            AI analysis will appear here after enough project
            activity has been collected.
          </p>

          <ul className={styles.aiList}>
            <li>Project delay prediction</li>
            <li>Member workload analysis</li>
            <li>Task priority suggestions</li>
            <li>Smart assignment recommendations</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}