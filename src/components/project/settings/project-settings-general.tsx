'use client';

import { useEffect } from 'react';

import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
} from 'antd';

import dayjs from 'dayjs';

import { useCurrentProject } from '@/contexts/current-project.context';

import { projectService } from '@/services/project.service';

import styles from './styles.module.scss';

const { TextArea } = Input;

export default function ProjectSettingsGeneral() {
  const [form] = Form.useForm();

  const {
    project,
    refreshProject,
  } = useCurrentProject();

  useEffect(() => {
    if (!project) return;

    form.setFieldsValue({
      name: project.name,
      description: project.description,
      start_day: project.start_day
        ? dayjs(project.start_day)
        : null,
      deadline: project.deadline
        ? dayjs(project.deadline)
        : null,
    });
  }, [project, form]);

  const handleSubmit = async (
    values: any,
  ) => {
    if (!project) return;

    try {
      await projectService.update(
        project._id,
        {
          name: values.name,
          description:
            values.description,
          start_day:
            values.start_day?.toISOString(),
          deadline:
            values.deadline?.toISOString(),
        },
      );

      message.success(
        'Project updated successfully',
      );

      await refreshProject();
    } catch (err: any) {
      message.error(
        err?.response?.data?.message ??
          'Update project failed',
      );
    }
  };

  if (!project) return null;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>
          General Information
        </h2>

        <p
          className={
            styles.cardDescription
          }
        >
          Update the basic information of
          this project.
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
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
          <Button
            htmlType="submit"
            type="primary"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
}