'use client';

import { Button, Input, DatePicker, Space } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import dayjs from 'dayjs';

import { useTimeLog } from '@/contexts/time-log.context';

import styles from './styles.module.scss';

interface Props {
  keyword: string;
  setKeyword: (value: string) => void;

  selectedDate: dayjs.Dayjs | null;
  setSelectedDate: (
    value: dayjs.Dayjs | null,
  ) => void;

  onCreate: () => void;
}

export default function TimeLogToolbar({
  keyword,
  setKeyword,
  selectedDate,
  setSelectedDate,
  onCreate,
}: Props) {
  const { loading } = useTimeLog();

  return (
    <div className={styles.toolbar}>
      <Space
        className={styles.toolbarLeft}
      >
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Search note..."
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          style={{ width: 260 }}
        />

        <DatePicker
          allowClear
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </Space>

      <Button
        type="primary"
        loading={loading}
        icon={<PlusOutlined />}
        onClick={onCreate}
      >
        Log Time
      </Button>
    </div>
  );
}