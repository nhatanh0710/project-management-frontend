'use client';

import { ReactNode } from 'react';
import { useParams } from 'next/navigation';

import { CurrentTaskProvider } from '@/contexts/current-task.context';
import { ProjectTaskProvider } from '@/contexts/task.context';

import TaskSidebar from '@/components/task/sidebar/index';
import TaskHeader from '@/components/task/common/task-header';
import TaskNavigation from '@/components/task/common/task-navigation';
import TaskUpdateModal from '@/components/project/tasks/modal/task-update-modal';
import TaskDeleteModal from '@/components/project/tasks/modal/task-delete-modal';
interface Props {
  children: ReactNode;
}

export default function TaskLayout({
  children,
}: Props) {
  const { projectId, taskId } =
    useParams();

  return (
    <ProjectTaskProvider
      projectId={projectId as string}
    >
      <CurrentTaskProvider
        taskId={taskId as string}
      >
       <div className="flex h-full overflow-hidden">

    <TaskSidebar />

    <div
        className="
            flex
            flex-1
            flex-col
            overflow-hidden
            border-l
            border-slate-200
            bg-slate-50
        "
    >

        <TaskHeader />

        <main className="flex-1 overflow-y-auto p-6">

            <TaskNavigation />

            {children}

        </main>

    </div>

</div>
<TaskUpdateModal />

<TaskDeleteModal />
      </CurrentTaskProvider>
    </ProjectTaskProvider>
  );
}