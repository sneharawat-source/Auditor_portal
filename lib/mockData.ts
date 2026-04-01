import { AuditData, ControlDetail, TeamMember, ActivityLog, Notification, RemediationTask, ComplianceMetrics } from './types';

export const mockAuditData: AuditData = {
  orgName: 'TechCorp Industries',
  framework: 'SOC2',
  auditPeriod: 'January 2025 - December 2025',
  totalControls: 10,
  controls: [
    {
      id: 'CC1.1',
      name: 'Access Control Policy',
      description: 'Entity obtains and maintains physical and logical access controls.',
      frameworkReference: 'CC1.1',
      owner: 'Security Team',
      status: 'passing',
      lastUpdated: '2025-02-15',
      assignedTo: 'Sarah Johnson',
      riskLevel: 'low',
      dueDate: '2025-03-15',
      isCompleted: true
    },
    {
      id: 'CC1.2',
      name: 'Access Reviews',
      description: 'Access rights are reviewed and updated periodically.',
      frameworkReference: 'CC1.2',
      owner: 'HR & Security',
      status: 'pending',
      lastUpdated: '2025-02-10',
      assignedTo: 'Marcus Chen',
      riskLevel: 'medium',
      dueDate: '2025-02-28',
      isCompleted: false
    },
    {
      id: 'CC2.1',
      name: 'Segregation of Duties',
      description: 'Roles are segregated to prevent conflicts of interest.',
      frameworkReference: 'CC2.1',
      owner: 'Finance Team',
      status: 'failing',
      lastUpdated: '2025-02-05',
      assignedTo: 'David Martinez',
      riskLevel: 'critical',
      dueDate: '2025-02-20',
      isCompleted: false
    },
    {
      id: 'CC2.2',
      name: 'Change Management',
      description: 'Changes are authorized, tested, and documented.',
      frameworkReference: 'CC2.2',
      owner: 'Engineering',
      status: 'in_review',
      lastUpdated: '2025-02-14',
      assignedTo: 'Emma Wilson',
      riskLevel: 'high',
      dueDate: '2025-03-01',
      isCompleted: false
    },
    {
      id: 'CC3.1',
      name: 'Incident Response',
      description: 'Procedures exist to identify and respond to incidents.',
      frameworkReference: 'CC3.1',
      owner: 'Security Ops',
      status: 'needs_changes',
      lastUpdated: '2025-02-08',
      assignedTo: 'James Brown',
      riskLevel: 'high',
      dueDate: '2025-02-25',
      isCompleted: false
    },
    {
      id: 'CC3.2',
      name: 'Risk Assessment',
      description: 'Risks are assessed and monitored regularly.',
      frameworkReference: 'CC3.2',
      owner: 'Risk Management',
      status: 'remediated',
      lastUpdated: '2025-02-12',
      assignedTo: 'Lisa Anderson',
      riskLevel: 'medium',
      dueDate: '2025-03-05',
      isCompleted: true
    },
    {
      id: 'CC4.1',
      name: 'Data Classification',
      description: 'Data is classified and handled according to sensitivity.',
      frameworkReference: 'CC4.1',
      owner: 'Data Governance',
      status: 'passing',
      lastUpdated: '2025-02-13',
      assignedTo: 'Rachel Kim',
      riskLevel: 'low',
      dueDate: '2025-03-20',
      isCompleted: true
    },
    {
      id: 'CC5.1',
      name: 'Encryption Standards',
      description: 'Data is encrypted at rest and in transit.',
      frameworkReference: 'CC5.1',
      owner: 'Infrastructure',
      status: 'closed',
      lastUpdated: '2025-02-15',
      assignedTo: 'Alex Thompson',
      riskLevel: 'low',
      dueDate: '2025-02-15',
      isCompleted: true
    },
    {
      id: 'CC6.1',
      name: 'Backup & Recovery',
      description: 'Backup and disaster recovery procedures are in place.',
      frameworkReference: 'CC6.1',
      owner: 'Infrastructure',
      status: 'passing',
      lastUpdated: '2025-02-14',
      assignedTo: 'Alex Thompson',
      riskLevel: 'low',
      dueDate: '2025-03-10',
      isCompleted: true
    },
    {
      id: 'CC7.1',
      name: 'System Monitoring',
      description: 'Systems are monitored for security events.',
      frameworkReference: 'CC7.1',
      owner: 'Security Ops',
      status: 'in_review',
      lastUpdated: '2025-02-11',
      assignedTo: 'James Brown',
      riskLevel: 'high',
      dueDate: '2025-03-02',
      isCompleted: false
    }
  ]
};

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@surepass.com',
    role: 'auditor',
    department: 'Security',
    assignedControls: ['CC1.1', 'CC1.2', 'CC4.1'],
    joinedDate: '2024-01-15',
    avatar: 'SJ'
  },
  {
    id: 'tm2',
    name: 'Michael Chen',
    email: 'michael.chen@surepass.com',
    role: 'admin',
    department: 'IT Administration',
    assignedControls: [],
    joinedDate: '2023-11-10',
    avatar: 'MC'
  },
  {
    id: 'tm3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@surepass.com',
    role: 'compliance',
    department: 'Compliance',
    assignedControls: ['CC2.1', 'CC3.2'],
    joinedDate: '2024-02-01',
    avatar: 'ER'
  }
];

