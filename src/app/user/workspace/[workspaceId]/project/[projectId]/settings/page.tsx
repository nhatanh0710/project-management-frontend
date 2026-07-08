'use client';

import ProjectSettingsGeneral from '@/components/project/settings/project-settings-general';
import ProjectSettingsArchive from '@/components/project/settings/project-settings-archive';
import ProjectSettingsDelete from '@/components/project/settings/project-settings-delete';

export default function ProjectSettingsPage() {
  return (
    <div>
    <ProjectSettingsGeneral />

    <ProjectSettingsArchive />

    <ProjectSettingsDelete />

        
   
    </div>
  );
}