'use client';

import { Droppable, Draggable } from '@hello-pangea/dnd';

import TaskCard from './task-card';

import { Task } from '@/types/task.type';

import styles from './styles.module.scss';
import { TaskStatus } from '@/types/task.type';

const headerClass = {
  [TaskStatus.TODO]: styles.todoHeader,
  [TaskStatus.IN_PROGRESS]: styles.progressHeader,
  [TaskStatus.REVIEW]: styles.reviewHeader,
  [TaskStatus.DONE]: styles.doneHeader,
};

interface Props {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}

export default function TaskColumn({
  title,
  status,
  tasks,
}: Props) {
  return (
    <div className={styles.boardColumn}>
      <div className={`${styles.columnHeader} ${headerClass[status]}`}>
        <span>{title}</span>

        <span className={styles.count}>
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.columnBody}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task._id}
                draggableId={task._id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}