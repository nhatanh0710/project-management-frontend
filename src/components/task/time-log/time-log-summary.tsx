'use client';

import {
  ClockCircleOutlined,
  CalendarOutlined,
  FireOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';

import { useTimeLog } from '@/contexts/time-log.context';

import styles from './styles.module.scss';

export default function TimeLogSummary() {
  const { logs } = useTimeLog();

  const totalHours = logs.reduce(
    (sum, log) => sum + log.hours,
    0,
  );

  const today = new Date();

  const todayHours = logs
    .filter((log) => {
      const d = new Date(log.work_date);

      return (
        d.getFullYear() === today.getFullYear() &&
        d.getMonth() === today.getMonth() &&
        d.getDate() === today.getDate()
      );
    })
    .reduce(
      (sum, log) => sum + log.hours,
      0,
    );

  const weekStart = new Date(today);
  weekStart.setDate(
    today.getDate() - today.getDay(),
  );

  const weekHours = logs
    .filter(
      (log) =>
        new Date(log.work_date) >= weekStart,
    )
    .reduce(
      (sum, log) => sum + log.hours,
      0,
    );

  const cards = [
    {
      icon: <ClockCircleOutlined />,
      title: 'Total Hours',
      value: `${totalHours}h`,
      className: styles.primary,
    },
    {
      icon: <CalendarOutlined />,
      title: 'Today',
      value: `${todayHours}h`,
      className: styles.success,
    },
    {
      icon: <FireOutlined />,
      title: 'This Week',
      value: `${weekHours}h`,
      className: styles.warning,
    },
    {
      icon: <FileDoneOutlined />,
      title: 'Entries',
      value: logs.length,
      className: styles.info,
    },
  ];

  return (
    <div className={styles.summary}>
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${styles.summaryCard} ${card.className}`}
        >
          <div className={styles.summaryIcon}>
            {card.icon}
          </div>

          <div>
            <div className={styles.summaryLabel}>
              {card.title}
            </div>

            <div className={styles.summaryValue}>
              {card.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}