'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { StatsCard } from '@/components/stats-card';
import { ComplexityBar } from '@/components/complexity-bar';
import { TrendingUp, Zap } from 'lucide-react';
import * as api from '@/lib/api';
import * as Types from '@/lib/types';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'today' | 'week' | 'month' | 'all'>(
    'today'
  );
  const [stats, setStats] = useState<Types.Stats | null>(null);
  const [summary, setSummary] = useState<Types.Summary | null>(null);
  const [chartData, setChartData] = useState<Types.ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const periodMap: Record<string, '7d' | '30d' | '90d'> = {
    today: '7d',
    week: '7d',
    month: '30d',
    all: '90d',
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const [statsData, summaryData, chartDataNew] = await Promise.all([
      api.getStats(),
      api.getSummary(),
      api.getSavingsChart(periodMap[period]),
    ]);
    setStats(statsData);
    setSummary(summaryData);
    setChartData(chartDataNew);
    setIsLoading(false);
  }, [period]);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [loadData]);

  const currentPeriod = summary
    ? summary[
        period === 'today'
          ? 'today'
          : period === 'week'
            ? 'this_week'
            : period === 'month'
              ? 'all_time'
              : 'all_time'
      ]
    : { requests: 0, savings_usd: 0, tokens_saved: 0 };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Analytics & Insights
            </h1>
            <p className="text-zinc-400 max-w-2xl">
              Track OpenRelio savings, complexity trends, and model usage across
              your gateway.
            </p>
          </div>
          <div className="space-x-2 flex flex-wrap">
            {(['today', 'week', 'month', 'all'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  period === p
                    ? 'bg-indigo-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-300">
          Data refreshes every 30 seconds for the latest OpenRelio performance
          metrics.
        </div>
      </div>

      {/* Period Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatsCard
          title="Requests this period"
          value={currentPeriod.requests.toLocaleString()}
          icon={<Zap size={24} />}
          iconColor="text-indigo-500"
          subtext="Total requests processed"
        />
        <StatsCard
          title="Savings this period"
          value={`$${currentPeriod.savings_usd.toFixed(2)}`}
          icon={<TrendingUp size={24} />}
          iconColor="text-green-500"
          subtext="USD savings"
        />
        <StatsCard
          title="Tokens processed"
          value={currentPeriod.tokens_saved.toLocaleString()}
          icon={<Zap size={24} />}
          iconColor="text-amber-500"
          subtext="Total tokens saved by compression"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Daily Requests</h3>
          {isLoading ? (
            <div className="h-64 flex items-center justify-center text-zinc-500">
              Loading...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis
                  dataKey="date"
                  stroke="#71717a"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    border: '1px solid #27272a',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="request_count" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Daily Savings</h3>
          {isLoading ? (
            <div className="h-64 flex items-center justify-center text-zinc-500">
              Loading...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis
                  dataKey="date"
                  stroke="#71717a"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    border: '1px solid #27272a',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="savings_usd" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Complexity Breakdown */}
      <ComplexityBar
        breakdown={
          stats?.complexity_breakdown ?? { SIMPLE: 0, MEDIUM: 0, COMPLEX: 0 }
        }
      />
    </div>
  );
}
