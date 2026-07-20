import { api } from '@/services/api';

import type {
  CreateTimeLogPayload,
  UpdateTimeLogPayload,
  TimeLogResponse,
  TimeLog,
} from '@/types/time-log.type';

const BASE_URL = '/time-logs';

export const timeLogService = {
  getByTask: async (
    taskId: string,
    page = 1,
    limit = 10,
  ): Promise<TimeLogResponse> => {
    const res = await api.get(
      `${BASE_URL}/task/${taskId}`,
      {
        params: {
          page,
          limit,
        },
      },
    );

    return res.data;
  },

  create: async (
    data: CreateTimeLogPayload,
  ): Promise<TimeLog> => {
    const res = await api.post(
      BASE_URL,
      data,
    );

    return res.data;
  },

  update: async (
    id: string,
    data: UpdateTimeLogPayload,
  ): Promise<TimeLog> => {
    const res = await api.patch(
      `${BASE_URL}/${id}`,
      data,
    );

    return res.data;
  },

  delete: async (
    id: string,
  ): Promise<void> => {
    await api.delete(
      `${BASE_URL}/${id}`,
    );
  },
};