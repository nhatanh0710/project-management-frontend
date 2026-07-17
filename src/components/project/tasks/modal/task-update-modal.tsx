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

import styles from './styles.module.scss';

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
    if (!openUpdate || !task) return;

    form.setFieldsValue({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      estimate_time: task.estimate_time,
      actual_time: task.actual_time,
      start_time: task.start_time
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
  try {
    await updateTask({
      title: values.title,
      description: values.description,
      status: values.status,
      priority: values.priority,
      estimate_time: values.estimate_time,
      actual_time: values.actual_time,
      start_time:
        values.start_time?.toISOString(),
      deadline:
        values.deadline?.toISOString(),
    });

    form.resetFields();
  } catch {}
};

  return (
    <Modal
      open={openUpdate}
      title="Update Task"
      footer={null}
      width={760}
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
          label="Task Title"
          name="title"
          rules={[
            {
              required: true,
              message:
                'Task title is required',
            },
          ]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea
            rows={5}
            placeholder="Describe this task..."
          />
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
                  label: 'Review',
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
            label="Estimated Time (hours)"
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
            label="Actual Time (hours)"
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
              placeholder="Select start time"
              disabledDate={(
                current,
              ) => {
                const deadline =
                  form.getFieldValue(
                    'deadline',
                  );

                return (
                  deadline &&
                  current &&
                  current.isAfter(
                    deadline,
                    'day',
                  )
                );
              }}
            />
          </Form.Item>

          <Form.Item
            label="Deadline"
            name="deadline"
            dependencies={[
              'start_time',
            ]}
            rules={[
              ({
                getFieldValue,
              }) => ({
                validator(
                  _,
                  value,
                ) {
                  const start =
                    getFieldValue(
                      'start_time',
                    );

                  if (
                    !start ||
                    !value ||
                    value.isAfter(
                      start,
                    )
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      'Deadline must be after start time',
                    ),
                  );
                },
              }),
            ]}
          >
            <DatePicker
              showTime
              className={
                styles.full
              }
              placeholder="Select deadline"
              disabledDate={(
                current,
              ) => {
                const start =
                  form.getFieldValue(
                    'start_time',
                  );

                return (
                  start &&
                  current &&
                  current.isBefore(
                    start,
                    'day',
                  )
                );
              }}
            />
          </Form.Item>
        </div>

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
            type="primary"
            htmlType="submit"
            size="large"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
}