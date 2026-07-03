'use client';

import { useEffect, useState } from 'react';

import {
  Button,
  Form,
  InputNumber,
  Modal,
  Select,
  message,
} from 'antd';

import { useProjectMember } from '@/contexts/project-member.context';

import { userService } from '@/services/user.service';

import {
  ExperienceLevel,
  ProjectRole,
} from '@/types/project-member.type';

import type { UserSearchItem } from '@/types/user.type';

import styles from './styles.module.scss';

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

export default function MemberAddModal() {
  const [form] = Form.useForm();

  const {
    openCreate,
    setOpenCreate,
    createMember,
  } = useProjectMember();

  const [users, setUsers] =
    useState<UserSearchItem[]>([]);

  const [searching, setSearching] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    if (!openCreate) {
      form.resetFields();
      setUsers([]);
    }
  }, [openCreate, form]);

  const handleSearchUser = async (
    keyword: string,
  ) => {
    if (!keyword.trim()) {
      setUsers([]);
      return;
    }

    try {
      setSearching(true);

      const data =
        await userService.searchUsers(
          keyword,
        );

      setUsers(data);
    } catch {
      message.error(
        'Search users failed',
      );
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = async (
    values: any,
  ) => {
    try {
      setSubmitting(true);

      await createMember({
        members: [
          {
            user_id: values.user_id,
            role: values.role,
            skills:
              values.skills ?? [],
            experience_level:
              values.experience_level,
            max_tasks:
              values.max_tasks,
            working_hours_per_day:
              values.working_hours_per_day,
          },
        ],
      });

      form.resetFields();
      setUsers([]);
    } catch (err: any) {
      message.error(
        err?.response?.data?.message ??
          'Add member failed',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setUsers([]);
    setOpenCreate(false);
  };

  return (
    <Modal
      open={openCreate}
      title="Add Member"
      footer={null}
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
        <Form.Item
          label="User"
          name="user_id"
          rules={[
            {
              required: true,
              message:
                'Please select a user',
            },
          ]}
        >
          <Select
            showSearch
            filterOption={false}
            loading={searching}
            placeholder="Search by name or email..."
            onSearch={
              handleSearchUser
            }
            options={users.map(
              (user) => ({
                value: user._id,
                label: `${user.name} (${user.email})`,
              }),
            )}
          />
        </Form.Item>

        <div className={styles.row}>
          <Form.Item
            label="Role"
            name="role"
            initialValue={
              ProjectRole.MEMBER
            }
          >
            <Select
              options={roleOptions}
            />
          </Form.Item>

          <Form.Item
            label="Experience"
            name="experience_level"
            initialValue={
              ExperienceLevel.FRESHER
            }
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
            initialValue={3}
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
            initialValue={8}
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
            Add Member
          </Button>
        </div>
      </Form>
    </Modal>
  );
}