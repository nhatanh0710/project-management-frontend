'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { message } from 'antd';

import { taskAttachmentService } from '@/services/task-attachment.service';

import type {
  Pagination,
  TaskAttachment,
} from '@/types/task-attachment.type';

interface ContextType {
  attachments: TaskAttachment[];

  loading: boolean;

  pagination: Pagination;

  refreshAttachments: () => Promise<void>;

  uploadAttachments: (
    files: File[],
  ) => Promise<void>;

  deleteAttachment: (
    id: string,
  ) => Promise<void>;

  downloadAttachment: (
    attachment: TaskAttachment,
  ) => Promise<void>;
}

const TaskAttachmentContext =
  createContext<
    ContextType | undefined
  >(undefined);

interface Props {
  taskId: string;

  children: React.ReactNode;
}

export function TaskAttachmentProvider({
  taskId,
  children,
}: Props) {
  const [
    attachments,
    setAttachments,
  ] = useState<TaskAttachment[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [pagination, setPagination] =
    useState<Pagination>({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 1,
    });

  const refreshAttachments =
    async () => {
      try {
        setLoading(true);

        const res =
          await taskAttachmentService.getByTask(
            taskId,
            {
              page: pagination.page,
              limit: pagination.limit,
            },
          );

        setAttachments(res.data);

        setPagination(
          res.pagination,
        );
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Load attachments failed',
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    refreshAttachments();
  }, [
    taskId,
    pagination.page,
    pagination.limit,
  ]);

  const uploadAttachments =
    async (files: File[]) => {
      try {
        await taskAttachmentService.upload(
          taskId,
          files,
        );

        message.success(
          'Upload successfully',
        );

        await refreshAttachments();
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Upload failed',
        );
      }
    };

  const deleteAttachment =
    async (id: string) => {
      try {
        await taskAttachmentService.delete(
          id,
        );

        message.success(
          'Deleted successfully',
        );

        await refreshAttachments();
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Delete failed',
        );
      }
    };

  const downloadAttachment =
    async (
      attachment: TaskAttachment,
    ) => {
      try {
        const res =
          await taskAttachmentService.download(
            attachment._id,
          );

        const url =
          window.URL.createObjectURL(
            res.data,
          );

        const a =
          document.createElement(
            'a',
          );

        a.href = url;

        a.download =
          attachment.original_name;

        document.body.appendChild(
          a,
        );

        a.click();

        a.remove();

        URL.revokeObjectURL(url);
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Download failed',
        );
      }
    };

  return (
    <TaskAttachmentContext.Provider
      value={{
        attachments,

        loading,

        pagination,

        refreshAttachments,

        uploadAttachments,

        deleteAttachment,

        downloadAttachment,
      }}
    >
      {children}
    </TaskAttachmentContext.Provider>
  );
}

export function useTaskAttachment() {
  const context =
    useContext(
      TaskAttachmentContext,
    );

  if (!context) {
    throw new Error(
      'useTaskAttachment must be used inside TaskAttachmentProvider',
    );
  }

  return context;
}