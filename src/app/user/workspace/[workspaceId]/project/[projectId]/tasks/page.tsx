'use client';


import { use, useState } from 'react';
import {
  App,
  Card,
  Segmented,
} from 'antd';

import {
  AppstoreOutlined,
  BarsOutlined,
} from '@ant-design/icons';

import { ProjectTaskProvider } from '@/contexts/task.context';

import ProjectBreadcrumb from '@/components/project/common/project-breadcrumb';
import ProjectHeader from '@/components/project/common/project-header';
import ProjectNavigation from '@/components/project/common/project-navigation';

import TaskToolbar from '@/components/project/tasks/task-toolbar';
import TaskBoard from '@/components/project/tasks/board/task-board';
import TaskList from '@/components/project/tasks/list/task-list';

import TaskCreateModal from '@/components/project/tasks/modal/task-create-modal';
import TaskUpdateModal from '@/components/project/tasks/modal/task-update-modal';
import TaskDeleteModal from '@/components/project/tasks/modal/task-delete-modal';

import styles from '@/components/project/tasks/styles.module.scss';

interface Props {
  params: Promise<{
    workspaceId: string;
    projectId: string;
  }>;
}

export default function ProjectTasksPage({
  params,
}: Props) {
  const { workspaceId, projectId } = use(params);

  return (
    <ProjectTaskProvider projectId={projectId}>
      <ProjectTasksContent
        workspaceId={workspaceId}
        projectId={projectId}
      />
    </ProjectTaskProvider>
  );
}

function ProjectTasksContent({
  workspaceId,
  projectId,
}: {
  workspaceId: string;
  projectId: string;
}) {
  const [view, setView] = useState<'board' | 'list'>('board');

  return (
    <App>
      <div className={styles.page}>

        <Card className={styles.content}>
          <div className={styles.toolbarRow}>
            <TaskToolbar />

            <Segmented
              value={view}
              onChange={(value) =>
                setView(value as 'board' | 'list')
              }
              options={[
                {
                  value: 'board',
                  icon: <AppstoreOutlined />,
                  label: 'Board',
                },
                {
                  value: 'list',
                  icon: <BarsOutlined />,
                  label: 'List',
                },
              ]}
            />

          </div>

          {view === 'board' ? (
            <TaskBoard />
          ) : (
            <TaskList />
          )}
        </Card>

        <TaskCreateModal />
        
        <TaskDeleteModal />
      </div>
    </App>
  );
}