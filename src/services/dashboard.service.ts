// src/services/dashboard.service.ts

import { api } from '@/services/api';

import type { DashboardStatistics } from '@/types/dashboard.type';
import type { Task } from '@/types/task.type';

export const dashboardService = {
  // ================= PROJECT STATISTICS =================

  getStatistics: async (
    projectId: string,
  ): Promise<DashboardStatistics> => {
    const res = await api.get(
      '/tasks/statistics',
      {
       params: {
  project_id: projectId,
 
},
      },
    );

    return res.data;
  },

  // ================= RECENT TASKS =================

  getRecentTasks: async (
    projectId: string,
    limit = 5,
  ): Promise<Task[]> => {
    const res = await api.get('/tasks', {
      params: {
        project_id: projectId,
        page: 1,
        limit,
      },
    });

    return res.data.data;
  },
};