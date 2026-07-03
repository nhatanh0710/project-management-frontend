'use client';

import {
  useEffect,
} from 'react';

import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  message,
} from 'antd';

import dayjs from 'dayjs';

import {
  useProjectList,
} from '@/contexts/project-list.context';

import {
  projectService,
} from '@/services/project.service';

import {
  ProjectStatus,
} from '@/types/project.type';

import styles from './styles.module.scss';

const { TextArea } = Input;

export default function ProjectUpdateModal() {
  const [form] = Form.useForm();

  const {
    openUpdate,
    selectedProject,
    closeUpdateModal,
    refreshProjects,
  } = useProjectList();

  useEffect(() => {
    if (
      !openUpdate ||
      !selectedProject
    )
      return;

    form.setFieldsValue({
      name: selectedProject.name,

      description:
        selectedProject.description,

      status:
        selectedProject.status,

      start_day:
        selectedProject.start_day
          ? dayjs(
              selectedProject.start_day,
            )
          : null,

      deadline:
        selectedProject.deadline
          ? dayjs(
              selectedProject.deadline,
            )
          : null,
    });
  }, [
    openUpdate,
    selectedProject,
    form,
  ]);

  const handleSubmit = async (
    values: any,
  ) => {
    if (!selectedProject) return;

    try {
      await projectService.update(
        selectedProject._id,
        {
          name: values.name,

          description:
            values.description,

          status:
            values.status,

          start_day:
            values.start_day?.toISOString(),

          deadline:
            values.deadline?.toISOString(),
        },
      );

      message.success(
        'Project updated successfully',
      );

      await refreshProjects();

      closeUpdateModal();

      form.resetFields();
    } catch (err: any) {
      message.error(
        err?.response?.data?.message ??
          'Update project failed',
      );
    }
  };

  return (
    <Modal
      open={openUpdate}
      title="Update Project"
      footer={null}
      width={650}
      destroyOnHidden
      onCancel={() => {
        form.resetFields();
        closeUpdateModal();
      }}
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
            label="Status"
            name="status"
          >
            <Select
              options={[
                {
                  label:
                    'Planning',
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
                  label:
                    'Completed',
                  value:
                    ProjectStatus.COMPLETED,
                },
                {
                  label:
                    'On Hold',
                  value:
                    ProjectStatus.ON_HOLD,
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="start_day"
          >
            <DatePicker
              className={
                styles.full
              }
            />
          </Form.Item>

          <Form.Item
            label="Deadline"
            name="deadline"
          >
            <DatePicker
              className={
                styles.full
              }
            />
          </Form.Item>
        </div>

        <div
          className={
            styles.footer
          }
        >
          <Button
            onClick={() => {
              form.resetFields();
              closeUpdateModal();
            }}
          >
            Cancel
          </Button>

          <Button
            htmlType="submit"
            type="primary"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
}