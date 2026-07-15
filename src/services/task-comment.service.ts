import { api } from '@/services/api';

import {
  CreateTaskCommentDto,
  QueryTaskCommentDto,
  UpdateCommentReactionDto,
  UpdateTaskCommentDto,
} from '@/types/task-comment.type';

const TASK_URL = '/tasks';
const COMMENT_URL = '/task-comments';

export const taskCommentService = {
  // ================= CREATE =================

  create: async (
    taskId: string,
    data: CreateTaskCommentDto,
  ) => {
    const res = await api.post(
      `${TASK_URL}/${taskId}/comments`,
      data,
    );

    return res.data;
  },

  // ================= GET LIST =================

  getByTask: async (
    taskId: string,
    params?: QueryTaskCommentDto,
  ) => {
    const res = await api.get(
      `${TASK_URL}/${taskId}/comments`,
      {
        params,
      },
    );

    return res.data;
  },

  // ================= GET DETAIL =================

  getById: async (
    commentId: string,
  ) => {
    const res = await api.get(
      `${COMMENT_URL}/${commentId}`,
    );

    return res.data;
  },

  // ================= UPDATE =================

  update: async (
    commentId: string,
    data: UpdateTaskCommentDto,
  ) => {
    const res = await api.patch(
      `${COMMENT_URL}/${commentId}`,
      data,
    );

    return res.data;
  },

  // ================= DELETE =================

  delete: async (
    commentId: string,
  ) => {
    const res = await api.delete(
      `${COMMENT_URL}/${commentId}`,
    );

    return res.data;
  },

  // ================= REACTION =================

  updateReaction: async (
    commentId: string,
    data: UpdateCommentReactionDto,
  ) => {
    const res = await api.patch(
      `${COMMENT_URL}/${commentId}/reaction`,
      data,
    );

    return res.data;
  },

  removeReaction: async (
    commentId: string,
  ) => {
    const res = await api.delete(
      `${COMMENT_URL}/${commentId}/reaction`,
    );

    return res.data;
  },
};