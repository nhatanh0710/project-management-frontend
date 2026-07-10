import {api} from '@/services/api';

import {
  Checklist,
  CreateChecklistPayload,
  UpdateChecklistPayload,
} from '@/types/checklist.type';

class ChecklistService {
  async getByTask(
    taskId: string,
  ): Promise<Checklist[]> {
    const res = await api.get(
      `/tasks/${taskId}/checklists`,
    );

    return res.data;
  }

  async getById(
    checklistId: string,
  ): Promise<Checklist> {
    const res = await api.get(
      `/checklists/${checklistId}`,
    );

    return res.data;
  }

  async create(
    taskId: string,
    payload: CreateChecklistPayload,
  ): Promise<Checklist> {
    const res = await api.post(
      `/tasks/${taskId}/checklists`,
      payload,
    );

    return res.data;
  }

  async update(
    checklistId: string,
    payload: UpdateChecklistPayload,
  ): Promise<Checklist> {
    const res = await api.patch(
      `/checklists/${checklistId}`,
      payload,
    );

    return res.data;
  }

  async delete(
    checklistId: string,
  ): Promise<void> {
    await api.delete(
      `/checklists/${checklistId}`,
    );
  }

  async complete(
    checklistId: string,
  ): Promise<Checklist> {
    const res = await api.patch(
      `/checklists/${checklistId}/complete`,
    );

    return res.data;
  }

  async uncomplete(
    checklistId: string,
  ): Promise<Checklist> {
    const res = await api.patch(
      `/checklists/${checklistId}/uncomplete`,
    );

    return res.data;
  }
}

export const checklistService =
  new ChecklistService();