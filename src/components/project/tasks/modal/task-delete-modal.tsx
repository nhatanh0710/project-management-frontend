'use client';

import {
  Button,
  Modal,
  Typography,
} from 'antd';

import { useProjectTask } from '@/contexts/task.context';

import styles from '../styles.module.scss';

const { Text } = Typography;

export default function TaskDeleteModal() {
  const {
    openDelete,
    setOpenDelete,
    selectedTask,
    deleteTask,
  } = useProjectTask();

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    if (!selectedTask) return;

    await deleteTask(
      selectedTask._id,
    );
  };

  return (
    <Modal
      open={openDelete}
      title="Delete Task"
      footer={null}
      destroyOnHidden
      onCancel={handleClose}
    >
      <div className={styles.modalContent}>
        <Text>
          Are you sure you want to
          delete task{' '}
          <strong>
            {selectedTask?.title}
          </strong>
          ?
        </Text>

        <Text
          type="secondary"
          style={{
            display: 'block',
            marginTop: 12,
          }}
        >
          This action cannot be
          undone.
        </Text>

        <div
          className={styles.footer}
        >
          <Button
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            danger
            type="primary"
            onClick={
              handleDelete
            }
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}