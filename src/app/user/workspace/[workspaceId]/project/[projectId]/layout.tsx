'use client';

import { ReactNode } from 'react';
import { usePathname, useParams } from 'next/navigation';

import { CurrentProjectProvider } from '@/contexts/current-project.context';

import ProjectBreadcrumb from '@/components/project/common/project-breadcrumb';
import ProjectNavigation from '@/components/project/common/project-navigation';

interface Props {
  children: ReactNode;
}

export default function ProjectLayout({
  children,
}: Props) {
  const pathname = usePathname();
  const { projectId } = useParams();

  const isTaskDetail =
    pathname.includes('/tasks/') &&
    !pathname.endsWith('/tasks');

  return (
    <CurrentProjectProvider
      projectId={projectId as string}
    >
      <div className="flex h-full flex-col">

        {!isTaskDetail && (
          <ProjectBreadcrumb />
        )}

        {!isTaskDetail && (
          <ProjectNavigation />
        )}

        <main className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </main>

      </div>
    </CurrentProjectProvider>
  );
}