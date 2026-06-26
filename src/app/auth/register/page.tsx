import RegisterForm from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <div
      style={{
        width: 400,
        margin: '100px auto',
      }}
    >
      <h1>Đăng ký</h1>

      <RegisterForm />
    </div>
  );
}