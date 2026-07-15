'use client';

import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  message,
} from 'antd';

import {
  useEffect,
  useState,
} from 'react';

import { useCurrentTask } from '@/contexts/current-task.context';

import { tagService } from '@/services/tag.service';

import { Tag } from '@/types/tag.type';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AssignTagModal({
  open,
  onClose,
}: Props) {
  const {
    task,
    refreshTask,
  } = useCurrentTask();

  const [loading, setLoading] =
    useState(false);

  const [tags, setTags] =
    useState<Tag[]>([]);

  const [selected, setSelected] =
    useState<string[]>([]);

  const [newName, setNewName] =
    useState('');

  useEffect(() => {
    if (!open || !task) return;

    const load = async () => {
      try {
        const data =
          await tagService.getTags(
            task.project_id,
          );

        setTags(data);

        setSelected(
          task.tag_ids.map(
            (i) => i._id,
          ),
        );
      } catch {
        message.error(
          'Load tags failed',
        );
      }
    };

    load();
  }, [open, task]);

  const createTag =
    async () => {
      if (!newName.trim() || !task)
        return;

      try {
        const created =
          await tagService.create(
            task.project_id,
            {
              name: newName,
            },
          );

        setTags((old) => [
          ...old,
          created,
        ]);

        setSelected((old) => [
          ...old,
          created._id,
        ]);

        setNewName('');
      } catch (e: any) {
        message.error(
          e?.response?.data
            ?.message ??
            'Create tag failed',
        );
      }
    };

  const handleSave =
    async () => {
      if (!task) return;

      try {
        setLoading(true);

        await tagService.assignTags(
          task._id,
          selected,
        );

        await refreshTask();

        message.success(
          'Tags updated',
        );

        onClose();
      } catch (e: any) {
        message.error(
          e?.response?.data
            ?.message ??
            'Update failed',
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Modal
      open={open}
      title="Task Tags"
      onCancel={onClose}
      onOk={handleSave}
      confirmLoading={loading}
    >
      <Form layout="vertical">
        <Form.Item label="Existing tags">
          <Select
            mode="multiple"
            value={selected}
            onChange={setSelected}
            options={tags.map(
              (tag) => ({
                value: tag._id,
                label: tag.name,
              }),
            )}
          />
        </Form.Item>

        <Divider />

        <Form.Item label="Create new tag">
          <Input
            value={newName}
            onChange={(e) =>
              setNewName(
                e.target.value,
              )
            }
            onPressEnter={
              createTag
            }
          />
        </Form.Item>

        <Button
          onClick={createTag}
        >
          Create Tag
        </Button>
      </Form>
    </Modal>
  );
}