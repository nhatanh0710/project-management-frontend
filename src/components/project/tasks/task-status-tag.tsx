'use client';

import { Tag } from 'antd';

import { TaskStatus } from '@/types/task.type';

import styles from './styles.module.scss';

interface Props {
  status: TaskStatus;
}

const labels: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: 'To Do',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.REVIEW]: 'Review',
  [TaskStatus.DONE]: 'Done',
};

export default function TaskStatusTag({
  status,
}: Props) {
  return (
    <Tag
      className={`${styles.tag} ${styles[status]}`}
    >
      {labels[status]}
    </Tag>
  );
}