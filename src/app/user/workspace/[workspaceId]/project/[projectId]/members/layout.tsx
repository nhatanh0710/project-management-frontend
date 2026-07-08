import { ProjectMemberProvider } from '@/contexts/project-member.context';

interface Props {
  children: React.ReactNode;
  params: Promise<{
    projectId: string;
  }>;
}

export default async function MembersLayout({
  children,
  params,
}: Props) {
  const { projectId } = await params;

  return (
    <ProjectMemberProvider
      projectId={projectId}
    >
      {children}
    </ProjectMemberProvider>
  );
}