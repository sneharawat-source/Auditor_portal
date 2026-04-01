'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAppState } from '@/lib/store';

export default function DashboardPage() {
  const { selectedFramework, controls, controlStatuses } = useAppState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
// hi

  if (!mounted) return null;

  // Calculate metrics from current controls
  const totalControls = controls.length;
  const passing = controls.filter(c => (controlStatuses[c.id] || c.status) === 'passing').length;
  const failing = controls.filter(c => (controlStatuses[c.id] || c.status) === 'failing').length;
  const pending = controls.filter(c => (controlStatuses[c.id] || c.status) === 'pending').length;
  const inReview = controls.filter(c => (controlStatuses[c.id] || c.status) === 'in_review').length;
  const completionRate = totalControls > 0 ? Math.round((passing / totalControls) * 100) : 0;

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Header - Minimal */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-5 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-xs text-gray-500 mt-0.5">Compliance overview</p>
            </div>
            <div className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              Live Audit
            </div>
          </div>

          {/* KPI Cards - Minimal */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            {/* Compliance Score */}
            <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Excellent</span>
              </div>
              <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Compliance Score</div>
              <div className="text-2xl font-black text-gray-900">{completionRate}%</div>
            </div>

            {/* Active Framework */}
            <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center mb-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Active Framework</div>
              <div className="text-base font-black text-gray-900 truncate">{selectedFramework}</div>
            </div>

            {/* Controls Passing */}
            <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">{totalControls > 0 ? Math.round((passing / totalControls) * 100) : 0}%</span>
              </div>
              <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Controls Passing</div>
              <div className="text-2xl font-black text-green-600">{passing}<span className="text-base text-gray-400">/{totalControls}</span></div>
            </div>
          </div>

          {/* Two Column Layout - Minimal */}
          <div className="grid grid-cols-3 gap-4">
            {/* Left Column - 2/3 */}
            <div className="col-span-2 space-y-4">
              {/* Status Distribution - Minimal */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h2 className="text-sm font-bold text-gray-900">Control Status Distribution</h2>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-5">
                    {/* Visual Bar Chart - Minimal */}
                    <div className="flex-1 space-y-3">
                      {[
                        { label: 'Passing', value: passing, color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50' },
                        { label: 'Failing', value: failing, color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' },
                        { label: 'Pending', value: pending, color: 'bg-amber-500', textColor: 'text-amber-700', bgColor: 'bg-amber-50' },
                        { label: 'In Review', value: inReview, color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-50' }
                      ].map(item => {
                        const percentage = totalControls > 0 ? (item.value / totalControls) * 100 : 0;
                        return (
                          <div key={item.label}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-bold text-gray-900">{item.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-gray-900">{item.value}</span>
                                <span className={`text-xs font-bold ${item.textColor} ${item.bgColor} px-1.5 py-0.5 rounded`}>
                                  {percentage.toFixed(0)}%
                                </span>
                              </div>
                            </div>
                            <div className="relative h-7 bg-gray-100 rounded-lg overflow-hidden">
                              <div 
                                className={`absolute inset-y-0 left-0 ${item.color} rounded-lg transition-all duration-700 ease-out flex items-center justify-end pr-2`}
                                style={{ width: `${percentage}%` }}
                              >
                                {percentage > 15 && (
                                  <span className="text-xs font-bold text-white">{item.value}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Summary Stats - Minimal */}
                    <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <div className="text-xs text-gray-500 uppercase font-bold mb-1">Total</div>
                      <div className="text-3xl font-black text-gray-900 mb-2">{totalControls}</div>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-2"></div>
                      <div className="space-y-1">
                        {[
                          { label: 'Passing', value: passing, color: 'bg-green-500' },
                          { label: 'Failing', value: failing, color: 'bg-red-500' },
                          { label: 'Pending', value: pending, color: 'bg-amber-500' },
                          { label: 'In Review', value: inReview, color: 'bg-blue-500' }
                        ].map(item => (
                          <div key={item.label} className="flex items-center gap-1.5 text-xs">
                            <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                            <span className="text-gray-700 font-medium">{item.value} {item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit Timeline and This Month - Compact */}
              <div className="grid grid-cols-2 gap-5">
                {/* Audit Timeline */}
                <div className="bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-gray-100 bg-gradient-to-r from-white to-green-50/30">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-base font-bold text-gray-900">Audit Timeline</h2>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { label: 'Planning Phase', status: 'Completed • Jan 2025', color: 'bg-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-100' },
                      { label: 'Implementation', status: 'In Progress • Feb - Oct 2025', color: 'bg-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', pulse: true },
                      { label: 'Final Review', status: 'Upcoming • Nov 2025', color: 'bg-gray-300', bgColor: 'bg-gray-50', borderColor: 'border-gray-100' },
                      { label: 'Certification', status: 'Upcoming • Dec 2025', color: 'bg-gray-300', bgColor: 'bg-gray-50', borderColor: 'border-gray-100' }
                    ].map((item, idx) => (
                      <div key={idx} className={`flex items-start gap-3 p-2.5 rounded-lg ${item.bgColor} border ${item.borderColor}`}>
                        <div className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${item.color} mt-1.5 ${item.pulse ? 'animate-pulse shadow-lg shadow-blue-500/50' : ''}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-600 mt-0.5">{item.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* This Month */}
                <div className="bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-gray-100 bg-gradient-to-r from-white to-indigo-50/30">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h2 className="text-base font-bold text-gray-900">This Month</h2>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { label: 'Controls Reviewed', value: '12', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-100', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                      { label: 'Evidence Collected', value: '24', color: 'from-green-500 to-emerald-600', bgColor: 'bg-green-50', borderColor: 'border-green-100', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
                      { label: 'Issues Resolved', value: '8', color: 'from-emerald-500 to-teal-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }
                    ].map((item, idx) => (
                      <div key={idx} className={`flex items-center justify-between p-2.5 rounded-lg ${item.bgColor} border ${item.borderColor}`}>
                        <div className="flex items-center gap-2.5">
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{item.label}</span>
                        </div>
                        <span className="text-2xl font-black text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Recent Activity Compact */}
            <div className="bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-gray-100 bg-gradient-to-r from-white to-purple-50/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-gray-900">Recent Activity</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {[
                    { action: 'Status Updated', control: 'CC1.1', user: 'Sarah Johnson', time: '2h ago', color: 'from-blue-500 to-indigo-600' },
                    { action: 'Evidence Uploaded', control: 'CC4.1', user: 'Rachel Kim', time: '4h ago', color: 'from-green-500 to-emerald-600' },
                    { action: 'Comment Added', control: 'CC2.1', user: 'David Martinez', time: '6h ago', color: 'from-purple-500 to-pink-600' },
                    { action: 'Control Assigned', control: 'CC3.2', user: 'Michael Chen', time: '8h ago', color: 'from-orange-500 to-amber-600' },
                    { action: 'Status Updated', control: 'CC5.1', user: 'Emily Rodriguez', time: '10h ago', color: 'from-blue-500 to-indigo-600' },
                    { action: 'Risk Assessment', control: 'CC7.3', user: 'Lisa Anderson', time: '12h ago', color: 'from-red-500 to-rose-600' },
                    { action: 'Policy Updated', control: 'CC6.2', user: 'James Brown', time: '14h ago', color: 'from-indigo-500 to-purple-600' },
                    { action: 'Audit Completed', control: 'CC8.1', user: 'Alex Thompson', time: '16h ago', color: 'from-teal-500 to-cyan-600' }
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${activity.color} flex items-center justify-center shadow-md`}>
                        <span className="text-xs font-bold text-white">
                          {activity.user.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{activity.user}</p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                          <span className="font-semibold text-gray-700">{activity.control}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  href="/activity" 
                  className="block mt-4 text-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  View All Activity →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
