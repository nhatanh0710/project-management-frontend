export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export interface Task {
  _id: string;

  task_code: string;

  project_id: string;

  created_by: string;

  title: string;

  description: string;

  status: TaskStatus;

  priority: TaskPriority;

  estimate_time: number;

  actual_time: number;

  start_time?: string;

  deadline?: string;

  completed_at?: string;

  progress?: number;

    tag_ids: Tag[];

  created_at: string;

  updated_at: string;
}

export interface CreateTaskPayload {
  project_id: string;

  title: string;

  description?: string;

  priority?: TaskPriority;

  estimate_time?: number;

  start_time?: string;

  deadline?: string;
}

export interface UpdateTaskPayload {
  title?: string;

  description?: string;

  priority?: TaskPriority;

  status?: TaskStatus;

  estimate_time?: number;

  actual_time?: number;

  start_time?: string;

  deadline?: string;
}

export interface TaskQuery {
  page?: number;

  limit?: number;

  search?: string;

  status?: TaskStatus | '';

  priority?: TaskPriority | '';
}

export interface TaskListResponse {
  data: Task[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}

export interface Tag {
  _id: string;

  name: string;

  color?: string;
}