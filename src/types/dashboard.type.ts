import { Project } from './project.type';
import { Task } from './task.type';

export interface DashboardStatisticsResponse {
  total_workspaces: number;
  owned_projects: number;
  joined_projects: number;
  total_tasks: number;
  completed_tasks: number;
  overdue_tasks: number;
}

export interface DashboardProjectSummary {
  planning: number;
  in_progress: number;
  on_hold: number;
  completed: number;
}

export interface DashboardData {
  statistics: DashboardStatisticsResponse;
  project_summary: ProjectSummary;
  recent_projects: Project[];
  recent_tasks: Task[];
}