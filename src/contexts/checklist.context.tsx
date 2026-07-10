'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { message } from 'antd';

import { checklistService } from '@/services/checklist.service';

import type {
  Checklist,
  CreateChecklistPayload,
  UpdateChecklistPayload,
} from '@/types/checklist.type';

interface ChecklistContextType {
  checklists: Checklist[];

  loading: boolean;

  refreshChecklists: () => Promise<void>;

  createChecklist: (
    data: CreateChecklistPayload,
  ) => Promise<void>;

  updateChecklist: (
    checklistId: string,
    data: UpdateChecklistPayload,
  ) => Promise<void>;

  deleteChecklist: (
    checklistId: string,
  ) => Promise<void>;

  completeChecklist: (
    checklistId: string,
  ) => Promise<void>;

  uncompleteChecklist: (
    checklistId: string,
  ) => Promise<void>;

  setChecklists: React.Dispatch<
    React.SetStateAction<Checklist[]>
  >;
}

const ChecklistContext =
  createContext<
    ChecklistContextType | undefined
  >(undefined);

interface ChecklistProviderProps {
  taskId: string;

  children: React.ReactNode;
}

export function ChecklistProvider({
  taskId,
  children,
}: ChecklistProviderProps) {
  const [
    checklists,
    setChecklists,
  ] = useState<Checklist[]>([]);

  const [loading, setLoading] =
    useState(true);

  const refreshChecklists =
    async () => {
      try {
        setLoading(true);

        const res =
          await checklistService.getByTask(
            taskId,
          );

        setChecklists(res);
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Load checklist failed',
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    refreshChecklists();
  }, [taskId]);

  const createChecklist =
    async (
      data: CreateChecklistPayload,
    ) => {
      try {
        await checklistService.create(
          taskId,
          data,
        );

        message.success(
          'Checklist created successfully',
        );

        await refreshChecklists();
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Create checklist failed',
        );
      }
    };

  const updateChecklist =
    async (
      checklistId: string,
      data: UpdateChecklistPayload,
    ) => {
      try {
        await checklistService.update(
          checklistId,
          data,
        );

        message.success(
          'Checklist updated successfully',
        );

        await refreshChecklists();
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Update checklist failed',
        );
      }
    };

  const deleteChecklist =
    async (
      checklistId: string,
    ) => {
      try {
        await checklistService.delete(
          checklistId,
        );

        message.success(
          'Checklist deleted successfully',
        );

        await refreshChecklists();
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Delete checklist failed',
        );
      }
    };

  const completeChecklist =
    async (
      checklistId: string,
    ) => {
      try {
        await checklistService.complete(
          checklistId,
        );

        await refreshChecklists();
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Complete checklist failed',
        );
      }
    };

  const uncompleteChecklist =
    async (
      checklistId: string,
    ) => {
      try {
        await checklistService.uncomplete(
          checklistId,
        );

        await refreshChecklists();
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Uncomplete checklist failed',
        );
      }
    };

  return (
    <ChecklistContext.Provider
      value={{
        checklists,

        loading,

        refreshChecklists,

        createChecklist,

        updateChecklist,

        deleteChecklist,

        completeChecklist,

        uncompleteChecklist,

        setChecklists,
      }}
    >
      {children}
    </ChecklistContext.Provider>
  );
}

export function useChecklist() {
  const context =
    useContext(
      ChecklistContext,
    );

  if (!context) {
    throw new Error(
      'useChecklist must be used inside ChecklistProvider',
    );
  }

  return context;
}