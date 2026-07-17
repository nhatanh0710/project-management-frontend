'use client';

import { useEffect } from 'react';

import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  message,
} from 'antd';

import { useProjectList } from '@/contexts/project-list.context';
import { projectService } from '@/services/project.service';

import styles from './styles.module.scss';

const { TextArea } = Input;

interface Props {
  workspaceId: string;
}

export default function ProjectCreateModal({
  workspaceId,
}: Props) {
  const [form] = Form.useForm();

  const {
    openCreate,
    setOpenCreate,
    refreshProjects,
  } = useProjectList();

  useEffect(() => {
    if (!openCreate) {
      form.resetFields();
    }
  }, [openCreate, form]);

  const handleClose = () => {
    form.resetFields();
    setOpenCreate(false);
  };

  const handleSubmit = async (
    values: any,
  ) => {
    if (
      values.start_day &&
      values.deadline &&
      values.start_day.isAfter(
        values.deadline,
      )
    ) {
      return message.error(
        'Deadline must be after start date',
      );
    }

    try {
      await projectService.create({
        workspace_id: workspaceId,

        name: values.name.trim(),

        description:
          values.description,

        start_day:
          values.start_day?.toISOString(),

        deadline:
          values.deadline?.toISOString(),
      });

      message.success(
        'Project created successfully',
      );

      await refreshProjects();

      handleClose();
    } catch (err: any) {
      message.error(
        err?.response?.data?.message ??
          'Create project failed',
      );
    }
  };

  return (
    <Modal
      open={openCreate}
      title="Create Project"
      footer={null}
      width={720}
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
          label="Project Name"
          name="name"
          rules={[
            {
              required: true,
              message:
                'Project name is required',
            },
          ]}
        >
          <Input placeholder="Enter project name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea
            rows={4}
            placeholder="Describe the project..."
          />
        </Form.Item>

        <div className={styles.row}>
          <Form.Item
            label="Start Date"
            name="start_day"
            dependencies={['deadline']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const deadline =
                    getFieldValue(
                      'deadline',
                    );

                  if (
                    !value ||
                    !deadline ||
                    value.isBefore(
                      deadline,
                    )
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      'Start date must be before deadline',
                    ),
                  );
                },
              }),
            ]}
          >
            <DatePicker
              showTime
              className={styles.full}
              placeholder="Select start date"
            />
          </Form.Item>

          <Form.Item
            label="Deadline"
            name="deadline"
            dependencies={['start_day']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const start =
                    getFieldValue(
                      'start_day',
                    );

                  if (
                    !value ||
                    !start ||
                    value.isAfter(
                      start,
                    )
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      'Deadline must be after start date',
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
            />
          </Form.Item>
        </div>

        <div className={styles.footer}>
          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
          >
            Create Project
          </Button>
        </div>
      </Form>
    </Modal>
  );
}