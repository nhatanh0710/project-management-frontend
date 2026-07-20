'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { notificationService } from '@/services/notification.service';

import { Notification } from '@/types/notification.type';

interface NotificationContextType {
  notifications: Notification[];

  unreadCount: number;

  loading: boolean;

  error: string | null;

  refresh: () => Promise<void>;

  markAsRead: (
    id: string,
  ) => Promise<void>;

  markAllAsRead: () => Promise<void>;
}

const NotificationContext =
  createContext<
    NotificationContextType | undefined
  >(undefined);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    notifications,
    setNotifications,
  ] = useState<Notification[]>([]);

  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const refresh = async () => {
    try {
      setLoading(true);

      setError(null);

      const [list, count] =
        await Promise.all([
          notificationService.getMyNotifications(
            {
              page: 1,
              limit: 20,
            },
          ),

          notificationService.getUnreadCount(),
        ]);

      setNotifications(list.data);

      setUnreadCount(count.count);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          'Failed to load notifications',
      );
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (
    id: string,
  ) => {
    await notificationService.markAsRead(
      id,
    );

    setNotifications((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              is_read: true,
            }
          : item,
      ),
    );

    setUnreadCount((prev) =>
      Math.max(prev - 1, 0),
    );
  };

  const markAllAsRead =
    async () => {
      await notificationService.markAllAsRead();

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          is_read: true,
        })),
      );

      setUnreadCount(0);
    };

  useEffect(() => {
    refresh();

    const timer = setInterval(
      refresh,
      30000,
    );

    return () =>
      clearInterval(timer);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,

        unreadCount,

        loading,

        error,

        refresh,

        markAsRead,

        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(
    NotificationContext,
  );

  if (!ctx) {
    throw new Error(
      'useNotification must be used inside NotificationProvider',
    );
  }

  return ctx;
}