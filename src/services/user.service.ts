import { api } from '@/services/api';

export const userService = {
  searchUsers: async (
    keyword: string,
  ) => {
    const res = await api.get(
      '/users/search',
      {
        params: {
          keyword,
        },
      },
    );

    return res.data;
  },
};