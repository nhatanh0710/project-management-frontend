'use client';

import { useState } from 'react';

import {
  Button,
  Form,
  Input,
  Space,
} from 'antd';

import { useChecklist } from '@/contexts/checklist.context';

import styles from './styles.module.scss';

const { TextArea } = Input;

interface ChecklistFormProps {
  onCancel: () => void;
}

export default function ChecklistForm({
  onCancel,
}: ChecklistFormProps) {
  const { createChecklist } =
    useChecklist();

  const [form] = Form.useForm();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (values: {
      title: string;
      description?: string;
    }) => {
      try {
        setLoading(true);

        await createChecklist({
          title: values.title.trim(),
          description:
            values.description?.trim(),
        });

        form.resetFields();

        onCancel();
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className={
        styles.formCard
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message:
                'Please enter checklist title',
            },
          ]}
        >
          <Input
            placeholder="Enter checklist title..."
            maxLength={200}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea
            rows={4}
            placeholder="Enter description (optional)..."
            maxLength={1000}
            showCount
          />
        </Form.Item>

        <div
          className={
            styles.formActions
          }
        >
          <Space>
            <Button
              onClick={() => {
                form.resetFields();
                onCancel();
              }}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Add Checklist
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
}