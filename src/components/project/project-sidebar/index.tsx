'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';

import {
  AppstoreOutlined,
  FolderOpenOutlined,
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

import {
  Button,
  Empty,
  Input,
  Spin,
  Tag,
  Tooltip,
} from 'antd';

import { useProjectList } from '@/contexts/project-list.context';
import { ProjectStatus } from '@/types/project.type';

import styles from './styles.module.scss';

const statusColor = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.PLANNING:
      return 'default';

    case ProjectStatus.IN_PROGRESS:
      return 'processing';

    case ProjectStatus.COMPLETED:
      return 'success';

    case ProjectStatus.ON_HOLD:
      return 'warning';

    default:
      return 'default';
  }
};

export default function ProjectSidebar() {
  const pathname = usePathname();

  const params = useParams();

  const { id, projectId } =
  useParams();

const workspaceId = id as string;

  const {
    projects,
    loading,
    refreshProjects,
    setOpenCreate,
  } = useProjectList();

  const [keyword, setKeyword] = useState('');

  const filteredProjects = useMemo(() => {
    if (!keyword.trim()) return projects;

    return projects.filter((project) =>
      project.name
        .toLowerCase()
        .includes(keyword.toLowerCase()),
    );
  }, [projects, keyword]);

  return (
    <aside className={styles.sidebar}>
      {/* Header */}

      <div className={styles.header}>
        <div>
          <h2>Projects</h2>

          <span>{projects.length} projects</span>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenCreate(true)}
        />
      </div>

      {/* Workspace */}

       {/* <Link
        href={`/workspace/${workspaceId}`}
        className={`${styles.workspace} ${
          pathname === `/workspace/${workspaceId}`
            ? styles.active
            : ''
        }`}
      > 
       <AppstoreOutlined />

        
      </Link> */}

      {/* Search  */}
          
      <div className={styles.search}>
        <Input
          value={keyword}
          allowClear
          placeholder="Search project..."
          prefix={<SearchOutlined />}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
        />
      </div>

      {/* Toolbar */}

      <div className={styles.toolbar}>
        <span>Project List</span>

        <Tooltip title="Refresh">
          <Button
            type="text"
            icon={<ReloadOutlined />}
            onClick={() =>
              refreshProjects()
            }
          />
        </Tooltip>
      </div>

      {/* List */}

      <div className={styles.list}>
        {loading && (
          <div className={styles.loading}>
            <Spin />
          </div>
        )}

        {!loading &&
          filteredProjects.length ===
            0 && (
            <Empty
              image={
                Empty.PRESENTED_IMAGE_SIMPLE
              }
              description="No projects"
            />
          )}

        {!loading &&
          filteredProjects.map(
            (project) => (
              <Link
                key={project._id}
                href={`user/workspace/${workspaceId}/project/${project._id}`}
                className={`${styles.item} ${
                  projectId ===
                  project._id
                    ? styles.active
                    : ''
                }`}
              >
                <div
                  className={
                    styles.icon
                  }
                >
                  <FolderOpenOutlined />
                </div>

                <div
                  className={
                    styles.content
                  }
                >
                  <div
                    className={
                      styles.name
                    }
                  >
                    {project.name}
                  </div>

                  <div
                    className={
                      styles.bottom
                    }
                  >
                    <Tag
                      color={statusColor(
                        project.status,
                      )}
                    >
                      {project.status.replaceAll(
                        '_',
                        ' ',
                      )}
                    </Tag>

                    <span>
                      {
                        project.progress
                      }
                      %
                    </span>
                  </div>
                </div>
              </Link>
            ),
          )}
      </div>

      {/* Footer */}

      <div className={styles.footer}>
        <div>
          <span>Total</span>

          <strong>
            {projects.length}
          </strong>
        </div>
      </div>
    </aside>
  );
}  