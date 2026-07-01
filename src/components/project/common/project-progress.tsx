'use client';

import { Progress } from 'antd';

import ProjectStatusTag from './project-status-tag';

import styles from './styles.module.scss';

interface Props {
  progress: number;
  status: string;
}

export default function ProjectProgress({
  progress,
  status,
}: Props) {
  return (
    <div>
      <Progress
        percent={progress}
        strokeWidth={10}
      />

      <div
        style={{
          marginTop: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>
          {progress}% Completed
        </span>

        <ProjectStatusTag
          status={status as any}
        />
      </div>
    </div>
  );
}