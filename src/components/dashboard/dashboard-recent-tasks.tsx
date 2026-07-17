'use client';

import Link from 'next/link';

import {
  Button,
  Card,
  Empty,
} from 'antd';

import TaskPriorityTag from '@/components/task/common/task-priority-tag';
import TaskStatusTag from '@/components/task/common/task-status-tag';

import styles from './styles.module.scss';

interface Props {
  tasks: any[];
}

export default function DashboardRecentTasks({
  tasks,
}: Props) {
  if (!tasks.length) {
    return (
      <Card
        title="Recent Tasks"
        className={styles.sectionCard}
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No recent tasks"
        />
      </Card>
    );
  }

  return (
    <Card
      title="Recent Tasks"
      className={styles.sectionCard}
    >
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div
            key={task._id}
            className={styles.taskCard}
          >
            <div className={styles.taskHeader}>
              <div>
                <Link
                  href={`/user/task/${task._id}`}
                  className={styles.taskTitle}
                >
                  {task.title}
                </Link>

                <div className={styles.taskProject}>
                  {task.project_id?.name}
                </div>
              </div>

              <TaskStatusTag
                status={task.status}
              />
            </div>

            <div className={styles.taskFooter}>
              <div className={styles.taskMeta}>
                <TaskPriorityTag
                  priority={task.priority}
                />

                {task.dueDate && (
                  <span className={styles.taskDue}>
                    Due{' '}
                    {new Date(
                      task.dueDate,
                    ).toLocaleDateString()}
                  </span>
                )}
              </div>

              <Link
                href={`/user/task/${task._id}`}
              >
                <Button
                  type="link"
                  size="small"
                >
                  View →
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}