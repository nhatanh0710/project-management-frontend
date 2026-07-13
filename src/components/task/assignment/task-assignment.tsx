'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Avatar,
  Button,
  Skeleton,
  Typography,
} from 'antd';

import {
  CrownFilled,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { useCurrentTask } from '@/contexts/current-task.context';

import { taskMemberService } from '@/services/task-member.service';

import { TaskMember } from '@/types/task-member.type';

import TaskAssignModal from '../assignment/task-assign-modal';
import TaskMemberDropdown from '../assignment/task-member-dropdown';

import styles from './styles.module.scss';

const { Title, Text } = Typography;

export default function TaskAssignment() {
  const { task } = useCurrentTask();

  const [loading, setLoading] =
    useState(true);

  const [members, setMembers] =
    useState<TaskMember[]>([]);

  const [openAssign, setOpenAssign] =
    useState(false);

  const fetchMembers =
    useCallback(async () => {
      if (!task) return;

      try {
        setLoading(true);

        const data =
          await taskMemberService.getMembers(
            task._id,
          );

        setMembers(data);
      } finally {
        setLoading(false);
      }
    }, [task]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const leader = useMemo(
    () =>
      members.find(
        (item) => item.is_leader,
      ),
    [members],
  );

  if (loading) {
    return (
      <div className={styles.card}>
        <Skeleton active />
      </div>
    );
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Title
            level={5}
            className={styles.cardTitle}
          >
            Assignment
          </Title>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() =>
              setOpenAssign(true)
            }
          >
            Assign Member
          </Button>
        </div>

        <div className={styles.assignment}>
          <div className={styles.section}>
            <Text className={styles.label}>
              Task Leader
            </Text>

            {leader ? (
              <div
                className={
                  styles.memberItem
                }
              >
                <div
                  className={
                    styles.memberInfo
                  }
                >
                  <Avatar
                    size={42}
                    src={
                      leader.user_id
                        .avatar_url
                    }
                    icon={
                      <UserOutlined />
                    }
                  />

                  <div>
                    <div
                      className={
                        styles.memberName
                      }
                    >
                      {
                        leader.user_id
                          .name
                      }

                      <CrownFilled
                        className={
                          styles.crown
                        }
                      />
                    </div>

                    <Text
                      type="secondary"
                    >
                      {
                        leader.user_id
                          .email
                      }
                    </Text>
                  </div>
                </div>

                <TaskMemberDropdown
                  taskId={task!._id}
                  userId={
                    leader.user_id._id
                  }
                  isLeader
                  onSuccess={
                    fetchMembers
                  }
                />
              </div>
            ) : (
              <Text type="secondary">
                No leader assigned.
              </Text>
            )}
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <div
              className={
                styles.memberHeader
              }
            >
              <Text
                className={
                  styles.label
                }
              >
                Members
              </Text>

              <Text
                type="secondary"
              >
                {members.length}{' '}
                assigned
              </Text>
            </div>

            <div
              className={
                styles.memberList
              }
            >
              {members.map(
                (member) => (
                  <div
                    key={member._id}
                    className={
                      styles.memberItem
                    }
                  >
                    <div
                      className={
                        styles.memberInfo
                      }
                    >
                      <Avatar
                        src={
                          member.user_id
                            .avatar_url
                        }
                        icon={
                          <UserOutlined />
                        }
                      />

                      <div>
                        <div
                          className={
                            styles.memberName
                          }
                        >
                          {
                            member
                              .user_id
                              .name
                          }

                          {member.is_leader && (
                            <CrownFilled
                              className={
                                styles.crown
                              }
                            />
                          )}
                        </div>

                        <Text
                          type="secondary"
                        >
                          {
                            member
                              .user_id
                              .email
                          }
                        </Text>
                      </div>
                    </div>

                    <TaskMemberDropdown
                      taskId={
                        task!._id
                      }
                      userId={
                        member.user_id
                          ._id
                      }
                      isLeader={
                        member.is_leader
                      }
                      onSuccess={
                        fetchMembers
                      }
                    />
                  </div>
                ),
              )}

              {members.length ===
                0 && (
                <Text
                  type="secondary"
                >
                  No members assigned.
                </Text>
              )}
            </div>
          </div>
        </div>
      </div>

      <TaskAssignModal
        open={openAssign}
        onClose={() =>
          setOpenAssign(false)
        }
        onSuccess={
          fetchMembers
        }
      />
    </>
  );
}