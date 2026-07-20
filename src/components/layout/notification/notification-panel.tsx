'use client';

import {
  Button,
  Empty,
} from 'antd';

import {
  BellOutlined,
  CheckOutlined,
} from '@ant-design/icons';

import NotificationItem from './notification-item';

import { Notification } from '@/types/notification.type';

import styles from './styles.module.scss';

interface Props {
  notifications: Notification[];

  onRead: (
    notification: Notification,
  ) => void;

  onReadAll: () => void;
}

export default function NotificationPanel({
  notifications,
  onRead,
  onReadAll,
}: Props) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.headerLeft}>
          <BellOutlined />

          <span>Notifications</span>
        </div>

        {notifications.length > 0 && (
          <Button
            type="link"
            size="small"
            icon={<CheckOutlined />}
            onClick={onReadAll}
          >
            Mark all as read
          </Button>
        )}
      </div>

      <div className={styles.list}>
        {notifications.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No notifications"
          />
        ) : (
          notifications.map(
            (notification) => (
              <NotificationItem
                key={notification._id}
                notification={
                  notification
                }
                onClick={() =>
                  onRead(notification)
                }
              />
            ),
          )
        )}
      </div>
    </div>
  );
}