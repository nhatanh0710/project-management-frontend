'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { message } from 'antd';

import { taskService } from '@/services/task.service';

import {
  Task,
  UpdateTaskPayload,
} from '@/types/task.type';

interface CurrentTaskContextType {
  task: Task | null;

  loading: boolean;

  refreshTask: () => Promise<void>;

  setTask: React.Dispatch<
    React.SetStateAction<Task | null>
  >;

  openUpdate: boolean;

  openUpdateModal: () => void;

  closeUpdateModal: () => void;

  updateTask: (
    data: UpdateTaskPayload,
  ) => Promise<void>;
}

const CurrentTaskContext =
  createContext<
    CurrentTaskContextType | undefined
  >(undefined);

interface CurrentTaskProviderProps {
  taskId: string;

  children: React.ReactNode;
}

export function CurrentTaskProvider({
  taskId,
  children,
}: CurrentTaskProviderProps) {
  const [task, setTask] =
    useState<Task | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [openUpdate, setOpenUpdate] =
    useState(false);

  const refreshTask =
    async () => {
      try {
        setLoading(true);

        const res =
          await taskService.getById(
            taskId,
          );

        setTask(res);
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Load task failed',
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    refreshTask();
  }, [taskId]);

  const openUpdateModal = () => {
    setOpenUpdate(true);
  };

  const closeUpdateModal = () => {
    setOpenUpdate(false);
  };

  const updateTask =
    async (
      data: UpdateTaskPayload,
    ) => {
      try {
        await taskService.update(
          taskId,
          data,
        );

        message.success(
          'Task updated successfully',
        );

        await refreshTask();

        closeUpdateModal();
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Update task failed',
        );
        throw err;
      }
    };

  return (
    <CurrentTaskContext.Provider
      value={{
        task,

        loading,

        refreshTask,

        setTask,

        openUpdate,

        openUpdateModal,

        closeUpdateModal,

        updateTask,
      }}
    >
      {children}
    </CurrentTaskContext.Provider>
  );
}

export function useCurrentTask() {
  const context =
    useContext(
      CurrentTaskContext,
    );

  if (!context) {
    throw new Error(
      'useCurrentTask must be used inside CurrentTaskProvider',
    );
  }

  return context;
}