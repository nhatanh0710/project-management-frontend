import { useCurrentProject } from '@/contexts/current-project.context';

export function useProjectPermission() {
  const { currentMember } = useProjectMembers();
  const { project } = useCurrentProject();

  const role = currentMember?.role;
  const isArchived = project?.is_archived ?? false;

  return {
    currentMember,
    project,
    role,

    isArchived,

    isOwner: isOwner(role),
    isManager: isManager(role),
    isMember: isMember(role),
    isViewer: isViewer(role),

    canViewProject: canViewProject(role),

    canEditProject:
      !isArchived && canEditProject(role),

    canArchiveProject:
      !isArchived && canArchiveProject(role),

    canDeleteProject:
      !isArchived && canDeleteProject(role),

    canManageMembers:
      !isArchived && canManageMembers(role),

    canInviteMembers:
      !isArchived && canInviteMembers(role),

    canRemoveMembers:
      !isArchived && canRemoveMembers(role),

    canUpdateMemberRole:
      !isArchived && canUpdateMemberRole(role),

    canCreateTask:
      !isArchived && canCreateTask(role),

    canAssignTask:
      !isArchived && canAssignTask(role),

    canDeleteTask:
      !isArchived && canDeleteTask(role),

    canEditAllTasks:
      !isArchived && canEditAllTasks(role),

    canUploadFile:
      !isArchived && canUploadFile(role),

    canDeleteFile:
      !isArchived && canDeleteFile(role),

    canAccessSettings:
      canAccessSettings(role),
  };
}