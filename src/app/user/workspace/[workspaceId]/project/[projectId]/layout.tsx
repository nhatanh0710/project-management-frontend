import { CurrentProjectProvider } from '@/contexts/current-project.context';

import ProjectBreadcrumb from '@/components/project/common/project-breadcrumb';
import ProjectHeader from '@/components/project/common/project-header';
import ProjectNavigation from '@/components/project/common/project-navigation';

interface Props {
  children: React.ReactNode;
  params: Promise<{
    projectId: string;
  }>;
}

export default async function ProjectLayout({
  children,
  params,
}: Props) {
  const { projectId } = await params;

  return (
    <CurrentProjectProvider projectId={projectId}>
      <div className="flex h-full flex-col">
        <ProjectBreadcrumb />

        {/* <ProjectHeader /> */}

        <ProjectNavigation />

        <main className="flex-1 overflow-y-auto px-8 py-6">
          {children}
        </main>
      </div>
    </CurrentProjectProvider>
  );
}