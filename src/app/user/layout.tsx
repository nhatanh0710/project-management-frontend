'use client';

import AppHeader from '@/components/layout/app-header';
import AppSidebar from '@/components/layout/app-sidebar';

import { AuthProvider } from '@/contexts/auth.context';
import { WorkspaceProvider } from '@/contexts/workspace.context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <div
          style={{
            display: 'flex',
            height: '100vh',
          }}
        >
          <AppSidebar />

          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
           

            <main
              style={{
                flex: 1,
                overflow: 'hidden', 
                // dùng hidden thay vì scroll để tránh hiển thị scroll bar ngang khi nội dung vượt quá chiều rộng
                padding: 6,
              }}
            >
              {children}
            </main>
          </div>
        </div>
      </WorkspaceProvider>
    </AuthProvider>
  );
}