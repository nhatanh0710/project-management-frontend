import { Task } from './task.type';

export interface MyTaskSummary {
  leader_tasks: number;

  due_today: number;

  high_priority: number;

  remaining_hours: number;
}

export interface MyTaskStatistics {
  total: number;

  todo: number;

  in_progress: number;

  review: number;

  done: number;

  overdue: number;
}

export interface MyTaskResponse {
  data: Task[];

  summary: MyTaskSummary;

  pagination: {
    total: number;

    page: number;

    limit: number;

    totalPages: number;
  };
}