import { api } from '@/services/api';

const BASE_URL = '/notifications';

export const notificationService = {
  // ================= GET MY NOTIFICATIONS =================

  getMyNotifications: async (params?: {
    page?: number;
    limit?: number;
    is_read?: boolean;
  }) => {
    const res = await api.get(BASE_URL, {
      params,
    });

    return res.data;
  },

  // ================= UNREAD COUNT =================

  getUnreadCount: async () => {
    const res = await api.get(
      `${BASE_URL}/unread-count`,
    );

    return res.data;
  },

  // ================= MARK READ =================

  markAsRead: async (id: string) => {
    const res = await api.patch(
      `${BASE_URL}/${id}/read`,
    );

    return res.data;
  },

  // ================= MARK ALL =================

  markAllAsRead: async () => {
    const res = await api.patch(
      `${BASE_URL}/read-all`,
    );

    return res.data;
  },

  // ================= DELETE =================

  delete: async (id: string) => {
    const res = await api.delete(
      `${BASE_URL}/${id}`,
    );

    return res.data;
  },
};