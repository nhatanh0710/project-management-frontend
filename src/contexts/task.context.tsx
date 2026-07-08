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
  CreateTaskPayload,
  Task,
  TaskFilter,
  UpdateTaskPayload,
} from '@/types/task.type';

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ProjectTaskContextType {
  tasks: Task[];

  loading: boolean;

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

  openCreate: boolean;
  setOpenCreate: (
    value: boolean,
  ) => void;

  openUpdate: boolean;
  setOpenUpdate: (
    value: boolean,
  ) => void;

  openDelete: boolean;
  setOpenDelete: (
    value: boolean,
  ) => void;

  selectedTask: Task | null;

  openUpdateModal: (
    task: Task,
  ) => void;

  openDeleteModal: (
    task: Task,
  ) => void;

  createTask: (
    data: CreateTaskPayload,
  ) => Promise<void>;

  updateTask: (
    taskId: string,
    data: UpdateTaskPayload,
  ) => Promise<void>;

  deleteTask: (
    taskId: string,
  ) => Promise<void>;
}

const ProjectTaskContext =
  createContext<
    ProjectTaskContextType | undefined
  >(undefined);

export function ProjectTaskProvider({
  projectId,
  children,
}: {
  projectId: string;
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

  const [openCreate, setOpenCreate] =
    useState(false);

  const [openUpdate, setOpenUpdate] =
    useState(false);

  const [openDelete, setOpenDelete] =
    useState(false);

  const [
    selectedTask,
    setSelectedTask,
  ] =
    useState<Task | null>(
      null,
    );

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
          await taskService.getTasks(
            projectId,
            filter,
          );

        setTasks(res.data);

        setPagination(
          res.pagination,
        );
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
    projectId,
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

  const openUpdateModal = (
    task: Task,
  ) => {
    setSelectedTask(task);

    setOpenUpdate(true);
  };

  const openDeleteModal = (
    task: Task,
  ) => {
    setSelectedTask(task);

    setOpenDelete(true);
  };

  const createTask =
    async (
      data: CreateTaskPayload,
    ) => {
      await taskService.create({
        ...data,
        project_id: projectId,
      });

      message.success(
        'Task created successfully',
      );

      setOpenCreate(false);

      refreshTasks();
    };

  const updateTask =
    async (
      taskId,
      data,
    ) => {
      await taskService.update(
        taskId,
        data,
      );

      message.success(
        'Task updated successfully',
      );

      setOpenUpdate(false);

      setSelectedTask(null);

      refreshTasks();
    };

  const deleteTask =
    async (
      taskId,
    ) => {
      await taskService.delete(
        taskId,
      );

      message.success(
        'Task deleted successfully',
      );

      setOpenDelete(false);

      setSelectedTask(null);

      refreshTasks();
    };

  return (
    <ProjectTaskContext.Provider
      value={{
        tasks,

        loading,

        search,
        setSearch,

        status,
        setStatus,

        priority,
        setPriority,

        pagination,

        changePage,

        refreshTasks,

        openCreate,
        setOpenCreate,

        openUpdate,
        setOpenUpdate,

        openDelete,
        setOpenDelete,

        selectedTask,

        openUpdateModal,

        openDeleteModal,

        createTask,

        updateTask,

        deleteTask,
      }}
    >
      {children}
    </ProjectTaskContext.Provider>
  );
}

export function useProjectTask() {
  const context =
    useContext(
      ProjectTaskContext,
    );

  if (!context) {
    throw new Error(
      'useProjectTask must be used inside ProjectTaskProvider',
    );
  }

  return context;
}