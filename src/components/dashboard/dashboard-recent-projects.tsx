'use client';

import Link from 'next/link';

import {
  Button,
  Card,
  Empty,
  Progress,
  Tag,
} from 'antd';

import styles from './styles.module.scss';

interface Props {
  projects: any[];
}

export default function DashboardRecentProjects({
  projects,
}: Props) {
  if (!projects.length) {
    return (
      <Card
        title="Recent Projects"
        className={styles.sectionCard}
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No recent projects"
        />
      </Card>
    );
  }

  return (
    <Card
      title="Recent Projects"
      className={styles.sectionCard}
    >
      <div className={styles.projectList}>
        {projects.map((project) => (
          <div
            key={project._id}
            className={styles.projectCard}
          >
            <div className={styles.projectHeader}>
              <div>
                <h4 className={styles.projectName}>
                  {project.name}
                </h4>

                <p className={styles.workspaceName}>
                  {project.workspace?.name}
                </p>
              </div>

              <Tag color="blue">
                {project.status}
              </Tag>
            </div>

            <Progress
              percent={
                project.progress ?? 0
              }
              showInfo={false}
              strokeLinecap="round"
            />

            <div className={styles.projectFooter}>
              <div className={styles.projectMeta}>
                <span>
                  {project.role}
                </span>

                {project.updatedAt && (
                  <>
                    <span>•</span>

                    <span>
                      {new Date(
                        project.updatedAt,
                      ).toLocaleDateString()}
                    </span>
                  </>
                )}
              </div>

              <Link
                href={`/user/workspace/${project.workspace?._id}/project/${project._id}`}
              >
                <Button
                  type="link"
                  size="small"
                >
                  Open →
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}