'use client';

import { useRouter } from 'next/navigation';

import {
  Card,
  Empty,
  List,
  Space,
  Typography,
} from 'antd';

import {
  CalendarOutlined,
} from '@ant-design/icons';

import { useDashboard } from '@/contexts/project-dashboard.context';

import TaskPriorityTag from '../tasks/task-priority-tag';
import TaskStatusTag from '../tasks/task-status-tag';

import styles from './styles.module.scss';

const { Text } = Typography;

export default function DashboardRecentTask() {
  const router = useRouter();

  const { recentTasks } =
    useDashboard();

  return (
    <Card title="Recent Tasks">
      {recentTasks.length === 0 ? (
        <Empty
          description="No tasks"
        />
      ) : (
        <List
          dataSource={recentTasks}
          renderItem={(task) => (
            <List.Item
              className={
                styles.recentTask
              }
              onClick={() =>
                router.push(
                  `/user/projects/${task.project_id}/tasks`,
                )
              }
              style={{
                cursor: 'pointer',
              }}
            >
              <div
                className={
                  styles.taskInfo
                }
              >
                <Text strong>
                  {task.title}
                </Text>

                <Text
                  type="secondary"
                >
                  {task.task_code}
                </Text>
              </div>

              <Space>
                <TaskPriorityTag
                  priority={
                    task.priority
                  }
                />

                <TaskStatusTag
                  status={
                    task.status
                  }
                />

                <Text
                  type="secondary"
                >
                  <CalendarOutlined />{' '}
                  {task.deadline
                    ? new Date(
                        task.deadline,
                      ).toLocaleDateString()
                    : '--'}
                </Text>
              </Space>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
}