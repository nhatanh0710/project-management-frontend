'use client';

import {
  Input,
  Select,
  Space,
} from 'antd';

import {
  SearchOutlined,
} from '@ant-design/icons';

import { useMyTask } from '@/contexts/my-task.context';

import {
  TaskPriority,
  TaskStatus,
} from '@/types/task.type';

import styles from './styles.module.scss';

const { Option } = Select;

export default function MyTaskFilter() {
  const {
    search,
    setSearch,

    status,
    setStatus,

    priority,
    setPriority,
  } = useMyTask();

  return (
    <div className={styles.filter}>
      <Input
        allowClear
        size="large"
        placeholder="Search task..."
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <Space wrap>
        <Select
          size="large"
          value={status}
          style={{
            width: 180,
          }}
          onChange={setStatus}
        >
          <Option value="">
            All Status
          </Option>

          <Option
            value={TaskStatus.TODO}
          >
            Todo
          </Option>

          <Option
            value={
              TaskStatus.IN_PROGRESS
            }
          >
            In Progress
          </Option>

          <Option
            value={
              TaskStatus.REVIEW
            }
          >
            Review
          </Option>

          <Option
            value={TaskStatus.DONE}
          >
            Done
          </Option>
        </Select>

        <Select
          size="large"
          value={priority}
          style={{
            width: 180,
          }}
          onChange={setPriority}
        >
          <Option value="">
            All Priority
          </Option>

          <Option
            value={TaskPriority.LOW}
          >
            Low
          </Option>

          <Option
            value={
              TaskPriority.MEDIUM
            }
          >
            Medium
          </Option>

          <Option
            value={TaskPriority.HIGH}
          >
            High
          </Option>

          <Option
            value={
              TaskPriority.URGENT
            }
          >
            Urgent
          </Option>
        </Select>
      </Space>
    </div>
  );
}