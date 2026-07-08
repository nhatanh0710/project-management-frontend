import DashboardOverview from '@/components/project/dashboard/dashboard-overview';

import { DashboardProvider } from '@/contexts/dashboard.context';

interface Props {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function ProjectPage({
  params,
}: Props) {
  const { projectId } = await params;

  return (
    <DashboardProvider projectId={projectId}>
      <DashboardOverview />
    </DashboardProvider>
  );
}