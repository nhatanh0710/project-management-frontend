import { Tag } from "antd";

import { TaskPriority } from "@/types/task.type";
import {
  TASK_PRIORITY_COLORS,
  TASK_PRIORITY_LABELS,
} from "@/utils/task";
import styles from "./styles.module.scss";
interface TaskPriorityTagProps {
  priority: TaskPriority;
}

export default function TaskPriorityTag({
  priority,
}: TaskPriorityTagProps) {
  return (
    <Tag
      color={TASK_PRIORITY_COLORS[priority]}
      className={styles.tag}
    >
      {TASK_PRIORITY_LABELS[priority]}
    </Tag>
  );
}