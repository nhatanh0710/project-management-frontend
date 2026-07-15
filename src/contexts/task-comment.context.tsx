'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { message } from 'antd';

import { taskCommentService } from '@/services/task-comment.service';

import type {
  CommentReactionType,
  QueryTaskCommentDto,
  TaskComment,
} from '@/types/task-comment.type';

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface TaskCommentContextType {
  comments: TaskComment[];

  loading: boolean;

  pagination: Pagination;

  changePage: (
    page: number,
    pageSize: number,
  ) => void;

  refreshComments: () => Promise<void>;

  createComment: (
    content: string,
  ) => Promise<void>;

  updateComment: (
    commentId: string,
    content: string,
  ) => Promise<void>;

  deleteComment: (
    commentId: string,
  ) => Promise<void>;

  updateReaction: (
    commentId: string,
    reaction: CommentReactionType,
  ) => Promise<void>;

  removeReaction: (
    commentId: string,
  ) => Promise<void>;
}

const TaskCommentContext =
  createContext<
    TaskCommentContextType | undefined
  >(undefined);

export function TaskCommentProvider({
  taskId,
  children,
}: {
  taskId: string;
  children: React.ReactNode;
}) {
  const [comments, setComments] =
    useState<TaskComment[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [pagination, setPagination] =
    useState({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 1,
    });

  const refreshComments =
    async () => {
      try {
        setLoading(true);

        const query: QueryTaskCommentDto =
          {
            page: pagination.page,
            limit: pagination.limit,
          };

        const res =
          await taskCommentService.getByTask(
            taskId,
            query,
          );

        setComments(res.data);

        setPagination(
          res.pagination,
        );
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Load comments failed',
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    refreshComments();
  }, [
    taskId,
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

  const createComment =
    async (content: string) => {
      await taskCommentService.create(
        taskId,
        {
          content,
        },
      );

      message.success(
        'Comment created successfully',
      );

      await refreshComments();
    };

  const updateComment =
    async (
      commentId: string,
      content: string,
    ) => {
      await taskCommentService.update(
        commentId,
        {
          content,
        },
      );

      message.success(
        'Comment updated successfully',
      );

      await refreshComments();
    };

  const deleteComment =
    async (
      commentId: string,
    ) => {
      await taskCommentService.delete(
        commentId,
      );

      message.success(
        'Comment deleted successfully',
      );

      await refreshComments();
    };

  const updateReaction =
    async (
      commentId: string,
      reaction: CommentReactionType,
    ) => {
      await taskCommentService.updateReaction(
        commentId,
        {
          reaction,
        },
      );

      await refreshComments();
    };

  const removeReaction =
    async (
      commentId: string,
    ) => {
      await taskCommentService.removeReaction(
        commentId,
      );

      await refreshComments();
    };

  return (
    <TaskCommentContext.Provider
      value={{
        comments,

        loading,

        pagination,

        changePage,

        refreshComments,

        createComment,

        updateComment,

        deleteComment,

        updateReaction,

        removeReaction,
      }}
    >
      {children}
    </TaskCommentContext.Provider>
  );
}

export function useTaskComment() {
  const context =
    useContext(
      TaskCommentContext,
    );

  if (!context) {
    throw new Error(
      'useTaskComment must be used inside TaskCommentProvider',
    );
  }

  return context;
}