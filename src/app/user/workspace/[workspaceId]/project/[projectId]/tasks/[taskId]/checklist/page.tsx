'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import { Button, Card, Progress, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {
  ChecklistProvider,
  useChecklist,
} from '@/contexts/checklist.context';

import ChecklistForm from '@/components/task/checklist/checklist-form';
import ChecklistList from '@/components/task/checklist/checklist-list';

const { Title, Text } = Typography;

function ChecklistContent() {
  const { checklists } = useChecklist();

  const [openCreate, setOpenCreate] =
    useState(false);

  const completed = checklists.filter(
    (item) => item.is_done,
  ).length;

  const percent =
    checklists.length === 0
      ? 0
      : Math.round(
          (completed / checklists.length) *
            100,
        );

  return (
    <Card className="mx-auto max-w-5xl">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <Title
            level={4}
            className="!mb-1"
          >
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

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">
            Progress
          </span>

          <span className="text-slate-500">
            {completed} / {checklists.length}{' '}
            completed
          </span>
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

export default function ChecklistPage() {
  const { taskId } = useParams();

  return (
    <ChecklistProvider taskId={taskId as string}>
      <ChecklistContent />
    </ChecklistProvider>
  );
}