# API Documentation

Complete API reference for the Audit Portal backend.

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

Currently, the API does not require authentication. In production, implement NextAuth.js or similar.

## Response Format

All API responses follow this format:

### Success Response
```json
{
  "data": { ... },
  "status": 200
}
```

### Error Response
```json
{
  "error": "Error message",
  "status": 400|404|500
}
```

---

## Controls

### Get All Controls for Framework

```http
GET /api/controls?framework={frameworkName}
```

**Query Parameters:**
- `framework` (required): Framework name (e.g., "SOC 2 Type II", "ISO 27001")

**Response:**
```json
[
  {
    "id": "clx123...",
    "controlId": "CC1.1",
    "name": "Control Environment",
    "description": "...",
    "frameworkId": "clx456...",
    "owner": "John Doe",
    "status": "passing",
    "riskLevel": "high",
    "dueDate": "2025-12-31T00:00:00.000Z",
    "lastUpdated": "2025-03-07T10:00:00.000Z",
    "completed": true,
    "comments": [...],
    "evidence": [...],
    "policies": [...]
  }
]
```

### Update Control

```http
POST /api/controls
```

**Request Body:**
```json
{
  "frameworkName": "SOC 2 Type II",
  "controlId": "CC1.1",
  "status": "passing",
  "completed": true,
  "comment": "Control implemented successfully"
}
```

**Response:**
```json
{
  "id": "clx123...",
  "controlId": "CC1.1",
  "status": "passing",
  "completed": true,
  ...
}
```

### Get Single Control

```http
GET /api/controls/{id}
```

**Response:**
```json
{
  "id": "clx123...",
  "controlId": "CC1.1",
  "name": "Control Environment",
  "framework": {
    "id": "clx456...",
    "name": "SOC 2 Type II"
  },
  "comments": [
    {
      "id": "clx789...",
      "content": "Review completed",
      "createdBy": "John Doe",
      "createdAt": "2025-03-07T10:00:00.000Z"
    }
  ],
  "evidence": [...],
  "policies": [...]
}
```

### Update Control Details

```http
PATCH /api/controls/{id}
```

**Request Body:**
```json
{
  "status": "in_review",
  "completed": false,
  "owner": "Jane Smith",
  "riskLevel": "medium",
  "dueDate": "2025-12-31"
}
```

---

## Tasks

### Get All Tasks

```http
GET /api/tasks
```

**Response:**
```json
[
  {
    "id": "clx123...",
    "title": "Review access controls",
    "description": "Complete review of all access controls",
    "priority": "high",
    "status": "in_progress",
    "controlId": "CC1.1",
    "dueDate": "2025-03-15T00:00:00.000Z",
    "notes": "Requires manager approval",
    "assignedTo": {
      "id": "clx456...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "auditor"
    },
    "createdAt": "2025-03-01T00:00:00.000Z"
  }
]
```

### Create Task

```http
POST /api/tasks
```

**Request Body:**
```json
{
  "title": "Review access controls",
  "description": "Complete review of all access controls",
  "priority": "high",
  "controlId": "CC1.1",
  "assignedToId": "clx456...",
  "dueDate": "2025-03-15",
  "notes": "Requires manager approval"
}
```

**Response:** Created task object (201 status)

### Update Task

```http
PATCH /api/tasks/{id}
```

**Request Body:**
```json
{
  "status": "completed",
  "priority": "medium",
  "notes": "Task completed successfully"
}
```

### Delete Task

