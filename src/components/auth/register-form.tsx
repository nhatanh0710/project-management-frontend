'use client';

import { useRouter } from 'next/navigation';

import { Button, Form, Input, message } from 'antd';

import { Controller, useForm } from 'react-hook-form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { authService } from '@/services/auth.service';

// Định nghĩa schema xác thực cho form đăng ký
const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Họ và tên tối thiểu 2 ký tự'),

    email: z.email('Email không hợp lệ'),

    password: z
      .string()
      .min(6, 'Mật khẩu tối thiểu 6 ký tự'),

    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      message: 'Mật khẩu xác nhận không khớp',
      path: ['confirmPassword'],
    },
  );

  // Định nghĩa kiểu dữ liệu cho giá trị của form đăng ký dựa trên schema
type RegisterFormValues = z.infer<
  typeof registerSchema
>;

export default function RegisterForm() {
  const router = useRouter();
    // Khởi tạo hook useForm từ react-hook-form để quản lý trạng thái form
    // cấu trúc: const {đối tượng, hàm, trạng thái} = useForm<kiểu dữ liệu>({}) 
     const {
    // control là đối tượng để quản lý các trường của form
    control,
    // handleSubmit là hàm để xử lý khi form được submit
    handleSubmit,
    // formState là đối tượng để quản lý trạng thái của form
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormValues>({
    // resolver là hàm để xác thực dữ liệu của form dựa trên schema
    resolver:
      zodResolver(registerSchema),

    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (
    data: RegisterFormValues,
  ) => {
    try {
      await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      message.success(
        'Đăng ký thành công',
      );

      router.push('/auth/login');
    } catch (error: any) {
      message.error(
        error?.response?.data
          ?.message ||
          'Đăng ký thất bại',
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
        label="Họ và tên"
        validateStatus={
          errors.name ? 'error' : ''
        }
        help={errors.name?.message}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Nhập họ và tên"
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Email"
        validateStatus={
          errors.email ? 'error' : ''
        }
        help={errors.email?.message}
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

      <Form.Item
        label="Xác nhận mật khẩu"
        validateStatus={
          errors.confirmPassword
            ? 'error'
            : ''
        }
        help={
          errors.confirmPassword
            ?.message
        }
      >
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="Nhập lại mật khẩu"
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
        Đăng ký
      </Button>
    </Form>
  );
}