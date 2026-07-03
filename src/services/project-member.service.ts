import { api } from '@/services/api';

import {
  AddMembersPayload,
  UpdateMemberProfilePayload,
  UpdateMemberRolePayload,
} from '@/types/project-member.type';

export const projectMemberService = {
  getMembers: async (
    projectId: string,
    params?: Record<string, any>,
  ) => {
    const res = await api.get(
      `/projects/${projectId}/members`,
      {
        params,
      },
    );

    return res.data;
  },

  addMembers: async (
    projectId: string,
    data: AddMembersPayload,
  ) => {
    const res = await api.post(
      `/projects/${projectId}/members`,
      data,
    );

    return res.data;
  },

  updateRole: async (
    projectId: string,
    userId: string,
    data: UpdateMemberRolePayload,
  ) => {
    const res = await api.patch(
      `/projects/${projectId}/members/${userId}/role`,
      data,
    );

    return res.data;
  },

  updateProfile: async (
    projectId: string,
    userId: string,
    data: UpdateMemberProfilePayload,
  ) => {
    const res = await api.patch(
      `/projects/${projectId}/members/${userId}/profile`,
      data,
    );

    return res.data;
  },

  removeMember: async (
    projectId: string,
    userId: string,
  ) => {
    const res = await api.delete(
      `/projects/${projectId}/members/${userId}`,
    );

    return res.data;
  },
};