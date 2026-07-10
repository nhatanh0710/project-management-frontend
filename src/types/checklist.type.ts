export interface Checklist {
  _id: string;

  task_id: string;

  title: string;

  description?: string | null;

  is_done: boolean;

  created_by: {
    _id: string;
    name: string;
    email: string;
  };

  completed_by?: {
    _id: string;
    name: string;
    email: string;
  } | null;

  completed_at?: string | null;

  createdAt: string;

  updatedAt: string;
}

export interface CreateChecklistPayload {
  title: string;

  description?: string;
}

export interface UpdateChecklistPayload {
  title?: string;

  description?: string;

  is_done?: boolean;
}