'use client';

import MyTaskStatistics from '@/components/my-task/my-task-statistics';
import MyTaskFilter from '@/components/my-task/my-task-filter';
import MyTaskTable from '@/components/my-task/my-task-table';
import MyTaskInsights from '@/components/my-task/my-task-insights';
import { useMyTask } from '@/contexts/my-task.context';

import styles from '@/components/my-task/styles.module.scss';

export default function Page() {
  const { loading } = useMyTask();

  return (
    <div className={styles.page}>
      {/* ================= HEADER ================= */}

      <div className={styles.header}>
        <div>
          <h2>My Tasks</h2>

          <p>
            Manage and track every task assigned to you.
          </p>
        </div>
      </div>

      {/* ================= STATISTICS ================= */}

      <MyTaskStatistics />

        <MyTaskInsights/>

      {/* ================= FILTER ================= */}

      <MyTaskFilter />

      {/* ================= TABLE ================= */}

      <MyTaskTable loading={loading} />
    </div>
  );
}