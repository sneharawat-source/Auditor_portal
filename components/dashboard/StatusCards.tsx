import { Control, ControlStatus, StatusCount } from '@/lib/types';

interface StatusCardProps {
  status: ControlStatus;
  count: number;
  total: number;
}

const statusConfig = {
  passing: { label: 'Passing', color: 'text-green-600', bg: 'bg-green-50' },
  pending: { label: 'Pending', color: 'text-gray-600', bg: 'bg-gray-50' },
  failing: { label: 'Failing', color: 'text-red-600', bg: 'bg-red-50' },
  in_review: { label: 'In Review', color: 'text-blue-600', bg: 'bg-blue-50' },
  needs_changes: { label: 'Needs Changes', color: 'text-orange-600', bg: 'bg-orange-50' },
  remediated: { label: 'Remediated', color: 'text-purple-600', bg: 'bg-purple-50' },
  closed: { label: 'Closed', color: 'text-green-600', bg: 'bg-green-50' }
};

export function StatusCard({ status, count, total }: StatusCardProps) {
  const config = statusConfig[status];
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className={`p-6 rounded-lg border border-gray-200 ${config.bg}`}>
      <p className="text-sm text-gray-600 mb-2">{config.label}</p>
      <p className={`text-3xl font-bold ${config.color} mb-1`}>{count}</p>
      <p className="text-sm text-gray-600">{percentage}% of total</p>
    </div>
  );
}

export function StatusCardsGrid({ controls }: { controls: Control[] }) {
  const counts: StatusCount = {
    passing: 0,
    pending: 0,
    failing: 0,
    in_review: 0,
    needs_changes: 0,
    remediated: 0,
    closed: 0
  };

  controls.forEach(control => {
    counts[control.status]++;
  });

  const total = controls.length;

  const statuses: ControlStatus[] = [
    'passing',
    'pending',
    'failing',
    'in_review',
    'needs_changes',
    'remediated',
    'closed'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statuses.map(status => (
        <StatusCard
          key={status}
          status={status}
          count={counts[status]}
          total={total}
        />
      ))}
    </div>
  );
}
