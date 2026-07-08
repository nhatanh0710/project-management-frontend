'use client';

import { Tag } from 'antd';
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

        <div className={styles.meta}>
          <ProjectStatusTag
            status={project.status}
          />

          <Tag>
            {project.progress}% Complete
          </Tag>

          {project.start_day && (
            <Tag icon={<CalendarOutlined />}>
              {new Date(
                project.start_day,
              ).toLocaleDateString()}
            </Tag>
          )}

          {project.deadline && (
            <Tag icon={<ClockCircleOutlined />}>
              {new Date(
                project.deadline,
              ).toLocaleDateString()}
            </Tag>
          )}
        </div>

        {project.description && (
          <p className={styles.description}>
            {project.description}
          </p>
        )}
      </div>
    </div>
  );
}