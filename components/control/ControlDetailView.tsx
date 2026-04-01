'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ControlDetail, ControlStatus } from '@/lib/types';
import { StatusBadge } from '@/components/common/StatusBadge';

interface ControlDetailViewProps {
  control: ControlDetail;
}

export function ControlDetailView({ control }: ControlDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'policies' | 'history' | 'comments'>('overview');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'John Auditor', date: '2025-02-20', text: 'Control implementation looks good. Evidence is comprehensive.' },
    { id: 2, user: 'Sarah Manager', date: '2025-02-18', text: 'Updated security policy document as per audit requirements.' }
  ]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">
                {control.id}
              </span>
              <StatusBadge status={control.status} />
              {control.riskLevel && (
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  control.riskLevel === 'critical' ? 'bg-red-100 text-red-800' :
                  control.riskLevel === 'high' ? 'bg-orange-100 text-orange-800' :
                  control.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {control.riskLevel.toUpperCase()} RISK
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{control.name}</h1>
            <p className="text-muted-foreground text-sm">{control.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Owner</p>
            <p className="text-sm font-semibold text-foreground">{control.owner}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Assigned To</p>
            <p className="text-sm font-semibold text-foreground">{control.assignedTo || 'Unassigned'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Last Updated</p>
            <p className="text-sm font-semibold text-foreground">{new Date(control.lastUpdated).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Due Date</p>
            <p className="text-sm font-semibold text-foreground">{control.dueDate ? new Date(control.dueDate).toLocaleDateString() : 'Not set'}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: '📋' },
              { id: 'evidence', label: 'Evidence', icon: '📎', count: control.evidence.length },
              { id: 'policies', label: 'Policies', icon: '📄', count: control.policies.length },
              { id: 'comments', label: 'Comments', icon: '💬', count: comments.length },
              { id: 'history', label: 'Audit Trail', icon: '🕐' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold">
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Control Description</h3>
                <p className="text-muted-foreground leading-relaxed">{control.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Framework Reference</h3>
                <p className="text-sm font-mono bg-secondary px-4 py-3 rounded-lg text-foreground">
                  {control.frameworkReference}
                </p>
              </div>

              {control.checklist && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Requirement Summary</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900 leading-relaxed">{control.checklist.requirementSummary}</p>
                    {control.checklist.comment && (
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <p className="text-xs text-blue-700 font-semibold mb-1">Auditor Comment:</p>
                        <p className="text-sm text-blue-800">{control.checklist.comment}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Evidence Documents</h3>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                  + Upload Evidence
                </button>
              </div>

              {control.evidence.length > 0 ? (
                <div className="space-y-3">
                  {control.evidence.map(evidence => (
                    <div key={evidence.id} className="flex items-center gap-4 p-4 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-colors group">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm truncate">{evidence.name}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>Uploaded: {new Date(evidence.uploadDate).toLocaleDateString()}</span>
                          {evidence.uploadedBy && <><span>•</span><span>By: {evidence.uploadedBy}</span></>}
                          {evidence.fileSize && <><span>•</span><span>{(evidence.fileSize / 1024).toFixed(1)} KB</span></>}
                        </div>
                        {evidence.expiryDate && (
                          <p className="text-xs text-amber-600 mt-1">
                            Expires: {new Date(evidence.expiryDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          View
                        </button>
                        <button className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-secondary rounded-lg">
                  <svg className="w-16 h-16 text-muted-foreground mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-muted-foreground text-sm">No evidence uploaded yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground mb-4">Related Policies</h3>
              
              {control.policies.length > 0 ? (
                <div className="space-y-3">
                  {control.policies.map(policy => (
                    <div key={policy.id} className="flex items-center gap-4 p-4 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm">{policy.name}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>Version: {policy.version}</span>
                          <span>•</span>
                          <span>Last Reviewed: {new Date(policy.lastReviewed).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        View Policy
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-secondary rounded-lg">
                  <p className="text-muted-foreground text-sm">No policies linked to this control</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Comments & Discussion</h3>
                <span className="text-sm text-muted-foreground">{comments.length} comments</span>
              </div>

              {/* Add Comment Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Add a comment</label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your observations, questions, or feedback about this control..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                />
                <div className="flex gap-2 mt-3">
                  <button 
                    onClick={() => {
                      if (newComment.trim()) {
                        setComments([...comments, {
                          id: comments.length + 1,
                          user: 'Current User',
                          date: new Date().toISOString().split('T')[0],
                          text: newComment
                        }]);
                        setNewComment('');
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Post Comment
                  </button>
                  <button 
                    onClick={() => setNewComment('')}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-3">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">
                            {comment.user.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-gray-900">{comment.user}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground mb-4">Audit Trail</h3>
              
              <div className="space-y-3">
                {[
                  { date: '2025-02-20', user: 'John Auditor', action: 'Status changed to Passing', type: 'status' },
                  { date: '2025-02-18', user: 'Sarah Manager', action: 'Evidence uploaded: Security Policy v2.1', type: 'evidence' },
                  { date: '2025-02-15', user: 'John Auditor', action: 'Comment added to control', type: 'comment' },
                  { date: '2025-02-10', user: 'Mike Admin', action: 'Control assigned to Sarah Manager', type: 'assignment' }
                ].map((entry, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-secondary rounded-lg border border-border">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        entry.type === 'status' ? 'bg-green-100' :
                        entry.type === 'evidence' ? 'bg-blue-100' :
                        entry.type === 'comment' ? 'bg-yellow-100' :
                        'bg-purple-100'
                      }`}>
                        <span className="text-lg">
                          {entry.type === 'status' ? '✓' :
                           entry.type === 'evidence' ? '📎' :
                           entry.type === 'comment' ? '💬' :
                           '👤'}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{entry.action}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{entry.user}</span>
                        <span>•</span>
                        <span>{new Date(entry.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex gap-3 flex-wrap">
          <button 
            onClick={() => setActiveTab('comments')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Add Comment
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Details
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
}
