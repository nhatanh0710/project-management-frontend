'use client';

import {
  Avatar,
  Button,
  Popconfirm,
  Space,
  Typography,
} from 'antd';

import {
  ClockCircleOutlined,
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';

import dayjs from 'dayjs';

import type { TimeLog } from '@/types/time-log.type';

import styles from './styles.module.scss';

const { Text } = Typography;

interface Props {
  log: TimeLog;

  onEdit: () => void;

  onDelete: () => void;
}

export default function TimeLogItem({
  log,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <div className={styles.avatar}>
          <Avatar
            size={46}
            src={log.user_id?.avatar_url}
            icon={<UserOutlined />}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.headerRow}>
            <Text className={styles.user}>
              {log.user_id?.name ??
                'Unknown User'}
            </Text>

            <div className={styles.badge}>
              <ClockCircleOutlined />
              {log.hours}h
            </div>
          </div>

          <div className={styles.description}>
            {log.description ||
              'No description'}
          </div>

          <div className={styles.meta}>
            <span>
              <CalendarOutlined />

              {dayjs(
                log.work_date,
              ).format('DD/MM/YYYY')}
            </span>
          </div>
        </div>
      </div>

      <Space>
        <Button
          icon={<EditOutlined />}
          onClick={onEdit}
        >
          Edit
        </Button>

        <Popconfirm
          title="Delete this time log?"
          onConfirm={onDelete}
        >
          <Button
            danger
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>
      </Space>
    </div>
  );
}