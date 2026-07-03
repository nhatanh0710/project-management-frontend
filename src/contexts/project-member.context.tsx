'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { message } from 'antd';

import { projectMemberService } from '@/services/project-member.service';
import { userService } from '@/services/user.service';

import {
  AddMembersPayload,
  ProjectMember,
  UpdateMemberPayload,
  UserSearchItem,
} from '@/types/project-member.type';

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ProjectMemberContextType {
  members: ProjectMember[];

  loading: boolean;

  keyword: string;
  setKeyword: (value: string) => void;

  role: string;
  setRole: (value: string) => void;

  pagination: Pagination;

  changePage: (
    page: number,
    pageSize: number,
  ) => void;

  refreshMembers: () => Promise<void>;

  openCreate: boolean;
  setOpenCreate: (
    value: boolean,
  ) => void;

  openUpdate: boolean;
  setOpenUpdate: (
    value: boolean,
  ) => void;

  openRemove: boolean;
  setOpenRemove: (
    value: boolean,
  ) => void;

  selectedMember: ProjectMember | null;

  openUpdateModal: (
    member: ProjectMember,
  ) => void;

  openRemoveModal: (
    member: ProjectMember,
  ) => void;

  createMember: (
    data: AddMembersPayload,
  ) => Promise<void>;

  updateMember: (
    data: UpdateMemberPayload,
  ) => Promise<void>;

  removeMember: () => Promise<void>;

  searchUsers: (
    keyword: string,
  ) => Promise<UserSearchItem[]>;
}

const ProjectMemberContext =
  createContext<
    ProjectMemberContextType | undefined
  >(undefined);

export function ProjectMemberProvider({
  projectId,
  children,
}: {
  projectId: string;
  children: React.ReactNode;
}) {
  // ================= STATE =================

  const [members, setMembers] =
    useState<ProjectMember[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [keyword, setKeywordState] =
    useState('');

  const [role, setRoleState] =
    useState('');

  const [pagination, setPagination] =
    useState({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
    });

  const [openCreate, setOpenCreate] =
    useState(false);

  const [openUpdate, setOpenUpdate] =
    useState(false);

  const [openRemove, setOpenRemove] =
    useState(false);

  const [
    selectedMember,
    setSelectedMember,
  ] =
    useState<ProjectMember | null>(
      null,
    );

  // ================= LOAD =================

  const refreshMembers =
    async () => {
      try {
        setLoading(true);

        const res =
          await projectMemberService.getMembers(
            projectId,
            {
              page: pagination.page,
              limit: pagination.limit,
              search: keyword,
              role,
            },
          );

        setMembers(res.data);

        setPagination(res.pagination);
      } catch (err: any) {
        message.error(
          err?.response?.data?.message ??
            'Load members failed',
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    refreshMembers();
  }, [
    projectId,
    keyword,
    role,
    pagination.page,
    pagination.limit,
  ]);

  // ================= SEARCH =================

  const setKeyword = (
    value: string,
  ) => {
    setKeywordState(value);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const setRole = (
    value: string,
  ) => {
    setRoleState(value);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  // ================= PAGINATION =================

  const changePage = (
    page: number,
    pageSize: number,
  ) => {
    setPagination((prev) => ({
      ...prev,
      page,
      limit: pageSize,
    }));
  };

  // ================= MODAL =================

  const openUpdateModal = (
    member: ProjectMember,
  ) => {
    setSelectedMember(member);

    setOpenUpdate(true);
  };

  const openRemoveModal = (
    member: ProjectMember,
  ) => {
    setSelectedMember(member);

    setOpenRemove(true);
  };

  // ================= CREATE =================

  const createMember =
    async (
      data: AddMembersPayload,
    ) => {
      await projectMemberService.addMembers(
        projectId,
        data,
      );

      message.success(
        'Member added successfully',
      );

      setOpenCreate(false);

      await refreshMembers();
    };

  // ================= UPDATE =================

  const updateMember =
    async (
      data: UpdateMemberPayload,
    ) => {
      if (!selectedMember) return;

      await projectMemberService.updateMember(
        projectId,
        selectedMember.user._id,
        data,
      );

      message.success(
        'Member updated successfully',
      );

      setOpenUpdate(false);

      setSelectedMember(null);

      await refreshMembers();
    };

  // ================= REMOVE =================

  const removeMember =
    async () => {
      if (!selectedMember) return;

      await projectMemberService.removeMember(
        projectId,
        selectedMember.user._id,
      );

      message.success(
        'Member removed successfully',
      );

      setOpenRemove(false);

      setSelectedMember(null);

      await refreshMembers();
    };

  // ================= USER SEARCH =================

  const searchUsers =
    async (
      keyword: string,
    ): Promise<UserSearchItem[]> => {
      if (!keyword.trim()) return [];

      return userService.searchUsers(
        keyword,
      );
    };

  return (
    <ProjectMemberContext.Provider
      value={{
        members,

        loading,

        keyword,
        setKeyword,

        role,
        setRole,

        pagination,

        changePage,

        refreshMembers,

        openCreate,
        setOpenCreate,

        openUpdate,
        setOpenUpdate,

        openRemove,
        setOpenRemove,

        selectedMember,

        openUpdateModal,

        openRemoveModal,

        createMember,

        updateMember,

        removeMember,

        searchUsers,
      }}
    >
      {children}
    </ProjectMemberContext.Provider>
  );
}

export function useProjectMember() {
  const context = useContext(
    ProjectMemberContext,
  );

  if (!context) {
    throw new Error(
      'useProjectMember must be used inside ProjectMemberProvider',
    );
  }

  return context;
}