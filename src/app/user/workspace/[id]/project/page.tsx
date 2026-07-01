'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useProject } from '@/contexts/project-list.context';

import ProjectSidebar from '@/components/project/project-sidebar/index';
import ProjectHeader from '@/components/project/project-header/index';

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();

  const {
    projects,
    setCurrentProject,
    currentProject,
    refreshProjects,
  } = useProject();

  useEffect(() => {
    if (!id) return;

    // đảm bảo list project đã có
    if (projects.length === 0) {
      refreshProjects();
    }

    // set current project theo id
    const found = projects.find((p) => p._id === id);

    if (found) {
      setCurrentProject(found);
    }
  }, [id, projects]);

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* MAIN AREA */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#fafafa',
          overflow: 'hidden',
        }}
      >
        {/* PROJECT HEADER */}
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #e5e7eb',
            background: '#fff',

            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            {currentProject?.name || 'Project'}
          </div>

          {/* tabs */}
          <div style={{ display: 'flex', gap: 8 }}>
            {['Dashboard', 'Board', 'Calendar', 'Tasks'].map(
              (tab) => (
                <button
                  key={tab}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 8,
                    border: 'none',
                    background: '#f3f4f6',
                    cursor: 'pointer',
                    fontSize: 12,
                  }}
                >
                  {tab}
                </button>
              ),
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div
          style={{
            flex: 1,
            padding: 20,
            overflow: 'auto',
          }}
        >
          {!currentProject ? (
            <div>Loading project...</div>
          ) : (
            <div>
              <h3>Project Content Area</h3>
              <p>
                Board / Task / Calendar will be rendered here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div
        style={{
          width: 260,
          borderLeft: '1px solid #e5e7eb',
          background: '#fff',
        }}
      >
        <ProjectSidebar />
      </div>
    </div>
  );
}