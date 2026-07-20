'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Badge,
} from 'antd';

import {
  BellOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import NotificationPanel from './notification-panel';

import styles from './styles.module.scss';

import { Notification } from '@/types/notification.type';

import { notificationService } from '@/services/notification.service';

export default function NotificationCenter() {
  const [open, setOpen] =
    useState(false);
const router = useRouter();
  const [
    notifications,
    setNotifications,
  ] = useState<Notification[]>([]);

  const [unread, setUnread] =
    useState(0);

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  // =============================
  // LOAD
  // =============================

  const loadNotifications =
    async () => {
      try {
        const [
          listRes,
          unreadRes,
        ] = await Promise.all([
          notificationService.getMyNotifications(
            {
              page: 1,
              limit: 20,
            },
          ),
          notificationService.getUnreadCount(),
        ]);

        setNotifications(
          listRes.data,
        );

        setUnread(
          unreadRes.count,
        );
      } catch (err) {
        console.error(err);
      }
    };

 useEffect(() => {
  loadNotifications();

  const interval = setInterval(() => {
    loadNotifications();
  }, 5000);

  return () => clearInterval(interval);
}, []);

  // =============================
  // CLICK OUTSIDE
  // =============================

  useEffect(() => {
    const handleClickOutside = (
      e: MouseEvent,
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          e.target as Node,
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
  }, []);

  // =============================
  // MARK READ
  // =============================

 const handleRead = async (
  notification: Notification,
) => {
  try {
    if (!notification.is_read) {
      await notificationService.markAsRead(
        notification._id,
      );
    }

    setNotifications((prev) =>
      prev.map((item) =>
        item._id === notification._id
          ? {
              ...item,
              is_read: true,
            }
          : item,
      ),
    );

    setUnread((prev) =>
      Math.max(
        prev -
          (notification.is_read
            ? 0
            : 1),
        0,
      ),
    );

    if (notification.url) {
      router.push(notification.url);
    }
  } catch (err) {
    console.error(err);
  }
};
  // =============================
  // MARK ALL
  // =============================

  const handleReadAll =
    async () => {
      try {
        await notificationService.markAllAsRead();

        setNotifications(
          (prev) =>
            prev.map((item) => ({
              ...item,
              is_read: true,
            })),
        );

        setUnread(0);
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
    >
      <Badge
        count={unread}
        size="small"
      >
        <div
          className={styles.button}
          onClick={() =>
            setOpen(!open)
          }
        >
          <BellOutlined />
        </div>
      </Badge>

      {open && (
        <NotificationPanel
          notifications={
            notifications
          }
          onRead={handleRead}
          onReadAll={
            handleReadAll
          }
        />
      )}
    </div>
  );
}