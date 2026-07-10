'use client';

import { Typography } from 'antd';

import { useCurrentTask } from '@/contexts/current-task.context';

import { formatDate } from '@/utils/date';

import TaskPriorityTag from '../common/task-priority-tag';
import TaskStatusTag from '../common/task-status-tag';

import styles from './styles.module.scss';

const { Title, Text } = Typography;

export default function TaskInformation() {
  const { task } = useCurrentTask();

  if (!task) return null;

  return (
    <div className={styles.card}>
      <Title
        level={5}
        className={styles.cardTitle}
      >
        General Information
      </Title>

      <div className={styles.information}>
        <div className={styles.row}>
          <Text className={styles.label}>Status</Text>

          <TaskStatusTag status={task.status} />
        </div>

        <div className={styles.row}>
          <Text className={styles.label}>Priority</Text>

          <TaskPriorityTag priority={task.priority} />
        </div>

        <div className={styles.row}>
          <Text className={styles.label}>
            Estimate Time
          </Text>

          <Text>{task.estimate_time} h</Text>
        </div>

        <div className={styles.row}>
          <Text className={styles.label}>
            Actual Time
          </Text>

          <Text>{task.actual_time} h</Text>
        </div>

        <div className={styles.row}>
          <Text className={styles.label}>
            Start Time
          </Text>

          <Text>{formatDate(task.start_time)}</Text>
        </div>

        <div className={styles.row}>
          <Text className={styles.label}>
            Deadline
          </Text>

          <Text>{formatDate(task.deadline)}</Text>
        </div>

        <div className={styles.row}>
          <Text className={styles.label}>
            Completed
          </Text>

          <Text>{formatDate(task.completed_at)}</Text>
        </div>
      </div>
    </div>
  );
}