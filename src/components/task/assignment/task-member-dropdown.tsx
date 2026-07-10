'use client';

import {
  Button,
  Dropdown,
  message,
} from 'antd';

import { MoreOutlined } from '@ant-design/icons';

import { taskMemberService } from '@/services/task-member.service';

interface Props {
  taskId: string;
  userId: string;
  isLeader: boolean;
  onSuccess: () => void;
}

export default function TaskMemberDropdown({
  taskId,
  userId,
  isLeader,
  onSuccess,
}: Props) {
  const handleLeader = async () => {
    try {
      await taskMemberService.updateLeader(
        taskId,
        userId,
      );

      message.success('Leader updated');

      onSuccess();
    } catch (e: any) {
      message.error(
        e?.response?.data?.message ??
          'Update leader failed',
      );
    }
  };

  const handleRemove = async () => {
    try {
      await taskMemberService.removeMember(
        taskId,
        userId,
      );

      message.success('Member removed');

      onSuccess();
    } catch (e: any) {
      message.error(
        e?.response?.data?.message ??
          'Remove member failed',
      );
    }
  };

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items: [
          !isLeader
            ? {
                key: 'leader',
                label: 'Set as Leader',
                onClick: handleLeader,
              }
            : null,

          {
            key: 'remove',
            danger: true,
            label: 'Remove From Task',
            onClick: handleRemove,
          },
        ].filter(Boolean) as any,
      }}
    >
      <Button
        type="text"
        icon={<MoreOutlined />}
      />
    </Dropdown>
  );
}