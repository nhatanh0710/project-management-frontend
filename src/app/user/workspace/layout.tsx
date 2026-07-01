'use client';

import {
  useWorkspace,
} from '@/contexts/workspace.context';

import CreateWorkspaceModal from '@/components/workspace/create-workspace-modal';
import UpdateWorkspaceModal from '@/components/workspace/update-workspace-modal';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    openCreate,
    setOpenCreate,

    openUpdate,
    selectedWorkspace,

    closeUpdateModal,

    refresh,
  } = useWorkspace();

  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>

      <CreateWorkspaceModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={refresh}
      />

      <UpdateWorkspaceModal
        open={openUpdate}
        workspace={selectedWorkspace}
        onClose={closeUpdateModal}
        onSuccess={async () => {
          closeUpdateModal();
          await refresh();
        }}
      />
    </>
  );
}