'use client';

import Link from 'next/link';
import { useState } from 'react';

import {
  Avatar,
  Button,
  Dropdown,
  MenuProps,
  Modal,
  message,
} from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  TeamOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';

import { workspaceService } from '@/services/workspace.service';
import { useWorkspace } from '@/contexts/workspace.context';
import { useAuth } from '@/contexts/auth.context';

import styles from './styles.module.scss';

const { confirm } = Modal;

interface WorkspaceCardProps {
  workspace: any;
}

export default function WorkspaceCard({
  workspace,
}: WorkspaceCardProps) {
  const { refresh, openUpdateModal } = useWorkspace();
  const { user } = useAuth();

  const [expanded, setExpanded] = useState(false);

  const data = workspace.workspaceId;
  if (!data) return null;

  const userId = user?.userId || user?._id;

  const ownerId =
    typeof data.ownerId === 'string'
      ? data.ownerId
      : data.ownerId?._id;

  const canEdit =
    user?.role === 'ADMIN' ||
    String(ownerId) === String(userId);

  const handleDelete = () => {
    confirm({
      title: 'Delete Workspace',
      icon: <ExclamationCircleFilled />,
      content: `Delete "${data.name}"?`,
      okType: 'danger',

      async onOk() {
        await workspaceService.delete(data._id);
        message.success('Deleted');
        await refresh();
      },
    });
  };

  const items: MenuProps['items'] = [
    {
      key: 'open',
      icon: <EyeOutlined />,
      label: (
        <Link href={`/user/workspace/${data._id}`}>
          Open
        </Link>
      ),
    },

    ...(canEdit
      ? [
          {
            key: 'edit',
            icon: <EditOutlined />,
            label: 'Edit',
            onClick: () => openUpdateModal(workspace),
          },
        ]
      : []),

    ...(canEdit
      ? [
          {
            type: 'divider' as const,
          },
          {
            key: 'delete',
            icon: <DeleteOutlined />,
            danger: true,
            label: 'Delete',
            onClick: handleDelete,
          },
        ]
      : []),
  ];

  return (
    <div className={styles.card}>
      {/* LEFT */}
      <div className={styles.left}>
        <div className={styles.top}>
          <div className={styles.titleWrapper}>
            <Avatar size={28} className={styles.avatar}>
              {data.name?.charAt(0)?.toUpperCase()}
            </Avatar>

            <div className={styles.title}>
              {data.name}
            </div>
          </div>

          <Dropdown menu={{ items }} trigger={['click']}>
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </div>

        <div className={styles.description}>
          {expanded
            ? data.description
            : (data.description?.slice(0, 120) ||
              'No description.')}

          {data.description?.length > 120 && (
            <span
              onClick={() => setExpanded(!expanded)}
              className={styles.more}
            >
              {expanded ? ' show less' : '... more'}
            </span>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <div className={styles.meta}>
          <TeamOutlined />
          <span>{data.memberCount}</span>
        </div>

        <div className={styles.owner}>
          Owner: {data.ownerId?.name}
        </div>

        <Link href={`/user/workspace/${data._id}`}>
          <Button type="primary" block>
            Open
          </Button>
        </Link>
      </div>
    </div>
  );
}