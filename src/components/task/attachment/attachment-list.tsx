'use client';

import {
  Empty,
  Skeleton,
} from 'antd';

import { useTaskAttachment } from '@/contexts/task-attachment.context';

import AttachmentItem from './attachment-item';

import styles from './styles.module.scss';

export default function AttachmentList() {
  const {
    attachments,
    loading,
  } = useTaskAttachment();

  if (loading) {
    return (
      <>
        <Skeleton active />
        <Skeleton active />
      </>
    );
  }

  if (!attachments.length) {
    return (
      <Empty description="No attachments" />
    );
  }

  return (
    <div className={styles.list}>
      {attachments.map(
        (attachment) => (
          <AttachmentItem
            key={attachment._id}
            attachment={attachment}
          />
        ),
      )}
    </div>
  );
}