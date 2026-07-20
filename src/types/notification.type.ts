export enum NotificationType {
  PROJECT_INVITED = 'project_invited',

  TASK_ASSIGNED = 'task_assigned',

  TASK_COMMENT = 'task_comment',
}

export enum NotificationEntityType {
  PROJECT = 'project',

  TASK = 'task',
}

export interface Notification {
  _id: string;

  user_id: string;

  triggered_by?: string;

  type: NotificationType;

  title: string;

  content: string;

  entity_type?: NotificationEntityType;

  entity_id?: string;

  is_read: boolean;

  created_at: string;

  updated_at: string;
}