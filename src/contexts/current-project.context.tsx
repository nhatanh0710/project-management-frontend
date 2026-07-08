'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { projectService } from '@/services/project.service';
import { Project } from '@/types/project.type';

interface CurrentProjectContextType {
  project: Project | null;

  loading: boolean;
  error: string | null;

  refreshProject: () => Promise<void>;

  setProject: (
    project: Project | null,
  ) => void;
}

const CurrentProjectContext =
  createContext<
    CurrentProjectContextType | undefined
  >(undefined);

export function CurrentProjectProvider({
  projectId,
  children,
}: {
  projectId: string;
  children: React.ReactNode;
}) {
  const [project, setProject] =
    useState<Project | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const refreshProject = async () => {
     console.log('CurrentProjectProvider refresh');
    try {
      setLoading(true);
      setError(null);

      const data =
        await projectService.getById(projectId);
      console.log('GET PROJECT SUCCESS', data);
      setProject(data);
    } catch (err: any) {
      console.log('GET PROJECT ERROR', err.response?.status, err.response?.data);

      setError(
        err?.response?.data?.message ??
          'Failed to load project'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId)
      refreshProject();
  }, [projectId]);

  return (
    <CurrentProjectContext.Provider
      value={{
        project,
        loading,
        error,

        refreshProject,

        setProject,
      }}
    >
      {children}
    </CurrentProjectContext.Provider>
  );
}

export function useCurrentProject() {
  const ctx = useContext(
    CurrentProjectContext,
  );

  if (!ctx)
    throw new Error(
      'useCurrentProject must be used inside CurrentProjectProvider',
    );

  return ctx;
}