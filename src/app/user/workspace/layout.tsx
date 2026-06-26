'use client';

import WorkspaceSidebar from '@/components/workspace/workspace-sidebar';

import {
  WorkspaceProvider,
} from '@/contexts/workspace.context';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceProvider>
      <div
        style={{
          display: 'flex',
          height: 'calc(100vh - 70px)',
        }}
      >
        <WorkspaceSidebar />

        <div
          style={{
            flex: 1,
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </div>
    </WorkspaceProvider>
  );
}