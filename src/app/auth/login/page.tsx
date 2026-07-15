import LoginForm from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div
      style={{
        width: 400,
        margin: '100px auto',
      }}
    >
      <h1>Windsurf: Sign In</h1>

      <LoginForm />
    </div>
  );
}