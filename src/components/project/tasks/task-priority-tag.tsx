'use client';

import { Tag } from 'antd';

import { TaskPriority } from '@/types/task.type';

interface Props {
  priority: TaskPriority;
}

export default function TaskPriorityTag({
  priority,
}: Props) {
  switch (priority) {
    case TaskPriority.LOW:
      return (
        <Tag color="green">
          Low
        </Tag>
      );

    case TaskPriority.MEDIUM:
      return (
        <Tag color="gold">
          Medium
        </Tag>
      );

    case TaskPriority.HIGH:
      return (
        <Tag color="orange">
          High
        </Tag>
      );

    case TaskPriority.URGENT:
      return (
        <Tag color="red">
          Urgent
        </Tag>
      );

    default:
      return (
        <Tag>
          {priority}
        </Tag>
      );
  }
}