'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Avatar } from 'antd';

import {
  HomeOutlined,
  CheckSquareOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { useAuth } from '@/contexts/auth.context';

import { clearAuth } from '@/utils/auth';

import WorkspaceList from '@/components/workspace/workspace-list';

import styles from './styles.module.scss';

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

  const router = useRouter();

  const { user } = useAuth();

  const handleLogout = () => {
    clearAuth();

    router.push('/auth/login');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          PM
        </div>

        <div>
          <h2>PM System</h2>
        </div>
      </div>

      <nav className={styles.menu}>
        {menus.map((item) => {
          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.item} ${
                active
                  ? styles.active
                  : ''
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

      <div className={styles.footer}>
        <Link
          href="/user/profile"
          className={styles.profileCard}
        >
          <Avatar
            size={44}
            src={user?.avatar_url}
            icon={<UserOutlined />}
          />

          <div className={styles.info}>
            <div className={styles.name}>
              {user?.name ??
                'User'}
            </div>

            <div className={styles.role}>
              Workspace Owner
            </div>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className={styles.logout}
        >
          <LogoutOutlined />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}