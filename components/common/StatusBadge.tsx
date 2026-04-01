import { ControlStatus } from '@/lib/types';
import { getStatusLabel, getStatusBgClass, getStatusTextClass } from '@/lib/statusUtils';

interface StatusBadgeProps {
  status: ControlStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const label = getStatusLabel(status);
  const bgClass = getStatusBgClass(status);
  const textClass = getStatusTextClass(status);
  const sizeClass = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <span className={`inline-flex font-medium rounded-full ${sizeClass} ${bgClass} ${textClass}`}>
      {label}
    </span>
  );
}
