'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { message } from 'antd';

import { timeLogService } from '@/services/time-log.service';

import type {
  TimeLog,
  CreateTimeLogPayload,
  UpdateTimeLogPayload,
} from '@/types/time-log.type';

interface TimeLogContextType {
  logs: TimeLog[];

  loading: boolean;

  totalHours: number;

  selectedLog: TimeLog | null;

  setSelectedLog: React.Dispatch<
    React.SetStateAction<TimeLog | null>
  >;

  openCreate: boolean;

  setOpenCreate: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  openUpdate: boolean;

  setOpenUpdate: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  refreshLogs: () => Promise<void>;

  createLog: (
    data: CreateTimeLogPayload,
  ) => Promise<void>;

  updateLog: (
    id: string,
    data: UpdateTimeLogPayload,
  ) => Promise<void>;

  deleteLog: (
    id: string,
  ) => Promise<void>;
}

const TimeLogContext =
  createContext<
    TimeLogContextType | undefined
  >(undefined);

export function TimeLogProvider({
  taskId,
  children,
}: {
  taskId: string;
  children: React.ReactNode;
}) {
  const [logs, setLogs] =
    useState<TimeLog[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [
    selectedLog,
    setSelectedLog,
  ] = useState<TimeLog | null>(
    null,
  );

  const [
    openCreate,
    setOpenCreate,
  ] = useState(false);

  const [
    openUpdate,
    setOpenUpdate,
  ] = useState(false);

  const totalHours = useMemo(
    () =>
      logs.reduce(
        (sum, log) => sum + log.hours,
        0,
      ),
    [logs],
  );

  const refreshLogs =
    async () => {
      try {
        setLoading(true);

        const res =
          await timeLogService.getByTask(
            taskId,
          );

        setLogs(res.data);
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Load time logs failed',
        );
      } finally {
        setLoading(false);
      }
    };

  const createLog =
    async (
      data: CreateTimeLogPayload,
    ) => {
      try {
        await timeLogService.create(
          data,
        );

        setOpenCreate(false);

        await refreshLogs();

        message.success(
          'Time log created successfully',
        );
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Create time log failed',
        );
      }
    };

  const updateLog =
    async (
      id: string,
      data: UpdateTimeLogPayload,
    ) => {
      try {
        await timeLogService.update(
          id,
          data,
        );

        setOpenUpdate(false);

        setSelectedLog(null);

        await refreshLogs();

        message.success(
          'Time log updated successfully',
        );
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Update time log failed',
        );
      }
    };

  const deleteLog =
    async (id: string) => {
      try {
        await timeLogService.delete(id);

        await refreshLogs();

        message.success(
          'Time log deleted successfully',
        );
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Delete time log failed',
        );
      }
    };

  useEffect(() => {
    if (taskId) {
      refreshLogs();
    }
  }, [taskId]);

  return (
    <TimeLogContext.Provider
      value={{
        logs,

        loading,

        totalHours,

        selectedLog,
        setSelectedLog,

        openCreate,
        setOpenCreate,

        openUpdate,
        setOpenUpdate,

        refreshLogs,

        createLog,

        updateLog,

        deleteLog,
      }}
    >
      {children}
    </TimeLogContext.Provider>
  );
}

export function useTimeLog() {
  const context =
    useContext(TimeLogContext);

  if (!context) {
    throw new Error(
      'useTimeLog must be used inside TimeLogProvider',
    );
  }

  return context;
}