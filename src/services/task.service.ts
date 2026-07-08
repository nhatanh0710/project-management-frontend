import { api } from '@/services/api';

import {
  CreateTaskPayload,
  TaskQuery,
  UpdateTaskPayload,
} from '@/types/task.type';

const BASE_URL = '/tasks';

export const taskService = {
  // ================= CREATE =================

  create: async (
    data: CreateTaskPayload,
  ) => {
    const res = await api.post(
      BASE_URL,
      data,
    );

    return res.data;
  },

  // ================= GET LIST =================

  getTasks: async (
    projectId: string,
    params?: TaskQuery,
  ) => {
    const res = await api.get(
      BASE_URL,
      {
       params: {
  project_id: projectId,
  ...params,
},
      },
    );

    return res.data;
  },

  // ================= GET DETAIL =================

  getById: async (id: string) => {
    const res = await api.get(
      `${BASE_URL}/${id}`,
    );

    return res.data;
  },

  // ================= UPDATE =================

  update: async (
    id: string,
    data: UpdateTaskPayload,
  ) => {
    const res = await api.patch(
      `${BASE_URL}/${id}`,
      data,
    );

    return res.data;
  },

  // ================= UPDATE TAGS =================

  updateTags: async (
    id: string,
    tagIds: string[],
  ) => {
    const res = await api.patch(
      `${BASE_URL}/${id}/tags`,
      {
        tag_ids: tagIds,
      },
    );

    return res.data;
  },

  // ================= DELETE =================

  delete: async (id: string) => {
    const res = await api.delete(
      `${BASE_URL}/${id}`,
    );

    return res.data;
  },

  // ================= STATISTICS =================

  getStatistics: async (
    projectId: string,
  ) => {
    const res = await api.get(
      `${BASE_URL}/statistics`,
      {
        params: {
           project_id: projectId,
        },
      },
    );

    return res.data;
  },
};