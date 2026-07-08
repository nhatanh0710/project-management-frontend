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
        size={10}
        //dùng size nhỏ hơn để hiển thị thanh tiến trình mỏng hơn
        //không dùng strokeWidth vì sẽ làm cho thanh tiến trình bị cắt bớt
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