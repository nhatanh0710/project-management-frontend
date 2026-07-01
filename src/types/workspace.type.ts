export interface CreateWorkspaceDto {
  name: string;
  description?: string;
}

export interface Workspace {
  createdAt: string | number | Date;
  _id: string;
  name: string;
  description?: string;
  slug: string;
  memberCount?: number;
}

export interface WorkspaceMember {
  workspaceId: Workspace;
  role: string;
  joinedAt?: string;
}