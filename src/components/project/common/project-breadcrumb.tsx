'use client';

import Link from 'next/link';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

import { useWorkspace } from '@/contexts/workspace.context';
import { useCurrentProject } from '@/contexts/current-project.context';

import styles from './styles.module.scss';

export default function ProjectBreadcrumb() {
  const pathname = usePathname();

  const { currentWorkspace } =
    useWorkspace();

  const { project } =
    useCurrentProject();

  if (!currentWorkspace || !project)
    return null;

  const items = [
    {
      title: (
        <Link href="/user/workspace">
          <HomeOutlined />
        </Link>
      ),
    },
    {
      title: (
        <Link
          href={`/user/workspace/${currentWorkspace.workspaceId._id}`}
        >
          {
            currentWorkspace
              .workspaceId.name
          }
        </Link>
      ),
    },
    {
      title: (
        <Link
          href={`/user/workspace/${currentWorkspace.workspaceId._id}/project/${project._id}`}
        >
          {project.name}
        </Link>
      ),
    },
  ];

  if (
    pathname.endsWith('/tasks')
  ) {
    items.push({
      title: 'Tasks',
    });
  }

  if (
    pathname.endsWith('/members')
  ) {
    items.push({
      title: 'Members',
    });
  }

  if (
    pathname.endsWith('/settings')
  ) {
    items.push({
      title: 'Settings',
    });
  }

  return (
    <div className={styles.breadcrumb}>
      <Breadcrumb items={items} />
    </div>
  );
}