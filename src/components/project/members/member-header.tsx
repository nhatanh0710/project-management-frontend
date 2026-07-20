'use client';

import {
  Button,
  Space,
  Tag,
  Typography,
} from 'antd';

import {
  TeamOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { useProjectMember } from '@/contexts/project-member.context';

import { useCurrentProject } from '@/contexts/current-project.context';
import styles from './styles.module.scss';

const { Title, Text } = Typography;

export default function MemberHeader() {
  const {
    members,
    setOpenCreate,
  } = useProjectMember();

  const { project, isArchived } = useCurrentProject();
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Title
          level={4}
          className={styles.title}
        >
          Members
        </Title>

        <Space size={8}>
          <Tag
            icon={<TeamOutlined />}
            color="blue"
          >
            {members.length} Members
          </Tag>

          {project && (
            <Text
              type="secondary"
              className={styles.project}
            >
              {project.name}
            </Text>
          )}
        </Space>
      </div>

      <Button
        type="primary"
        icon={<PlusOutlined />}
         disabled={isArchived}
  title={isArchived ? 'Project is archived' : ''}
        onClick={() =>
          setOpenCreate(true)
        }
      >
        Add Member
      </Button>
    </div>
  );
}