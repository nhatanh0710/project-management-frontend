'use client';

import {
  Col,
  Row,
} from 'antd';

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  FolderOpenOutlined,
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

  const items = [
    {
      title: 'Projects',
      value: projects.length,
      icon: <FolderOpenOutlined />,
    },
    {
      title: 'Completed',
      value: completed,
      icon: <CheckCircleOutlined />,
    },
    {
      title: 'In Progress',
      value: progress,
      icon: <ClockCircleOutlined />,
    },
    {
      title: 'On Hold',
      value: hold,
      icon: <PauseCircleOutlined />,
    },
  ];

  return (
    <Row
      gutter={[18, 18]}
      className={styles.grid}
    >
      {items.map((item) => (
        <Col
          key={item.title}
          xs={24}
          sm={12}
          xl={6}
        >
          <div
            className={
              styles.statCard
            }
          >
            <div
              className={
                styles.icon
              }
            >
              {item.icon}
            </div>

            <div
              className={
                styles.content
              }
            >
              <div
                className={
                  styles.value
                }
              >
                {item.value}
              </div>

              <div
                className={
                  styles.label
                }
              >
                {item.title}
              </div>

              <div
                className={
                  styles.caption
                }
              >
                Live workspace data
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}