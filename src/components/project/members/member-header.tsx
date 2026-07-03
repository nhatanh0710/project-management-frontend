'use client';

import {
  Button,
  Card,
  Space,
  Tag,
  Typography,
} from 'antd';

import {
  TeamOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

import { useProjectMember } from '@/contexts/project-member.context';
import { useProjectList } from '@/contexts/project-list.context';

import styles from './styles.module.scss';

const { Title, Paragraph } = Typography;

export default function MemberHeader() {
  const {
    members,
    refreshMembers,
    setOpenCreate,
  } = useProjectMember();

  const { currentProject } = useProjectList();

  return (
    <Card className={styles.card}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Title
            level={2}
            className={styles.title}
          >
            Project Members
          </Title>

          <Paragraph
            className={styles.subtitle}
          >
            Manage members, roles and permissions
            of this project.
          </Paragraph>

          <Space
            wrap
            className={styles.meta}
          >
            <Tag
              color="blue"
              icon={<TeamOutlined />}
            >
              {members.length} Members
            </Tag>

            {currentProject && (
              <Tag color="processing">
                {currentProject.name}
              </Tag>
            )}
          </Space>
        </div>

        <Space className={styles.actions}>
          <Button
            icon={<ReloadOutlined />}
            onClick={refreshMembers}
          >
            Refresh
          </Button>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() =>
              setOpenCreate(true)
            }
          >
            Add Member
          </Button>
        </Space>
      </div>
    </Card>
  );
}