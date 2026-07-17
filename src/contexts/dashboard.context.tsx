'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { message } from 'antd';

import { dashboardService } from '@/services/dashboard.service';

import { DashboardData } from '@/types/dashboard.type';

interface DashboardContextType {
  dashboard: DashboardData | null;

  loading: boolean;

  refresh: () => Promise<void>;
}

const DashboardContext =
  createContext<DashboardContextType | undefined>(
    undefined,
  );

export function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const refresh = async () => {
    try {
      setLoading(true);

      const data =
        await dashboardService.getDashboard();

      setDashboard(data);
    } catch (err: any) {
      message.error(
        err?.response?.data?.message ??
          'Load dashboard failed',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dashboard,
        loading,
        refresh,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx =
    useContext(DashboardContext);

  if (!ctx) {
    throw new Error(
      'useDashboard must be used inside DashboardProvider',
    );
  }

  return ctx;
}