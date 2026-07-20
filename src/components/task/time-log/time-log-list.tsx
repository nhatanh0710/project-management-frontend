'use client';

import { Empty, Spin } from 'antd';

import { useTimeLog } from '@/contexts/time-log.context';

import TimeLogItem from './time-log-item';

import type { TimeLog } from '@/types/time-log.type';

import styles from './styles.module.scss';

interface Props {
  onEdit: (log: TimeLog) => void;
}

export default function TimeLogList({
  onEdit,
}: Props) {
  const {
    logs,
    loading,
    deleteLog,
  } = useTimeLog();

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin />
      </div>
    );
  }

  if (!logs.length) {
    return (
      <div className={styles.card}>
        <Empty description="No time logs yet" />
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {logs.map((log) => (
        <TimeLogItem
          key={log._id}
          log={log}
          onEdit={() => onEdit(log)}
          onDelete={() =>
            deleteLog(log._id)
          }
        />
      ))}
    </div>
  );
}