'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { message } from 'antd';

import { dashboardService } from '@/services/dashboard.service';

import type {
  DashboardStatistics,
} from '@/types/dashboard.type';

import type { Task } from '@/types/task.type';

interface DashboardContextType {
  statistics: DashboardStatistics | null;

  recentTasks: Task[];

  loading: boolean;

  refreshDashboard: () => Promise<void>;
}

const DashboardContext =
  createContext<
    DashboardContextType | undefined
  >(undefined);

export function DashboardProvider({
  projectId,
  children,
}: {
  projectId: string;
  children: React.ReactNode;
}) {
  const [
    statistics,
    setStatistics,
  ] =
    useState<DashboardStatistics | null>(
      null,
    );

  const [
    recentTasks,
    setRecentTasks,
  ] = useState<Task[]>([]);

  const [loading, setLoading] =
    useState(false);

  const refreshDashboard =
    async () => {
      try {
        setLoading(true);

        const [
          statisticsData,
          recentTasksData,
        ] = await Promise.all([
          dashboardService.getStatistics(
            projectId,
          ),

          dashboardService.getRecentTasks(
            projectId,
          ),
        ]);

        setStatistics(
          statisticsData,
        );

        setRecentTasks(
          recentTasksData,
        );
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Load dashboard failed',
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    refreshDashboard();
  }, [projectId]);

  return (
    <DashboardContext.Provider
      value={{
        statistics,

        recentTasks,

        loading,

        refreshDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context =
    useContext(DashboardContext);

  if (!context) {
    throw new Error(
      'useDashboard must be used inside DashboardProvider',
    );
  }

  return context;
}