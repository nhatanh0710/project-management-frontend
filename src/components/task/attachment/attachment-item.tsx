'use client';

import {
  Avatar,
  Button,
  Popconfirm,
  Tooltip,
  Typography,
} from 'antd';

import {
  DeleteOutlined,
  DownloadOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePptOutlined,
  FileImageOutlined,
  FileZipOutlined,
  FileTextOutlined,
  FileUnknownOutlined,
} from '@ant-design/icons';

import { useTaskAttachment } from '@/contexts/task-attachment.context';

import type { TaskAttachment } from '@/types/task-attachment.type';

import { formatDate } from '@/utils/date';

import styles from './styles.module.scss';

const { Text } = Typography;

interface Props {
  attachment: TaskAttachment;
}

function getFileIcon(type: string) {
  if (type.includes('pdf')) {
    return <FilePdfOutlined />;
  }

  if (
    type.includes('word') ||
    type.includes('document')
  ) {
    return <FileWordOutlined />;
  }

  if (
    type.includes('excel') ||
    type.includes('spreadsheet')
  ) {
    return <FileExcelOutlined />;
  }

  if (
    type.includes('powerpoint') ||
    type.includes('presentation')
  ) {
    return <FilePptOutlined />;
  }

  if (type.startsWith('image/')) {
    return <FileImageOutlined />;
  }

  if (
    type.includes('zip') ||
    type.includes('rar')
  ) {
    return <FileZipOutlined />;
  }

  if (type.includes('text')) {
    return <FileTextOutlined />;
  }

  return <FileUnknownOutlined />;
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
      <div className={styles.icon}>
        <Avatar
          size={50}
          icon={getFileIcon(
            attachment.mime_type,
          )}
        />
      </div>

      <div className={styles.body}>
        <Text
          strong
          className={styles.fileName}
        >
          {attachment.original_name}
        </Text>

        <div className={styles.meta}>
          <Text type="secondary">
            {attachment.file_size_text}
          </Text>

          <span>•</span>

          <Text type="secondary">
            {attachment.uploaded_by.name}
          </Text>

          <span>•</span>

          <Text type="secondary">
            {formatDate(
              attachment.created_at,
            )}
          </Text>
        </div>
      </div>

      <div className={styles.actions}>
        <Tooltip title="Download">
          <Button
            shape="circle"
            icon={<DownloadOutlined />}
            onClick={() =>
              downloadAttachment(
                attachment,
              )
            }
          />
        </Tooltip>

        <Tooltip title="Delete">
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
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Tooltip>
      </div>
    </div>
  );
}