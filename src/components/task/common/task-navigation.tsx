'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  FileTextOutlined,
  CheckSquareOutlined,
  CommentOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';

import { useCurrentProject } from '@/contexts/current-project.context';
import { useCurrentTask } from '@/contexts/current-task.context';
import { useWorkspace } from '@/contexts/workspace.context';

import styles from './styles.module.scss';

export default function TaskNavigation() {
  const pathname = usePathname();

  const { task } =
    useCurrentTask();

  const { project } =
    useCurrentProject();

  const { currentWorkspace } =
    useWorkspace();

  if (
    !task ||
    !project ||
    !currentWorkspace
  ) {
    return null;
  }

  const workspaceId =
    currentWorkspace.workspaceId._id;

  const projectId = project._id;

  const taskId = task._id;

  const items = [
    {
      label: 'Details',
      icon: <FileTextOutlined />,
      href: `/user/workspace/${workspaceId}/project/${projectId}/tasks/${taskId}`,
    },
    {
      label: 'Checklist',
      icon: <CheckSquareOutlined />,
      href: `/user/workspace/${workspaceId}/project/${projectId}/tasks/${taskId}/checklist`,
    },
    {
      label: 'Comments',
      icon: <CommentOutlined />,
      href: `/user/workspace/${workspaceId}/project/${projectId}/tasks/${taskId}/comments`,
    },
    {
      label: 'Attachments',
      icon: <PaperClipOutlined />,
      href: `/user/workspace/${workspaceId}/project/${projectId}/tasks/${taskId}/attachments`,
    },
  ];

  return (
    <nav className={styles.navigation}>
      {items.map((item) => {
        const active =
          pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navItem} ${
              active
                ? styles.active
                : ''
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