'use client';

import { Card, Tag, Typography } from 'antd';

import {
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

import { useRouter } from 'next/navigation';

import { useWorkspace } from '@/contexts/workspace.context';
import { useCurrentProject } from '@/contexts/current-project.context';

import TaskPriorityTag from '../task-priority-tag';

import type { Task } from '@/types/task.type';

import styles from './styles.module.scss';


import { TaskPriority, TaskStatus } from '@/types/task.type';

const statusClass = {
  [TaskStatus.TODO]: styles.todoCard,
  [TaskStatus.IN_PROGRESS]:
    styles.progressCard,
  [TaskStatus.REVIEW]:
    styles.reviewCard,
  [TaskStatus.DONE]:
    styles.doneCard,
};

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

 
  
  const openTask = () => {
    if (
      !currentWorkspace ||
      !project
    )
      return;

    router.push(
      `/user/workspace/${currentWorkspace.workspaceId._id}/project/${project._id}/tasks/${task._id}`,
    );
  };

  return (
    <Card
      hoverable
     className={`${styles.taskCard} 
     ${statusClass[task.status]}
     ${
      task.priority === TaskPriority.URGENT
        ? styles.urgentCard
        : ''
    }
     `}
     
      styles={{
        body: {
          padding: 12,
        },
      }}
      onClick={openTask}
    >
      <div className={styles.taskCardTop}>
        <Tag className={styles.taskCode}>
          {task.task_code}
        </Tag>

        <TaskPriorityTag
          priority={task.priority}
        />
      </div>

      <Text className={styles.taskTitle}>
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

      <div className={styles.taskFooter}>
        <span>
          <ClockCircleOutlined />
          {' '}
          {task.estimate_time}h
        </span>

        <span>
          <CalendarOutlined />
          {' '}
          {task.deadline
            ? new Date(
                task.deadline,
              ).toLocaleDateString()
            : '--'}
        </span>
      </div>
    </Card>
  );
}