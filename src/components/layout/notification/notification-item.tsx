'use client';

import {
  Avatar,
  Typography,
} from 'antd';

import {
  TeamOutlined,
  CheckCircleFilled,
  MessageFilled,
  BellFilled,
} from '@ant-design/icons';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Notification } from '@/types/notification.type';

import styles from './styles.module.scss';

dayjs.extend(relativeTime);

const { Text } = Typography;

interface Props {
  notification: Notification;
  onClick: () => void;
}

export default function NotificationItem({
  notification,
  onClick,
}: Props) {
  const renderAvatar = () => {
    switch (notification.type) {
      case 'project_invited':
        return (
          <Avatar
            className={styles.projectAvatar}
            icon={<TeamOutlined />}
          />
        );

      case 'task_assigned':
        return (
          <Avatar
            className={styles.taskAvatar}
            icon={<CheckCircleFilled />}
          />
        );

      case 'task_comment':
        return (
          <Avatar
            className={styles.commentAvatar}
            icon={<MessageFilled />}
          />
        );

      default:
        return (
          <Avatar
            className={styles.defaultAvatar}
            icon={<BellFilled />}
          />
        );
    }
  };

  return (
    <div
      className={`${styles.item} ${
        !notification.is_read
          ? styles.unread
          : ''
      }`}
      onClick={onClick}
    >
      <div className={styles.avatar}>
        {renderAvatar()}
      </div>

      <div className={styles.body}>
        <div className={styles.top}>
          <Text strong>
            {notification.title}
          </Text>

          {!notification.is_read && (
            <span className={styles.dot} />
          )}
        </div>

        <Text className={styles.content}>
          {notification.content}
        </Text>

        <Text className={styles.time}>
          {dayjs(
            notification.created_at,
          ).fromNow()}
        </Text>
      </div>
    </div>
  );
}