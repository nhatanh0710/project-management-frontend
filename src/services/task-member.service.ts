import { api } from '@/services/api';

import {
  TaskMember,
  AvailableTaskMember,
} from '@/types/task-member.type';

const BASE_URL = '/tasks';

export const taskMemberService = {
  // ================= GET MEMBERS =================

  async getMembers(
    taskId: string,
  ): Promise<TaskMember[]> {
    const res = await api.get(
      `${BASE_URL}/${taskId}/members`,
    );

    return res.data;
  },

  // ================= GET AVAILABLE MEMBERS =================

  async getAvailableMembers(
    taskId: string,
  ): Promise<AvailableTaskMember[]> {
    const res = await api.get(
      `${BASE_URL}/${taskId}/members/available`,
    );

    return res.data;
  },

  // ================= GET LEADER =================

  async getLeader(
    taskId: string,
  ): Promise<TaskMember | null> {
    const res = await api.get(
      `${BASE_URL}/${taskId}/members/leader`,
    );

    return res.data;
  },

  // ================= ASSIGN MEMBERS =================

  async assignMembers(
    taskId: string,
    userIds: string[],
  ) {
    const res = await api.post(
      `${BASE_URL}/${taskId}/members`,
      {
        user_ids: userIds,
      },
    );

    return res.data;
  },

  // ================= UPDATE LEADER =================

  async updateLeader(
    taskId: string,
    userId: string,
  ) {
    const res = await api.patch(
      `${BASE_URL}/${taskId}/members/${userId}/leader`,
    );

    return res.data;
  },

  // ================= REMOVE MEMBER =================

  async removeMember(
    taskId: string,
    userId: string,
  ) {
    const res = await api.delete(
      `${BASE_URL}/${taskId}/members/${userId}`,
    );

    return res.data;
  },
};