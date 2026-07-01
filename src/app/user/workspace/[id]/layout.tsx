'use client';

import { ReactNode } from 'react';
import { useParams } from 'next/navigation';

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
  const { id } = useParams();

  return (
    <ProjectListProvider
      workspaceId={id as string}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <ProjectSidebar />

        <main
          style={{
            flex: 1,
            minWidth: 0,
            overflowY: 'scroll',
            padding: 24,

          }}
        >
          {children}
        </main>
      </div>

      <ProjectCreateModal
        workspaceId={id as string}
      />

      <ProjectUpdateModal />
    </ProjectListProvider>
  );
}