export const mockActivityLog: ActivityLog[] = [
  {
    id: 'al1',
    timestamp: '2025-02-15T14:30:00Z',
    action: 'Status Updated',
    user: 'Sarah Johnson',
    controlId: 'CC1.1',
    changes: 'Status changed from in_review to passing',
    details: 'Control verified and approved after audit review'
  },
  {
    id: 'al2',
    timestamp: '2025-02-15T12:00:00Z',
    action: 'Evidence Uploaded',
    user: 'Rachel Kim',
    controlId: 'CC4.1',
    changes: 'New evidence: Data_Classification_Q1_2025.pdf',
    details: 'Updated classification inventory uploaded'
  },
  {
    id: 'al3',
    timestamp: '2025-02-14T16:45:00Z',
    action: 'Comment Added',
    user: 'David Martinez',
    controlId: 'CC2.1',
    changes: 'Comment: Found 3 segregation violations in approval workflow',
    details: 'Critical finding requires immediate remediation'
  },
  {
    id: 'al4',
    timestamp: '2025-02-14T10:20:00Z',
    action: 'Team Member Assigned',
    user: 'James Brown',
    controlId: 'CC3.1',
    changes: 'Assigned to: James Brown',
    details: 'Control reassigned for in-depth review'
  },
  {
    id: 'al5',
    timestamp: '2025-02-13T15:15:00Z',
    action: 'Status Updated',
    user: 'Emma Wilson',
    controlId: 'CC2.2',
    changes: 'Status changed from pending to in_review',
    details: 'Change management process review initiated'
  },
  {
    id: 'al6',
    timestamp: '2025-02-12T11:30:00Z',
    action: 'Remediation Completed',
    user: 'Lisa Anderson',
    controlId: 'CC3.2',
    changes: 'Status changed to remediated',
    details: 'All identified risk gaps have been addressed'
  },
  {
    id: 'al7',
    timestamp: '2025-02-11T09:00:00Z',
    action: 'Audit Started',
    user: 'Marcus Chen',
    controlId: 'CC1.2',
    changes: 'Audit review initiated',
    details: 'Q1 2025 access review process started'
  },
  {
    id: 'al8',
    timestamp: '2025-02-10T14:20:00Z',
    action: 'Framework Changed',
    user: 'Sarah Johnson',
    controlId: null,
    changes: 'Framework updated to SOC 2 Type II',
    details: 'Audit framework selection updated'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'error',
    title: 'Critical Finding Flagged',
    message: 'Control CC2.1 (Segregation of Duties) has a critical finding that requires immediate attention.',
    timestamp: '2025-02-15T14:00:00Z',
    read: false,
    link: '/control/CC2.1'
  },
  {
    id: 'n2',
    type: 'warning',
    title: 'Upcoming Deadline',
    message: 'Control CC3.1 (Incident Response) is due for remediation in 5 days.',
    timestamp: '2025-02-15T10:30:00Z',
    read: false,
    link: '/control/CC3.1'
  },
  {
    id: 'n3',
    type: 'info',
    title: 'Team Member Assigned',
    message: 'James Brown has been assigned to review Control CC7.1.',
    timestamp: '2025-02-14T16:15:00Z',
    read: true,
    link: '/control/CC7.1'
  },
  {
    id: 'n4',
    type: 'success',
    title: 'Control Approved',
    message: 'Control CC1.1 (Access Control Policy) has been successfully verified and marked as passing.',
    timestamp: '2025-02-14T13:45:00Z',
    read: true,
    link: '/control/CC1.1'
  },
  {
    id: 'n5',
    type: 'info',
    title: 'Evidence Uploaded',
    message: 'New evidence file uploaded for Control CC4.1 by Rachel Kim.',
    timestamp: '2025-02-13T11:20:00Z',
    read: true
  }
];