```http
DELETE /api/tasks/{id}
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

---

## Team Members

### Get All Team Members

```http
GET /api/team
```

**Response:**
```json
[
  {
    "id": "clx123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "auditor",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "teamMemberships": [
      {
        "id": "clx456...",
        "department": "Audit",
        "assignedControls": ["CC1.1", "CC1.2"],
        "joinedDate": "2025-01-01T00:00:00.000Z"
      }
    ]
  }
]
```

### Create Team Member

```http
POST /api/team
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "compliance",
  "department": "Compliance",
  "assignedControls": ["CC2.1", "CC2.2"]
}
```

**Response:** Created user object (201 status)

### Update Team Member

```http
PATCH /api/team/{id}
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "role": "admin",
  "department": "Management",
  "assignedControls": ["CC1.1", "CC2.1"]
}
```

### Delete Team Member

```http
DELETE /api/team/{id}
```

**Response:**
```json
{
  "message": "Team member deleted successfully"
}
```

---

## Activities

### Get Activity Log

```http
GET /api/activities?limit={number}
```

**Query Parameters:**
- `limit` (optional): Number of activities to return (default: 50)

**Response:**
```json
[
  {
    "id": "clx123...",
    "action": "Status Updated",
    "details": "Control status changed to passing",
    "controlId": "clx456...",
    "changes": "Status: pending → passing",
    "timestamp": "2025-03-07T10:00:00.000Z",
    "user": {
      "id": "clx789...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "auditor"
    },
    "control": {
      "id": "clx456...",
      "controlId": "CC1.1",
      "name": "Control Environment"
    }
  }
]
```

### Create Activity

```http
POST /api/activities
```

**Request Body:**
```json
{
  "action": "Evidence Uploaded",
  "details": "New evidence document added",
  "controlId": "clx456...",
  "userId": "clx789...",
  "changes": "Added: security-policy.pdf"
}
```

**Response:** Created activity object (201 status)

---

## Notifications

### Get User Notifications

```http
GET /api/notifications?userId={userId}
```

**Query Parameters:**
- `userId` (required): User ID to fetch notifications for

**Response:**
```json
[
  {
    "id": "clx123...",
    "title": "Control Review Required",
    "message": "CC1.3 requires your review",
    "type": "info",
    "link": "/framework",
    "read": false,
    "userId": "clx456...",
    "timestamp": "2025-03-07T10:00:00.000Z"
  }
]
```

### Create Notification

```http
POST /api/notifications
```

**Request Body:**
```json
{
  "title": "Task Assigned",
  "message": "You have been assigned a new task",
  "type": "info",
  "userId": "clx456...",
  "link": "/tasks"
}
```

**Response:** Created notification object (201 status)

### Mark Notification as Read

```http
PATCH /api/notifications
```

**Request Body:**
```json
{
  "id": "clx123...",
  "read": true
}
```

---

## Frameworks

### Get All Frameworks

```http
GET /api/frameworks
```

**Response:**
```json
[
  {
    "id": "clx123...",
    "name": "SOC 2 Type II",
    "description": "Service Organization Control 2 Type II",
    "_count": {
      "controls": 50
    },
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

---

## Audit Settings

### Get Audit Settings

```http
GET /api/audit-settings
```

**Response:**
```json
{
  "id": "clx123...",
  "organization": "Surepass Technologies",
  "framework": "SOC 2 Type II",
  "auditPeriodStart": "2025-01-01T00:00:00.000Z",
  "auditPeriodEnd": "2025-12-31T00:00:00.000Z",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

### Update Audit Settings

```http
POST /api/audit-settings
```

**Request Body:**
```json
{
  "organization": "Surepass Technologies",
  "framework": "ISO 27001",
  "auditPeriodStart": "2025-01-01",
  "auditPeriodEnd": "2025-12-31"
}
```

---

## Data Types

### Control Status
- `passing` - Control is compliant
- `failing` - Control is non-compliant
- `pending` - Control not yet reviewed
- `in_review` - Control under review
- `needs_changes` - Control requires changes
- `remediated` - Issues have been fixed
- `closed` - Control is closed

### Task Status
- `open` - Task not started
- `in_progress` - Task in progress
- `completed` - Task completed
- `blocked` - Task is blocked
- `overdue` - Task past due date

### Priority Levels
- `critical` - Highest priority
- `high` - High priority
- `medium` - Medium priority
- `low` - Low priority

### Risk Levels
- `critical` - Critical risk
- `high` - High risk
- `medium` - Medium risk
- `low` - Low risk

### User Roles
- `admin` - Full system access
- `auditor` - Can review and update controls
- `compliance` - Compliance officer
- `manager` - Team manager
- `viewer` - Read-only access

### Notification Types
- `info` - Informational
- `warning` - Warning message
- `error` - Error message
- `success` - Success message

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Pagination

For endpoints returning large datasets, implement pagination:

```http
GET /api/controls?framework=SOC2&page=1&limit=20
```

---

## Filtering & Sorting

Future implementation:

```http
GET /api/controls?framework=SOC2&status=passing&sort=dueDate&order=asc
```

---

## Webhooks (Future)

Webhook events for external integrations:
- `control.updated`
- `task.created`
- `task.completed`
- `evidence.uploaded`

---

## Best Practices

1. **Always validate input** on the server side
2. **Use proper HTTP methods** (GET, POST, PATCH, DELETE)
3. **Handle errors gracefully** with appropriate status codes
4. **Log all API requests** for debugging
5. **Implement authentication** before production
6. **Use HTTPS** in production
7. **Validate user permissions** for each request
8. **Sanitize user input** to prevent SQL injection
9. **Implement rate limiting** to prevent abuse
10. **Version your API** for future changes

---

## Testing

Use tools like:
- **Postman** - API testing and documentation
- **curl** - Command-line testing
- **Thunder Client** - VS Code extension

Example curl request:
```bash
curl -X GET "http://localhost:3000/api/controls?framework=SOC%202%20Type%20II"
```

---

## Support

For API issues or questions:
- Check server logs
- Use Prisma Studio: `npx prisma studio`
- Open an issue on GitHub
- Contact support@surepass.com
