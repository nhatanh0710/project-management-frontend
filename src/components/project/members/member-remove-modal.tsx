'use client';

import {
  Button,
  Modal,
  Typography,
  message,
} from 'antd';

import {
  ExclamationCircleFilled,
} from '@ant-design/icons';

import { useProjectMember } from '@/contexts/project-member.context';

import styles from './styles.module.scss';

const { Paragraph } = Typography;

export default function MemberRemoveModal() {
  const {
    openRemove,
    setOpenRemove,
    selectedMember,
    removeMember,
  } = useProjectMember();

  const handleClose = () => {
    setOpenRemove(false);
  };

  const handleRemove = async () => {
    if (!selectedMember) return;

    try {
      const userId =
        typeof selectedMember.user_id === 'string'
          ? selectedMember.user_id
          : selectedMember.user_id._id;

      await removeMember(userId);

      handleClose();
    } catch (err: any) {
      message.error(
        err?.response?.data?.message ??
          'Remove member failed',
      );
    }
  };

  if (!openRemove || !selectedMember) {
    return null;
  }

  const user =
    typeof selectedMember.user_id === 'string'
      ? null
      : selectedMember.user_id;

  return (
    <Modal
      open={openRemove}
      footer={null}
      title="Remove Member"
      width={480}
      onCancel={handleClose}
    >
      <div className={styles.content}>
        <ExclamationCircleFilled
          className={styles.icon}
        />

        <Paragraph>
          Are you sure you want to remove
          <strong>
            {' '}
            {user?.name ?? 'this member'}
          </strong>{' '}
          from this project?
        </Paragraph>

        <Paragraph type="secondary">
          This action will remove all
          permissions of this member in the
          current project.
        </Paragraph>

        <div className={styles.footer}>
          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            danger
            type="primary"
            onClick={handleRemove}
          >
            Remove Member
          </Button>
        </div>
      </div>
    </Modal>
  );
}