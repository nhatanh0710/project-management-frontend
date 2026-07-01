'use client';

import { Tag, Progress } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

import { useCurrentProject } from '@/contexts/current-project.context';

import ProjectStatusTag from './project-status-tag';

import styles from './styles.module.scss';

export default function ProjectHeader() {
  const { project } = useCurrentProject();

  if (!project) return null;

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>
          {project.name}
        </h1>

        <p className={styles.description}>
          {project.description ||
            'No description'}
        </p>

        <div className={styles.meta}>
          <ProjectStatusTag
            status={project.status}
          />

          <Tag>
            Progress {project.progress}%
          </Tag>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.dateItem}>
          <CalendarOutlined />

          <div>
            <span>Start</span>

            <strong>
              {project.start_day
                ? new Date(
                    project.start_day,
                  ).toLocaleDateString()
                : '--'}
            </strong>
          </div>
        </div>

        <div className={styles.dateItem}>
          <ClockCircleOutlined />

          <div>
            <span>Deadline</span>

            <strong>
              {project.deadline
                ? new Date(
                    project.deadline,
                  ).toLocaleDateString()
                : '--'}
            </strong>
          </div>
        </div>

        <div className={styles.progressBox}>
          <Progress
            percent={project.progress}
            strokeWidth={8}
          />
        </div>
      </div>
    </div>
  );
}