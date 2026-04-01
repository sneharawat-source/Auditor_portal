'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockRemediationTasks, mockComplianceMetrics, mockTeamMembers } from './mockData';
import { Control, ControlStatus, TeamMember } from './types';
import { frameworkControls } from './frameworkControls';

interface RemediationTask {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'completed' | 'blocked' | 'overdue';
  controlId: string;
  assignedTo: string;
  dueDate: string;
  createdDate: string;
  notes?: string;
}

interface AppState {
  selectedFramework: string;
  controls: Control[];
  remediationTasks: RemediationTask[];
  teamMembers: TeamMember[];
  controlComments: { [key: string]: string };
  controlStatuses: { [key: string]: ControlStatus };
  completedControls: { [key: string]: boolean };
  setSelectedFramework: (framework: string) => void;
  updateControlStatus: (controlId: string, status: ControlStatus) => void;
  updateControlComment: (controlId: string, comment: string) => void;
  toggleControlComplete: (controlId: string) => void;
  updateTaskStatus: (taskId: string, status: RemediationTask['status']) => void;
  updateTaskPriority: (taskId: string, priority: RemediationTask['priority']) => void;
  updateTaskAssignee: (taskId: string, assignee: string) => void;
  updateTaskNotes: (taskId: string, notes: string) => void;
  addRemediationTask: (task: Omit<RemediationTask, 'id' | 'createdDate'>) => void;
  deleteRemediationTask: (taskId: string) => void;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedFramework, setSelectedFrameworkState] = useState<string>('SOC 2 Type II');
  const [controls, setControls] = useState<Control[]>(frameworkControls['SOC 2 Type II']);
  const [remediationTasks, setRemediationTasks] = useState<RemediationTask[]>(
    mockRemediationTasks.map(task => ({
      ...task,
      createdDate: task.createdDate || new Date().toISOString()
    }))
  );
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [controlComments, setControlComments] = useState<{ [key: string]: string }>({});
  const [controlStatuses, setControlStatuses] = useState<{ [key: string]: ControlStatus }>({});
  const [completedControls, setCompletedControls] = useState<{ [key: string]: boolean }>({});

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('auditPortalData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setControlComments(parsed.controlComments || {});
        setControlStatuses(parsed.controlStatuses || {});
        setCompletedControls(parsed.completedControls || {});
        setRemediationTasks(parsed.remediationTasks || mockRemediationTasks);
        setTeamMembers(parsed.teamMembers || mockTeamMembers);
        setSelectedFrameworkState(parsed.selectedFramework || 'SOC 2 Type II');
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      controlComments,
      controlStatuses,
      completedControls,
      remediationTasks,
      teamMembers,
      selectedFramework,
    };
    localStorage.setItem('auditPortalData', JSON.stringify(dataToSave));
  }, [controlComments, controlStatuses, completedControls, remediationTasks, teamMembers, selectedFramework]);

  // Update controls when framework changes
  useEffect(() => {
    setControls(frameworkControls[selectedFramework] || frameworkControls['SOC 2 Type II']);
  }, [selectedFramework]);

  const setSelectedFramework = (framework: string) => {
    setSelectedFrameworkState(framework);
  };

  const updateControlStatus = (controlId: string, status: ControlStatus) => {
    setControlStatuses(prev => ({ ...prev, [controlId]: status }));
  };

  const updateControlComment = (controlId: string, comment: string) => {
    setControlComments(prev => ({ ...prev, [controlId]: comment }));
  };

  const toggleControlComplete = (controlId: string) => {
    setCompletedControls(prev => ({ ...prev, [controlId]: !prev[controlId] }));
  };

  const updateTaskStatus = (taskId: string, status: RemediationTask['status']) => {
    setRemediationTasks(prev =>
      prev.map(task => task.id === taskId ? { ...task, status } : task)
    );
  };

  const updateTaskPriority = (taskId: string, priority: RemediationTask['priority']) => {
    setRemediationTasks(prev =>
      prev.map(task => task.id === taskId ? { ...task, priority } : task)
    );
  };

  const updateTaskAssignee = (taskId: string, assignee: string) => {
    setRemediationTasks(prev =>
      prev.map(task => task.id === taskId ? { ...task, assignedTo: assignee } : task)
    );
  };

  const updateTaskNotes = (taskId: string, notes: string) => {
    setRemediationTasks(prev =>
      prev.map(task => task.id === taskId ? { ...task, notes } : task)
    );
  };

  const addRemediationTask = (task: Omit<RemediationTask, 'id' | 'createdDate'>) => {
    const newTask: RemediationTask = {
      ...task,
      id: `TASK-${Date.now()}`,
      createdDate: new Date().toISOString(),
    };
    setRemediationTasks(prev => [newTask, ...prev]);
  };

  const deleteRemediationTask = (taskId: string) => {
    setRemediationTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...member,
      id: `tm-${Date.now()}`,
    };
    setTeamMembers(prev => [...prev, newMember]);
  };

  const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
    setTeamMembers(prev =>
      prev.map(member => member.id === id ? { ...member, ...updates } : member)
    );
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        selectedFramework,
        controls,
        remediationTasks,
        teamMembers,
        controlComments,
        controlStatuses,
        completedControls,
        setSelectedFramework,
        updateControlStatus,
        updateControlComment,
        toggleControlComplete,
        updateTaskStatus,
        updateTaskPriority,
        updateTaskAssignee,
        updateTaskNotes,
        addRemediationTask,
        deleteRemediationTask,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
}
