import { ProjectRole } from '@/types/project-role.type';

export const isOwner = (
  role?: ProjectRole,
) => role === ProjectRole.OWNER;

export const isManager = (
  role?: ProjectRole,
) => role === ProjectRole.MANAGER;

export const isMember = (
  role?: ProjectRole,
) => role === ProjectRole.MEMBER;

export const isViewer = (
  role?: ProjectRole,
) => role === ProjectRole.VIEWER;

/* ---------------- Project ---------------- */

export const canEditProject = (
  role?: ProjectRole,
) =>
  role === ProjectRole.OWNER ||
  role === ProjectRole.MANAGER;

export const canArchiveProject = (
  role?: ProjectRole,
) => role === ProjectRole.OWNER;

export const canDeleteProject = (
  role?: ProjectRole,
) => role === ProjectRole.OWNER;

/* ---------------- Member ---------------- */

export const canManageMembers = (
  role?: ProjectRole,
) =>
  role === ProjectRole.OWNER ||
  role === ProjectRole.MANAGER;

export const canInviteMembers = (
  role?: ProjectRole,
) =>
  role === ProjectRole.OWNER ||
  role === ProjectRole.MANAGER;

export const canRemoveMembers = (
  role?: ProjectRole,
) => role === ProjectRole.OWNER;

export const canUpdateMemberRole = (
  role?: ProjectRole,
) => role === ProjectRole.OWNER;

/* ---------------- Task ---------------- */

export const canCreateTask = (
  role?: ProjectRole,
) =>
  role === ProjectRole.OWNER ||
  role === ProjectRole.MANAGER;

export const canDeleteTask = (
  role?: ProjectRole,
) =>
  role === ProjectRole.OWNER ||
  role === ProjectRole.MANAGER;

export const canAssignTask = (
  role?: ProjectRole,
) =>
  role === ProjectRole.OWNER ||
  role === ProjectRole.MANAGER;

export const canEditAllTasks = (
  role?: ProjectRole,
) =>
  role === ProjectRole.OWNER ||
  role === ProjectRole.MANAGER;

/* ---------------- Files ---------------- */

export const canUploadFile = (
  role?: ProjectRole,
) =>
  role === ProjectRole.OWNER ||
  role === ProjectRole.MANAGER ||
  role === ProjectRole.MEMBER;

export const canDeleteFile = (
  role?: ProjectRole,
) =>
  role === ProjectRole.OWNER ||
  role === ProjectRole.MANAGER;

/* ---------------- Settings ---------------- */

export const canAccessSettings = (
  role?: ProjectRole,
) =>
  role === ProjectRole.OWNER ||
  role === ProjectRole.MANAGER;

/* ---------------- Read ---------------- */

export const canViewProject = (
  role?: ProjectRole,
) => !!role;