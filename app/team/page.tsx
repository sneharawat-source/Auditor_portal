'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAppState } from '@/lib/store';
import { UserRole } from '@/lib/types';

const roleLabels: { [key in UserRole]: string } = {
  admin: 'Administrator',
  auditor: 'Auditor',
  compliance: 'Compliance Officer',
  manager: 'Manager',
  viewer: 'Viewer'
};

const roleBadgeColors: { [key in UserRole]: string } = {
  admin: 'from-gray-600 to-gray-700',
  auditor: 'from-blue-500 to-blue-600',
  compliance: 'from-gray-500 to-gray-600',
  manager: 'from-gray-600 to-gray-700',
  viewer: 'from-gray-400 to-gray-500'
};

const roleDescriptions: { [key in UserRole]: string } = {
  admin: 'Full system access and team management',
  auditor: 'Conduct audits and manage controls',
  compliance: 'Monitor compliance and generate reports',
  manager: 'Oversee audit processes and teams',
  viewer: 'Read-only access to audit data'
};

export default function TeamPage() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'auditor' as UserRole,
    department: '',
    assignedControls: [] as string[],
    joinedDate: new Date().toISOString().split('T')[0],
    avatar: ''
  });
  const [editForm, setEditForm] = useState<any>({});

  const filteredTeam = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleStats = {
    admin: teamMembers.filter(m => m.role === 'admin').length,
    auditor: teamMembers.filter(m => m.role === 'auditor').length,
    compliance: teamMembers.filter(m => m.role === 'compliance').length
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      alert('Please fill in name and email');
      return;
    }
    
    const initials = newMember.name.split(' ').map(n => n[0]).join('').toUpperCase();
    addTeamMember({
      ...newMember,
      avatar: initials
    });
    
    setNewMember({
      name: '',
      email: '',
      role: 'auditor',
      department: '',
      assignedControls: [],
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: ''
    });
    setShowAddModal(false);
  };

  const handleEditMember = (member: any) => {
    setEditingMember(member.id);
    setEditForm(member);
  };

  const handleSaveEdit = () => {
    if (editingMember) {
      updateTeamMember(editingMember, editForm);
      setEditingMember(null);
      setEditForm({});
    }
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      deleteTeamMember(id);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-8 py-10">
          {/* Header */}
          <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6 overflow-hidden">
            <div className="relative flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Team Management</h1>
                <p className="text-sm text-gray-600">Manage team members, roles, and permissions</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-semibold text-sm">Add Member</span>
              </button>
            </div>
          </div>

          {/* Role Statistics */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-semibold">Total</div>
                  <div className="text-xl font-bold text-gray-900">{teamMembers.length}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-semibold">Admins</div>
                  <div className="text-xl font-bold text-gray-900">{roleStats.admin}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-semibold">Auditors</div>
                  <div className="text-xl font-bold text-blue-600">{roleStats.auditor}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-semibold">Compliance</div>
                  <div className="text-xl font-bold text-gray-900">{roleStats.compliance}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search team members by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeam.map(member => {
              const isEditing = editingMember === member.id;
              const displayMember = isEditing ? editForm : member;
              
              return (
                <div key={member.id} className="group relative bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${roleBadgeColors[member.role as UserRole]} flex items-center justify-center font-bold text-base text-white shadow-sm transition-all duration-300 group-hover:scale-105`}>
                        {member.avatar}
                      </div>
                      {!isEditing && (
                        <div className={`px-2 py-0.5 rounded-lg bg-gradient-to-r ${roleBadgeColors[member.role as UserRole]} text-white text-xs font-semibold`}>
                          {roleLabels[member.role as UserRole]}
                        </div>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={displayMember.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Name"
                        />
                        <input
                          type="email"
                          value={displayMember.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Email"
                        />
                        <select
                          value={displayMember.role}
                          onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="admin">Administrator</option>
                          <option value="auditor">Auditor</option>
                          <option value="compliance">Compliance Officer</option>
                          <option value="manager">Manager</option>
                          <option value="viewer">Viewer</option>
                        </select>
                        <input
                          type="text"
                          value={displayMember.department}
                          onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Department"
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className="text-base font-bold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 font-medium">{member.email}</p>
                        <p className="text-xs text-gray-500 mb-3 leading-relaxed">{roleDescriptions[member.role as UserRole]}</p>

                        <div className="space-y-1.5 mb-3 pb-3 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="text-xs text-gray-600 font-semibold">{member.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs text-gray-600">Joined {new Date(member.joinedDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {member.assignedControls && member.assignedControls.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs font-semibold text-gray-900 mb-1.5">Assigned Controls ({member.assignedControls.length})</p>
                            <div className="flex flex-wrap gap-1.5">
                              {member.assignedControls.slice(0, 3).map(control => (
                                <span key={control} className="px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                                  {control}
                                </span>
                              ))}
                              {member.assignedControls.length > 3 && (
                                <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-gray-100 text-gray-700">
                                  +{member.assignedControls.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    <div className="flex gap-2 mt-3">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingMember(null)}
                            className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditMember(member)}
                            className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMember(member.id)}
                            className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTeam.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-xl font-bold text-gray-900 mb-2">No team members found</p>
              <p className="text-gray-500">Try adjusting your search or add a new member</p>
            </div>
          )}
        </div>

        {/* Add Member Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-blue-600 px-8 py-5 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Add Team Member</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="w-9 h-9 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Role</label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value as UserRole })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="admin">Administrator</option>
                    <option value="auditor">Auditor</option>
                    <option value="compliance">Compliance Officer</option>
                    <option value="manager">Manager</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  <p className="mt-2 text-xs text-gray-500 italic">{roleDescriptions[newMember.role]}</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Department</label>
                  <input
                    type="text"
                    value={newMember.department}
                    onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., IT Security, Compliance"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleAddMember}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-sm hover:bg-blue-700 transition-all duration-300"
                  >
                    Add Member
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
