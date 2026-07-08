'use client';

import { Col, Empty, Row, Spin } from 'antd';

import { useProjectTask } from '@/contexts/task.context';

import TaskCard from './task-card';

export default function TaskBoard() {
  const { tasks, loading } = useProjectTask();

  if (loading) {
    return <Spin />;
  }

  if (!tasks.length) {
    return <Empty description="No tasks found" />;
  }

  return (
    <Row gutter={[16, 16]}>
      {tasks.map((task) => (
        <Col
          xs={24}
          sm={12}
          lg={8}
          xl={6}
          key={task._id}
        >
          <TaskCard task={task} />
        </Col>
      ))}
    </Row>
  );
}