/* ================= Enums ================= */

export enum ProjectRole {
  OWNER = 'owner',
  MANAGER = 'manager',
  MEMBER = 'member',
  VIEWER = 'viewer',
}

export enum ExperienceLevel {
  FRESHER = 'fresher',
  JUNIOR = 'junior',
  MIDDLE = 'middle',
  SENIOR = 'senior',
}

/* ================= User ================= */

export interface ProjectMemberUser {
  _id: string;

  name: string;

  email: string;

  avatarUrl?: string;

  role?: string
}

/* ================= Project Member ================= */

export interface ProjectMember {
  _id: string;

  project_id: string;

  user_id: string;

  user: ProjectMemberUser;

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

/* ================= Payload ================= */

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

/* ===== Update Profile ===== */

export interface UpdateMemberProfilePayload {
  skills?: string[];

  experience_level?: ExperienceLevel;

  max_tasks?: number;

  working_hours_per_day?: number;
}

/* ===== Update Role ===== */

export interface UpdateMemberRolePayload {
  role: ProjectRole;
}


