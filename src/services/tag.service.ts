import { api } from '@/services/api';

import {
  Tag,
  CreateTagPayload,
  UpdateTagPayload,
} from '@/types/tag.type';

const BASE_URL = '/tags';

export const tagService = {
  // =====================================================
  // GET ALL TAGS OF PROJECT
  // =====================================================

  async getTags(
    projectId: string,
  ): Promise<Tag[]> {
    const res = await api.get(
      `/projects/${projectId}/tags`,
    );

    return res.data;
  },

  // =====================================================
  // GET DETAIL
  // =====================================================

  async getById(
    tagId: string,
  ): Promise<Tag> {
    const res = await api.get(
      `${BASE_URL}/${tagId}`,
    );

    return res.data;
  },

  // =====================================================
  // CREATE
  // =====================================================

  async create(
    projectId: string,
    payload: CreateTagPayload,
  ): Promise<Tag> {
    const res = await api.post(
      `/projects/${projectId}/tags`,
      payload,
    );

    return res.data;
  },

  // =====================================================
  // UPDATE
  // =====================================================

  async update(
    tagId: string,
    payload: UpdateTagPayload,
  ): Promise<Tag> {
    const res = await api.patch(
      `${BASE_URL}/${tagId}`,
      payload,
    );

    return res.data;
  },

  // =====================================================
  // DELETE
  // =====================================================

  async remove(
    tagId: string,
  ) {
    const res = await api.delete(
      `${BASE_URL}/${tagId}`,
    );

    return res.data;
  },

  // ================= UPDATE TAGS =================

async assignTags(
  taskId: string,
  tagIds: string[],
) {
  const res = await api.patch(
    `/tasks/${taskId}/tags`,
    {
      tag_ids: tagIds,
    },
  );

  return res.data;
},
};