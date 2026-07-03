'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Button,
  Modal,
  Typography,
  message,
} from 'antd';

import {
  DeleteOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';

import { useCurrentProject } from '@/contexts/current-project.context';
import { useWorkspace } from '@/contexts/workspace.context';

import { projectService } from '@/services/project.service';

import styles from './styles.module.scss';

const { Paragraph, Text } = Typography;

export default function ProjectSettingDelete() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const { project } =
    useCurrentProject();

  const { currentWorkspace } =
    useWorkspace();

  const handleDelete =
    async () => {
      if (
        !project ||
        !currentWorkspace
      )
        return;

      try {
        setLoading(true);

        await projectService.delete(
          project._id,
        );

        message.success(
          'Project deleted successfully',
        );

        router.push(
          `/user/workspace/${currentWorkspace.workspaceId._id}`,
        );
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Delete project failed',
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <DeleteOutlined />

        <div>
          <h3>Delete Project</h3>

          <p>
            Permanently delete this
            project.
          </p>
        </div>
      </div>

      <Button
        danger
        onClick={() =>
          Modal.confirm({
            title:
              'Delete Project',
            icon: (
              <ExclamationCircleFilled />
            ),
            content: (
              <>
                <Paragraph>
                  Are you sure you
                  want to delete
                  <Text strong>
                    {' '}
                    {project?.name}
                  </Text>
                  ?
                </Paragraph>

                <Paragraph type="secondary">
                  This action cannot
                  be undone.
                </Paragraph>
              </>
            ),
            okText: 'Delete',
            okButtonProps: {
              danger: true,
              loading,
            },
            cancelText: 'Cancel',
            onOk: handleDelete,
          })
        }
      >
        Delete Project
      </Button>
    </div>
  );
}