export const mockRemediationTasks: RemediationTask[] = [
  {
    id: 'rt1',
    controlId: 'CC2.1',
    title: 'Fix Segregation of Duties Violations',
    description: 'Resolve the 3 identified violations in the approval workflow. Separate approval authority for critical financial transactions.',
    status: 'open',
    dueDate: '2025-02-20',
    assignedTo: 'David Martinez',
    priority: 'critical'
  },
  {
    id: 'rt2',
    controlId: 'CC3.1',
    title: 'Update Incident Response Procedures',
    description: 'Define response time SLAs and clarify escalation paths for security incidents.',
    status: 'open',
    dueDate: '2025-02-25',
    assignedTo: 'James Brown',
    priority: 'high'
  },
  {
    id: 'rt3',
    controlId: 'CC1.2',
    title: 'Complete Q1 2025 Access Review',
    description: 'Perform quarterly access rights review for all users and update access permissions accordingly.',
    status: 'in_progress',
    dueDate: '2025-02-28',
    assignedTo: 'Marcus Chen',
    priority: 'high'
  },
  {
    id: 'rt4',
    controlId: 'CC2.2',
    title: 'Document Change Management Updates',
    description: 'Update change management process documentation and ensure all production changes follow procedures.',
    status: 'in_progress',
    dueDate: '2025-03-01',
    assignedTo: 'Emma Wilson',
    priority: 'medium'
  },
  {
    id: 'rt5',
    controlId: 'CC3.2',
    title: 'Risk Assessment Follow-up',
    description: 'Verify that all remediation actions from Q1 risk assessment have been implemented.',
    status: 'completed',
    dueDate: '2025-02-12',
    assignedTo: 'Lisa Anderson',
    priority: 'medium'
  }
];

export const mockComplianceMetrics: ComplianceMetrics = {
  totalControls: 10,
  passing: 4,
  failing: 1,
  pending: 2,
  inReview: 2,
  completionRate: 60,
  lastUpdated: '2025-02-15'
};

