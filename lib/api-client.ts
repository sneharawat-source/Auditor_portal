// API Client for frontend to backend communication

const API_BASE = '/api';

// Generic fetch wrapper with error handling
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Controls API
export const controlsAPI = {
  // Get all controls for a framework
  getByFramework: (framework: string) =>
    fetchAPI(`/controls?framework=${encodeURIComponent(framework)}`),

  // Get single control
  getById: (id: string) =>
    fetchAPI(`/controls/${id}`),

  // Update control
  update: (id: string, data: any) =>
    fetchAPI(`/controls/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Update control status/comment
  updateStatus: (frameworkName: string, controlId: string, status: string, completed?: boolean, comment?: string) =>
    fetchAPI(`/controls`, {
      method: 'POST',
      body: JSON.stringify({ frameworkName, controlId, status, completed, comment }),
    }),

  // Get comments
  getComments: (controlId: string) =>
    fetchAPI(`/controls/${controlId}/comments`),

  // Add comment
  addComment: (controlId: string, content: string, createdBy?: string) =>
    fetchAPI(`/controls/${controlId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, createdBy }),
    }),

  // Get evidence
  getEvidence: (controlId: string) =>
    fetchAPI(`/controls/${controlId}/evidence`),

  // Add evidence
  addEvidence: (controlId: string, data: { fileName: string; fileUrl: string; fileType?: string; uploadedBy?: string }) =>
    fetchAPI(`/controls/${controlId}/evidence`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Delete evidence
  deleteEvidence: (controlId: string, evidenceId: string) =>
    fetchAPI(`/controls/${controlId}/evidence?evidenceId=${evidenceId}`, {
      method: 'DELETE',
    }),
};

// Tasks API
export const tasksAPI = {
  // Get all tasks
  getAll: () => fetchAPI('/tasks'),

  // Create task
  create: (data: any) =>
    fetchAPI('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Update task
  update: (id: string, data: any) =>
    fetchAPI(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Delete task
  delete: (id: string) =>
    fetchAPI(`/tasks/${id}`, {
      method: 'DELETE',
    }),
};

// Team API
export const teamAPI = {
  // Get all team members
  getAll: () => fetchAPI('/team'),

  // Create team member
  create: (data: any) =>
    fetchAPI('/team', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Update team member
  update: (id: string, data: any) =>
    fetchAPI(`/team/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Delete team member
  delete: (id: string) =>
    fetchAPI(`/team/${id}`, {
      method: 'DELETE',
    }),
};

// Activities API
export const activitiesAPI = {
  // Get activities
  getAll: (limit?: number) =>
    fetchAPI(`/activities${limit ? `?limit=${limit}` : ''}`),

  // Create activity
  create: (data: any) =>
    fetchAPI('/activities', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Notifications API
export const notificationsAPI = {
  // Get user notifications
  getByUser: (userId: string) =>
    fetchAPI(`/notifications?userId=${userId}`),

  // Create notification
  create: (data: any) =>
    fetchAPI('/notifications', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Mark as read
  markAsRead: (id: string) =>
    fetchAPI('/notifications', {
      method: 'PATCH',
      body: JSON.stringify({ id, read: true }),
    }),
};

// Frameworks API
export const frameworksAPI = {
  // Get all frameworks
  getAll: () => fetchAPI('/frameworks'),
};

// Audit Settings API
export const auditSettingsAPI = {
  // Get settings
  get: () => fetchAPI('/audit-settings'),

  // Update settings
  update: (data: any) =>
    fetchAPI('/audit-settings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
