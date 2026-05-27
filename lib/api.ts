'use client';

import * as Types from './types';

const BASE = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8787';
const KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || '';

const headers = {
  'x-openrelio-admin-key': KEY,
  'Content-Type': 'application/json',
};

export async function getStats(): Promise<Types.Stats> {
  try {
    const res = await fetch(`${BASE}/analytics/stats`, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch stats:', err);
    return {
      total_requests: 0,
      total_savings_usd: 0,
      total_tokens_input: 0,
      total_tokens_output: 0,
      avg_savings_percent: 0,
      total_compressed_requests: 0,
      total_tokens_saved_compression: 0,
      requests_last_24h: 0,
      complexity_breakdown: { SIMPLE: 0, MEDIUM: 0, COMPLEX: 0 },
      model_breakdown: {},
    };
  }
}

export async function getRequests(params?: {
  limit?: number;
  offset?: number;
  complexity?: string;
}): Promise<Types.RequestsResponse> {
  try {
    const url = new URL(`${BASE}/analytics/requests`);
    if (params?.limit) url.searchParams.set('limit', String(params.limit));
    if (params?.offset) url.searchParams.set('offset', String(params.offset));
    if (params?.complexity) url.searchParams.set('complexity', params.complexity);

    const res = await fetch(url.toString(), { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch requests:', err);
    return { total: 0, requests: [] };
  }
}

export async function getSavingsChart(
  period: '7d' | '30d' | '90d'
): Promise<Types.ChartDataPoint[]> {
  try {
    const url = new URL(`${BASE}/analytics/savings-chart`);
    url.searchParams.set('period', period);

    const res = await fetch(url.toString(), { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: Types.SavingsChartResponse = await res.json();
    return data.chart_data || [];
  } catch (err) {
    console.error('Failed to fetch savings chart:', err);
    return [];
  }
}

export async function getSummary(): Promise<Types.Summary> {
  try {
    const res = await fetch(`${BASE}/analytics/summary`, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch summary:', err);
    return {
      today: { requests: 0, savings_usd: 0, tokens_saved: 0 },
      this_week: { requests: 0, savings_usd: 0, tokens_saved: 0 },
      all_time: { requests: 0, savings_usd: 0, tokens_saved: 0 },
      top_model: '',
      most_common_complexity: '',
    };
  }
}
