'use client';

import { useState } from 'react';

import {
  Button,
  Card,
  Progress,
  Space,
  Typography,
} from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { ChecklistProvider, useChecklist } from '@/contexts/checklist.context';

import ChecklistForm from '@/components/task/checklist/checklist-form';
import ChecklistList from '@/components/task/checklist/checklist-list';

import styles from '@/components/task/checklist/styles.module.scss';

const { Title, Text } = Typography;

function ChecklistContent() {
  const { checklists } = useChecklist();

  const [openCreate, setOpenCreate] = useState(false);

  const completed = checklists.filter(
    (item) => item.is_done,
  ).length;

  const percent =
    checklists.length === 0
      ? 0
      : Math.round(
          (completed / checklists.length) * 100,
        );

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div>
          <Title level={4}>
            Checklist
          </Title>

          <Text type="secondary">
            Manage task checklist items.
          </Text>
        </div>

        {!openCreate && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() =>
              setOpenCreate(true)
            }
          >
            Add Checklist
          </Button>
        )}
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <Text strong>
            Progress 
          </Text>

          <Text type="secondary">
            : {completed} / {checklists.length} completed
          </Text>
        </div>

        <Progress percent={percent} />
      </div>

      {openCreate && (
        <ChecklistForm
          onCancel={() =>
            setOpenCreate(false)
          }
        />
      )}

      <ChecklistList />
    </Card>
  );
}



import { useParams } from 'next/navigation';

export default function ChecklistPage() {
    const params = useParams();

    const taskId = params.taskId as string;

    return (
        <ChecklistProvider taskId={taskId}>
            <ChecklistContent />
        </ChecklistProvider>
    );
}