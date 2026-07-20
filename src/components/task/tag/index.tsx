'use client';

import { useState } from 'react';

import {
  Button,
  Tag,
  Typography,
} from 'antd';

import {
  EditOutlined,
} from '@ant-design/icons';

import { useCurrentTask } from '@/contexts/current-task.context';

import TagSelector from './tag-selector';

import styles from './styles.module.scss';

const { Title, Text } = Typography;

export default function TaskTags() {
  const { task, refreshTask } =
    useCurrentTask();

  const [editing, setEditing] =
    useState(false);

  if (!task) return null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Title
          level={5}
          className={styles.cardTitle}
        >
          Tags
        </Title>

        {!editing && (
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() =>
              setEditing(true)
            }
          >
            Edit
          </Button>
        )}
      </div>

      {!editing ? (
        task.tag_ids.length ? (
          <div className={styles.tags}>
            {task.tag_ids.map((tag) => (
              <Tag
                key={tag._id}
                color={tag.color}
                variant="outlined"
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
        )
      ) : (
        <TagSelector
          onCancel={() =>
            setEditing(false)
          }
          onSaved={async () => {
            await refreshTask();

            setEditing(false);
          }}
        />
      )}
    </div>
  );
}