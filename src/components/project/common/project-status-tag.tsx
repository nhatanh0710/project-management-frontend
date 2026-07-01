'use client';

import { Tag } from 'antd';

import { ProjectStatus } from '@/types/project.type';

interface Props {
  status: ProjectStatus;
}

export default function ProjectStatusTag({
  status,
}: Props) {
  switch (status) {
    case ProjectStatus.PLANNING:
      return (
        <Tag color="default">
          Planning
        </Tag>
      );

    case ProjectStatus.IN_PROGRESS:
      return (
        <Tag color="processing">
          In Progress
        </Tag>
      );

    case ProjectStatus.COMPLETED:
      return (
        <Tag color="success">
          Completed
        </Tag>
      );

    case ProjectStatus.ON_HOLD:
      return (
        <Tag color="warning">
          On Hold
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