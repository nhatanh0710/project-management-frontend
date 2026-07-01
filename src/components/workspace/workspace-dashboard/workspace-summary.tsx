'use client';

import {
  Card,
  Progress,
} from 'antd';

import { useProjectList } from '@/contexts/project-list.context';

import styles from './styles.module.scss';

export default function WorkspaceSummary() {
  const { projects } =
    useProjectList();

  const avgProgress =
    Math.round(
      projects.reduce(
        (sum, project) =>
          sum + project.progress,
        0,
      ) / (projects.length || 1),
    );

  return (
    <Card
      title="Workspace Summary"
      className={styles.card}
    >
      <div className={styles.summary}>
        <div className={styles.progress}>
          <Progress
            percent={avgProgress}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.item}>
            <span>
              Total Projects
            </span>

            <strong>
              {projects.length}
            </strong>
          </div>

          <div className={styles.item}>
            <span>
              Average Progress
            </span>

            <strong>
              {avgProgress}%
            </strong>
          </div>
        </div>
      </div>
    </Card>
  );
}