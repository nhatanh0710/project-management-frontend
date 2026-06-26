'use client';

import Link from 'next/link';

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

import styles from './styles.module.scss';
import { useAuth } from '@/contexts/auth.context';
import { useState } from 'react';
const { confirm } = Modal;

interface WorkspaceCardProps {
  workspace: any;
}

export default function WorkspaceCard({
  workspace,
}: WorkspaceCardProps) {
  const {
    refresh,
    openUpdateModal,
  
  } = useWorkspace();
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
      content: `Delete "${data.name}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',

      async onOk() {
        await workspaceService.delete(data._id);
        message.success('Workspace deleted');
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
          Open Workspace
        </Link>
      ),
    },

    ...(canEdit
      ? [
          {
            key: 'edit',
            icon: <EditOutlined />,
            label: 'Edit Workspace',
            onClick: () => openUpdateModal(data),
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
            label: 'Delete Workspace',
            onClick: handleDelete,
          },
        ]
      : []),
  ];

  return (
    <div className={styles.card}>
      {/* TOP */}
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

      {/* DESCRIPTION */}
     <div className={styles.content}>
  <p className={styles.description}>
    {expanded
      ? data.description
      : (data.description?.slice(0, 150) || 'No description.')}

    {data.description?.length > 150 && (
      <span
        onClick={() => setExpanded(!expanded)}
        style={{
          color: '#1677ff',
          cursor: 'pointer',
          marginLeft: 6,
          fontWeight: 500,
        }}
      >
        {expanded ? ' show less' : '... see more'}
      </span>
    )}
  </p>
</div>

      {/* OWNER + MEMBERS */}
      <div className={styles.meta}>
        <div className={styles.member}>
          <TeamOutlined />
          <span>{data.memberCount} members</span> |
          <span>Owner: {data.ownerId?.name}</span>
        </div>
        </div>

      {/* FOOTER */}
      <div className={styles.footer}>
        <Link href={`/user/workspace/${data._id}`}>
          <Button type="link">Open</Button>
        </Link>
      </div>
    </div>
  );
}