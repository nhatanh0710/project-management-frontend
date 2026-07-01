'use client';

import { useMemo } from 'react';

import { useAuth } from '@/contexts/auth.context';
import { useProjectMembers } from '@/contexts/project-member.context';

import {
  canAccessSettings,
  canArchiveProject,
  canAssignTask,
  canCreateTask,
  canDeleteFile,
  canDeleteProject,
  canDeleteTask,
  canEditAllTasks,
  canEditProject,
  canInviteMembers,
  canManageMembers,
  canRemoveMembers,
  canUpdateMemberRole,
  canUploadFile,
  canViewProject,
  isManager,
  isMember,
  isOwner,
  isViewer,
} from '@/utils/project-permission';

export function useProjectPermission() {
  const { user } = useAuth();

  const { members } =
    useProjectMembers();

  const currentMember =
    useMemo(() => {
      if (!user) return null;

      return members.find((member) => {
        if (
          typeof member.user_id ===
          'string'
        ) {
          return (
            member.user_id === user._id
          );
        }

        return (
          member.user_id._id === user._id
        );
      });
    }, [members, user]);

  const role =
    currentMember?.role;

  return {
    currentMember,

    role,

    isOwner: isOwner(role),

    isManager: isManager(role),

    isMember: isMember(role),

    isViewer: isViewer(role),

    canViewProject:
      canViewProject(role),

    canEditProject:
      canEditProject(role),

    canArchiveProject:
      canArchiveProject(role),

    canDeleteProject:
      canDeleteProject(role),

    canManageMembers:
      canManageMembers(role),

    canInviteMembers:
      canInviteMembers(role),

    canRemoveMembers:
      canRemoveMembers(role),

    canUpdateMemberRole:
      canUpdateMemberRole(role),

    canCreateTask:
      canCreateTask(role),

    canAssignTask:
      canAssignTask(role),

    canDeleteTask:
      canDeleteTask(role),

    canEditAllTasks:
      canEditAllTasks(role),

    canUploadFile:
      canUploadFile(role),

    canDeleteFile:
      canDeleteFile(role),

    canAccessSettings:
      canAccessSettings(role),
  };
}