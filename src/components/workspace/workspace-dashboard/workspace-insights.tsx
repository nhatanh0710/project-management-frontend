'use client';

import dayjs from 'dayjs';

import {
  Card,
  Empty,
  Progress,
  Tag,
} from 'antd';

import {
  CalendarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  HeartOutlined,
} from '@ant-design/icons';

import { useProjectList } from '@/contexts/project-list.context';

import styles from './styles.module.scss';

export default function WorkspaceInsights() {
  const { projects } = useProjectList();

  const today = dayjs();

  const upcoming = [...projects]
    .filter((p) => p.deadline)
    .sort(
      (a, b) =>
        dayjs(a.deadline).valueOf() -
        dayjs(b.deadline).valueOf(),
    )
    .slice(0, 3);

  const attention = projects
    .filter((p) => {
      if (!p.deadline) return false;

      const days = dayjs(
        p.deadline,
      ).diff(today, 'day');

      return (
        days <= 7 &&
        p.progress < 80
      );
    })
    .slice(0, 3);

  const avg =
    projects.reduce(
      (s, p) => s + p.progress,
      0,
    ) /
    (projects.length || 1);

  return (
    <Card
      className={styles.card}
      title="Workspace Insights"
    >
      {/* HEALTH */}

      <section
        className={styles.section}
      >
        <div
          className={styles.sectionTitle}
        >
          <HeartOutlined />

          Workspace Health
        </div>

        <div className={styles.health}>
          <Progress
            percent={Math.round(avg)}
            strokeWidth={10}
          />

          <Tag color="green">
            Average Progress{' '}
            {Math.round(avg)}%
          </Tag>
        </div>
      </section>

      {/* ATTENTION */}

      <section
        className={styles.section}
      >
        <div
          className={styles.sectionTitle}
        >
          <ExclamationCircleOutlined />

          Need Attention
        </div>

        {!attention.length ? (
          <Empty
            image={
              Empty.PRESENTED_IMAGE_SIMPLE
            }
            description="Everything looks good"
          />
        ) : (
          <div className={styles.list}>
            {attention.map((p) => {
              const days =
                dayjs(
                  p.deadline,
                ).diff(
                  today,
                  'day',
                );

              return (
                <div
                  key={p._id}
                  className={
                    styles.item
                  }
                >
                  <div>
                    <div
                      className={
                        styles.name
                      }
                    >
                      {p.name}
                    </div>

                    <div
                      className={
                        styles.sub
                      }
                    >
                      Progress{' '}
                      {p.progress}%
                    </div>
                  </div>

                  <Tag color="orange">
                    {days} days
                  </Tag>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* DEADLINE */}

      <section
        className={styles.section}
      >
        <div
          className={styles.sectionTitle}
        >
          <CalendarOutlined />

          Upcoming
          Deadlines
        </div>

        {!upcoming.length ? (
          <Empty
            image={
              Empty.PRESENTED_IMAGE_SIMPLE
            }
            description="No deadline"
          />
        ) : (
          <div className={styles.list}>
            {upcoming.map((p) => {
              const days =
                dayjs(
                  p.deadline,
                ).diff(
                  today,
                  'day',
                );

              return (
                <div
                  key={p._id}
                  className={
                    styles.item
                  }
                >
                  <div>
                    <div
                      className={
                        styles.name
                      }
                    >
                      {p.name}
                    </div>

                    <div
                      className={
                        styles.sub
                      }
                    >
                      {dayjs(
                        p.deadline,
                      ).format(
                        'DD/MM/YYYY',
                      )}
                    </div>
                  </div>

                  <Tag color="blue">
                    {days} days
                  </Tag>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </Card>
  );
}