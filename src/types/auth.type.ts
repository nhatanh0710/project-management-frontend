import { User } from '@/types/user.type';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}