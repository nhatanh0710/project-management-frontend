'use client';

import { useEffect } from 'react';

import {
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
} from 'antd';

import dayjs from 'dayjs';

import { useParams } from 'next/navigation';

import { useTimeLog } from '@/contexts/time-log.context';

import styles from './styles.module.scss';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TimeLogCreateModal({
  open,
  onClose,
}: Props) {
  const [form] = Form.useForm();

  const { taskId } = useParams();

  const { createLog } = useTimeLog();

  useEffect(() => {
    if (!open) return;

    form.resetFields();

    form.setFieldsValue({
      work_date: dayjs(),
    });
  }, [open, form]);

  const handleSubmit = async () => {
    try {
      const values =
        await form.validateFields();

      await createLog({
        task_id: taskId as string,
        hours: values.hours,
        work_date: values.work_date.toDate(),
        description: values.description,
      });

      onClose();
    } catch {}
  };

  return (
    <Modal
      title="Log Time"
      open={open}
      destroyOnHidden
      okText="Save"
      onOk={handleSubmit}
      onCancel={onClose}
    >
      <Form
        form={form}
        layout="vertical"
        className={styles.form}
      >
        <Form.Item
          label="Hours"
          name="hours"
          rules={[
            {
              required: true,
              message: 'Please enter hours',
            },
          ]}
        >
          <InputNumber
            min={0.5}
            max={24}
            step={0.5}
            className={styles.fullWidth}
          />
        </Form.Item>

        <Form.Item
          label="Work Date"
          name="work_date"
          rules={[
            {
              required: true,
              message:
                'Please select work date',
            },
          ]}
        >
          <DatePicker
            className={styles.fullWidth}
            disabledDate={(current) =>
               current && current.isAfter(dayjs(), 'day')
            }
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea
            rows={4}
            className={styles.textarea}
            placeholder="Describe your work..."
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}