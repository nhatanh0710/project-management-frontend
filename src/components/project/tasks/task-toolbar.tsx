'use client';

import { useEffect, useState } from 'react';

import {
  Button,
  Input,
  Select,
  Space,
} from 'antd';

import {
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { useProjectTask } from '@/contexts/task.context';
import { useCurrentProject } from '@/contexts/current-project.context';
import {
  TaskPriority,
  TaskStatus,
} from '@/types/task.type';

export default function TaskToolbar() {
  const {
    search,
    setSearch,

    status,
    setStatus,

    priority,
    setPriority,

    setOpenCreate,
  } = useProjectTask();
const { isArchived } = useCurrentProject();
  const [keyword, setKeyword] =
    useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(keyword);
    }, 400);

    return () =>
      clearTimeout(timer);
  }, [keyword, setSearch]);

  return (
    <Space
      style={{
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}
      wrap
    >
      <Space wrap>
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Search task..."
          value={keyword}
          style={{
            width: 260,
          }}
          onChange={(e) =>
            setKeyword(
              e.target.value,
            )
          }
        />

        <Select
          allowClear
          placeholder="Status"
          value={
            status || undefined
          }
          style={{
            width: 170,
          }}
          onChange={(value) =>
            setStatus(value ?? '')
          }
          options={[
            {
              label: 'Todo',
              value:
                TaskStatus.TODO,
            },
            {
              label: 'In Progress',
              value:
                TaskStatus.IN_PROGRESS,
            },
            {
              label: 'Review',
              value:
                TaskStatus.REVIEW,
            },
            {
              label: 'Done',
              value:
                TaskStatus.DONE,
            },
          ]}
        />

        <Select
          allowClear
          placeholder="Priority"
          value={
            priority || undefined
          }
          style={{
            width: 170,
          }}
          onChange={(value) =>
            setPriority(value ?? '')
          }
          options={[
            {
              label: 'Low',
              value:
                TaskPriority.LOW,
            },
            {
              label: 'Medium',
              value:
                TaskPriority.MEDIUM,
            },
            {
              label: 'High',
              value:
                TaskPriority.HIGH,
            },
            {
              label: 'Urgent',
              value:
                TaskPriority.URGENT,
            },
          ]}
        />
      </Space>

      <Button
        type="primary"
        disabled={isArchived}
  title={isArchived ? 'Project is archived' : ''}
        icon={<PlusOutlined />}
        onClick={() =>
          setOpenCreate(true)
        }
      >
        Create Task
      </Button>
    </Space>
  );
}