'use client';

import { Card, Typography } from 'antd';

import { useParams } from 'next/navigation';

import { TaskAttachmentProvider } from '@/contexts/task-attachment.context';

import AttachmentUpload from '@/components/task/attachment/attachment-upload';
import AttachmentList from '@/components/task/attachment/attachment-list';

import styles from '@/components/task/attachment/styles.module.scss';

const { Title, Text } = Typography;

function AttachmentContent() {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div>
          <Title level={4}>
            Attachments
          </Title>

          <Text type="secondary">
            Upload and manage files.
          </Text>
        </div>

        <AttachmentUpload />
      </div>

      <AttachmentList />
    </Card>
  );
}

export default function AttachmentPage() {
  const { taskId } =
    useParams();

  return (
    <TaskAttachmentProvider
      taskId={taskId as string}
    >
      <AttachmentContent />
    </TaskAttachmentProvider>
  );
}