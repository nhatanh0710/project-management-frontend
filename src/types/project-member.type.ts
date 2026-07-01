import { ExperienceLevel } from '@/types/experience-level.type';
import { ProjectRole } from '@/types/project-role.type';
import { User } from '@/types/user.type';

export interface ProjectMember {
  _id: string;

  project_id: string;

  user_id: string | User;

  role: ProjectRole;

  skills: string[];

  experience_level: ExperienceLevel;

  max_tasks: number;

  working_hours_per_day: number;

  performance_score: number;

  current_tasks: number;

  total_completed_tasks: number;

  is_active: boolean;

  joined_at: string;

  left_at?: string;

  createdAt?: string;

  updatedAt?: string;
}

export interface MemberItemPayload {
  user_id: string;

  role?: ProjectRole;

  skills?: string[];

  experience_level?: ExperienceLevel;

  max_tasks?: number;

  working_hours_per_day?: number;
}

export interface AddMembersPayload {
  members: MemberItemPayload[];
}

export interface UpdateMemberPayload {
  role?: ProjectRole;

  skills?: string[];

  experience_level?: ExperienceLevel;

  max_tasks?: number;

  working_hours_per_day?: number;
}