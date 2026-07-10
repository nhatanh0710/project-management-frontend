import { api } from '@/services/api';

import { TaskMember } from '@/types/task-member.type';

const BASE_URL = '/task-members';

export const taskMemberService = {
  // ================= GET MEMBERS =================

  getMembers: async (
    taskId: string,
  ): Promise<TaskMember[]> => {
    const res = await api.get(
      `${BASE_URL}/${taskId}`,
    );

    return res.data;
  },

  // ================= ADD MEMBERS =================

  addMembers: async (
    taskId: string,
    userIds: string[],
  ) => {
    const res = await api.post(
      `${BASE_URL}/${taskId}`,
      {
        user_ids: userIds,
      },
    );

    return res.data;
  },

  // ================= UPDATE LEADER =================

  updateLeader: async (
    taskId: string,
    userId: string,
  ) => {
    const res = await api.patch(
      `${BASE_URL}/${taskId}/leader/${userId}`,
    );

    return res.data;
  },

  // ================= REMOVE MEMBER =================

  removeMember: async (
    taskId: string,
    userId: string,
  ) => {
    const res = await api.delete(
      `${BASE_URL}/${taskId}/${userId}`,
    );

    return res.data;
  },
};