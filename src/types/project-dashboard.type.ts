// src/types/dashboard.type.ts

import type { Task } from './task.type';

export interface DashboardStatistics {
  total: number;

  todo: number;

  in_progress: number;

  review: number;

  done: number;

  overdue: number;
}

export interface DashboardOverview {
  statistics: DashboardStatistics;

  recentTasks: Task[];
}