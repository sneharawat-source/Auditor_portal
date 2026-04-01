'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { mockAuditData } from '@/lib/mockData';
import { ControlStatus } from '@/lib/types';

const statusOptions: ControlStatus[] = ['passing', 'pending', 'failing', 'in_review', 'needs_changes', 'remediated', 'closed'];

const statusLabels: { [key in ControlStatus]: string } = {
  passing: 'Passing',
  pending: 'Pending',
  failing: 'Failing',
  in_review: 'In Review',
  needs_changes: 'Needs Changes',
  remediated: 'Remediated',
  closed: 'Closed'
};

const statusColors: { [key in ControlStatus]: string } = {
  passing: 'bg-green-100 text-green-800',
  failing: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800',
  in_review: 'bg-blue-100 text-blue-800',
  needs_changes: 'bg-orange-100 text-orange-800',
  remediated: 'bg-purple-100 text-purple-800',
  closed: 'bg-gray-100 text-gray-800'
};

interface ChecklistItem {
  id: string;
  name: string;
  status: ControlStatus;
  comment: string;
  lastUpdated: string;
  isCompleted: boolean;
  riskLevel?: string;
  assignedTo?: string;
}

export default function ChecklistPage() {
  const { controls } = mockAuditData;
  const [filter, setFilter] = useState<ControlStatus | 'all'>('all');
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  useEffect(() => {
    setChecklist(
      controls.map(c => ({
        id: c.id,
        name: c.name,
        status: c.status,
        comment: '',
        lastUpdated: c.lastUpdated,
        isCompleted: c.isCompleted || false,
        riskLevel: c.riskLevel || 'medium',
        assignedTo: c.assignedTo
      }))
    );
    setMounted(true);
  }, [controls]);

  const filteredChecklist = checklist.filter(item => {
    const matchesFilter = filter === 'all' || item.status === filter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: ControlStatus) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleCommentChange = (id: string, comment: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, comment } : item
      )
    );
  };

  const toggleCompletion = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadMessage('');

    try {
      // Simple CSV/Excel parser (in production, use a library)
      const text = await file.text();
      const lines = text.split('\n');
      
      let updatedCount = 0;
      const updatedChecklist = checklist.map(item => {
        for (let i = 1; i < lines.length; i++) {
          const [id, status, marked] = lines[i].split(',');
          if (id?.trim() === item.id) {
            updatedCount++;
            return {
              ...item,
              status: (status?.trim() as ControlStatus) || item.status,
              isCompleted: marked?.trim().toLowerCase() === 'yes' || marked?.trim() === '1' || item.isCompleted
            };
          }
        }
        return item;
      });

      setChecklist(updatedChecklist);
      setUploadMessage(`Successfully imported ${updatedCount} controls from file`);
      setTimeout(() => setUploadMessage(''), 3000);
    } catch (error) {
      setUploadMessage('Error parsing file. Please ensure it\'s a valid CSV or Excel file.');
      console.error('File upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const completedCount = checklist.filter(item => item.isCompleted).length;
  const passedCount = checklist.filter(item => item.status === 'passing').length;
  const remediatedCount = checklist.filter(item => item.status === 'remediated').length;
  const closedCount = checklist.filter(item => item.status === 'closed').length;
  const allReviewed = checklist.length > 0 && (passedCount + remediatedCount + closedCount) === checklist.length;

  const statuses: (ControlStatus | 'all')[] = ['all', 'passing', 'pending', 'failing', 'in_review', 'needs_changes', 'remediated', 'closed'];

  if (!mounted) return null;

  return (
    <AppLayout>
      <div className="w-full bg-gradient-to-br from-primary/5 via-background to-accent/5 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">Control Audit Checklist</h1>
          <p className="text-sm text-muted-foreground mb-4">Review and mark controls as complete</p>

          {/* Completion Banner */}
          {allReviewed && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center gap-2">
              <div className="text-lg">✓</div>
              <div>
                <p className="text-xs text-green-800 font-semibold">Audit Review Complete</p>
                <p className="text-xs text-green-700">All controls have been reviewed and marked as Passing, Remediated, or Closed</p>
              </div>
            </div>
          )}

          {/* Progress Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="bg-card rounded-lg border border-border p-3">
              <p className="text-muted-foreground text-xs font-medium mb-1">Completed & Marked</p>
              <p className="text-2xl font-bold text-accent">{completedCount} / {checklist.length}</p>
              <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-accent" style={{ width: `${checklist.length > 0 ? (completedCount / checklist.length) * 100 : 0}%` }} />
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-3">
              <p className="text-muted-foreground text-xs font-medium mb-1">Ready for Review</p>
              <p className="text-2xl font-bold text-primary">{passedCount + remediatedCount + closedCount} / {checklist.length}</p>
              <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${checklist.length > 0 ? ((passedCount + remediatedCount + closedCount) / checklist.length) * 100 : 0}%` }} />
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-3">
              <p className="text-muted-foreground text-xs font-medium mb-1">Pending Action</p>
              <p className="text-2xl font-bold text-[#f59e0b]">{checklist.filter(c => c.status === 'pending' || c.status === 'failing' || c.status === 'needs_changes').length}</p>
              <p className="text-xs text-muted-foreground mt-1">Require attention</p>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <h3 className="text-xs font-semibold text-blue-900 mb-2">Upload Checklist File</h3>
            <p className="text-xs text-blue-700 mb-2">Import a CSV or Excel file with control statuses. Format: Control ID, Status, Marked (yes/no)</p>
            <div className="flex items-center gap-3">
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <span className="inline-block px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                  {uploading ? 'Uploading...' : 'Choose File'}
                </span>
              </label>
              {uploadMessage && (
                <span className={`text-xs font-medium ${uploadMessage.includes('Successfully') ? 'text-green-700' : 'text-red-700'}`}>
                  {uploadMessage}
                </span>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-lg border border-border p-3 mb-4 flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Search controls by ID or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              suppressHydrationWarning
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as ControlStatus | 'all')}
              className="px-3 py-1.5 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              suppressHydrationWarning
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Controls' : statusLabels[status as ControlStatus]}
                </option>
              ))}
            </select>
          </div>

          {/* Checklist Table */}
          <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-foreground uppercase">Done</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-foreground uppercase">ID</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-foreground uppercase">Control Name</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-foreground uppercase">Risk</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-foreground uppercase">Assigned To</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-foreground uppercase">Status</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-foreground uppercase">Note</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-foreground uppercase">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredChecklist.map(item => (
                    <tr key={item.id} className={`hover:bg-secondary transition-colors ${item.isCompleted ? 'bg-secondary/50' : ''}`}>
                      <td className="px-3 py-2">
                        <input
                          type="checkbox"
                          checked={item.isCompleted}
                          onChange={() => toggleCompletion(item.id)}
                          className="w-4 h-4 rounded border-border text-accent focus:ring-2 focus:ring-accent cursor-pointer"
                          suppressHydrationWarning
                        />
                      </td>
                      <td className="px-3 py-2 font-mono text-xs font-bold text-primary">{item.id}</td>
                      <td className="px-3 py-2">
                        <p className="font-semibold text-foreground text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Updated: {new Date(item.lastUpdated).toLocaleDateString()}</p>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          item.riskLevel === 'critical' ? 'bg-red-100 text-red-800' :
                          item.riskLevel === 'high' ? 'bg-orange-100 text-orange-800' :
                          item.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.riskLevel || 'Medium'}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-sm text-foreground">{item.assignedTo || '-'}</td>
                      <td className="px-3 py-2">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value as ControlStatus)}
                          className={`px-2 py-0.5 border border-border rounded text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary ${statusColors[item.status]}`}
                          suppressHydrationWarning
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{statusLabels[status]}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.comment}
                          onChange={(e) => handleCommentChange(item.id, e.target.value)}
                          placeholder="Add note..."
                          className="w-full px-2 py-1 border border-border rounded text-xs focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                          suppressHydrationWarning
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Link
                          href={`/control/${item.id}`}
                          className="text-accent text-xs font-semibold hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredChecklist.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-muted-foreground text-sm">No items found with the selected filter.</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 flex-wrap">
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Save All Changes
            </button>
            <button className="px-6 py-2 rounded-lg font-medium text-foreground bg-secondary hover:opacity-90 transition-opacity">
              Export as PDF
            </button>
            <button className="px-6 py-2 rounded-lg font-medium text-foreground bg-secondary hover:opacity-90 transition-opacity">
              Generate Report
            </button>
          </div>

          {saved && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
              <span className="text-xl">✓</span>
              <p className="text-sm text-green-800 font-medium">All changes saved successfully</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
