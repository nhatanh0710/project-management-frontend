'use client';

import { useRouter, useParams } from 'next/navigation';

import {
  ArrowLeftOutlined,
  ProjectOutlined,
} from '@ant-design/icons';

import {
  Button,
  Typography,
} from 'antd';

import { useCurrentProject } from '@/contexts/current-project.context';
import { useProjectTask } from '@/contexts/task.context';

import styles from './styles.module.scss';

const { Title, Text } =
  Typography;

export default function TaskProjectCard() {
  const router = useRouter();

  const { workspaceId, projectId } =
    useParams();

  const { project } =
    useCurrentProject();

  const { tasks } =
    useProjectTask();

  if (!project) return null;

  return (
    <div className={styles.projectCard}>
      <Text className={styles.cardTitle}>
        Current Project
      </Text>

      <div className={styles.projectContent}>

        <div className={styles.projectIcon}>
          <ProjectOutlined />
        </div>

        <div className={styles.projectInfo}>

          <Title
            level={5}
            className={styles.projectName}
          >
            {project.name}
          </Title>

          <Text className={styles.projectMeta}>
            {tasks.length} Tasks
          </Text>

        </div>

      </div>

      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        className={styles.backButton}
        onClick={() =>
          router.push(
            `/user/workspace/${workspaceId}/project/${projectId}/tasks`,
          )
        }
      >
        Back to Board
      </Button>
    </div>
  );
}