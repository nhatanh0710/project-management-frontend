'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { projectService } from '@/services/project.service';
import { Project } from '@/types/project.type';

interface ProjectListContextType {
  projects: Project[];

  loading: boolean;
  error: string | null;

  refreshProjects: () => Promise<void>;

  setProjects: React.Dispatch<
    React.SetStateAction<Project[]>
  >;

  // Create Modal
  openCreate: boolean;
  setOpenCreate: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  // Update Modal
  openUpdate: boolean;

  selectedProject: Project | null;

  openUpdateModal: (
    project: Project,
  ) => void;

  closeUpdateModal: () => void;
}

const ProjectListContext =
  createContext<
    ProjectListContextType | undefined
  >(undefined);

interface Props {
  workspaceId: string;
  children: React.ReactNode;
}

export function ProjectListProvider({
  workspaceId,
  children,
}: Props) {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [openCreate, setOpenCreate] =
    useState(false);

  const [openUpdate, setOpenUpdate] =
    useState(false);

  const [
    selectedProject,
    setSelectedProject,
  ] = useState<Project | null>(
    null,
  );

  const refreshProjects =
    async () => {
      try {
        setLoading(true);
        setError(null);

        const res =
          await projectService.getByWorkspace(
            {
              workspaceId,
            },
          );

        setProjects(
          res.data ?? res,
        );
      } catch (err: any) {
        setError(
          err?.response?.data
            ?.message ??
            'Failed to load projects',
        );
      } finally {
        setLoading(false);
      }
    };

  const openUpdateModal = (
    project: Project,
  ) => {
    setSelectedProject(project);
    setOpenUpdate(true);
  };

  const closeUpdateModal = () => {
    setSelectedProject(null);
    setOpenUpdate(false);
  };

  useEffect(() => {
    if (workspaceId) {
      refreshProjects();
    }
  }, [workspaceId]);

  return (
    <ProjectListContext.Provider
      value={{
        projects,

        loading,
        error,

        refreshProjects,

        setProjects,

        openCreate,
        setOpenCreate,

        openUpdate,

        selectedProject,

        openUpdateModal,
        closeUpdateModal,
      }}
    >
      {children}
    </ProjectListContext.Provider>
  );
}

export function useProjectList() {
  const context =
    useContext(ProjectListContext);

  if (!context) {
    throw new Error(
      'useProjectList must be used inside ProjectListProvider',
    );
  }

  return context;
}