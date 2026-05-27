'use client';

import { Sidebar } from '@/components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-60 min-h-screen bg-zinc-950">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
