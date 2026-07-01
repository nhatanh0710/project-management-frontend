'use client';

import Link from 'next/link';
import { AppstoreOutlined } from '@ant-design/icons';

import { useWorkspace } from '@/contexts/workspace.context';
import styles from './styles.module.scss';

export default function WorkspaceList() {
  const {
    workspaces,
    loading,
    currentWorkspace,
    setCurrentWorkspace,
  } = useWorkspace();

  const recentWorkspaces = (() => {
    const sorted = [...workspaces].sort((a: any, b: any) => {
      return (
        new Date(b.workspaceId.createdAt).getTime() -
        new Date(a.workspaceId.createdAt).getTime()
      );
    });

    const activeWorkspace = sorted.find(
      (item: any) =>
        item.workspaceId._id ===
        currentWorkspace?.workspaceId._id
    );

    const others = sorted.filter(
      (item: any) =>
        item.workspaceId._id !==
        currentWorkspace?.workspaceId._id
    );

    return activeWorkspace
      ? [activeWorkspace, ...others.slice(0, 3)]
      : sorted.slice(0, 4);
  })();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Workspaces</span>

        <Link
          href="/user/workspace"
          className={styles.viewAll}
        >
          View all
        </Link>
      </div>

      <div className={styles.list}>
        {loading ? (
          <div className={styles.empty}>
            Loading...
          </div>
        ) : recentWorkspaces.length === 0 ? (
          <div className={styles.empty}>
            No workspace
          </div>
        ) : (
          recentWorkspaces.map((item: any) => {
            const isActive =
              item.workspaceId._id ===
              currentWorkspace?.workspaceId._id;

            return (
              <Link
                key={item.workspaceId._id}
                href={`/user/workspace/${item.workspaceId._id}`}
                onClick={() => setCurrentWorkspace(item)}
                className={`${styles.item} ${
                  isActive ? styles.active : ''
                }`}
              >
                <div className={styles.icon}>
                  <AppstoreOutlined />
                </div>

                <span className={styles.name}>
                  {item.workspaceId.name}
                </span>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}