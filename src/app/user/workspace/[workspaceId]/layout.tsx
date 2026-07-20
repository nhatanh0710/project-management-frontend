'use client';

import { ReactNode } from 'react';

import {
  useParams,
  usePathname,
} from 'next/navigation';

import { ProjectListProvider } from '@/contexts/project-list.context';

import ProjectSidebar from '@/components/project/project-sidebar';

import ProjectCreateModal from '@/components/project/common/project-create-modal';
import ProjectUpdateModal from '@/components/project/common/project-update-modal';

interface Props {
  children: ReactNode;
}

export default function WorkspaceDetailLayout({
  children,
}: Props) {
  const { workspaceId } = useParams();

  const pathname = usePathname();

  const isTaskDetail =
    pathname.includes('/tasks/');

  return (
    <ProjectListProvider
      workspaceId={workspaceId as string}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {!isTaskDetail && (
          <ProjectSidebar />
        )}

        <main
          style={{
            flex: 1,
            minWidth: 0,
            overflowY: 'auto',
            padding: 0
          }}
        >
          {children}
        </main>
      </div>

      {!isTaskDetail && (
        <>
          <ProjectCreateModal
            workspaceId={
              workspaceId as string
            }
          />

          <ProjectUpdateModal />
        </>
      )}
    </ProjectListProvider>
  );
}