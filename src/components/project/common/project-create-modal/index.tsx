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
      return;
    }

    
  }, [openCreate, form]);

  const handleSubmit = async (
    values: any,
  ) => {
    try {
      await projectService.create({
        workspace_id: workspaceId,

        name: values.name,

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

      form.resetFields();

      setOpenCreate(false);
    } catch (err: any) {
      message.error(
        err?.response?.data?.message ??
          'Create project failed',
      );
    }
  };

  const handleClose = () => {
    form.resetFields();

    setOpenCreate(false);
  };

  return (
    <Modal
      open={openCreate}
      title="Create Project"
      footer={null}
      width={650}
      onCancel={handleClose}
      destroyOnHidden
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
            placeholder="Description"
          />
        </Form.Item>

        <div className={styles.row}>
         
          <Form.Item
            label="Start Date"
            name="start_day"
          >
            <DatePicker
              className={styles.full}
            />
          </Form.Item>

          <Form.Item
            label="Deadline"
            name="deadline"
          >
            <DatePicker
              className={styles.full}
            />
          </Form.Item>
        </div>

        <div className={styles.footer}>
          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            htmlType="submit"
            type="primary"
          >
            Create Project
          </Button>
        </div>
      </Form>
    </Modal>
  );
}