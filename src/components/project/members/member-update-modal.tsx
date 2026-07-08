'use client';

import { useEffect, useState } from 'react';

import {
  Avatar,
  Button,
  Form,
  InputNumber,
  Modal,
  Select,
  Typography,
  Space,
  message,
} from 'antd';

import {
  UserOutlined,
} from '@ant-design/icons';

import { useProjectMember } from '@/contexts/project-member.context';

import {
  ExperienceLevel,
  ProjectRole,
} from '@/types/project-member.type';

import styles from './styles.module.scss';

const { Text } = Typography;

const roleOptions = [
  {
    label: 'Manager',
    value: ProjectRole.MANAGER,
  },
  {
    label: 'Member',
    value: ProjectRole.MEMBER,
  },
  {
    label: 'Viewer',
    value: ProjectRole.VIEWER,
  },
];

const experienceOptions = [
  {
    label: 'Fresher',
    value: ExperienceLevel.FRESHER,
  },
  {
    label: 'Junior',
    value: ExperienceLevel.JUNIOR,
  },
  {
    label: 'Middle',
    value: ExperienceLevel.MIDDLE,
  },
  {
    label: 'Senior',
    value: ExperienceLevel.SENIOR,
  },
];

export default function MemberUpdateModal() {
  const [form] = Form.useForm();

  const {
    openUpdate,
    setOpenUpdate,
    selectedMember,
    updateMember,
  } = useProjectMember();

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    if (!openUpdate || !selectedMember) {
      form.resetFields();
      return;
    }

    form.setFieldsValue({
      role: selectedMember.role,
      skills: selectedMember.skills,
      experience_level:
        selectedMember.experience_level,
      max_tasks:
        selectedMember.max_tasks,
      working_hours_per_day:
        selectedMember.working_hours_per_day,
    });
  }, [
    openUpdate,
    selectedMember,
    form,
  ]);

  const handleClose = () => {
    form.resetFields();
    setOpenUpdate(false);
  };

  const handleSubmit = async (
    values: any,
  ) => {
    if (!selectedMember) return;

    try {
      setSubmitting(true);

      await updateMember(
        {
          skills:
            values.skills ?? [],
          experience_level:
            values.experience_level,
          max_tasks:
            values.max_tasks,
          working_hours_per_day:
            values.working_hours_per_day,
        },
        values.role,
      );

      handleClose();
    } catch (err: any) {
      console.log('ERROR =', err);
      console.log(
        'response =',
        err?.response,
      );
      console.log(
        'data =',
        err?.response?.data,
      );

      message.error(
        err?.response?.data?.message ??
          err?.message ??
          'Update member failed',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!selectedMember) {
    return null;
  }

  const user = selectedMember.user;

  return (
    <Modal
      open={openUpdate}
      footer={null}
      title="Update Member"
      width={650}
      destroyOnHidden
      onCancel={handleClose}
    >
      <Form
        form={form}
        layout="vertical"
        className={styles.form}
        onFinish={handleSubmit}
      >
        <div className={styles.member}>
          <Avatar
            size={54}
            src={user.avatarUrl}
            icon={<UserOutlined />}
          />

          <div>
            <Text strong>
              {user.name}
            </Text>

            <br />

            <Text type="secondary">
              {user.email}
            </Text>
          </div>
        </div>

        <div className={styles.row}>
          <Form.Item
            label="Role"
            name="role"
          >
            <Select
              options={roleOptions}
            />
          </Form.Item>

          <Form.Item
            label="Experience"
            name="experience_level"
          >
            <Select
              options={
                experienceOptions
              }
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Skills"
          name="skills"
        >
          <Select
            mode="tags"
            tokenSeparators={[
              ',',
            ]}
            placeholder="React, NestJS..."
          />
        </Form.Item>

        <div className={styles.row}>
          <Form.Item
            label="Max Tasks"
            name="max_tasks"
          >
            <InputNumber
              min={1}
              className={
                styles.full
              }
            />
          </Form.Item>

          <Form.Item
            label="Working Hours"
            name="working_hours_per_day"
          >
            <InputNumber
              min={1}
              max={24}
              className={
                styles.full
              }
            />
          </Form.Item>
        </div>

        <div className={styles.footer}>
          <Space>
            <Button
              onClick={handleClose}
            >
              Cancel
            </Button>

            <Button
              htmlType="submit"
              type="primary"
              loading={submitting}
            >
              Save Changes
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
}