'use client';

import { Tag, Typography } from 'antd';

import { useCurrentTask } from '@/contexts/current-task.context';

import styles from './styles.module.scss';

const { Title, Text } = Typography;

interface TaskTag {
  _id: string;
  name: string;
  color?: string;
}

export default function TaskTags() {
  const { task } = useCurrentTask();

  if (!task) return null;

  const tags = (task.tag_ids as TaskTag[]) ?? [];

  return (
    <div className={styles.card}>
      <Title
        level={5}
        className={styles.cardTitle}
      >
        Tags
      </Title>

      {tags.length > 0 ? (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Tag
              key={tag._id}
              color={tag.color || 'blue'}
            >
              {tag.name}
            </Tag>
          ))}
        </div>
      ) : (
        <Text
          type="secondary"
          italic
        >
          No tags assigned.
        </Text>
      )}
    </div>
  );
}