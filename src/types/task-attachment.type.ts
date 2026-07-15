import { User } from './user.type';

// ================= QUERY =================

export interface QueryTaskAttachmentDto {
  page?: number;

  limit?: number;
}

// ================= RESPONSE PAGINATION =================

export interface Pagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

// ================= ATTACHMENT =================

export interface TaskAttachment {
  _id: string;

  task_id: string;

  uploaded_by: User;

  original_name: string;

  file_name: string;

  storage_path: string;

  mime_type: string;

  file_size: number;

  file_size_text: string;

  created_at: string;

  updated_at: string;
}