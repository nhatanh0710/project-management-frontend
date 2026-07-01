'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useAuth } from '@/contexts/auth.context';

import { projectMemberService } from '@/services/project-member.service';

import { ProjectMember } from '@/types/project-member.type';

interface ProjectMemberContextType {
  members: ProjectMember[];

  currentMember: ProjectMember | null;

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
  const { user } = useAuth();

  const [members, setMembers] =
    useState<ProjectMember[]>([]);

  const [currentMember, setCurrentMember] =
    useState<ProjectMember | null>(null);

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

        if (user) {
          const me =
            data.find(
              (
                member: ProjectMember,
              ) => {
                if (
                  typeof member.user_id ===
                  'string'
                ) {
                  return (
                    member.user_id ===
                    user._id
                  );
                }

                return (
                  member.user_id._id ===
                  user._id
                );
              },
            ) ?? null;

          setCurrentMember(me);
        }
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
    if (projectId && user) {
      refreshMembers();
    }
  }, [projectId, user]);

  return (
    <ProjectMemberContext.Provider
      value={{
        members,

        currentMember,

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