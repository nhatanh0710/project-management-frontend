'use client';

import { useState } from 'react';

import {
  Button,
  Modal,
  Typography,
  message,
} from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';

import { useCurrentProject } from '@/contexts/current-project.context';

import { projectService } from '@/services/project.service';

import styles from './styles.module.scss';

const { Paragraph } = Typography;

export default function ProjectSettingsArchive() {
  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const {
    project,
    refreshProject,
  } = useCurrentProject();

  if (!project) return null;

  const isArchived =
    project.is_archived;

  const handleConfirm =
    async () => {
      try {
        setLoading(true);

        if (isArchived) {
          await projectService.restore(
            project._id,
          );

          message.success(
            'Project restored successfully',
          );
        } else {
          await projectService.archive(
            project._id,
          );

          message.success(
            'Project archived successfully',
          );
        }

        await refreshProject();

        setOpen(false);
      } catch (err: any) {
        message.error(
          err?.response?.data?.message ??
            'Operation failed',
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2
            className={
              styles.cardTitle
            }
          >
            Archive
          </h2>

          <p
            className={
              styles.cardDescription
            }
          >
            Archive this project to make
            it read-only. You can restore
            it later at any time.
          </p>
        </div>

        <div className={styles.actions}>
          <Button
            type={
              isArchived
                ? 'primary'
                : 'default'
            }
            onClick={() =>
              setOpen(true)
            }
          >
            {isArchived
              ? 'Restore Project'
              : 'Archive Project'}
          </Button>
        </div>
      </div>

      <Modal
        open={open}
        footer={null}
        width={480}
        title={
          isArchived
            ? 'Restore Project'
            : 'Archive Project'
        }
        onCancel={() =>
          setOpen(false)
        }
      >
        <div className={styles.content}>
          <ExclamationCircleFilled
            className={styles.icon}
          />

          <Paragraph>
            {isArchived
              ? 'Are you sure you want to restore this project?'
              : 'Are you sure you want to archive this project?'}
          </Paragraph>

          <Paragraph type="secondary">
            {isArchived
              ? 'The project will become active again and members can continue working.'
              : 'Archived projects become read-only until they are restored.'}
          </Paragraph>

          <div
            className={
              styles.footer
            }
          >
            <Button
              onClick={() =>
                setOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              type="primary"
              loading={loading}
              onClick={
                handleConfirm
              }
            >
              {isArchived
                ? 'Restore'
                : 'Archive'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}