import { Control } from '@/lib/types';
import { StatusBadge } from '@/components/common/StatusBadge';
import { formatDate } from '@/lib/statusUtils';
import Link from 'next/link';

interface FindingsListProps {
  controls: Control[];
}

export function FindingsList({ controls }: FindingsListProps) {
  const failingControls = controls.filter(c => c.status === 'failing' || c.status === 'needs_changes');

  if (failingControls.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <p className="text-center text-gray-600">No open findings</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">Open Findings</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Control ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Control Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {failingControls.map((control) => (
              <tr key={control.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <Link href={`/control/${control.id}`} className="text-blue-600 hover:underline">
                    {control.id}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{control.name}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={control.status} size="sm" />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{formatDate(control.lastUpdated)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
