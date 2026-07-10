'use client';

import { useMemo, useState } from 'react';

import { Input, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { useRouter, useParams } from 'next/navigation';

import { useProjectTask } from '@/contexts/task.context';
import { useCurrentTask } from '@/contexts/current-task.context';

import styles from './styles.module.scss';

const { Text } = Typography;

export default function TaskExplorer() {
  const router = useRouter();

  const { workspaceId, projectId } =
    useParams();

  const { tasks } =
    useProjectTask();

  const { task: currentTask } =
    useCurrentTask();

  const [search, setSearch] =
    useState('');

  const filteredTasks =
    useMemo(() => {
      if (!search.trim()) {
        return tasks;
      }

      const keyword =
        search.toLowerCase();

      return tasks.filter(
        (task) =>
          task.title
            .toLowerCase()
            .includes(keyword) ||
          task.task_code
            .toLowerCase()
            .includes(keyword),
      );
    }, [search, tasks]);

  return (
    <div className={styles.taskExplorer}>
      <Text className={styles.cardTitle}>
        Tasks
      </Text>

      <Input
        allowClear
        placeholder="Search task..."
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className={styles.taskList}>
        {filteredTasks.map((task) => {
          const active =
            task._id === currentTask?._id;

          return (
            <button
              key={task._id}
              type="button"
              className={`${styles.taskItem} ${
                active
                  ? styles.active
                  : ''
              }`}
              onClick={() =>
                router.push(
                  `/user/workspace/${workspaceId}/project/${projectId}/tasks/${task._id}`,
                )
              }
            >
              <Text
                className={
                  styles.taskCode
                }
              >
                {task.task_code}
              </Text>

              <Text
                ellipsis
                className={
                  styles.taskTitle
                }
              >
                {task.title}
              </Text>
            </button>
          );
        })}
      </div>
    </div>
  );
}