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
import { useProjectList } from '@/contexts/project-list.context';

import styles from './styles.module.scss';

const { Title, Text } = Typography;

export default function MemberHeader() {
  const {
    members,
    setOpenCreate,
  } = useProjectMember();

  const { currentProject } = useProjectList();

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

          {currentProject && (
            <Text
              type="secondary"
              className={styles.project}
            >
              {currentProject.name}
            </Text>
          )}
        </Space>
      </div>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() =>
          setOpenCreate(true)
        }
      >
        Add Member
      </Button>
    </div>
  );
}