export const mockControlDetails: { [key: string]: ControlDetail } = {
  'CC1.1': {
    id: 'CC1.1',
    name: 'Access Control Policy',
    description: 'Entity obtains and maintains physical and logical access controls.',
    frameworkReference: 'CC1.1',
    owner: 'Security Team',
    status: 'passing',
    lastUpdated: '2025-02-15',
    assignedTo: 'Sarah Johnson',
    riskLevel: 'low',
    dueDate: '2025-03-15',
    isCompleted: true,
    policies: [
      { id: 'p1', name: 'Access Control Framework', version: '2.1', lastReviewed: '2025-01-20' },
      { id: 'p2', name: 'Network Security Policy', version: '1.5', lastReviewed: '2025-01-15' }
    ],
    evidence: [
      { id: 'e1', name: 'Access Control Log Q1 2025', uploadDate: '2025-02-01', expiryDate: '2026-02-01', uploadedBy: 'Sarah Johnson', fileSize: 1250000, category: 'Logs' },
      { id: 'e2', name: 'Policy Review Minutes', uploadDate: '2025-01-25', expiryDate: '2026-01-25', uploadedBy: 'Sarah Johnson', fileSize: 450000, category: 'Documentation' }
    ],
    checklist: {
      requirementSummary: 'System verifies that access controls are properly configured and enforced.',
      comment: 'Verified during Q1 audit. All controls operational.'
    }
  },
  'CC1.2': {
    id: 'CC1.2',
    name: 'Access Reviews',
    description: 'Access rights are reviewed and updated periodically.',
    frameworkReference: 'CC1.2',
    owner: 'HR & Security',
    status: 'pending',
    lastUpdated: '2025-02-10',
    assignedTo: 'Marcus Chen',
    riskLevel: 'medium',
    dueDate: '2025-02-28',
    isCompleted: false,
    policies: [
      { id: 'p3', name: 'Access Review Procedures', version: '1.3', lastReviewed: '2025-01-10' }
    ],
    evidence: [
      { id: 'e3', name: 'Q4 2024 Access Review', uploadDate: '2025-01-05', expiryDate: '2026-01-05', uploadedBy: 'Marcus Chen', fileSize: 870000, category: 'Reviews' }
    ],
    checklist: {
      requirementSummary: 'Access reviews are performed at least quarterly.',
      comment: 'Awaiting Q1 2025 review completion'
    }
  },
  'CC2.1': {
    id: 'CC2.1',
    name: 'Segregation of Duties',
    description: 'Roles are segregated to prevent conflicts of interest.',
    frameworkReference: 'CC2.1',
    owner: 'Finance Team',
    status: 'failing',
    lastUpdated: '2025-02-05',
    assignedTo: 'David Martinez',
    riskLevel: 'critical',
    dueDate: '2025-02-20',
    isCompleted: false,
    policies: [
      { id: 'p4', name: 'Segregation of Duties Policy', version: '1.2', lastReviewed: '2024-11-30' }
    ],
    evidence: [
      { id: 'e4', name: 'SOD Matrix', uploadDate: '2024-12-15', expiryDate: '2025-12-15', uploadedBy: 'David Martinez', fileSize: 620000, category: 'Matrix' }
    ],
    checklist: {
      requirementSummary: 'Critical functions are separated among different individuals.',
      comment: 'Issue: Finance team found 3 critical segregation violations in approval workflows'
    }
  },
  'CC2.2': {
    id: 'CC2.2',
    name: 'Change Management',
    description: 'Changes are authorized, tested, and documented.',
    frameworkReference: 'CC2.2',
    owner: 'Engineering',
    status: 'in_review',
    lastUpdated: '2025-02-14',
    assignedTo: 'Emma Wilson',
    riskLevel: 'high',
    dueDate: '2025-03-01',
    isCompleted: false,
    policies: [
      { id: 'p5', name: 'Change Management Process', version: '2.0', lastReviewed: '2025-01-30' }
    ],
    evidence: [
      { id: 'e5', name: 'Change Log January 2025', uploadDate: '2025-02-05', expiryDate: '2026-02-05', uploadedBy: 'Emma Wilson', fileSize: 1500000, category: 'Logs' },
      { id: 'e6', name: 'Testing Records', uploadDate: '2025-02-04', expiryDate: '2026-02-04', uploadedBy: 'Emma Wilson', fileSize: 820000, category: 'Test Results' }
    ],
    checklist: {
      requirementSummary: 'All production changes follow the change management process.',
      comment: 'Under review by engineering leadership'
    }
  },
  'CC3.1': {
    id: 'CC3.1',
    name: 'Incident Response',
    description: 'Procedures exist to identify and respond to incidents.',
    frameworkReference: 'CC3.1',
    owner: 'Security Ops',
    status: 'needs_changes',
    lastUpdated: '2025-02-08',
    assignedTo: 'James Brown',
    riskLevel: 'high',
    dueDate: '2025-02-25',
    isCompleted: false,
    policies: [
      { id: 'p6', name: 'Incident Response Plan', version: '1.8', lastReviewed: '2024-12-20' }
    ],
    evidence: [
      { id: 'e7', name: 'Incident Response Logs', uploadDate: '2025-01-31', expiryDate: '2026-01-31', uploadedBy: 'James Brown', fileSize: 980000, category: 'Logs' }
    ],
    checklist: {
      requirementSummary: 'Incident response procedures address detection, containment, and recovery.',
      comment: 'Needs updates: response time SLAs need to be defined, escalation paths clarified'
    }
  },
  'CC3.2': {
    id: 'CC3.2',
    name: 'Risk Assessment',
    description: 'Risks are assessed and monitored regularly.',
    frameworkReference: 'CC3.2',
    owner: 'Risk Management',
    status: 'remediated',
    lastUpdated: '2025-02-12',
    assignedTo: 'Lisa Anderson',
    riskLevel: 'medium',
    dueDate: '2025-03-05',
    isCompleted: true,
    policies: [
      { id: 'p7', name: 'Risk Assessment Framework', version: '2.2', lastReviewed: '2025-02-01' }
    ],
    evidence: [
      { id: 'e8', name: 'Q1 2025 Risk Assessment', uploadDate: '2025-02-10', expiryDate: '2026-02-10', uploadedBy: 'Lisa Anderson', fileSize: 1100000, category: 'Assessment' },
      { id: 'e9', name: 'Risk Register', uploadDate: '2025-02-10', expiryDate: '2026-02-10', uploadedBy: 'Lisa Anderson', fileSize: 750000, category: 'Register' }
    ],
    checklist: {
      requirementSummary: 'Risks are identified, analyzed, and mitigated appropriately.',
      comment: 'Remediation completed: all identified gaps have been addressed'
    }
  },
  'CC4.1': {
    id: 'CC4.1',
    name: 'Data Classification',
    description: 'Data is classified and handled according to sensitivity.',
    frameworkReference: 'CC4.1',
    owner: 'Data Governance',
    status: 'passing',
    lastUpdated: '2025-02-13',
    assignedTo: 'Rachel Kim',
    riskLevel: 'low',
    dueDate: '2025-03-20',
    isCompleted: true,
    policies: [
      { id: 'p8', name: 'Data Classification Policy', version: '3.0', lastReviewed: '2025-02-05' }
    ],
    evidence: [
      { id: 'e10', name: 'Data Classification Inventory', uploadDate: '2025-02-10', expiryDate: '2026-02-10', uploadedBy: 'Rachel Kim', fileSize: 1350000, category: 'Inventory' }
    ],
    checklist: {
      requirementSummary: 'All data is classified and handled according to its sensitivity level.',
      comment: 'All data properly classified and controls verified'
    }
  },
  'CC5.1': {
    id: 'CC5.1',
    name: 'Encryption Standards',
    description: 'Data is encrypted at rest and in transit.',
    frameworkReference: 'CC5.1',
    owner: 'Infrastructure',
    status: 'closed',
    lastUpdated: '2025-02-15',
    assignedTo: 'Alex Thompson',
    riskLevel: 'low',
    dueDate: '2025-02-15',
    isCompleted: true,
    policies: [
      { id: 'p9', name: 'Encryption Standards', version: '2.5', lastReviewed: '2025-02-01' }
    ],
    evidence: [
      { id: 'e11', name: 'Encryption Audit Report', uploadDate: '2025-02-12', expiryDate: '2026-02-12', uploadedBy: 'Alex Thompson', fileSize: 890000, category: 'Audit' }
    ],
    checklist: {
      requirementSummary: 'All sensitive data is encrypted using approved algorithms.',
      comment: 'Audit closed. All encryption standards met and verified.'
    }
  },
  'CC6.1': {
    id: 'CC6.1',
    name: 'Backup & Recovery',
    description: 'Backup and disaster recovery procedures are in place.',
    frameworkReference: 'CC6.1',
    owner: 'Infrastructure',
    status: 'passing',
    lastUpdated: '2025-02-14',
    assignedTo: 'Alex Thompson',
    riskLevel: 'low',
    dueDate: '2025-03-10',
    isCompleted: true,
    policies: [
      { id: 'p10', name: 'Backup & DR Policy', version: '1.9', lastReviewed: '2025-02-01' }
    ],
    evidence: [
      { id: 'e12', name: 'Backup Test Results', uploadDate: '2025-02-12', expiryDate: '2026-02-12', uploadedBy: 'Alex Thompson', fileSize: 1050000, category: 'Test Results' },
      { id: 'e13', name: 'DR Plan Document', uploadDate: '2025-02-01', expiryDate: '2026-02-01', uploadedBy: 'Alex Thompson', fileSize: 680000, category: 'Documentation' }
    ],
    checklist: {
      requirementSummary: 'Backup and disaster recovery procedures are documented and tested.',
      comment: 'Latest DR test completed successfully. Quarterly testing schedule in place.'
    }
  },
  'CC7.1': {
    id: 'CC7.1',
    name: 'System Monitoring',
    description: 'Systems are monitored for security events.',
    frameworkReference: 'CC7.1',
    owner: 'Security Ops',
    status: 'in_review',
    lastUpdated: '2025-02-11',
    assignedTo: 'James Brown',
    riskLevel: 'high',
    dueDate: '2025-03-02',
    isCompleted: false,
    policies: [
      { id: 'p11', name: 'Monitoring & Alerting Policy', version: '1.4', lastReviewed: '2025-01-25' }
    ],
    evidence: [
      { id: 'e14', name: 'System Monitoring Logs', uploadDate: '2025-02-10', expiryDate: '2026-02-10', uploadedBy: 'James Brown', fileSize: 2100000, category: 'Logs' },
      { id: 'e15', name: 'Alert Configuration', uploadDate: '2025-02-08', expiryDate: '2026-02-08', uploadedBy: 'James Brown', fileSize: 520000, category: 'Configuration' }
    ],
    checklist: {
      requirementSummary: 'Systems are continuously monitored for unauthorized access and anomalies.',
      comment: 'Review in progress by security ops team'
    }
  }
};
