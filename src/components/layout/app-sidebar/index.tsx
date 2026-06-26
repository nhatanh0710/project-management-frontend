'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Avatar } from 'antd';

import {
  HomeOutlined,
  AppstoreOutlined,
  CheckSquareOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { getUser } from '@/utils/auth';
 import { useAuth } from '@/contexts/auth.context';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import WorkspaceList from '@/components/workspace/workspace-list';
const menus = [
  {
    label: 'Dashboard',
    href: '/user',
    icon: <HomeOutlined />,
  },
  
  {
    label: 'My Tasks',
    href: '/user/tasks',
    icon: <CheckSquareOutlined />,
  },
  {
    label: 'Settings',
    href: '/user/settings',
    icon: <SettingOutlined />,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();



const { user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>PM</div>

        <div>
          <h2>PM System</h2>
          <span>AI Project Management</span>
        </div>
      </div>

      <nav className={styles.menu}>
        {menus.map((item) => {
          const active =
            pathname === item.href 

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.item} ${
                active ? styles.active : ''
              }`}
            >
              <span className={styles.icon}>
                {item.icon}
              </span>

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <WorkspaceList />
      <div className={styles.user}>
        <Avatar
          size={42}
          icon={<UserOutlined />}
        />

        <div className={styles.info}>
          <div className={styles.name}>
            {user?.name ?? 'User'}
          </div>

          <div className={styles.role}>
            Workspace Owner
          </div>
        </div>
      </div>
    </aside>
  );
}