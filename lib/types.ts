export type ControlStatus = 
  | 'passing' 
  | 'pending' 
  | 'failing' 
  | 'in_review' 
  | 'needs_changes' 
  | 'remediated' 
  | 'closed';

export type UserRole = 'admin' | 'auditor' | 'manager' | 'viewer' | 'compliance';
export type Framework = 'SOC2' | 'ISO27001' | 'HIPAA' | 'GDPR' | 'PCI-DSS';
export type NotificationType = 'info' | 'warning' | 'error' | 'success';

export interface Control {
  id: string;
  name: string;
  description: string;
  frameworkReference: string;
  owner: string;
  status: ControlStatus;
  lastUpdated: string;
  assignedTo?: string;
  riskLevel?: 'critical' | 'high' | 'medium' | 'low';
  dueDate?: string;
  isCompleted?: boolean;
}

export interface Policy {
  id: string;
  name: string;
  version: string;
  lastReviewed: string;
}

export interface Evidence {
  id: string;
  name: string;
  uploadDate: string;
  expiryDate: string;
  url?: string;
  uploadedBy?: string;
  fileSize?: number;
  category?: string;
}

export interface ControlDetail extends Control {
  policies: Policy[];
  evidence: Evidence[];
  checklist?: {
    requirementSummary: string;
    comment?: string;
  };
}

export interface AuditData {
  orgName: string;
  framework: Framework;
  auditPeriod: string;
  totalControls: number;
  controls: Control[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  assignedControls?: string[];
  joinedDate: string;
  avatar?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  controlId?: string;
  changes?: string;
  details?: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface ComplianceMetrics {
  totalControls: number;
  passing: number;
  failing: number;
  pending: number;
  inReview: number;
  completionRate: number;
  lastUpdated: string;
}

export interface RemediationTask {
  id: string;
  controlId: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'completed' | 'overdue';
  dueDate: string;
  assignedTo: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  createdDate?: string;
  notes?: string;
}

export interface User extends TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type StatusCount = {
  [key in ControlStatus]: number;
};
