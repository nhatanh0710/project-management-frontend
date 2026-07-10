'use client';

import { Table } from 'antd';

import { useProjectTask } from '@/contexts/task.context';

import {  useTaskTableColumns } from './task-table-columns';

export default function TaskList() {
  const {
    tasks,
    loading,
    pagination,
    changePage,
    openUpdateModal,
  } = useProjectTask();
const columns =
    useTaskTableColumns();
  return (
    <Table
      rowKey="_id"
      loading={loading}
      columns={columns}
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