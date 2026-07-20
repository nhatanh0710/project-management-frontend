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

import { useTimeLog } from '@/contexts/time-log.context';

import type { TimeLog } from '@/types/time-log.type';

import styles from './styles.module.scss';

interface Props {
  open: boolean;
  log: TimeLog | null;
  onClose: () => void;
}

export default function TimeLogUpdateModal({
  open,
  log,
  onClose,
}: Props) {
  const [form] = Form.useForm();

  const { updateLog } =
    useTimeLog();

  useEffect(() => {
    if (!open || !log) return;

    form.setFieldsValue({
      hours: log.hours,
      work_date: dayjs(log.work_date),
      description: log.description,
    });
  }, [open, log, form]);

  const handleSubmit =
    async () => {
      if (!log) return;

      try {
        const values =
          await form.validateFields();

        await updateLog(log._id, {
          hours: values.hours,
          work_date:
            values.work_date.toDate(),
          description:
            values.description,
        });

        onClose();
      } catch {}
    };

  return (
    <Modal
      title="Edit Time Log"
      open={open}
      destroyOnHidden
      okText="Update"
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
              message:
                'Please enter hours',
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
              current &&
              current.endOf('day').isAfter(dayjs())
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