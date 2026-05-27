'use client';

interface ComplexityBreakdown {
  SIMPLE: number;
  MEDIUM: number;
  COMPLEX: number;
}

interface ComplexityBarProps {
  breakdown: ComplexityBreakdown;
}

export function ComplexityBar({ breakdown }: ComplexityBarProps) {
  const total = breakdown.SIMPLE + breakdown.MEDIUM + breakdown.COMPLEX;

  const items = [
    { label: 'SIMPLE', count: breakdown.SIMPLE, color: 'bg-green-500' },
    { label: 'MEDIUM', count: breakdown.MEDIUM, color: 'bg-amber-500' },
    { label: 'COMPLEX', count: breakdown.COMPLEX, color: 'bg-red-500' },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
      <h3 className="text-white font-semibold">Complexity Breakdown</h3>
      {items.map((item) => {
        const percentage = total > 0 ? (item.count / total) * 100 : 0;
        return (
          <div key={item.label}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-zinc-300 text-sm font-medium">
                {item.label}
              </span>
              <span className="text-zinc-500 text-xs">
                {percentage.toFixed(1)}% ({item.count.toLocaleString()})
              </span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <div
                className={`${item.color} h-2 rounded-full transition-all`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
