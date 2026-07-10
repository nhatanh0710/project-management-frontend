import { Tag } from "antd";

import { TaskStatus } from "@/types/task.type";
import {
  TASK_STATUS_COLORS,
  TASK_STATUS_LABELS,
} from "@/utils/task";
import styles from "./styles.module.scss";

interface TaskStatusTagProps {
  status: TaskStatus;
}

export default function TaskStatusTag({
  status,
}: TaskStatusTagProps) {
  return (
    <Tag
      color={TASK_STATUS_COLORS[status]}
        className={styles.tag}
    >
      {TASK_STATUS_LABELS[status]}
    </Tag>
  );
}