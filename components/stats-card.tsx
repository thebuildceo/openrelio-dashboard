'use client';

import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: ReactNode;
  icon: ReactNode;
  subtext: string;
  iconColor?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  subtext,
  iconColor = 'text-indigo-500',
}: StatsCardProps) {
  const accentBorder = iconColor.replace('text-', 'border-');

  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-lg p-6 border-l-4 ${accentBorder}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-zinc-400 text-sm font-medium">{title}</p>
          <p className="text-white text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className={`${iconColor}`}>{icon}</div>
      </div>
      <p className="text-zinc-500 text-xs">{subtext}</p>
    </div>
  );
}
