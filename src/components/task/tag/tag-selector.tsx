'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Popconfirm,
  Select,
  Space,
  Tag,
  message,
} from 'antd';

import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { useCurrentTask } from '@/contexts/current-task.context';

import { tagService } from '@/services/tag.service';

import { Tag as TagType } from '@/types/tag.type';

import CreateTagModal from './create-tag-modal';

import styles from './styles.module.scss';

interface Props {
  onSaved: () => Promise<void>;
  onCancel: () => void;
}

export default function TagSelector({
  onSaved,
  onCancel,
}: Props) {
  const { task } = useCurrentTask();

  const [tags, setTags] =
    useState<TagType[]>([]);

  const [selected, setSelected] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [openCreate, setOpenCreate] =
    useState(false);

  const loadTags = async () => {
    if (!task) return;

    try {
      const data =
        await tagService.getTags(
          task.project_id,
        );

      setTags(data);
    } catch (e: any) {
      message.error(
        e?.response?.data?.message ??
          'Load tags failed',
      );
    }
  };

  useEffect(() => {
    loadTags();
  }, [task]);

  useEffect(() => {
    if (!task) return;

    setSelected(
      task.tag_ids.map(
        (tag) => tag._id,
      ),
    );
  }, [task]);

  const handleSave =
    async () => {
      if (!task) return;

      try {
        setLoading(true);

        await tagService.assignTags(
          task._id,
          selected,
        );

        message.success(
          'Tags updated successfully',
        );

        await onSaved();
      } catch (e: any) {
        message.error(
          e?.response?.data?.message ??
            'Update tags failed',
        );
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (
      tagId: string,
    ) => {
      try {
        await tagService.remove(
          tagId,
        );

        message.success(
          'Tag deleted',
        );

        setSelected((prev) =>
          prev.filter(
            (id) => id !== tagId,
          ),
        );

        await loadTags();
      } catch (e: any) {
        message.error(
          e?.response?.data?.message ??
            'Delete failed',
        );
      }
    };

  return (
    <>
      <Select
        mode="multiple"
        style={{
          width: '100%',
        }}
        placeholder="Select tags..."
        value={selected}
        onChange={setSelected}
        options={tags.map(
          (tag) => ({
            value: tag._id,
            label: tag.name,
          }),
        )}
      />

      {/* Danh sách tag */}

      <div className={styles.tagList}>
        {tags.map((tag) => (
          <div
            key={tag._id}
            className={
              styles.tagRow
            }
          >
            <Tag
              color={tag.color}
              bordered
            >
              {tag.name}
            </Tag>

            <Popconfirm
              title="Delete this tag?"
              okText="Delete"
              cancelText="Cancel"
              onConfirm={() =>
                handleDelete(
                  tag._id,
                )
              }
            >
              <Button
                type="text"
                danger
                icon={
                  <DeleteOutlined />
                }
              />
            </Popconfirm>
          </div>
        ))}
      </div>

      <Space
        className={
          styles.footer
        }
      >
        <Button
          icon={
            <PlusOutlined />
          }
          onClick={() =>
            setOpenCreate(true)
          }
        >
          New Tag
        </Button>

        <div
          className={
            styles.actions
          }
        >
          <Button
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            loading={loading}
            onClick={
              handleSave
            }
          >
            Save
          </Button>
        </div>
      </Space>

      <CreateTagModal
        open={openCreate}
        onClose={() =>
          setOpenCreate(false)
        }
        onSuccess={async () => {
          await loadTags();
        }}
      />
    </>
  );
}