'use client';

import { Typography , Card} from 'antd';
import { useParams } from 'next/navigation';

import { TaskCommentProvider } from '@/contexts/task-comment.context';

import CommentList from '@/components/task/comment/comment-list';

const { Title, Text } = Typography;

function CommentContent() {
  return (
    <Card className="mx-auto max-w-5xl">
      <div className="mb-5">
        <Title
          level={4}
          className="!mb-1"
        >
          Comments
        </Title>

        <Text type="secondary">
          Discuss and collaborate with your team.
        </Text>
      </div>

      <CommentList />
    </Card>
  );
}

export default function CommentPage() {
  const { taskId } = useParams();

  return (
    <TaskCommentProvider
      taskId={taskId as string}
    >
      <CommentContent />
    </TaskCommentProvider>
  );
}