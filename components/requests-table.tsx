'use client';

import { useMemo } from 'react';
import { Request } from '@/lib/types';
import { Check, X, Inbox } from 'lucide-react';

interface RequestsTableProps {
  requests: Request[];
  isLoading?: boolean;
}

export function RequestsTable({ requests, isLoading }: RequestsTableProps) {
  const formatDate = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const complexityColor = (complexity: string) => {
    switch (complexity) {
      case 'SIMPLE':
        return 'bg-green-500/20 text-green-300';
      case 'MEDIUM':
        return 'bg-amber-500/20 text-amber-300';
      case 'COMPLEX':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-zinc-600/20 text-zinc-300';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-center text-zinc-500">
        <p>Loading requests...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-12 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-indigo-400">
          <Inbox size={24} />
        </div>
        <p className="text-zinc-200 font-semibold mb-2">No requests yet</p>
        <p className="text-zinc-500 text-sm">
          Connect your app and send traffic to see OpenRelio analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-zinc-800 bg-zinc-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">
                Complexity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">
                Original Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">
                Used Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">
                Tokens
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">
                Saved
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">
                Auto-Routed
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {requests.map((req) => (
              <tr
                key={req.id}
                className="hover:bg-zinc-800/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-zinc-300">
                  {formatDate(req.timestamp)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${complexityColor(
                      req.complexity
                    )}`}
                  >
                    {req.complexity}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-300 font-mono text-xs">
                  {req.original_model}
                </td>
                <td className="px-6 py-4 text-sm text-zinc-300 font-mono text-xs">
                  {req.selected_model}
                </td>
                <td className="px-6 py-4 text-sm text-zinc-400">
                  {(req.input_tokens + req.output_tokens).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-green-400">
                  ${req.savings.toFixed(4)}
                </td>
                <td className="px-6 py-4 text-sm">
                  {req.auto_routed ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <X size={16} className="text-zinc-600" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
