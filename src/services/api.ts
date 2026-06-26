import axios from 'axios';

import { getToken } from '@/utils/auth';

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL,

  headers: {
    'Content-Type':
      'application/json',
  },
});

// interceptor dùng để tự động thêm token vào header của request
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
);