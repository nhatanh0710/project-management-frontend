'use client';

import { useEffect } from 'react';

import { Empty } from 'antd';

import { useParams } from 'next/navigation';

import { useWorkspace } from '@/contexts/workspace.context';
import { useProjectList } from '@/contexts/project-list.context';

import WorkspaceHeader from '@/components/workspace/workspace-dashboard/workspace-header';
import WorkspaceStats from '@/components/workspace/workspace-dashboard/workspace-stats';
import RecentProjects from '@/components/workspace/workspace-dashboard/workspace-recent-project';
import WorkspaceSummary from '@/components/workspace/workspace-dashboard/workspace-summary';

export default function WorkspaceDashboardPage() {
  const params = useParams();

  const {
    selectWorkspaceById,
  } = useWorkspace();

  useEffect(() => {
    if (params.id) {
      selectWorkspaceById(
        params.id as string,
      );
    }
  }, [params.id]);

  const {
    loading,
    projects,
  } = useProjectList();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="p-6">
        <WorkspaceHeader />

        <Empty
          description="No project in this workspace"
          style={{
            marginTop: 60,
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <WorkspaceHeader />

      <WorkspaceStats />

      <RecentProjects />

      <WorkspaceSummary />
    </div>
  );
}