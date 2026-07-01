export enum ProjectStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
}

export interface Project {
  _id: string;

  workspace_id: string;

  name: string;
  description?: string;

  status: ProjectStatus;

  start_day?: string;   // ISO string từ API
  deadline?: string;    // ISO string từ API

  created_by: string;

  progress: number;

  is_deleted: boolean;
  is_archived: boolean;

  createdAt?: string;
  updatedAt?: string;
}
export interface ProjectWithMeta extends Project {
  memberCount?: number;
  ownerName?: string;
  taskCount?: number;
}