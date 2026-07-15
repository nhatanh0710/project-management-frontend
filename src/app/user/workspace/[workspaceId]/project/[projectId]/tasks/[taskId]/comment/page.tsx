'use client';

import { Card, Typography } from 'antd';
import { useParams } from 'next/navigation';

import { TaskCommentProvider } from '@/contexts/task-comment.context';

import CommentList from '@/components/task/comment/comment-list';



const { Title, Text } = Typography;

function CommentContent() {
  return (
    <Card >
      <div >
        <div>
          <Title level={4}>
            Comments
          </Title>

          <Text type="secondary">
            View and manage task comments.
          </Text>
        </div>
      </div>

      <CommentList />
    </Card>
  );
}

export default function CommentPage() {
  const params = useParams();

  const taskId = params.taskId as string;

  return (
    <TaskCommentProvider taskId={taskId}>
      <CommentContent />
    </TaskCommentProvider>
  );
}