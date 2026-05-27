'use client';

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { ChartDataPoint } from '@/lib/types';

interface SavingsChartProps {
  data: ChartDataPoint[];
}

export function SavingsChart({ data }: SavingsChartProps) {
  const isLoading = useMemo(() => data.length === 0, [data]);

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col items-center justify-center">
        <p className="text-zinc-500 text-sm font-medium">
          No savings history yet
        </p>
        <p className="text-zinc-500 text-xs mt-2">
          Send traffic through OpenRelio to start tracking savings.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
      <h3 className="text-white font-semibold mb-4">Savings Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis dataKey="date" stroke="#71717a" style={{ fontSize: '12px' }} />
          <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '6px',
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Area
            type="monotone"
            dataKey="savings_usd"
            stroke="#6366f1"
            fillOpacity={1}
            fill="url(#colorSavings)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
