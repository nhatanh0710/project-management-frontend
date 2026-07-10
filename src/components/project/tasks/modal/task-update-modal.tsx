'use client';

import { useEffect } from 'react';

import dayjs from 'dayjs';

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from 'antd';

import { useCurrentTask } from '@/contexts/current-task.context';

import {
  TaskPriority,
  TaskStatus,
} from '@/types/task.type';

import styles from '../styles.module.scss';

const { TextArea } = Input;

export default function TaskUpdateModal() {
  const [form] = Form.useForm();

  const {
    task,
    openUpdate,
    closeUpdateModal,
    updateTask,
  } = useCurrentTask();

  useEffect(() => {
    if (!openUpdate || !task) {
      return;
    }

    form.setFieldsValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      estimate_time:
        task.estimate_time,
      actual_time:
        task.actual_time,
      start_time:
        task.start_time
          ? dayjs(task.start_time)
          : null,
      deadline: task.deadline
        ? dayjs(task.deadline)
        : null,
    });
  }, [
    task,
    openUpdate,
    form,
  ]);

  const handleClose = () => {
    form.resetFields();

    closeUpdateModal();
  };

  const handleSubmit = async (
    values: any,
  ) => {
    if (!task) return;

    await updateTask({
      title: values.title,
      description:
        values.description,
      priority: values.priority,
      status: values.status,
      estimate_time:
        values.estimate_time,
      actual_time:
        values.actual_time,
      start_time:
        values.start_time?.toISOString(),
      deadline:
        values.deadline?.toISOString(),
    });

    form.resetFields();
  };

  return (
    <Modal
      open={openUpdate}
      title="Update Task"
      footer={null}
      width={700}
      destroyOnHidden
      onCancel={handleClose}
    >
      <Form
        form={form}
        layout="vertical"
        className={styles.form}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message:
                'Task title is required',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea rows={4} />
        </Form.Item>

        <div className={styles.row}>
          <Form.Item
            label="Status"
            name="status"
          >
            <Select
              options={[
                {
                  label: 'Todo',
                  value:
                    TaskStatus.TODO,
                },
                {
                  label:
                    'In Progress',
                  value:
                    TaskStatus.IN_PROGRESS,
                },
                {
                  label:
                    'Review',
                  value:
                    TaskStatus.REVIEW,
                },
                {
                  label: 'Done',
                  value:
                    TaskStatus.DONE,
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Priority"
            name="priority"
          >
            <Select
              options={[
                {
                  label: 'Low',
                  value:
                    TaskPriority.LOW,
                },
                {
                  label:
                    'Medium',
                  value:
                    TaskPriority.MEDIUM,
                },
                {
                  label: 'High',
                  value:
                    TaskPriority.HIGH,
                },
                {
                  label:
                    'Urgent',
                  value:
                    TaskPriority.URGENT,
                },
              ]}
            />
          </Form.Item>
        </div>

        <div className={styles.row}>
          <Form.Item
            label="Estimate (hours)"
            name="estimate_time"
          >
            <InputNumber
              min={0}
              className={
                styles.full
              }
            />
          </Form.Item>

          <Form.Item
            label="Actual (hours)"
            name="actual_time"
          >
            <InputNumber
              min={0}
              className={
                styles.full
              }
            />
          </Form.Item>
        </div>

        <div className={styles.row}>
          <Form.Item
            label="Start Time"
            name="start_time"
          >
            <DatePicker
              showTime
              className={
                styles.full
              }
            />
          </Form.Item>

          <Form.Item
            label="Deadline"
            name="deadline"
          >
            <DatePicker
              showTime
              className={
                styles.full
              }
            />
          </Form.Item>
        </div>

        <div
          className={
            styles.footer
          }
        >
          <Button
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
}