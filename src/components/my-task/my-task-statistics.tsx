'use client';

import {
  Card,
} from 'antd';

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FileDoneOutlined,
  ProfileOutlined,
} from '@ant-design/icons';

import { useMyTask } from '@/contexts/my-task.context';

import { TaskStatus } from '@/types/task.type';

import styles from './styles.module.scss';

export default function MyTaskStatistics() {
  const { tasks } = useMyTask();

  const total =
    tasks.length;

  const todo =
    tasks.filter(
      (task) =>
        task.status ===
        TaskStatus.TODO,
    ).length;

  const inProgress =
    tasks.filter(
      (task) =>
        task.status ===
        TaskStatus.IN_PROGRESS,
    ).length;

  const review =
    tasks.filter(
      (task) =>
        task.status ===
        TaskStatus.REVIEW,
    ).length;

  const done =
    tasks.filter(
      (task) =>
        task.status ===
        TaskStatus.DONE,
    ).length;

  const overdue =
    tasks.filter(
      (task) =>
        task.status !==
          TaskStatus.DONE &&
        task.deadline &&
        new Date(task.deadline) <
          new Date(),
    ).length;

  const items = [
    {
      title: 'Assigned',
      value: total,
      icon: (
        <ProfileOutlined />
      ),
    },
    {
      title: 'In Progress',
      value: inProgress,
      icon: (
        <ClockCircleOutlined />
      ),
    },
    {
      title: 'Review',
      value: review,
      icon: (
        <FileDoneOutlined />
      ),
    },
    {
      title: 'Completed',
      value: done,
      icon: (
        <CheckCircleOutlined />
      ),
    },
    {
      title: 'Overdue',
      value: overdue,
      icon: (
        <ExclamationCircleOutlined />
      ),
    },
  ];

  return (
    <div
      className={
        styles.statisticsGrid
      }
    >
      {items.map((item) => (
        <Card
          key={item.title}
          className={
            styles.statisticsCard
          }
        >
          <div
            className={
              styles.statisticsIcon
            }
          >
            {item.icon}
          </div>

          <div
            className={
              styles.statisticsContent
            }
          >
            <span
              className={
                styles.statisticsValue
              }
            >
              {item.value}
            </span>

            <span
              className={
                styles.statisticsLabel
              }
            >
              {item.title}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}