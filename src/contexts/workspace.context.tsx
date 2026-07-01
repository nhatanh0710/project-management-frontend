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
  error: string | null;

  refresh: () => Promise<void>;

  currentWorkspace: WorkspaceMember | null;

  setCurrentWorkspace: (
    workspace: WorkspaceMember
  ) => void;

  selectWorkspaceById: (
    id: string
  ) => void;


  openCreate: boolean;
  setOpenCreate: (value: boolean) => void;

  openUpdate: boolean;
  selectedWorkspace: WorkspaceMember | null;

  openUpdateModal: (
    workspace: WorkspaceMember
  ) => void;

  closeUpdateModal: () => void;
}


const WorkspaceContext =
  createContext<WorkspaceContextType | undefined>(
    undefined
  );


export function WorkspaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [workspaces, setWorkspaces] =
    useState<WorkspaceMember[]>([]);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState<string | null>(null);



  const [currentWorkspace, setCurrentWorkspaceState] =
    useState<WorkspaceMember | null>(null);



  const [openCreate, setOpenCreate] =
    useState(false);


  const [openUpdate, setOpenUpdate] =
    useState(false);


  const [selectedWorkspace, setSelectedWorkspace] =
    useState<WorkspaceMember | null>(null);



  const refresh = async () => {

    try {

      setLoading(true);

      setError(null);


      const data =
        await workspaceService.getMyWorkspaces();


      const filtered =
        data.filter(
          (item: any) =>
            item.workspaceId
        );


      setWorkspaces(filtered);



      const savedId =
        localStorage.getItem(
          'currentWorkspaceId'
        );



      if (savedId) {

        const savedWorkspace =
          filtered.find(
            (item: any) =>
              item.workspaceId._id === savedId
          );


        if (savedWorkspace) {

          setCurrentWorkspaceState(
            savedWorkspace
          );

        }

      }


    } catch (err: any) {


      setError(
        err?.response?.data?.message ??
        'Failed to load workspaces'
      );


    } finally {


      setLoading(false);


    }

  };



  const setCurrentWorkspace = (
    workspace: WorkspaceMember
  ) => {

    setCurrentWorkspaceState(
      workspace
    );


    localStorage.setItem(
      'currentWorkspaceId',
      workspace.workspaceId._id
    );

  };



  const selectWorkspaceById = (
    id: string
  ) => {

    const workspace =
      workspaces.find(
        (item) =>
          item.workspaceId._id === id
      );


    if (workspace) {

      setCurrentWorkspace(
        workspace
      );

    }

  };



  const openUpdateModal = (
    workspace: WorkspaceMember
  ) => {

    setSelectedWorkspace(
      workspace
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

        error,


        refresh,


        currentWorkspace,

        setCurrentWorkspace,

        selectWorkspaceById,


        openCreate,

        setOpenCreate,


        openUpdate,

        selectedWorkspace,


        openUpdateModal,

        closeUpdateModal,

      }}

    >

      {children}

    </WorkspaceContext.Provider>

  );

}



export function useWorkspace() {

  const ctx =
    useContext(
      WorkspaceContext
    );


  if (!ctx) {

    throw new Error(
      'useWorkspace must be used inside WorkspaceProvider'
    );

  }


  return ctx;

}