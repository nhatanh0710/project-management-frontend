'use client';

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

import {
  Button,
  Dropdown,
  Space,
  Typography,
} from 'antd';

import { useCurrentTask } from '@/contexts/current-task.context';
import { useProjectTask } from '@/contexts/task.context';

import TaskPriorityTag from './task-priority-tag';
import TaskStatusTag from './task-status-tag';

import styles from './styles.module.scss';

const { Title, Text } = Typography;

export default function TaskHeader() {
  const {
    task,
    openUpdateModal,
  } = useCurrentTask();

  const {
    openDeleteModal,
  } = useProjectTask();

  if (!task) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.titleRow}>
  <Text className={styles.code}>{task.task_code}</Text>

  <Title level={3} className={styles.title}>
    {task.title}
  </Title>
</div>

<Space size={8}>
  <TaskPriorityTag priority={task.priority} />
  <TaskStatusTag status={task.status} />
</Space>

         
      </div>

        <div className={styles.right}>
      <Dropdown
        trigger={['click']}
        menu={{
          items: [
            {
              key: 'edit',
              icon: <EditOutlined />,
              label: 'Edit Task',
              onClick: openUpdateModal,
            },
            {
              type: 'divider',
            },
            {
              key: 'delete',
              danger: true,
              icon: <DeleteOutlined />,
              label: 'Delete Task',
              onClick: () =>
                openDeleteModal(task),
            },
          ],
        }}
      >
        <Button
          icon={<EllipsisOutlined />}
        />
      </Dropdown>
      </div>
    </header>
  );
}