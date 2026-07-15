'use client';

import {
  Avatar,
  Button,
  Popconfirm,
  Typography,
} from 'antd';

import {
  DeleteOutlined,
  DownloadOutlined,
  FileOutlined,
} from '@ant-design/icons';

import { useTaskAttachment } from '@/contexts/task-attachment.context';

import { TaskAttachment } from '@/types/task-attachment.type';

import { formatDate } from '@/utils/date';

import styles from './styles.module.scss';

const { Text } = Typography;

interface Props {
  attachment: TaskAttachment;
}

export default function AttachmentItem({
  attachment,
}: Props) {
  const {
    downloadAttachment,
    deleteAttachment,
  } = useTaskAttachment();

  return (
    <div className={styles.attachmentItem}>
      <Avatar
        icon={<FileOutlined />}
        size={44}
      />

      <div className={styles.body}>
        <Text strong>
          {attachment.original_name}
        </Text>

        <Text type="secondary">
          {attachment.file_size_text}
        </Text>

        <Text type="secondary">
          by {attachment.uploaded_by.name} - Date: 
          {formatDate(
            attachment.created_at,
          )}
        </Text>
      </div>

      <div className={styles.actions}>
        <Button
          icon={<DownloadOutlined />}
          onClick={() =>
            downloadAttachment(
              attachment._id,
            )
          }
        />

        <Popconfirm
          title="Delete attachment?"
          onConfirm={() =>
            deleteAttachment(
              attachment._id,
            )
          }
        >
          <Button
            danger
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      </div>
    </div>
  );
}