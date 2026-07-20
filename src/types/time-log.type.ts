export interface TimeLog {
  _id: string;

  task_id: string;

  user_id: {
    _id: string;
    name: string;
    avatar_url?: string;
  };

  hours: number;

  work_date: string;

  description?: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateTimeLogPayload {
  task_id: string;

  hours: number;

  work_date: string;

  description?: string;
}

export interface UpdateTimeLogPayload {
  hours?: number;

  work_date?: string;

  description?: string;
}

export interface TimeLogResponse {
  data: TimeLog[];

  pagination: {
    total: number;

    page: number;

    limit: number;

    totalPages: number;
  };
}
