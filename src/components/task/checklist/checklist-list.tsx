'use client';

import {
  Empty,
  Skeleton,
} from 'antd';

import { useChecklist } from '@/contexts/checklist.context';

import ChecklistItem from './checklist-item';

import styles from './styles.module.scss';

export default function ChecklistList() {
  const {
    checklists,
    loading,
  } = useChecklist();

  if (loading) {
    return (
      <div className={styles.list}>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }

  if (
    checklists.length === 0
  ) {
    return (
      <div
        className={styles.empty}
      >
        <Empty
          description="No checklist found"
        />
      </div>
    );
  }

  return (
    <div
      className={styles.list}
    >
      {checklists.map(
        (checklist) => (
          <ChecklistItem
            key={
              checklist._id
            }
            checklist={
              checklist
            }
          />
        ),
      )}
    </div>
  );
}