'use client';

import { Typography } from 'antd';

import { useCurrentTask } from '@/contexts/current-task.context';

import styles from './styles.module.scss';

const { Title, Paragraph } = Typography;

export default function TaskDescription() {
  const { task } = useCurrentTask();

  if (!task) return null;

  return (
    <div className={styles.card}>
      <Title
        level={5}
        className={styles.cardTitle}
      >
        Description
      </Title>

      {task.description ? (
        <Paragraph className={styles.description}>
          {task.description}
        </Paragraph>
      ) : (
        <Paragraph
          type="secondary"
          italic
        >
          No description provided.
        </Paragraph>
      )}
    </div>
  );
}