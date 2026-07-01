'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { projectMemberService } from '@/services/project-member.service';

import { ProjectMember } from '@/types/project-member.type';

interface ProjectMemberContextType {
  members: ProjectMember[];

  loading: boolean;

  error: string | null;

  refreshMembers: () => Promise<void>;

  setMembers: (
    members: ProjectMember[],
  ) => void;
}

const ProjectMemberContext =
  createContext<
    ProjectMemberContextType | undefined
  >(undefined);

export function ProjectMemberProvider({
  projectId,
  children,
}: {
  projectId: string;

  children: React.ReactNode;
}) {
  const [members, setMembers] =
    useState<ProjectMember[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const refreshMembers =
    async () => {
      try {
        setLoading(true);

        setError(null);

        const data =
          await projectMemberService.getMembers(
            projectId,
          );

        setMembers(data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ??
            'Failed to load project members',
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (projectId) {
      refreshMembers();
    }
  }, [projectId]);

  return (
    <ProjectMemberContext.Provider
      value={{
        members,

        loading,

        error,

        refreshMembers,

        setMembers,
      }}
    >
      {children}
    </ProjectMemberContext.Provider>
  );
}

export function useProjectMembers() {
  const ctx = useContext(
    ProjectMemberContext,
  );

  if (!ctx) {
    throw new Error(
      'useProjectMembers must be used inside ProjectMemberProvider',
    );
  }

  return ctx;
}