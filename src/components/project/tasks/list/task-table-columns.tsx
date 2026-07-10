'use client';

import { Space, Tag, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { Task } from '@/types/task.type';

import TaskPriorityTag from '../task-priority-tag';
import TaskStatusTag from '../task-status-tag';

const { Text } = Typography;
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/contexts/workspace.context";
import { useCurrentProject } from "@/contexts/current-project.context";

export function useTaskTableColumns(): ColumnsType<Task> {
    const router = useRouter();

    const { currentWorkspace } =
        useWorkspace();

    const { project } =
        useCurrentProject();

    return [
        {
    title: 'Code',
    dataIndex: 'task_code',
    width: 110,
    render: (value: string) => (
      <Tag>{value}</Tag>
    ),
  },

  {
    title: 'Title',
    dataIndex: 'title',
    render: (_, task) => (
    <div
        style={{
            cursor: "pointer",
        }}
        onClick={() => {
            if (!currentWorkspace || !project)
                return;

            router.push(
                `/user/workspace/${currentWorkspace.workspaceId._id}/project/${project._id}/tasks/${task._id}`,
            );
        }}
    >
        <Text strong>{task.title}</Text>

        <br />

        <Text type="secondary">
          {task.description ||
            'No description'}
        </Text>
      </div>
    ),
  },

  {
    title: 'Status',
    dataIndex: 'status',
    width: 140,
    render: (status) => (
      <TaskStatusTag
        status={status}
      />
    ),
  },

  {
    title: 'Priority',
    dataIndex: 'priority',
    width: 130,
    render: (priority) => (
      <TaskPriorityTag
        priority={priority}
      />
    ),
  },

  {
    title: 'Estimate',
    dataIndex: 'estimate_time',
    width: 120,
    render: (value: number) =>
      `${value} h`,
  },

  {
    title: 'Deadline',
    dataIndex: 'deadline',
    width: 150,
    render: (value?: string) =>
      value ? (
        <Space>
          <CalendarOutlined />
          {new Date(
            value,
          ).toLocaleDateString()}
        </Space>
      ) : (
        '--'
      ),
  },
];
}