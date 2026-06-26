'use client';

import { Button } from 'antd';

import {
  PlusOutlined,
  BulbOutlined,
} from '@ant-design/icons';

import {
  useWorkspace,
} from '@/contexts/workspace.context';

import styles from './styles.module.scss';

export default function WorkspaceSidebar() {
  const {
    workspaces,
    setOpenCreate,
  } = useWorkspace();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2>Workspace</h2>

        <p>
          Organize your projects and
          collaborate with your team.
        </p>
      </div>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        block
        size="large"
        onClick={() =>
          setOpenCreate(true)
        }
      >
        Create Workspace
      </Button>

      <section className={styles.section}>
        <h3>Overview</h3>

        <div className={styles.card}>
          <div className={styles.row}>
            <span>Total Workspaces</span>

            <strong>
              {workspaces.length}
            </strong>
          </div>

          <div className={styles.row}>
            <span>Owned</span>

            <strong>
              {workspaces.length}
            </strong>
          </div>

          <div className={styles.row}>
            <span>Joined</span>

            <strong>0</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3>
          <BulbOutlined /> Tips
        </h3>

        <p className={styles.tip}>
          A Workspace contains multiple
          Projects. Invite your teammates
          and organize work efficiently.
        </p>
      </section>
    </aside>
  );
}