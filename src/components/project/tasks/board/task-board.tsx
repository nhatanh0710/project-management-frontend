'use client';

import {
  Empty,
  Spin,
} from 'antd';

import { useProjectTask } from '@/contexts/task.context';

import TaskBoardView from './task-board-view';

export default function TaskBoard() {
  const {
    loading,
    tasks,
  } = useProjectTask();

  if (loading) {
    return <Spin />;
  }

  if (!tasks.length) {
    return (
      <Empty description="No tasks found" />
    );
  }

  return <TaskBoardView />;
}