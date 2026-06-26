'use client';

import AppHeader from '@/components/layout/app-header';
import AppSidebar from '@/components/layout/app-sidebar';

import { AuthProvider } from '@/contexts/auth.context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
        }}
      >
        <AppSidebar />

        <div
          style={{
            flex: 1,
          }}
        >
          <AppHeader />

          <main
            style={{
              padding: 24,
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}