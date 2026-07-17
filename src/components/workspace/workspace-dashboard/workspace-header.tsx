'use client';

import {
  Button,
  Card,
  Space,
  Tag,
  Typography,
} from 'antd';

import {
  CalendarOutlined,
  EditOutlined,
  FolderOpenOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { useWorkspace } from '@/contexts/workspace.context';
import { useProjectList } from '@/contexts/project-list.context';

import styles from './styles.module.scss';

const {
  Title,
  Paragraph,
  Text,
} = Typography;

export default function WorkspaceHeader() {
  const {
    currentWorkspace,
    openUpdateModal,
  } = useWorkspace();

  const {
    projects,
    setOpenCreate,
  } = useProjectList();

  if (!currentWorkspace) return null;

  return (
    <Card className={styles.card}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.badge}>
            Workspace
          </span>

          <Title
            level={2}
            className={styles.title}
          >
            {currentWorkspace.workspaceId.name}
          </Title>

          <Paragraph
            className={styles.subtitle}
          >
            {currentWorkspace.workspaceId
              .description ||
              'No description available.'}
          </Paragraph>

          <div className={styles.meta}>
            <Tag
              className={styles.metaTag}
              icon={<FolderOpenOutlined />}
            >
              {projects.length} Projects
            </Tag>

            <Tag
              className={styles.metaTag}
              icon={<CalendarOutlined />}
            >
              {new Date(
                currentWorkspace.workspaceId.createdAt,
              ).toLocaleDateString()}
            </Tag>

            <Text className={styles.owner}>
              Workspace Owner
            </Text>
          </div>
        </div>

        <Space className={styles.actions}>
          <Button
            icon={<EditOutlined />}
            onClick={() =>
              openUpdateModal(
                currentWorkspace,
              )
            }
          >
            Edit
          </Button>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() =>
              setOpenCreate(true)
            }
          >
            New Project
          </Button>
        </Space>
      </div>
    </Card>
  );
}