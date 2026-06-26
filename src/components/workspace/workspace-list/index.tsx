'use client';

import Link from 'next/link';

import {
  AppstoreOutlined,
} from '@ant-design/icons';

import {
  useWorkspace,
} from '@/contexts/workspace.context';

import styles from './styles.module.scss';
import { workspaceService } from '@/services/workspace.service';
import { useEffect, useState } from 'react';

export default function WorkspaceList() {
 const [workspaces, setWorkspaces] =
  useState([]);

const [loading, setLoading] =
  useState(true);

useEffect(() => {
  loadWorkspaces();
}, []);

const loadWorkspaces = async () => {
  try {
    setLoading(true);

    const data =
      await workspaceService.getMyWorkspaces();

    setWorkspaces(data);
  } finally {
    setLoading(false);
  }
};

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
        ) : workspaces.length === 0 ? (
          <div className={styles.empty}>
            No workspace
          </div>
        ) : (
          workspaces
            .slice(0, 5)
            .map((item) => (
              <Link
                key={item.workspaceId._id}
                href={`/user/workspace/${item.workspaceId._id}`}
                className={styles.item}
              >
                <div className={styles.icon}>
                  <AppstoreOutlined />
                </div>

                <span className={styles.name}>
                  {item.workspaceId.name}
                </span>
              </Link>
            ))
        )}
      </div>
    </div>
  );
}