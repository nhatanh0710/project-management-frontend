'use client';

import TaskAssignment from '@/components/task/details/task-assignment';
import TaskDescription from '@/components/task/details/task-description';
import TaskInformation from '@/components/task/details/task-information';
import TaskTags from '@/components/task/details/task-tags';

export default function TaskDetailPage() {
  return (
    <div className="space-y-6">
      <TaskDescription />

      <TaskInformation />

      <TaskAssignment />

      <TaskTags />
    </div>
  );
}