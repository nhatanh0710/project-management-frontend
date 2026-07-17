'use client';

import { useEffect } from 'react';

import dayjs from 'dayjs';

import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  message,
} from 'antd';

import { useCurrentProject } from '@/contexts/current-project.context';

import { projectService } from '@/services/project.service';

import { ProjectStatus } from '@/types/project.type';

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
      status: project.status,
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
      await projectService.update(
        project._id,
        {
          name: values.name.trim(),

          description:
            values.description,

          status: values.status,

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
          Update the basic information
          of this project.
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
          <Input placeholder="Project name" />
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

        <Form.Item
          label="Status"
          name="status"
        >
          <Select
            options={[
              {
                label: 'Planning',
                value:
                  ProjectStatus.PLANNING,
              },
              {
                label:
                  'In Progress',
                value:
                  ProjectStatus.IN_PROGRESS,
              },
              {
                label: 'On Hold',
                value:
                  ProjectStatus.ON_HOLD,
              },
              {
                label:
                  'Completed',
                value:
                  ProjectStatus.COMPLETED,
              },
            ]}
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