'use client';

import { useEffect, useState, useCallback } from 'react';
import { TrendingDown, Zap, Percent, Minimize2 } from 'lucide-react';
import { StatsCard } from '@/components/stats-card';
import { SavingsChart } from '@/components/savings-chart';
import { ModelPieChart } from '@/components/model-pie-chart';
import { RequestsTable } from '@/components/requests-table';
import * as api from '@/lib/api';
import * as Types from '@/lib/types';

export default function DashboardPage() {
  const [stats, setStats] = useState<Types.Stats | null>(null);
  const [requests, setRequests] = useState<Types.Request[]>([]);
  const [chartData, setChartData] = useState<Types.ChartDataPoint[]>([]);
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('7d');
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const [statsData, requestsData, chartDataNew] = await Promise.all([
      api.getStats(),
      api.getRequests({ limit: 10 }),
      api.getSavingsChart(period),
    ]);
    setStats(statsData);
    setRequests(requestsData.requests);
    setChartData(chartDataNew);
    setIsLoading(false);
  }, [period]);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-white mb-2">
          OpenRelio Dashboard
        </h1>
        <p className="text-zinc-400 max-w-2xl">
          Live gateway metrics, cost savings, and intelligent model decisions
          for every request.
        </p>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-300">
          Real-time savings insights with auto-routing and context compression
          enabled by OpenRelio.
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Saved"
          value={`$${(stats?.total_savings_usd ?? 0).toFixed(2)}`}
          icon={<TrendingDown size={24} />}
          iconColor="text-green-500"
          subtext="vs GPT-4o baseline"
        />
        <StatsCard
          title="Total Requests"
          value={(stats?.total_requests ?? 0).toLocaleString()}
          icon={<Zap size={24} />}
          iconColor="text-indigo-500"
          subtext={`Last 24h: ${stats?.requests_last_24h ?? 0}`}
        />
        <StatsCard
          title="Avg Savings"
          value={`${(stats?.avg_savings_percent ?? 0).toFixed(1)}%`}
          icon={<Percent size={24} />}
          iconColor="text-amber-500"
          subtext="Per request"
        />
        <StatsCard
          title="Compressed"
          value={(stats?.total_compressed_requests ?? 0).toLocaleString()}
          icon={<Minimize2 size={24} />}
          iconColor="text-purple-500"
          subtext={`${(stats?.total_tokens_saved_compression ?? 0).toLocaleString()} tokens saved`}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Savings Over Time
            </h2>
            <div className="space-x-2">
              {(['7d', '30d', '90d'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    period === p
                      ? 'bg-indigo-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <SavingsChart data={chartData} />
        </div>
        <ModelPieChart modelBreakdown={stats?.model_breakdown ?? {}} />
      </div>

      {/* Recent Requests */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">
          Recent Requests
        </h2>
        <RequestsTable requests={requests} isLoading={isLoading} />
      </div>
    </div>
  );
}
