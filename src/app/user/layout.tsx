'use client';

import AppSidebar from '@/components/layout/app-sidebar';

import { AuthProvider } from '@/contexts/auth.context';
import { WorkspaceProvider } from '@/contexts/workspace.context';
import { DashboardProvider } from '@/contexts/dashboard.context';
import  Notification  from '@/components/layout/notification'
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <DashboardProvider>
          <div className="flex h-screen overflow-hidden">
            <AppSidebar />
            <Notification/>
            <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
              {children}
            </main>
          </div>
        </DashboardProvider>
      </WorkspaceProvider>
    </AuthProvider>
  );
}