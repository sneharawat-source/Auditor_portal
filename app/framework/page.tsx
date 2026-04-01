'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ControlStatus } from '@/lib/types';
import { useAppState } from '@/lib/store';

const FRAMEWORKS = ['SOC 2 Type II', 'ISO 27001', 'HIPAA', 'PCI-DSS', 'GDPR'];

export default function FrameworkPage() {
  const {
    controls,
    controlComments,
    controlStatuses,
    completedControls,
    updateControlStatus,
    updateControlComment,
    toggleControlComplete,
    selectedFramework,
    setSelectedFramework,
  } = useAppState();

  const [filter, setFilter] = useState<ControlStatus | 'all'>('all');
  const [editingControl, setEditingControl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate counts for each status
  const statusCounts = {
    all: controls.length,
    passing: controls.filter(c => (controlStatuses[c.id] || c.status) === 'passing').length,
    failing: controls.filter(c => (controlStatuses[c.id] || c.status) === 'failing').length,
    needs_changes: controls.filter(c => (controlStatuses[c.id] || c.status) === 'needs_changes').length,
    in_review: controls.filter(c => (controlStatuses[c.id] || c.status) === 'in_review').length,
    pending: controls.filter(c => (controlStatuses[c.id] || c.status) === 'pending').length,
    remediated: controls.filter(c => (controlStatuses[c.id] || c.status) === 'remediated').length,
  };

  const filteredControls = controls.filter(c => {
    const status = controlStatuses[c.id] || c.status;
    const matchesFilter = filter === 'all' || status === filter;
    const matchesSearch = searchQuery === '' || 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const saveChanges = () => {
    alert('All changes have been saved successfully!');
  };

  const passingPercentage = controls.length > 0 
    ? Math.round((statusCounts.passing / controls.length) * 100) 
    : 0;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-8">
        {/* Header with Framework Info */}
        <div className="mb-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{selectedFramework}</h1>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-green-600">{passingPercentage}%</span> - {statusCounts.passing}/{controls.length}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={saveChanges}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Framework Switcher Dropdown */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700">Framework:</label>
            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {FRAMEWORKS.map((fw) => (
                <option key={fw} value={fw}>{fw}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="mb-6 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 p-2 overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All controls <span className="ml-2 text-xs">{statusCounts.all}</span>
            </button>

            <button
              onClick={() => setFilter('failing')}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                filter === 'failing'
                  ? 'bg-red-100 text-red-800 border-2 border-red-300'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Failing <span className="ml-1 text-xs">{statusCounts.failing}</span>
            </button>

            <button
              onClick={() => setFilter('needs_changes')}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                filter === 'needs_changes'
                  ? 'bg-orange-100 text-orange-800 border-2 border-orange-300'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Needs changes <span className="ml-1 text-xs">{statusCounts.needs_changes}</span>
            </button>

            <button
              onClick={() => setFilter('in_review')}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                filter === 'in_review'
                  ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              In review <span className="ml-1 text-xs">{statusCounts.in_review}</span>
            </button>

            <button
              onClick={() => setFilter('pending')}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                filter === 'pending'
                  ? 'bg-gray-200 text-gray-800 border-2 border-gray-400'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pending <span className="ml-1 text-xs">{statusCounts.pending}</span>
            </button>

            <button
              onClick={() => setFilter('passing')}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                filter === 'passing'
                  ? 'bg-green-100 text-green-800 border-2 border-green-300'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Passing <span className="ml-1 text-xs">{statusCounts.passing}</span>
            </button>
          </div>
        </div>

        {/* Search and Tabs */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search controls..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Controls Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Control ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Control Name & Description</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredControls.map((control) => {
                  const isEditing = editingControl === control.id;
                  const currentStatus = controlStatuses[control.id] || control.status;
                  const currentComment = controlComments[control.id] || '';
                  const isCompleted = completedControls[control.id] || false;

                  return (
                    <tr key={control.id} className={`hover:bg-gray-50 transition-colors ${isCompleted ? 'bg-green-50' : ''}`}>
                      <td className="px-4 py-4">
                        <span className="text-sm font-mono text-gray-700">{control.id}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <Link href={`/control/${control.id}`} className="text-sm font-semibold text-gray-900 hover:text-blue-600">
                            {control.name}
                          </Link>
                          <p className="text-xs text-gray-500 mt-1">{control.description}</p>
                          {isEditing && (
                            <input
                              type="text"
                              value={currentComment}
                              onChange={(e) => updateControlComment(control.id, e.target.value)}
                              placeholder="Add comment..."
                              className="mt-2 w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <>
                              <select
                                value={currentStatus}
                                onChange={(e) => updateControlStatus(control.id, e.target.value as ControlStatus)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="passing">Passing</option>
                                <option value="failing">Failing</option>
                                <option value="pending">Pending</option>
                                <option value="in_review">In Review</option>
                                <option value="needs_changes">Needs Changes</option>
                                <option value="remediated">Remediated</option>
                              </select>
                              <button
                                onClick={() => setEditingControl(null)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            </>
                          ) : (
                            <>
                              <StatusBadge status={currentStatus} size="sm" />
                              <button
                                onClick={() => setEditingControl(control.id)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredControls.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 text-sm">No controls found.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
