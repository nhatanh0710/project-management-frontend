'use client';

import { Tag } from 'antd';

import { TaskStatus } from '@/types/task.type';

interface Props {
  status: TaskStatus;
}

export default function TaskStatusTag({
  status,
}: Props) {
  switch (status) {
    case TaskStatus.TODO:
      return (
        <Tag color="default">
          Todo
        </Tag>
      );

    case TaskStatus.IN_PROGRESS:
      return (
        <Tag color="processing">
          In Progress
        </Tag>
      );

    case TaskStatus.REVIEW:
      return (
        <Tag color="warning">
          Review
        </Tag>
      );

    case TaskStatus.DONE:
      return (
        <Tag color="success">
          Done
        </Tag>
      );

    default:
      return (
        <Tag>
          {status}
        </Tag>
      );
  }
}