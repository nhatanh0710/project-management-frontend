
import { TaskPriority, TaskStatus } from "@/types/task.type";

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "To Do",
  [TaskStatus.IN_PROGRESS]: "In Progress",
  [TaskStatus.REVIEW]: "Review",
  [TaskStatus.DONE]: "Done",
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "Low",
  [TaskPriority.MEDIUM]: "Medium",
  [TaskPriority.HIGH]: "High",
  [TaskPriority.URGENT]: "Urgent",
};

export const TASK_STATUS_COLORS: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "default",
  [TaskStatus.IN_PROGRESS]: "processing",
  [TaskStatus.REVIEW]: "warning",
  [TaskStatus.DONE]: "success",
};

export const TASK_PRIORITY_COLORS: Record<TaskPriority, string>= {
  [TaskPriority.LOW]: "success",
  [TaskPriority.MEDIUM]: "gold",
  [TaskPriority.HIGH]: "warning",
  [TaskPriority.URGENT]: "error",
};

export const TASK_TABS = [
  {
    key: "details",
    label: "Details",
  },
  {
    key: "checklist",
    label: "Checklist",
  },
  {
    key: "comments",
    label: "Comments",
  },
  {
    key: "attachments",
    label: "Attachments",
  },
] as const;