'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { workspaceService } from '@/services/workspace.service';
import { WorkspaceMember } from '@/types/workspace.type';

interface WorkspaceContextType {
  workspaces: WorkspaceMember[];
  loading: boolean;

  openCreate: boolean;
  openUpdate: boolean;

  selectedWorkspace: any;

  setOpenCreate: (
    value: boolean,
  ) => void;

  openUpdateModal: (
    workspace: any,
  ) => void;

  closeUpdateModal: () => void;

  refresh: () => Promise<void>;
}

const WorkspaceContext =
  createContext<
    WorkspaceContextType | undefined
  >(undefined);

export function WorkspaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [workspaces, setWorkspaces] =
    useState<WorkspaceMember[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [openCreate, setOpenCreate] =
    useState(false);

  const [openUpdate, setOpenUpdate] =
    useState(false);

  const [
    selectedWorkspace,
    setSelectedWorkspace,
  ] = useState<any>(null);

  const refresh = async () => {
    try {
      setLoading(true);

      const data =
        await workspaceService.getMyWorkspaces();

      setWorkspaces(
        data.filter(
          (item: any) =>
            item.workspaceId,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const openUpdateModal = (
    workspace: any,
  ) => {
    setSelectedWorkspace(
      workspace,
    );

    setOpenUpdate(true);
  };

  const closeUpdateModal = () => {
    setSelectedWorkspace(null);

    setOpenUpdate(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        loading,

        openCreate,
        openUpdate,

        selectedWorkspace,

        setOpenCreate,

        openUpdateModal,
        closeUpdateModal,

        refresh,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context =
    useContext(WorkspaceContext);

  if (!context) {
    throw new Error(
      'useWorkspace must be used inside WorkspaceProvider',
    );
  }

  return context;
}