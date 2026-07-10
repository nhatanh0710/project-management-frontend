export interface TaskMember {
  _id: string;

  task_id: string;

  user_id: {
    _id: string;

    name: string;

    email: string;

    avatar_url?: string | null;
  };

  is_leader: boolean;

  is_active: boolean;

  joined_at?: string;

  left_at?: string;
}