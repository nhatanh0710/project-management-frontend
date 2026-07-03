'use client';

import ProjectSettingsGeneral from '@/components/project/settings/project-setting-general';
import ProjectSettingsArchive from '@/components/project/settings/project-setting-archive';
import ProjectSettingDelete from '@/components/project/settings/project-settings-delete';

import styles from './styles.module.scss';

export default function ProjectSettingsPage() {
  return (
    <div className={styles.container}>
      <ProjectSettingsGeneral />

      <ProjectSettingArchive />

      <ProjectSettingsDelete />
    </div>
  );
}