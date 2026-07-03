'use client';

import {
  Input,
  Select,
  Space,
} from 'antd';

import {
  SearchOutlined,
} from '@ant-design/icons';

import { ProjectRole } from '@/types/project-member.type';
import { useProjectMember } from '@/contexts/project-member.context';

import styles from './styles.module.scss';

const roleOptions = [
  {
    label: 'All Roles',
    value: '',
  },
  {
    label: 'Owner',
    value: ProjectRole.OWNER,
  },
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

export default function MemberToolbar() {
  const {
    keyword,
    setKeyword,

    role,
    setRole,
  } = useProjectMember();

  return (
    <div className={styles.toolbar}>
      <Space
        size={16}
        wrap
      >
        <Input
          allowClear
          value={keyword}
          prefix={<SearchOutlined />}
          placeholder="Search member..."
          className={styles.search}
          onChange={(e) =>
            setKeyword(
              e.target.value,
            )
          }
        />

        <Select
          value={role}
          options={roleOptions}
          className={styles.role}
          onChange={(value) =>
            setRole(value)
          }
        />
      </Space>
    </div>
  );
}