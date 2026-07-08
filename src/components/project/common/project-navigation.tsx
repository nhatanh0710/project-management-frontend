'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  AppstoreOutlined,
  CheckSquareOutlined,
  TeamOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { useWorkspace } from '@/contexts/workspace.context';
import { useCurrentProject } from '@/contexts/current-project.context';

import styles from './styles.module.scss';

export default function ProjectNavigation() {
  const pathname = usePathname();

  const { currentWorkspace } = useWorkspace();
  const { project } = useCurrentProject();

  if (!currentWorkspace || !project) {
    return null;
  }

  const workspaceId =
    currentWorkspace.workspaceId._id;

  const projectId = project._id;

  const items = [
    {
      label: 'Dashboard',
      icon: <AppstoreOutlined />,
      href: `/user/workspace/${workspaceId}/project/${projectId}`,
    },
    {
      label: 'Tasks',
      icon: <CheckSquareOutlined />,
      href: `/user/workspace/${workspaceId}/project/${projectId}/tasks`,
    },
    {
      label: 'Members',
      icon: <TeamOutlined />,
      href: `/user/workspace/${workspaceId}/project/${projectId}/members`,
    },
    {
      label: 'Settings',
      icon: <SettingOutlined />,
      href: `/user/workspace/${workspaceId}/project/${projectId}/settings`,
    },
  ];

  return (
    <nav className={styles.navigation}>
      {items.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navItem} ${
              active ? styles.active : ''
            }`}
          >
            {item.icon}

            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}