'use client';

import { Table } from 'antd';

import { useProjectTask } from '@/contexts/task.context';

import { taskTableColumns } from './task-table-columns';

export default function TaskList() {
  const {
    tasks,
    loading,
    pagination,
    changePage,
    openUpdateModal,
  } = useProjectTask();

  return (
    <Table
      rowKey="_id"
      loading={loading}
      columns={taskTableColumns}
      dataSource={tasks}
      pagination={{
        current: pagination.page,
        pageSize: pagination.limit,
        total: pagination.total,
        onChange: changePage,
      }}
      onRow={(record) => ({
        onClick: () =>
          openUpdateModal(record),
      })}
    />
  );
}