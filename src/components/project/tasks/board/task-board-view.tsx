'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import { useProjectTask } from '@/contexts/task.context';

import { TaskStatus } from '@/types/task.type';

import TaskColumn from './task-column';

import styles from './styles.module.scss';

export default function TaskBoardView() {
  const {
    tasks,
    updateTaskStatus,
  } = useProjectTask();

  const handleDragEnd = async (
    result: DropResult,
  ) => {
    const { source, destination, draggableId } =
      result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId ===
      destination.droppableId
    ) {
      return;
    }

    await updateTaskStatus(
      draggableId,
      destination.droppableId as TaskStatus,
    );
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
    >
      <div className={styles.board}>
        <TaskColumn
          title="To Do"
          status={TaskStatus.TODO}
          tasks={tasks.filter(
            (t) =>
              t.status ===
              TaskStatus.TODO,
          )}
        />

        <TaskColumn
          title="In Progress"
          status={
            TaskStatus.IN_PROGRESS
          }
          tasks={tasks.filter(
            (t) =>
              t.status ===
              TaskStatus.IN_PROGRESS,
          )}
        />

        <TaskColumn
          title="Review"
          status={TaskStatus.REVIEW}
          tasks={tasks.filter(
            (t) =>
              t.status ===
              TaskStatus.REVIEW,
          )}
        />

        <TaskColumn
          title="Done"
          status={TaskStatus.DONE}
          tasks={tasks.filter(
            (t) =>
              t.status ===
              TaskStatus.DONE,
          )}
        />
      </div>
    </DragDropContext>
  );
}