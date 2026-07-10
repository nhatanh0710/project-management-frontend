'use client';

import { useState } from 'react';

import {
  Button,
  Checkbox,
  Input,
  Popconfirm,
  Space,
  Typography,
} from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import dayjs from 'dayjs';

import { useChecklist } from '@/contexts/checklist.context';

import { Checklist } from '@/types/checklist.type';

import styles from './styles.module.scss';

const { Text } = Typography;
const { TextArea } = Input;

interface ChecklistItemProps {
  checklist: Checklist;
}

export default function ChecklistItem({
  checklist,
}: ChecklistItemProps) {
  const {
    completeChecklist,
    uncompleteChecklist,
    updateChecklist,
    deleteChecklist,
  } = useChecklist();

  const [editing, setEditing] =
    useState(false);

  const [title, setTitle] =
    useState(checklist.title);

  const [description, setDescription] =
    useState(
      checklist.description ?? '',
    );

  const handleSave =
    async () => {
      await updateChecklist(
        checklist._id,
        {
          title,
          description,
        },
      );

      setEditing(false);
    };

  const handleCancel =
    () => {
      setTitle(checklist.title);

      setDescription(
        checklist.description ?? '',
      );

      setEditing(false);
    };

  const handleToggle =
    async (
      checked: boolean,
    ) => {
      if (checked) {
        await completeChecklist(
          checklist._id,
        );
      } else {
        await uncompleteChecklist(
          checklist._id,
        );
      }
    };

  return (
    <div
      className={`${styles.item} ${
        checklist.is_done
          ? styles.completed
          : ''
      }`}
    >
      <div
        className={styles.header}
      >
        <Checkbox
          checked={
            checklist.is_done
          }
          onChange={(e) =>
            handleToggle(
              e.target.checked,
            )
          }
        />

        <div
          className={
            styles.content
          }
        >
          {editing ? (
            <>
              <Input
                value={title}
                placeholder="Title"
                onChange={(
                  e,
                ) =>
                  setTitle(
                    e.target.value,
                  )
                }
              />

              <TextArea
                rows={3}
                value={
                  description
                }
                placeholder="Description"
                onChange={(
                  e,
                ) =>
                  setDescription(
                    e.target.value,
                  )
                }
              />
            </>
          ) : (
            <>
              <Text
                strong
                className={
                  checklist.is_done
                    ? styles.doneTitle
                    : ''
                }
              >
                {
                  checklist.title
                }
              </Text>

              {checklist.description && (
                <Text
                  className={
                    styles.description
                  }
                >
                  {
                    checklist.description
                  }
                </Text>
              )}
            </>
          )}
        </div>

        <Space>
          {editing ? (
            <>
              <Button
                type="text"
                icon={
                  <SaveOutlined />
                }
                onClick={
                  handleSave
                }
              />

              <Button
                type="text"
                icon={
                  <CloseOutlined />
                }
                onClick={
                  handleCancel
                }
              />
            </>
          ) : (
            <>
              <Button
                type="text"
                icon={
                  <EditOutlined />
                }
                onClick={() =>
                  setEditing(
                    true,
                  )
                }
              />

              <Popconfirm
                title="Delete checklist?"
                okText="Delete"
                cancelText="Cancel"
                onConfirm={() =>
                  deleteChecklist(
                    checklist._id,
                  )
                }
              >
                <Button
                  danger
                  type="text"
                  icon={
                    <DeleteOutlined />
                  }
                />
              </Popconfirm>
            </>
          )}
        </Space>
      </div>

      {!editing && (
        <div
          className={
            styles.meta
          }
        >
          <Text
            type="secondary"
          >
            Created by{' '}
            <strong>
              {
                checklist
                  .created_by
                  ?.name
              }
            </strong>

            {' • '}

            {dayjs(
              checklist.createdAt,
            ).format(
              'DD/MM/YYYY HH:mm',
            )}
          </Text>

          {checklist.is_done &&
            checklist.completed_by && (
              <Text
                type="secondary"
              >
                Completed by{' '}
                <strong>
                  {
                    checklist
                      .completed_by
                      .name
                  }
                </strong>

                {' • '}

                {dayjs(
                  checklist.completed_at,
                ).format(
                  'DD/MM/YYYY HH:mm',
                )}
              </Text>
            )}
        </div>
      )}
    </div>
  );
}