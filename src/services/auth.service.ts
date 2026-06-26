
import {
  LoginDto,
  RegisterDto,
  LoginResponse,
} from '@/types/auth.type';
import { api } from '@/services/api';


export const authService = {
  async register(payload: RegisterDto) {
    // Gửi yêu cầu POST đến API để đăng ký người dùng mới
    //sử dụng axios để gửi yêu cầu HTTP
const response = await api.post(
      `/auth/register`,
      payload,
    );

    return response.data;
  },

  async login(
    payload: LoginDto,
  ): Promise<LoginResponse> {
    const response = await api.post(
      `/auth/login`,
      payload,
    );

    return response.data;
  },

  async logout(userId: string) {
    const response = await api.post(
      `/auth/logout`,
      {
        userId,
      },
    );

    return response.data;
  },
};