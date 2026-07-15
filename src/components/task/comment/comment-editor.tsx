'use client';

import { KeyboardEvent, useState } from 'react';

import {
  Avatar,
  Button,
  Input,
} from 'antd';

import { SendOutlined } from '@ant-design/icons';

import { useAuth } from '@/contexts/auth.context';
import { useTaskComment } from '@/contexts/task-comment.context';

import styles from './styles.module.scss';

const { TextArea } = Input;

export default function CommentEditor() {
  const { user } = useAuth();

  const { createComment } =
    useTaskComment();

  const [content, setContent] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async () => {
      const value =
        content.trim();

      if (!value || loading) {
        return;
      }

      try {
        setLoading(true);

        await createComment(
          value,
        );

        setContent('');
      } finally {
        setLoading(false);
      }
    };

  const handleKeyDown = async (
    e: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      e.key === 'Enter' &&
      !e.shiftKey
    ) {
      e.preventDefault();

      await handleSubmit();
    }
  };

  return (
    <div
      className={
        styles.commentEditor
      }
    >
      <Avatar
        src={user?.avatar_url}
        size={40}
      >
        {user?.name
          ?.charAt(0)
          ?.toUpperCase()}
      </Avatar>

      <div
        className={
          styles.editorContent
        }
      >
        <TextArea
          value={content}
          autoSize={{
            minRows: 3,
            maxRows: 6,
          }}
          maxLength={3000}
          placeholder="Write a comment..."
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
          {/* <span>
            {
              content.length
            }
            /3000
          </span> */}

          <Button
            type="primary"
            icon={
              <SendOutlined />
            }
            loading={loading}
            disabled={
              !content.trim()
            }
            onClick={
              handleSubmit
            }
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
}