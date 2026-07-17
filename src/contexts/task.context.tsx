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
  TaskStatus
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

  setSelectedTask: React.Dispatch<
    React.SetStateAction<Task | null>
  >;

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

  updateTaskStatus: (
  taskId: string,
  status: TaskStatus,
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
  ] = useState<Task | null>(null);

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
    console.log("OPEN UPDATE", task);
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

      await refreshTasks();
    };

  const updateTask =
    async (
      taskId: string,
      data: UpdateTaskPayload,
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

      await refreshTasks();
    };


  const updateTaskStatus = async (
  taskId: string,
  status: TaskStatus,
) => {

  // lưu lại trạng thái cũ
  const previousTasks = tasks;

  // cập nhật UI ngay
  setTasks(prev =>
    prev.map(task =>
      task._id === taskId
        ? {
            ...task,
            status,
          }
        : task,
    ),
  );

  try {

    await taskService.update(taskId, {
      status,
    });

  } catch (err: any) {

    // rollback nếu backend từ chối
    setTasks(previousTasks);

    message.error(
      err?.response?.data?.message ??
      'Update task failed',
    );
  }
};
  const deleteTask =
    async (
      taskId: string,
    ) => {
      await taskService.delete(
        taskId,
      );

      message.success(
        'Task deleted successfully',
      );

      setOpenDelete(false);

      setSelectedTask(null);

      await refreshTasks();
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
        setSelectedTask,

        openUpdateModal,

        openDeleteModal,

        createTask,

        updateTask,

        updateTaskStatus,

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