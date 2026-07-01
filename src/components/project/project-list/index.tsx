'use client';

import Link from 'next/link';

import {
  Badge,
  Button,
  Card,
  Dropdown,
  Empty,
  Progress,
  Skeleton,
} from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';

import { useParams } from 'next/navigation';

import { useProjectList } from '@/contexts/project-list.context';

import { Project } from '@/types/project.type';

import styles from './styles.module.scss';

export default function ProjectList() {
  const { workspaceId } = useParams();

  const {
    projects,
    loading,
    openUpdateModal,
  } = useProjectList();

  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <Skeleton active />
          </Card>
        ))}
      </div>
    );
  }

  if (!projects.length) {
    return (
      <Empty description="No Projects" />
    );
  }

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          workspaceId={workspaceId as string}
          project={project}
          onEdit={() =>
            openUpdateModal(project)
          }
        />
      ))}
    </div>
  );
}

interface Props {
  workspaceId: string;

  project: Project;

  onEdit: () => void;
}

function ProjectCard({
  workspaceId,
  project,
  onEdit,
}: Props) {
  const menu = {
    items: [
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: 'Edit',
        onClick: onEdit,
      },
      {
        key: 'delete',
        danger: true,
        icon: <DeleteOutlined />,
        label: 'Delete',
      },
    ],
  };

  return (
    <Card
      hoverable
      className={styles.card}
      extra={
        <Dropdown
          menu={menu}
          trigger={['click']}
        >
          <Button
            type="text"
            icon={<EllipsisOutlined />}
          />
        </Dropdown>
      }
    >
      <Link
        href={`/workspace/${workspaceId}/project/${project._id}`}
      >
        <div className={styles.header}>
          <FolderOpenOutlined />

          <Badge
            status="processing"
            text={project.status}
          />
        </div>

        <h3>{project.name}</h3>

        <p>
          {project.description ||
            'No description'}
        </p>

        <Progress
          percent={project.progress}
          size="small"
        />
      </Link>
    </Card>
  );
}