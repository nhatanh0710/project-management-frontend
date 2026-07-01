'use client';

import { useState } from 'react';

import {
  Empty,
  Input,
  Spin,
  Typography,
} from 'antd';

import {
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import {
  useWorkspace,
} from '@/contexts/workspace.context';

import CreateWorkspaceModal from '@/components/workspace/create-workspace-model';

import UpdateWorkspaceModal from '@/components/workspace/update-workspace-model';

import WorkspaceCard from '@/components/workspace/workspace-card';
import WorkspaceSidebar from '@/components/workspace/workspace-sidebar';

const { Paragraph } = Typography;

export default function WorkspacePage() {
  const [keyword, setKeyword] =
    useState('');

  const {
    workspaces,
    loading,

    openCreate,
    setOpenCreate,

    openUpdate,
    selectedWorkspace,
    closeUpdateModal,

    refresh,
  } = useWorkspace();

  const filtered =
    workspaces.filter((item: any) =>
      item.workspaceId?.name
        ?.toLowerCase()
        .includes(
          keyword.toLowerCase(),
        ),
    );

  return (
    <>
    <WorkspaceSidebar />
      <div
        style={{
          padding: 32,
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems: 'center',
            marginBottom: 32,
          }}
        >
          <div>
            <Paragraph>
              Manage all of your
              workspaces and quickly
              access your projects.
            </Paragraph>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 10,
            }}
          >
            <Input
              allowClear
              value={keyword}
              prefix={
                <SearchOutlined />
              }
              placeholder="Search workspace..."
              style={{
                width: 280,
              }}
              onChange={(e) =>
                setKeyword(
                  e.target.value,
                )
              }
            />

            <button
              style={{
                background:
                  'var(--primary)',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '0 22px',
                height: 40,
                cursor: 'pointer',
              }}
              onClick={() =>
                setOpenCreate(true)
              }
            >
              <PlusOutlined /> Create
            </button>
          </div>
        </div>

        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent:
                'center',
              paddingTop: 80,
            }}
          >
            <Spin size="large" />
          </div>
        ) : filtered.length ===
          0 ? (
          <Empty
            description="No workspace found"
          />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fill,minmax(330px,1fr))',
              gap: 24,
            }}
          >
            {filtered.map(
              (item: any) => (
                <WorkspaceCard
                  key={
                    item.workspaceId
                      ._id
                  }
                  workspace={
                    item
                  }
                />
              ),
            )}
          </div>
        )}
      </div>

      
    </>
  );
}