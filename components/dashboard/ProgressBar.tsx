interface ProgressBarProps {
  reviewedCount: number;
  totalCount: number;
}

export function ProgressBar({ reviewedCount, totalCount }: ProgressBarProps) {
  const percentage = totalCount > 0 ? Math.round((reviewedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Checklist Completion</h3>
        <p className="text-sm text-gray-600">
          {reviewedCount} of {totalCount} controls reviewed ({percentage}%)
        </p>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">Reviewed</p>
          <p className="text-2xl font-bold text-blue-600">{reviewedCount}</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">Remaining</p>
          <p className="text-2xl font-bold text-gray-600">{totalCount - reviewedCount}</p>
        </div>
      </div>
    </div>
  );
}
