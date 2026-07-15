'use client';

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

import { useProjectTask } from '@/contexts/task.context';

import { TaskPriority } from '@/types/task.type';

import styles from './styles.module.scss';

const { TextArea } = Input;

export default function TaskCreateModal() {
  const [form] = Form.useForm();

  const {
    openCreate,
    setOpenCreate,
    createTask,
  } = useProjectTask();

  const handleClose = () => {
    form.resetFields();
    setOpenCreate(false);
  };

  const handleSubmit = async (
    values: any,
  ) => {
    await createTask({
      title: values.title,
      description: values.description,
      priority: values.priority,
      estimate_time:
        values.estimate_time,
      start_time:
        values.start_time?.toISOString(),
      deadline:
        values.deadline?.toISOString(),
    });

    form.resetFields();
  };

  return (
    <Modal
      open={openCreate}
      title="Create Task"
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
          <Input
            placeholder="Enter task title"
          />
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
            label="Priority"
            name="priority"
            initialValue={
              TaskPriority.MEDIUM
            }
          >
            <Select
              placeholder="Select priority"
              options={[
                {
                  label: 'Low',
                  value:
                    TaskPriority.LOW,
                },
                {
                  label: 'Medium',
                  value:
                    TaskPriority.MEDIUM,
                },
                {
                  label: 'High',
                  value:
                    TaskPriority.HIGH,
                },
                {
                  label: 'Urgent',
                  value:
                    TaskPriority.URGENT,
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Estimated Time (hours)"
            name="estimate_time"
            initialValue={0}
          >
            <InputNumber
              min={0}
              className={styles.full}
              placeholder="0"
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
              className={styles.full}
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
              className={styles.full}
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
          className={styles.footer}
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
            Create Task
          </Button>
        </div>
      </Form>
    </Modal>
  );
}