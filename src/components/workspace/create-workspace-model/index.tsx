'use client';

import { Form, Input, Modal, message } from 'antd';

import { Controller, useForm } from 'react-hook-form';

import { workspaceService } from '@/services/workspace.service';
import { useWorkspace } from '@/contexts/workspace.context';

import styles from './styles.module.scss';

interface FormValues {
  name: string;
  description: string;
}

export default function CreateWorkspaceModal() {
  const {
    openCreate,
    setOpenCreate,
    refresh,
  } = useWorkspace();

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleCancel = () => {
    reset();

    setOpenCreate(false);
  };

  const onSubmit = async (
    data: FormValues,
  ) => {
    try {
      await workspaceService.create(
        data,
      );

      message.success(
        'Workspace created successfully',
      );

      reset();

      setOpenCreate(false);

      await refresh();
    } catch (error: any) {
      message.error(
        error?.response?.data
          ?.message ??
          'Create workspace failed',
      );
    }
  };

  
  return (
    <Modal
      open={openCreate}
      footer={null}
      centered
      width={560}
      destroyOnHidden
      onCancel={handleCancel}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Create Workspace</h2>

          <p>
            A workspace is where you
            organize projects,
            members and tasks.
          </p>
        </div>

        <Form
          layout="vertical"
          className={styles.form}
        >
          <Form.Item label="Workspace Name">
            <Controller
              name="name"
              control={control}
              rules={{
                required:
                  'Workspace name is required',
              }}
              render={({
                field,
                fieldState,
              }) => (
                <>
                  <Input
                    {...field}
                    size="large"
                    placeholder="Enter workspace name"
                  />

                  {fieldState.error && (
                    <span
                      className={
                        styles.error
                      }
                    >
                      {
                        fieldState.error
                          .message
                      }
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
              render={({
                field,
              }) => (
                <Input.TextArea
                  {...field}
                  rows={5}
                  placeholder="Write a short description..."
                />
              )}
            />
          </Form.Item>

          <div className={styles.footer}>
            <button
              type="button"
              className={
                styles.cancel
              }
              onClick={
                handleCancel
              }
            >
              Cancel
            </button>

            <button
              type="button"
              className={
                styles.create
              }
              onClick={handleSubmit(
                onSubmit,
              )}
            >
              Create Workspace
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
