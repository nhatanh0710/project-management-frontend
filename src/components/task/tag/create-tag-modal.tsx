'use client';

import { useState } from 'react';

import {
  Button,
  Form,
  Input,
  Modal,
  message,
} from 'antd';

import { useCurrentTask } from '@/contexts/current-task.context';

import { tagService } from '@/services/tag.service';

import styles from './styles.module.scss';

interface Props {
  open: boolean;

  onClose: () => void;

  onSuccess: () => Promise<void>;
}

const COLORS = [
  '#1677FF',
  '#52C41A',
  '#13C2C2',
  '#722ED1',
  '#EB2F96',
  '#FA541C',
  '#FAAD14',
  '#F5222D',
  '#595959',
  '#8C8C8C',
];

export default function CreateTagModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const { task } = useCurrentTask();

  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState('');

  const [color, setColor] =
    useState(COLORS[0]);

  const handleCreate =
    async () => {
      if (!task) return;

      if (!name.trim()) {
        return message.warning(
          'Please enter tag name',
        );
      }

      try {
        setLoading(true);

        await tagService.create(
          task.project_id,
          {
            name: name.trim(),
            color,
          },
        );

        message.success(
          'Tag created successfully',
        );

        setName('');

        setColor(COLORS[0]);

        await onSuccess();

        onClose();
      } catch (err: any) {
        message.error(
          err?.response?.data
            ?.message ??
            'Create tag failed',
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Modal
      open={open}
      title="Create Tag"
      footer={null}
      onCancel={onClose}
      destroyOnHidden
    >
      <Form layout="vertical">
        <Form.Item label="Tag Name">
          <Input
            maxLength={50}
            placeholder="Backend"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value,
              )
            }
          />
        </Form.Item>

        <Form.Item label="Choose Color">
          <div
            className={
              styles.colorPicker
            }
          >
            {COLORS.map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  className={`${styles.colorItem} ${
                    color === item
                      ? styles.active
                      : ''
                  }`}
                  style={{
                    backgroundColor:
                      item,
                  }}
                  onClick={() =>
                    setColor(item)
                  }
                />
              ),
            )}
          </div>
        </Form.Item>

        <Form.Item label="Preview">
          <span
            className={styles.previewTag}
            style={{
              backgroundColor: `${color}20`,
              borderColor: color,
              color,
            }}
          >
            {name || 'Tag Preview'}
          </span>
        </Form.Item>

        <div className={styles.footer}>
          <Button
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            loading={loading}
            onClick={
              handleCreate
            }
          >
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
}