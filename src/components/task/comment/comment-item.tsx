'use client';

import {
  useState,
  KeyboardEvent,
} from 'react';

import {
  Avatar,
  Button,
  Input,
  Popconfirm,
  Space,
  Tag,
  Typography,
} from 'antd';

import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { useAuth } from '@/contexts/auth.context';
import { useTaskComment } from '@/contexts/task-comment.context';

import ReactionBar from './reaction-bar';

import type { TaskComment } from '@/types/task-comment.type';
import { formatDate } from '@/utils/date';

import styles from './styles.module.scss';

const { Text } = Typography;
const { TextArea } = Input;

interface Props {
  comment: TaskComment;
}

export default function CommentItem({
  comment,
}: Props) {
  const { user } = useAuth();

  const {
    updateComment,
    deleteComment,
  } = useTaskComment();

  const [editing, setEditing] =
    useState(false);

  const [content, setContent] =
    useState(comment.content);

  const [loading, setLoading] =
    useState(false);

  const isOwner =
    user?._id === comment.user_id._id;

  const handleSave =
    async () => {
      const value =
        content.trim();

      if (
        !value ||
        value === comment.content
      ) {
        setEditing(false);
        return;
      }

      try {
        setLoading(true);

        await updateComment(
          comment._id,
          value,
        );

        setEditing(false);
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async () => {
      await deleteComment(
        comment._id,
      );
    };

  const handleKeyDown = async (
    e: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      e.key === 'Enter' &&
      !e.shiftKey
    ) {
      e.preventDefault();

      await handleSave();
    }
  };

  return (
    <div className={styles.commentItem}>
      <Avatar
        size={42}
        src={comment.user_id.avatar_url}
      >
        {comment.user_id.name
          ?.charAt(0)
          ?.toUpperCase()}
      </Avatar>

      <div className={styles.commentBody}>
        <div className={styles.commentHeader}>
          <div className={styles.userInfo}>
            <Text strong>
              {comment.user_id.name}
            </Text>

            <Text
              type="secondary"
              className={styles.date}
            >
              {formatDate(
                comment.created_at,
              )}
            </Text>

            {comment.is_edited && (
              <Tag color="blue">
                Edited
              </Tag>
            )}
          </div>

          {isOwner &&
            !editing && (
              <Space
                size={0}
                className={
                  styles.actionButtons
                }
              >
                <Button
                  type="text"
                  icon={
                    <EditOutlined />
                  }
                  onClick={() =>
                    setEditing(
                      true,
                    )
                  }
                />

                <Popconfirm
                  title="Delete this comment?"
                  onConfirm={
                    handleDelete
                  }
                >
                  <Button
                    danger
                    type="text"
                    icon={
                      <DeleteOutlined />
                    }
                  />
                </Popconfirm>
              </Space>
            )}
        </div>

        {editing ? (
          <>
            <TextArea
              value={content}
              autoSize={{
                minRows: 3,
                maxRows: 6,
              }}
              maxLength={3000}
              onChange={(e) =>
                setContent(
                  e.target.value,
                )
              }
              onKeyDown={
                handleKeyDown
              }
            />

            <div
              className={
                styles.editorFooter
              }
            >
              <Button
                onClick={() => {
                  setContent(
                    comment.content,
                  );

                  setEditing(
                    false,
                  );
                }}
              >
                Cancel
              </Button>

              <Button
                type="primary"
                loading={loading}
                onClick={
                  handleSave
                }
              >
                Save
              </Button>
            </div>
          </>
        ) : (
          <>
            <div
              className={
                styles.commentContent
              }
            >
              {comment.content}
            </div>

            <ReactionBar
              comment={comment}
            />
          </>
        )}
      </div>
    </div>
  );
}