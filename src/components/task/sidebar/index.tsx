'use client';

import { useCurrentProject } from '@/contexts/current-project.context';
import { useCurrentTask } from '@/contexts/current-task.context';

import TaskExplorer from './task-explorer';
import TaskProjectCard from './task-project-card';

import styles from './styles.module.scss';

export default function TaskSidebar() {
  const { project } = useCurrentProject();
  const { task } = useCurrentTask();

  if (!project || !task) {
    return null;
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarCard}>
        <TaskProjectCard />

        <div className={styles.divider} />

        <TaskExplorer />
      </div>
    </aside>
  );
}