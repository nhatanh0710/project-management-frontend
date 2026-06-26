import { User } from '@/types/user.type';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'user';

/**
 * Lưu access token
 */
export const saveToken = (
  token: string,
) => {
  localStorage.setItem(
    TOKEN_KEY,
    token,
  );
};

/**
 * Lấy access token
 */
export const getToken = () => {
  return localStorage.getItem(
    TOKEN_KEY,
  );
};

/**
 * Xóa access token
 */
export const removeToken = () => {
  localStorage.removeItem(
    TOKEN_KEY,
  );
};

/**
 * Lưu thông tin user
 */
export const saveUser = (
  user: User,
) => {
  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user),
  );
};

/**
 * Lấy thông tin user
 */
export const getUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const user = localStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;
};

/**
 * Xóa thông tin user
 */
export const removeUser = () => {
  localStorage.removeItem(
    USER_KEY,
  );
};

/**
 * Logout
 */
export const clearAuth = () => {
  removeToken();
  removeUser();
};

/**
 * Kiểm tra đăng nhập
 */
export const isAuthenticated =
  () => {
    return !!getToken();
  };