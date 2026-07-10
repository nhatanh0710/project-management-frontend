'use client';

import {
  Card,
  Space,
  Tag,
  Typography,
} from 'antd';

import {
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

import type { Task } from '@/types/task.type';

import TaskPriorityTag from '../task-priority-tag';

import styles from '../styles.module.scss';

import { useRouter } from 'next/navigation';

import { useWorkspace } from '@/contexts/workspace.context';
import { useCurrentProject } from '@/contexts/current-project.context';

const { Text, Paragraph } =
  Typography;

  
interface Props {
  task: Task;
}

export default function TaskCard({
  task,
}: Props) {
 
    const router = useRouter();

const { currentWorkspace } =
  useWorkspace();

const { project } =
  useCurrentProject();

  return (
    <Card
      hoverable
      className={styles.taskCard}
      styles={{
        body: {
          padding: 16,
        },
      }}
      onClick={() => {
  if (!currentWorkspace || !project) return;

  router.push(
    `/user/workspace/${currentWorkspace.workspaceId._id}/project/${project._id}/tasks/${task._id}`,
  );
}}
    >
      <Space
        style={{
          width: '100%',
          justifyContent:
            'space-between',
          marginBottom: 12,
        }}
      >
        <Tag>{task.task_code}</Tag>

        <TaskPriorityTag
          priority={task.priority}
        />
      </Space>

      <Text
        strong
        className={styles.taskTitle}
      >
        {task.title}
      </Text>

      <Paragraph
        ellipsis={{
          rows: 2,
        }}
        className={
          styles.taskDescription
        }
      >
        {task.description ||
          'No description'}
      </Paragraph>

      <div className={styles.taskMeta}>
        <Space orientation="vertical">
          <Text type="secondary">
            <ClockCircleOutlined />{' '}
            Estimate:{' '}
            {task.estimate_time}h
          </Text>

          <Text type="secondary">
            <CalendarOutlined />{' '}
            {task.deadline
              ? new Date(
                  task.deadline,
                ).toLocaleDateString()
              : 'No deadline'}
          </Text>
        </Space>
      </div>
    </Card>
  );
}