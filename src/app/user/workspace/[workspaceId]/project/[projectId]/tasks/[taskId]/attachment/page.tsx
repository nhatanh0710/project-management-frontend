'use client';

import { Card, Typography } from 'antd';
import { useParams } from 'next/navigation';

import { TaskAttachmentProvider } from '@/contexts/task-attachment.context';

import AttachmentUpload from '@/components/task/attachment/attachment-upload';
import AttachmentList from '@/components/task/attachment/attachment-list';

const { Title, Text } = Typography;

function AttachmentContent() {
  return (
    <Card className="mx-auto max-w-5xl">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <Title
            level={4}
            className="!mb-1"
          >
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
  const { taskId } = useParams();

  return (
    <TaskAttachmentProvider
      taskId={taskId as string}
    >
      <AttachmentContent />
    </TaskAttachmentProvider>
  );
}