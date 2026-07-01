'use client';

import { useEffect } from 'react';

import { Form, Input, Modal, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { workspaceService } from '@/services/workspace.service';
import { useWorkspace } from '@/contexts/workspace.context';

import styles from './styles.module.scss';

interface FormValues {
  name: string;
  description: string;
}

export default function UpdateWorkspaceModal() {
  const {
    openUpdate,
    selectedWorkspace,
    closeUpdateModal,
    refresh,
  } = useWorkspace();

  const { control, handleSubmit, reset } =
    useForm<FormValues>({
      defaultValues: {
        name: '',
        description: '',
      },
    });

  useEffect(() => {
    if (selectedWorkspace) {
      reset({
  name: selectedWorkspace.workspaceId.name,
  description:
    selectedWorkspace.workspaceId.description || '',
      });
    }
  }, [selectedWorkspace, reset]);

  const handleCancel = () => {
    reset();
    closeUpdateModal();
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await workspaceService.update(
        selectedWorkspace.workspaceId._id,
        data,
      );

      message.success('Workspace updated successfully');

      closeUpdateModal();
      await refresh();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ??
          'Update workspace failed',
      );
    }
  };

  return (
    <Modal
      open={openUpdate}   
      footer={null}
      centered
      width={560}
      destroyOnHidden
      onCancel={handleCancel}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Edit Workspace</h2>
          <p>Update your workspace information.</p>
        </div>

        <Form layout="vertical" className={styles.form}>
          <Form.Item label="Workspace Name">
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Workspace name is required',
              }}
              render={({ field, fieldState }) => (
                <>
                 <Input
  value={field.value}
  onChange={field.onChange}
  onBlur={field.onBlur}
/>

                  {fieldState.error && (
                    <span className={styles.error}>
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </Form.Item>

          <Form.Item label="Description">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input.TextArea
  value={field.value}
  onChange={field.onChange}
  onBlur={field.onBlur}
  rows={5}
  placeholder="Workspace description"
/>
              )}
            />
          </Form.Item>

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.cancel}
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="button"
              className={styles.update}
              onClick={handleSubmit(onSubmit)}
            >
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}