'use client';

import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { mockActivityLog } from '@/lib/mockData';

export default function ActivityPage() {
  const [mounted, setMounted] = useState(false);
  const [activities, setActivities] = useState(mockActivityLog);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const actionColors: { [key: string]: string } = {
    'Status Updated': 'from-blue-500 to-indigo-600',
    'Evidence Uploaded': 'from-green-500 to-emerald-600',
    'Comment Added': 'from-purple-500 to-pink-600',
    'Team Member Assigned': 'from-orange-500 to-amber-600',
    'Remediation Completed': 'from-green-500 to-emerald-600',
    'Audit Started': 'from-yellow-500 to-orange-600',
    'Framework Changed': 'from-indigo-500 to-purple-600'
  };

  const actionIcons: { [key: string]: string } = {
    'Status Updated': 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    'Evidence Uploaded': 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
    'Comment Added': 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    'Team Member Assigned': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    'Remediation Completed': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    'Audit Started': 'M13 10V3L4 14h7v7l9-11h-7z',
    'Framework Changed': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
  };

  const filteredActivities = filter === 'all' ? activities : activities.filter(a => a.action === filter);
  const uniqueActions = [...new Set(activities.map(a => a.action))];

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
        <div className="max-w-6xl mx-auto px-8 py-10">
          {/* Header */}
          <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-4 overflow-hidden">
            <div className="relative">
              <h1 className="text-lg font-bold text-gray-900 mb-0.5">
                Activity Log
              </h1>
              <p className="text-xs text-gray-600">Complete history of all audit activities and changes</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`group px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                All Activity
              </span>
            </button>
            {uniqueActions.map(action => (
              <button
                key={action}
                onClick={() => setFilter(action)}
                className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-300 ${
                  filter === action
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                {action}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            {filteredActivities.map((activity, index) => (
              <div key={activity.id} className="flex gap-3">
                {/* Timeline Dot and Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${actionColors[activity.action] || 'from-gray-500 to-slate-600'} flex items-center justify-center shadow-sm transition-all duration-300 hover:scale-105`}>
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={actionIcons[activity.action] || 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'} />
                    </svg>
                  </div>
                  {index < filteredActivities.length - 1 && (
                    <div className="w-0.5 flex-1 min-h-[40px] bg-gradient-to-b from-blue-200 to-transparent rounded-full mt-1.5" />
                  )}
                </div>

                {/* Activity Content */}
                <div className="flex-1 pb-1">
                  <div className="group relative bg-white rounded-lg border border-gray-200 p-2.5 hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-1.5">
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-gray-900 mb-1">{activity.action}</h3>
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className={`w-5 h-5 rounded-lg bg-gradient-to-br ${actionColors[activity.action] || 'from-gray-500 to-slate-600'} flex items-center justify-center font-semibold text-white text-xs shadow-sm`}>
                              {activity.user.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-900">{activity.user}</p>
                              <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleTimeString()}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
                            {new Date(activity.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      {activity.details && (
                        <p className="text-xs text-gray-700 mb-1.5 leading-relaxed bg-gray-50 rounded-lg p-1.5 border border-gray-100">{activity.details}</p>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        {activity.controlId && (
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-1.5 border border-blue-100">
                            <div className="flex items-center gap-1 mb-0.5">
                              <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                              <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Control ID</p>
                            </div>
                            <p className="text-xs font-bold text-blue-900 font-mono">{activity.controlId}</p>
                          </div>
                        )}
                        {activity.changes && (
                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-1.5 border border-purple-100">
                            <div className="flex items-center gap-1 mb-0.5">
                              <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide">Changes</p>
                            </div>
                            <p className="text-xs font-semibold text-purple-900">{activity.changes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-lg font-bold text-gray-900 mb-1">No activities found</p>
              <p className="text-sm text-gray-500">Try adjusting your filter or check back later</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
