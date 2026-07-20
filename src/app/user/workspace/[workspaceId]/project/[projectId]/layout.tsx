'use client';

import { ReactNode } from 'react';
import { usePathname, useParams } from 'next/navigation';

import {
  CurrentProjectProvider,
  useCurrentProject,
} from '@/contexts/current-project.context';

import ProjectBreadcrumb from '@/components/project/common/project-breadcrumb';
import ProjectNavigation from '@/components/project/common/project-navigation';
import ArchivedBanner from '@/components/project/common/project-archived-banner';

interface Props {
  children: ReactNode;
}

function ProjectLayoutContent({
  children,
}: Props) {
  const pathname = usePathname();

  const { isArchived } = useCurrentProject();

  const isTaskDetail =
    pathname.includes('/tasks/') &&
    !pathname.endsWith('/tasks');

  return (
    <div className="flex h-full flex-col">
      {!isTaskDetail && <ProjectBreadcrumb />}

      {!isTaskDetail && <ProjectNavigation />}

      <main className="flex-1 overflow-y-auto px-6 py-4">
        {isArchived && <ArchivedBanner />}

        {children}
      </main>
    </div>
  );
}

export default function ProjectLayout({
  children,
}: Props) {
  const { projectId } = useParams();

  return (
    <CurrentProjectProvider
      projectId={projectId as string}
    >
      <ProjectLayoutContent>
        {children}
      </ProjectLayoutContent>
    </CurrentProjectProvider>
  );
}