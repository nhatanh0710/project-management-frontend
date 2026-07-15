'use client';

import { Button } from 'antd';

import { useAuth } from '@/contexts/auth.context';
import { useTaskComment } from '@/contexts/task-comment.context';

import {
  CommentReactionType,
  TaskComment,
} from '@/types/task-comment.type';

import styles from './styles.module.scss';

interface Props {
  comment: TaskComment;
}

const reactions = [
  {
    type: CommentReactionType.LIKE,
    emoji: '👍',
  },
  {
    type: CommentReactionType.LOVE,
    emoji: '❤️',
  },
  {
    type: CommentReactionType.LAUGH,
    emoji: '😂',
  },
  {
    type: CommentReactionType.WOW,
    emoji: '😮',
  },
  {
    type: CommentReactionType.SAD,
    emoji: '😢',
  },
  {
    type: CommentReactionType.ANGRY,
    emoji: '😡',
  },
];

export default function ReactionBar({
  comment,
}: Props) {
  const { user } = useAuth();

  const {
    updateReaction,
    removeReaction,
  } = useTaskComment();

  const currentReaction =
    comment.reactions.find(
      (item) =>
        item.user_id._id === user?._id,
    );

  const handleClick = async (
    reaction: CommentReactionType,
  ) => {
    if (
      currentReaction?.reaction ===
      reaction
    ) {
      await removeReaction(
        comment._id,
      );

      return;
    }

    await updateReaction(
      comment._id,
      reaction,
    );
  };

  return (
    <div className={styles.reactionBar}>
      {reactions.map((item) => (
        <Button
          key={item.type}
          type={
            currentReaction?.reaction ===
            item.type
              ? 'primary'
              : 'text'
          }
          onClick={() =>
            handleClick(item.type)
          }
        >
          {item.emoji}
        </Button>
      ))}
    </div>
  );
}