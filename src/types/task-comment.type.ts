
import { User } from './user.type';

export enum CommentReactionType {
  LIKE = 'LIKE',
  LOVE = 'LOVE',
  LAUGH = 'LAUGH',
  WOW = 'WOW',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}


export interface CommentReaction {
  user_id: Pick<User, '_id' | 'name' | 'avatar_url'>;
    //Pick dùng để lấy ra một số thuộc tính của User, tránh việc lộ thông tin nhạy cảm như email, password
  reaction: CommentReactionType;

  reacted_at: string;
}

export interface TaskComment {
  _id: string;

  task_id: string;

  user_id: Pick<User, '_id' | 'name' | 'email' | 'avatar_url'>;

  content: string;

  is_edited: boolean;

  is_deleted: boolean;

  reactions: CommentReaction[];

  created_at: string;

  updated_at: string;
}

export interface CommentPaginationResponse {
  data: TaskComment[];

  pagination: Pagination;
}