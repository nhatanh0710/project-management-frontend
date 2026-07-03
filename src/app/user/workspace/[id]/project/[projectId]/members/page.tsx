'use client';

import MemberHeader from '@/components/project/members/member-header';
import MemberToolbar from '@/components/project/members/member-toolbar';
import MemberTable from '@/components/project/members/member-table';

import MemberAddModal from '@/components/project/members/member-add-modal';
import MemberUpdateModal from '@/components/project/members/member-update-modal';
import MemberRemoveModal from '@/components/project/members/member-remove-modal';

import styles from './styles.module.scss';

export default function MembersPage() {
  return (
    <div className={styles.container}>
      <MemberHeader />

      <MemberToolbar />

      <MemberTable />

      <MemberAddModal />

      <MemberUpdateModal />

      <MemberRemoveModal />
    </div>
  );
}