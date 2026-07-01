'use client';

import Link from 'next/link';

import {
  Card,
  Empty,
  Progress,
  Tag,
} from 'antd';

import { useParams } from 'next/navigation';

import { useProjectList } from '@/contexts/project-list.context';

import ProjectStatusTag from '@/components/project/common/project-status-tag';

import styles from './styles.module.scss';

export default function RecentProjects() {
  const { id } = useParams();

  const { projects } =
    useProjectList();

  if (!projects.length) {
    return (
      <Card
        title="Recent Projects"
        className={styles.card}
      >
        <Empty
          description="No project yet"
        />
      </Card>
    );
  }

  return (
    <Card
      title="Recent Projects"
      className={styles.card}
    >
      <div className={styles.list}>
        {projects
          .slice(0, 5)
          .map((project) => (
            <Link
              key={project._id}
              href={`/user/workspace/${id}/project/${project._id}`}
              className={styles.row}
            >
              <div className={styles.left}>
                <div
                  className={
                    styles.name
                  }
                >
                  {project.name}
                </div>

                <ProjectStatusTag
                  status={
                    project.status
                  }
                />
              </div>

              <div className={styles.right}>
                <Progress
                  percent={
                    project.progress
                  }
                  size="small"
                />
              </div>
            </Link>
          ))}
      </div>
    </Card>
  );
}