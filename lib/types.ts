export interface Stats {
  total_requests: number;
  total_savings_usd: number;
  total_tokens_input: number;
  total_tokens_output: number;
  avg_savings_percent: number;
  total_compressed_requests: number;
  total_tokens_saved_compression: number;
  requests_last_24h: number;
  complexity_breakdown: {
    SIMPLE: number;
    MEDIUM: number;
    COMPLEX: number;
  };
  model_breakdown: Record<string, number>;
}

export interface Request {
  id: string;
  timestamp: number;
  complexity: 'SIMPLE' | 'MEDIUM' | 'COMPLEX';
  original_model: string;
  selected_model: string;
  input_tokens: number;
  output_tokens: number;
  baseline_cost: number;
  actual_cost: number;
  savings: number;
  auto_routed: boolean;
  was_compressed: boolean;
  tokens_saved_compression: number;
}

export interface RequestsResponse {
  total: number;
  requests: Request[];
}

export interface ChartDataPoint {
  date: string;
  savings_usd: number;
  request_count: number;
  tokens_processed: number;
}

export interface SavingsChartResponse {
  chart_data: ChartDataPoint[];
  period: string;
  total_savings: number;
}

export interface SummaryPeriodStats {
  requests: number;
  savings_usd: number;
  tokens_saved: number;
}

export interface Summary {
  today: SummaryPeriodStats;
  this_week: SummaryPeriodStats;
  all_time: SummaryPeriodStats;
  top_model: string;
  most_common_complexity: string;
}
