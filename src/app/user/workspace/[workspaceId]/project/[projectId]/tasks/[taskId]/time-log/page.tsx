'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import dayjs from 'dayjs';
import { Card, Typography } from 'antd';

import { TimeLogProvider } from '@/contexts/time-log.context';

import TimeLogSummary from '@/components/task/time-log/time-log-summary';
import TimeLogToolbar from '@/components/task/time-log/time-log-toolbar';
import TimeLogList from '@/components/task/time-log/time-log-list';

import CreateTimeLogModal from '@/components/task/time-log/modal/time-log-create-modal';
import UpdateTimeLogModal from '@/components/task/time-log/modal/time-log-update-modal';

import type { TimeLog } from '@/types/time-log.type';

const { Title, Text } = Typography;

export default function TimeLogPage() {
  const { taskId } = useParams();

  const [openCreate, setOpenCreate] =
    useState(false);

  const [openUpdate, setOpenUpdate] =
    useState(false);

  const [
    selectedLog,
    setSelectedLog,
  ] = useState<TimeLog | null>(null);

  const [keyword, setKeyword] =
    useState('');

  const [
    selectedDate,
    setSelectedDate,
  ] =
    useState<dayjs.Dayjs | null>(
      null,
    );

  const openEdit = (log: TimeLog) => {
    setSelectedLog(log);
    setOpenUpdate(true);
  };

  return (
    <TimeLogProvider taskId={taskId as string}>
      <Card className="mx-auto max-w-5xl">
        <div className="mb-5">
          <Title
            level={4}
            className="!mb-1"
          >
            Time Logs
          </Title>

          <Text type="secondary">
            Track and manage all recorded
            working hours for this task.
          </Text>
        </div>

        <div className="flex flex-col gap-5">
          <TimeLogSummary />

          <TimeLogToolbar
            keyword={keyword}
            setKeyword={setKeyword}
            selectedDate={
              selectedDate
            }
            setSelectedDate={
              setSelectedDate
            }
            onCreate={() =>
              setOpenCreate(true)
            }
          />

          <TimeLogList
            onEdit={openEdit}
          />
        </div>
      </Card>

      <CreateTimeLogModal
        open={openCreate}
        onClose={() =>
          setOpenCreate(false)
        }
      />

      <UpdateTimeLogModal
        open={openUpdate}
        log={selectedLog}
        onClose={() => {
          setOpenUpdate(false);
          setSelectedLog(null);
        }}
      />
    </TimeLogProvider>
  );
}