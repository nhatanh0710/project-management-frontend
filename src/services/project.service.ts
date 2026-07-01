import { api } from '@/services/api';


const BASE_URL = '/projects';

export const projectService = {
  // ================= CREATE =================
  create: async (data: any) => {
    const res = await api.post(BASE_URL, data);
    return res.data;
  },

  // ================= GET LIST =================
  getByWorkspace: async (params?: {
    workspaceId?: string;
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    const res = await api.get(BASE_URL, {
      params,
    });

    return res.data; 
    /*
      {
        data: Project[],
        pagination: {...}
      }
    */
  },

  // ================= GET DETAIL =================
  getById: async (id: string) => {
    const res = await api.get(`${BASE_URL}/${id}`);
    return res.data;
  },

  // ================= UPDATE =================
  update: async (id: string, data: any) => {
    const res = await api.patch(`${BASE_URL}/${id}`, data);
    return res.data;
  },

  // ================= DELETE (SOFT DELETE) =================
  delete: async (id: string) => {
    const res = await api.delete(`${BASE_URL}/${id}`);
    return res.data;
  },

  // ================= ARCHIVE =================
  archive: async (id: string) => {
    const res = await api.patch(`${BASE_URL}/${id}/archive`);
    return res.data;
  },

  // ================= RESTORE =================
  restore: async (id: string) => {
    const res = await api.patch(`${BASE_URL}/${id}/restore`);
    return res.data;
  },

  // ================= TRANSFER OWNER =================
  transferOwner: async (
    projectId: string,
    newOwnerId: string,
  ) => {
    const res = await api.post(
      `${BASE_URL}/${projectId}/transfer-owner`,
      {
        new_owner_id: newOwnerId,
      },
    );

    return res.data;
  },
};