'use client';

import { MyTaskProvider } from '@/contexts/my-task.context';

export default function MyTaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MyTaskProvider>
      {children}
    </MyTaskProvider>
  );
}