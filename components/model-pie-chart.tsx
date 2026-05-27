'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';

interface ModelPieChartProps {
  modelBreakdown: Record<string, number>;
}

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6'];

export function ModelPieChart({ modelBreakdown }: ModelPieChartProps) {
  const data = useMemo(() => {
    return Object.entries(modelBreakdown).map(([name, value]) => ({
      name,
      value,
    }));
  }, [modelBreakdown]);

  const isLoading = useMemo(() => data.length === 0, [data]);

  if (isLoading) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col items-center justify-center h-80">
        <p className="text-zinc-500 text-sm font-medium">Model usage not available yet</p>
        <p className="text-zinc-500 text-xs mt-2">Run a few requests and return to view OpenRelio model distribution.</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
      <h3 className="text-white font-semibold mb-4">Model Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => `${entry.name}: ${entry.value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '6px',
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend wrapperStyle={{ color: '#a1a1aa' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
