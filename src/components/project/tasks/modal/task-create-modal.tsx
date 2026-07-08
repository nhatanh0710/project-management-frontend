'use client';

import { Form, Input, Modal, Select, DatePicker, InputNumber, Button } from 'antd';

import { useProjectTask } from '@/contexts/task.context';

import {
  TaskPriority,
} from '@/types/task.type';

import styles from '../styles.module.scss';

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
      estimate_time: values.estimate_time,
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
              message: 'Task title is required',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea
            rows={4}
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
              options={[
                {
                  label: 'Low',
                  value: TaskPriority.LOW,
                },
                {
                  label: 'Medium',
                  value:
                    TaskPriority.MEDIUM,
                },
                {
                  label: 'High',
                  value: TaskPriority.HIGH,
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
            label="Estimate (hours)"
            name="estimate_time"
            initialValue={0}
          >
            <InputNumber
              min={0}
              className={styles.full}
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
            />
          </Form.Item>

          <Form.Item
            label="Deadline"
            name="deadline"
          >
            <DatePicker
              showTime
              className={styles.full}
            />
          </Form.Item>
        </div>

        <div className={styles.footer}>
          <Button
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
          >
            Create Task
          </Button>
        </div>
      </Form>
    </Modal>
  );
}