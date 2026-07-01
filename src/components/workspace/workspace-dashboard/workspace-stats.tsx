'use client';

import {
  Card,
  Col,
  Row,
  Statistic,
} from 'antd';

import {
  FolderOpenOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons';

import { useProjectList } from '@/contexts/project-list.context';

import { ProjectStatus } from '@/types/project.type';

import styles from './styles.module.scss';

export default function WorkspaceStats() {
  const { projects } =
    useProjectList();

  const completed =
    projects.filter(
      (p) =>
        p.status ===
        ProjectStatus.COMPLETED,
    ).length;

  const progress =
    projects.filter(
      (p) =>
        p.status ===
        ProjectStatus.IN_PROGRESS,
    ).length;

  const hold =
    projects.filter(
      (p) =>
        p.status ===
        ProjectStatus.ON_HOLD,
    ).length;

  return (
    <Row
      gutter={[20, 20]}
      className={styles.grid}
    >
      <Col xs={24} md={12} xl={6}>
        <Card className={styles.card}>
          <Statistic
            title="Projects"
            value={projects.length}
            prefix={
              <FolderOpenOutlined
                className={
                  styles.icon
                }
              />
            }
          />
        </Card>
      </Col>

      <Col xs={24} md={12} xl={6}>
        <Card className={styles.card}>
          <Statistic
            title="Completed"
            value={completed}
            prefix={
              <CheckCircleOutlined
                className={
                  styles.icon
                }
              />
            }
          />
        </Card>
      </Col>

      <Col xs={24} md={12} xl={6}>
        <Card className={styles.card}>
          <Statistic
            title="In Progress"
            value={progress}
            prefix={
              <ClockCircleOutlined
                className={
                  styles.icon
                }
              />
            }
          />
        </Card>
      </Col>

      <Col xs={24} md={12} xl={6}>
        <Card className={styles.card}>
          <Statistic
            title="On Hold"
            value={hold}
            prefix={
              <PauseCircleOutlined
                className={
                  styles.icon
                }
              />
            }
          />
        </Card>
      </Col>
    </Row>
  );
}