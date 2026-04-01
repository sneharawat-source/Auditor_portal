import { ControlStatus } from './types';

export const getStatusColor = (status: ControlStatus) => {
  const colors: { [key in ControlStatus]: string } = {
    passing: '#16a34a',
    pending: '#78716c',
    failing: '#dc2626',
    in_review: '#0066cc',
    needs_changes: '#ea580c',
    remediated: '#a855f7',
    closed: '#15803d'
  };
  return colors[status];
};

export const getStatusLabel = (status: ControlStatus) => {
  const labels: { [key in ControlStatus]: string } = {
    passing: 'Passing',
    pending: 'Pending',
    failing: 'Failing',
    in_review: 'In Review',
    needs_changes: 'Needs Changes',
    remediated: 'Remediated',
    closed: 'Closed'
  };
  return labels[status];
};

export const getStatusBgClass = (status: ControlStatus) => {
  const classes: { [key in ControlStatus]: string } = {
    passing: 'bg-green-100',
    pending: 'bg-gray-100',
    failing: 'bg-red-100',
    in_review: 'bg-blue-100',
    needs_changes: 'bg-orange-100',
    remediated: 'bg-purple-100',
    closed: 'bg-green-100'
  };
  return classes[status];
};

export const getStatusTextClass = (status: ControlStatus) => {
  const classes: { [key in ControlStatus]: string } = {
    passing: 'text-green-800',
    pending: 'text-gray-800',
    failing: 'text-red-800',
    in_review: 'text-blue-800',
    needs_changes: 'text-orange-800',
    remediated: 'text-purple-800',
    closed: 'text-green-800'
  };
  return classes[status];
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
