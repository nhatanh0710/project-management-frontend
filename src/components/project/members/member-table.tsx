'use client';

import {
  Avatar,
  Button,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';

import type { ColumnsType } from 'antd/es/table';

import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons';

import {
  ExperienceLevel,
  ProjectMember,
  ProjectRole,
} from '@/types/project-member.type';

import { useProjectMember } from '@/contexts/project-member.context';

import styles from './styles.module.scss';

const roleColor = (role: ProjectRole) => {
  switch (role) {
    case ProjectRole.OWNER:
      return 'red';

    case ProjectRole.MANAGER:
      return 'processing';

    case ProjectRole.MEMBER:
      return 'success';

    case ProjectRole.VIEWER:
      return 'default';

    default:
      return 'default';
  }
};

const expColor = (
  level: ExperienceLevel,
) => {
  switch (level) {
    case ExperienceLevel.SENIOR:
      return 'gold';

    case ExperienceLevel.MIDDLE:
      return 'processing';

    case ExperienceLevel.JUNIOR:
      return 'green';

    default:
      return 'default';
  }
};

export default function MemberTable() {
  const {
    members,
    loading,

    pagination,
    changePage,

    openUpdateModal,
    openRemoveModal,
  } = useProjectMember();

  const columns: ColumnsType<ProjectMember> = [
    {
      title: 'Member',

      key: 'member',

      width: 280,

      render: (_, record) => (
        <Space size={12}>
          <Avatar
            size={42}
            src={record.user.avatar}
            icon={<UserOutlined />}
          />

          <div>
            <div className={styles.name}>
              {record.user.name}
            </div>

            <div className={styles.email}>
              {record.user.email}
            </div>
          </div>
        </Space>
      ),
    },

    {
      title: 'Role',

      dataIndex: 'role',

      width: 120,

      align: 'center',

      render: (role: ProjectRole) => (
        <Tag color={roleColor(role)}>
          {role.toUpperCase()}
        </Tag>
      ),
    },

    {
      title: 'Skills',

      dataIndex: 'skills',

      width: 260,

      render: (skills: string[]) => {
        if (!skills?.length) return '-';

        const visible = skills.slice(0, 3);

        const remain =
          skills.length - visible.length;

        return (
          <Space wrap size={4}>
            {visible.map((skill) => (
              <Tag key={skill}>
                {skill}
              </Tag>
            ))}

            {remain > 0 && (
              <Tooltip
                title={skills
                  .slice(3)
                  .join(', ')}
              >
                <Tag color="blue">
                  +{remain}
                </Tag>
              </Tooltip>
            )}
          </Space>
        );
      },
    },

    {
      title: 'Experience',

      dataIndex: 'experience_level',

      width: 130,

      align: 'center',

      render: (
        level: ExperienceLevel,
      ) => (
        <Tag color={expColor(level)}>
          {level}
        </Tag>
      ),
    },

    {
      title: 'Current',

      dataIndex: 'current_tasks',

      width: 90,

      align: 'center',
    },

    {
      title: 'Max',

      dataIndex: 'max_tasks',

      width: 90,

      align: 'center',
    },

    {
      title: 'Hours',

      dataIndex:
        'working_hours_per_day',

      width: 90,

      align: 'center',

      render: (value) => `${value}h`,
    },

    {
      title: 'Score',

      dataIndex:
        'performance_score',

      width: 100,

      align: 'center',

      render: (score) => (
        <Tag color="purple">
          {score}
        </Tag>
      ),
    },

    {
      title: 'Actions',

      key: 'actions',

      fixed: 'right',

      width: 120,

      align: 'center',

      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() =>
                openUpdateModal(
                  record,
                )
              }
            />
          </Tooltip>

          <Tooltip title="Remove">
            <Button
              danger
              type="text"
              icon={
                <DeleteOutlined />
              }
              onClick={() =>
                openRemoveModal(
                  record,
                )
              }
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table<ProjectMember>
      rowKey="_id"
      columns={columns}
      dataSource={members}
      loading={loading}
      scroll={{
        x: 1300,
      }}
      pagination={{
        current:
          pagination.page,

        pageSize:
          pagination.limit,

        total:
          pagination.total,

        showSizeChanger: true,

        showTotal: (total) =>
          `${total} members`,

        onChange: changePage,
      }}
    />
  );
}