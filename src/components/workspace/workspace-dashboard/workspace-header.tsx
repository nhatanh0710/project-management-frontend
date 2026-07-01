'use client';

import {
  Button,
  Card,
  Space,
  Tag,
  Typography,
} from 'antd';

import {
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

          <Space
            wrap
            className={styles.meta}
          >
            <Tag
              color="blue"
              icon={
                <FolderOpenOutlined />
              }
            >
              {projects.length} Projects
            </Tag>

            <Text type="secondary">
              Created{' '}
              {new Date(
                currentWorkspace.workspaceId.createdAt
              ).toLocaleDateString()}
            </Text>
          </Space>
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
            Edit Workspace
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