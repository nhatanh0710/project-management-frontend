import { api } from '@/services/api';

import type {
  QueryTaskAttachmentDto,
} from '@/types/task-attachment.type';

const TASK_URL = '/tasks';
const ATTACHMENT_URL = '/task-attachments';

export const taskAttachmentService = {
  // ================= UPLOAD =================

  upload: async (
    taskId: string,
    files: File[],
  ) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append(
        'files',
        file,
      );
    });

    const res = await api.post(
      `${TASK_URL}/${taskId}/attachments`,
      formData,
      {
        headers: {
          'Content-Type':
            'multipart/form-data',
        },
      },
    );

    return res.data;
  },

  // ================= GET LIST =================

  getByTask: async (
    taskId: string,
    params?: QueryTaskAttachmentDto,
  ) => {
    const res = await api.get(
      `${TASK_URL}/${taskId}/attachments`,
      {
        params,
      },
    );

    return res.data;
  },

  // ================= DOWNLOAD =================

  download: async (
    attachmentId: string,
  ) => {
    const res = await api.get(
      `${ATTACHMENT_URL}/${attachmentId}/download`,
      {
        responseType: 'blob',
      },
    );

    return res;
  },

  // ================= DELETE =================

  delete: async (
    attachmentId: string,
  ) => {
    const res = await api.delete(
      `${ATTACHMENT_URL}/${attachmentId}`,
    );

    return res.data;
  },
};