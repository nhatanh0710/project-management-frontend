'use client';

import { useRouter } from 'next/navigation';

import { Button, Form, Input, message } from 'antd';

import { Controller, useForm } from 'react-hook-form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { authService } from '@/services/auth.service';

import {
  saveToken,
  saveUser,
} from '@/utils/auth';

// Định nghĩa schema xác thực cho form đăng nhập
const loginSchema = z.object({
  email: z.email('Email không hợp lệ'),

  password: z
    .string()
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

// Định nghĩa kiểu dữ liệu cho giá trị của form đăng nhập dựa trên schema
type LoginFormValues = z.infer<
  typeof loginSchema
>;

export default function LoginForm() {
  const router = useRouter();
  // Khởi tạo hook useForm từ react-hook-form để quản lý trạng thái form
  const {
    control,

    handleSubmit,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },
  });
  // Hàm xử lý khi form được submit
  const onSubmit = async (
    data: LoginFormValues,
  ) => {
    

    try {
      const response =
        await authService.login(data);

      saveToken(
        response.access_token,
      );

      saveUser(
        response.user,
      );

      message.success(
        'Đăng nhập thành công',
      );

      router.push('/');
    } catch (error: any) {
      message.error(
        error?.response?.data
          ?.message ||
          'Đăng nhập thất bại',
      );
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(
        onSubmit,
      )}
    >
      <Form.Item
        label="Email"
        validateStatus={
          errors.email
            ? 'error'
            : ''
        }
        help={
          errors.email?.message
        }
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Nhập email"
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        validateStatus={
          errors.password
            ? 'error'
            : ''
        }
        help={
          errors.password?.message
        }
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="Nhập mật khẩu"
            />
          )}
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        loading={isSubmitting}
      >
        Đăng nhập
      </Button>
    </Form>
  );
}