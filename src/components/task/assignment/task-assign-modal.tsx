'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  Avatar,
  Button,
  Form,
  Modal,
  Select,
  message,
} from 'antd';

import { UserOutlined } from '@ant-design/icons';

import { useParams } from 'next/navigation';

import { projectMemberService } from '@/services/project-member.service';
import { taskMemberService } from '@/services/task-member.service';

import { useCurrentTask } from '@/contexts/current-task.context';

import { ProjectMember } from '@/types/project-member.type';
import { TaskMember } from '@/types/task-member.type';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function TaskAssignModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const { projectId } = useParams();

  const { task } = useCurrentTask();

  const [loading, setLoading] =
    useState(false);

  const [members, setMembers] =
    useState<ProjectMember[]>([]);

  const [taskMembers, setTaskMembers] =
    useState<TaskMember[]>([]);

  const [selected, setSelected] =
    useState<string[]>([]);

  useEffect(() => {
    if (!open || !task) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [
          projectRes,
          taskRes,
        ] = await Promise.all([
          projectMemberService.getMembers(
            projectId as string,
            {
              page: 1,
              limit: 999,
            },
          ),
          taskMemberService.getMembers(
            task._id,
          ),
        ]);

        setMembers(
          Array.isArray(
            projectRes?.data,
          )
            ? projectRes.data
            : [],
        );

        setTaskMembers(
          Array.isArray(taskRes)
            ? taskRes
            : [],
        );
      } catch (e: any) {
        message.error(
          e?.response?.data
            ?.message ??
            'Load members failed',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    open,
    task,
    projectId,
  ]);

  const options = useMemo(() => {
    const existed = new Set(
      taskMembers.map(
        (m) => m.user_id._id,
      ),
    );

    return members
      .filter(
        (member) =>
          member.is_active !== false &&
          !existed.has(
            member.user._id,
          ),
      )
      .map((member) => ({
        value: member.user._id,

        label: (
          <div
            style={{
              display: 'flex',
              alignItems:
                'center',
              gap: 10,
            }}
          >
            <Avatar
              size={28}
              src={
                member.user
                  .avatar_url
              }
              icon={
                <UserOutlined />
              }
            />

            <div>
              <div>
                {
                  member.user
                    .name
                }
              </div>

              <small>
                {
                  member.user
                    .email
                }
              </small>
            </div>
          </div>
        ),
      }));
  }, [
    members,
    taskMembers,
  ]);

  const handleSubmit =
    async () => {
      if (
        !task ||
        selected.length === 0
      )
        return;

      try {
        setLoading(true);

        await taskMemberService.assignMembers(
          task._id,
          selected,
        );

        message.success(
          'Assign members successfully',
        );

        setSelected([]);

        onClose();

        onSuccess?.();
      } catch (e: any) {
        message.error(
          e?.response?.data
            ?.message ??
            'Assign failed',
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Modal
      open={open}
      title="Assign Members"
      footer={null}
      onCancel={onClose}
      destroyOnHidden
    >
      <Form layout="vertical">
        <Form.Item label="Project Members">
          <Select
            mode="multiple"
            value={selected}
            options={options}
            loading={loading}
            placeholder="Select members..."
            onChange={setSelected}
          />
        </Form.Item>

        <div
          style={{
            display: 'flex',
            justifyContent:
              'flex-end',
            gap: 12,
          }}
        >
          <Button
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            loading={loading}
            onClick={
              handleSubmit
            }
          >
            Assign
          </Button>
        </div>
      </Form>
    </Modal>
  );
}