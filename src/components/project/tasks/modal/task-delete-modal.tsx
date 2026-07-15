'use client';

import {
  Button,
  Modal,
  Typography,
} from 'antd';

import {
  DeleteOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';

import { useProjectTask } from '@/contexts/task.context';

import styles from './styles.module.scss';

const { Text, Title } = Typography;

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

  const handleDelete =
    async () => {
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
      width={500}
      destroyOnHidden
      onCancel={handleClose}
    >
      <div
        className={
          styles.deleteContent
        }
      >
        <div
          className={
            styles.deleteIcon
          }
        >
          <ExclamationCircleFilled />
        </div>

        <Title
          level={5}
          className={
            styles.deleteTitle
          }
        >
          Delete this task?
        </Title>

        <Text
          className={
            styles.deleteText
          }
        >
          You are about to permanently
          delete
        </Text>

        <div
          className={
            styles.taskName
          }
        >
          {selectedTask?.title}
        </div>

        <Text
          type="secondary"
          className={
            styles.deleteWarning
          }
        >
          This action cannot be undone.
        </Text>

        <div
          className={
            styles.footer
          }
        >
          <Button
            size="large"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            danger
            type="primary"
            size="large"
            icon={
              <DeleteOutlined />
            }
            onClick={
              handleDelete
            }
          >
            Delete Task
          </Button>
        </div>
      </div>
    </Modal>
  );
}