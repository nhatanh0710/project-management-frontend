'use client';

import Link from 'next/link';

import {
  Table,
  Tag,
  Tooltip,
} from 'antd';

import {
  CalendarOutlined,
} from '@ant-design/icons';

import { useMyTask } from '@/contexts/my-task.context';

import TaskPriorityTag from '@/components/task/common/task-priority-tag';
import TaskStatusTag from '@/components/task/common/task-status-tag';

import styles from './styles.module.scss';

interface Props {
  loading: boolean;
}

export default function MyTaskTable({
  loading,
}: Props) {
  const {
    tasks,
    pagination,
    changePage,
  } = useMyTask();

  const today = new Date();

  return (
    <Table
      rowKey="_id"
      loading={loading}
      className={styles.table}
      dataSource={tasks}
      pagination={{
        current: pagination.page,
        pageSize: pagination.limit,
        total: pagination.total,
        showSizeChanger: true,
        onChange: changePage,
      }}
      columns={[
        {
          title: 'Task',
          dataIndex: 'title',
          ellipsis: true,
          render: (_, task: any) => (
            <Link
              href={`/user/workspace/${task.project_id.workspace_id}/project/${task.project_id._id}/tasks/${task._id}`}
              className={styles.taskLink}
            >
              {task.title}
            </Link>
          ),
        },

        {
          title: 'Project',
          width: 220,
          render: (_, task: any) =>
            task.project_id ? (
              <Link
                href={`/user/workspace/${task.project_id.workspace_id}/project/${task.project_id._id}`}
                className={styles.projectLink}
              >
                {task.project_id.name}
              </Link>
            ) : (
              '-'
            ),
        },

        {
          title: 'Priority',
          width: 140,
          align: 'center',
          render: (_, task: any) => (
            <TaskPriorityTag
              priority={task.priority}
            />
          ),
        },

        {
          title: 'Status',
          width: 150,
          align: 'center',
          render: (_, task: any) => (
            <TaskStatusTag
              status={task.status}
            />
          ),
        },

        {
          title: 'Deadline',
          width: 180,
          sorter: false,
          render: (_, task: any) => {
            if (!task.deadline) {
              return <Tag>-</Tag>;
            }

            const deadline =
              new Date(task.deadline);

            const isToday =
              deadline.toDateString() ===
              today.toDateString();

            const isOverdue =
              deadline < today &&
              task.status !== 'done';

            return (
              <Tooltip
                title={deadline.toLocaleString()}
              >
                <div
                  className={
                    isOverdue
                      ? styles.overdue
                      : isToday
                      ? styles.today
                      : styles.normal
                  }
                >
                  <CalendarOutlined />

                  <span>
                    {deadline.toLocaleDateString()}
                  </span>
                </div>
              </Tooltip>
            );
          },
        },
      ]}
    />
  );
}