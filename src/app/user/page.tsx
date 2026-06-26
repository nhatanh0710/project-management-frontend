'use client';

import { Card } from 'antd';

import { getUser } from '@/utils/auth';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <>
      <h1>
        Chào mừng,
        {' '}
        {user?.name}
      </h1>

      <Card>
        Hệ thống quản lý dự án
      </Card>
    </>
  );
}