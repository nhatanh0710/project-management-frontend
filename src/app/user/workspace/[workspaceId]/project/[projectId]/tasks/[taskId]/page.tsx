'use client';

import TaskAssignment from '@/components/task/assignment/task-assignment';
import TaskDescription from '@/components/task/details/task-description';
import TaskInformation from '@/components/task/details/task-information';
import TaskTags from '@/components/task/tag';

export default function TaskDetailPage() {
  return (
    <div className="grid grid-cols-15 gap-6">
      {/* Left */}

      <div className="col-span-15 lg:col-span-9 space-y-4">
        <TaskDescription />

        <TaskInformation />
      </div>

      {/* Right */}

      <div className="col-span-15 lg:col-span-6 space-y-4">
        <TaskTags />
        <TaskAssignment />

        
      </div>
    </div>
  );
}