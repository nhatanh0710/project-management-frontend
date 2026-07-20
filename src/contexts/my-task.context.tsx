'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { message } from 'antd';

import { taskService } from '@/services/task.service';

import type {
  Task,
  TaskFilter,
  TaskStatus,
} from '@/types/task.type';

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface MyTaskContextType {
  tasks: Task[];

  loading: boolean;

  summary: {
    leader_tasks:number;
    due_today:number;
    high_priority:number;
    remaining_hours:number;
}
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  priority: string;
  setPriority: (value: string) => void;

  pagination: Pagination;

  changePage: (
    page: number,
    pageSize: number,
  ) => void;

  refreshTasks: () => Promise<void>;

  updateTaskStatus: (
    taskId: string,
    status: TaskStatus,
  ) => Promise<void>;

  
}

const MyTaskContext =
  createContext<
    MyTaskContextType | undefined
  >(undefined);

export function MyTaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState('');

  const [status, setStatus] =
    useState('');

  const [priority, setPriority] =
    useState('');

  const [pagination, setPagination] =
    useState({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 1,
    });

    const [summary,setSummary]=
useState({
    leader_tasks:0,
    due_today:0,
    high_priority:0,
    remaining_hours:0,
});

  const refreshTasks =
    async () => {
      try {
        setLoading(true);

        const filter: TaskFilter = {
          search,
          status:
            status || undefined,
          priority:
            priority || undefined,
          page: pagination.page,
          limit: pagination.limit,
        };

        const res =
          await taskService.getMyTasks(
            filter,
          );

        setTasks(res.data);

        setPagination(
          res.pagination,
        );

        setSummary(res.summary);
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Load tasks failed',
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    refreshTasks();
  }, [
    search,
    status,
    priority,
    pagination.page,
    pagination.limit,
 
  ]);

  const changePage = (
    page: number,
    pageSize: number,
  ) => {
    setPagination((prev) => ({
      ...prev,
      page,
      limit: pageSize,
    }));
  };

  const updateTaskStatus =
    async (
      taskId: string,
      status: TaskStatus,
    ) => {
      const previousTasks =
        tasks;

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? {
                ...task,
                status,
              }
            : task,
        ),
      );

      try {
        await taskService.update(
          taskId,
          {
            status,
          },
        );
      } catch (err: any) {
        setTasks(previousTasks);

        message.error(
          err?.response?.data
            ?.message ??
            'Update task failed',
        );
      }
    };

  return (
    <MyTaskContext.Provider
      value={{
        tasks,

        loading,

        search,
        setSearch,

        status,
        setStatus,

        priority,
        setPriority,

        summary,

        pagination,

        changePage,

        refreshTasks,

        updateTaskStatus,
      }}
    >
      {children}
    </MyTaskContext.Provider>
  );
}

export function useMyTask() {
  const context =
    useContext(MyTaskContext);

  if (!context) {
    throw new Error(
      'useMyTask must be used inside MyTaskProvider',
    );
  }

  return context;
}