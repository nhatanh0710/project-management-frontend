import { api } from '@/services/api';
import { CreateWorkspaceDto } from '@/types/workspace.type';

export const workspaceService = {
  async getMyWorkspaces() {
    const response =
      await api.get('/workspaces');

    return response.data;
  },

  async create(
    payload: CreateWorkspaceDto,
  ) {
    console.log('SEND PAYLOAD:', payload);
    const response =
      await api.post(
        '/workspaces',
        payload,
      );

    return response.data;
  },
  async update(
  workspaceId: string,
  data: CreateWorkspaceDto,
) {
  const response = await api.patch(
    `/workspaces/${workspaceId}`,
    data,
  );

  return response.data;
},

async delete(workspaceId: string) {
  const response = await api.delete(
    `/workspaces/${workspaceId}`,
  );

  return response.data;
}
};