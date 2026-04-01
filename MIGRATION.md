# Migration Guide: localStorage to Database

This guide helps you migrate from the current localStorage-based state management to the PostgreSQL database backend.

## Overview

The application currently stores all data in browser localStorage. This migration will:
1. Set up PostgreSQL database
2. Migrate existing data to database
3. Update frontend to use API routes
4. Remove localStorage dependencies

## Phase 1: Database Setup (Completed ✓)

The following has been completed:
- ✓ Prisma schema created
- ✓ API routes implemented
- ✓ Database seed script created
- ✓ Prisma client configured

## Phase 2: Install Dependencies

```bash
npm install
```

This will install:
- `@prisma/client` - Prisma ORM client
- `prisma` - Prisma CLI (dev dependency)

## Phase 3: Database Setup

### Option A: Local PostgreSQL

1. **Install PostgreSQL** (if not already installed):
   ```bash
   # macOS
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   
   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create database**:
   ```bash
   psql postgres
   CREATE DATABASE audit_portal;
   \q
   ```

3. **Create .env file**:
   ```bash
   cp .env.example .env
   ```

4. **Update DATABASE_URL in .env**:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/audit_portal?schema=public"
   ```

### Option B: Cloud Database (Recommended for Production)

Use one of these providers:

**Supabase (Free tier available)**:
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string from Settings → Database
4. Add to .env as DATABASE_URL

**Neon (Serverless Postgres)**:
1. Go to [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Add to .env as DATABASE_URL

**Railway**:
1. Go to [railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Copy DATABASE_URL from Variables tab
4. Add to .env

## Phase 4: Push Schema and Seed Data

```bash
# Push schema to database
npm run db:push

# Seed with initial data
npm run db:seed
```

This creates:
- 5 frameworks (SOC 2, ISO 27001, HIPAA, PCI-DSS, GDPR)
- 5 default users
- Sample controls for SOC 2
- Sample activities and notifications

## Phase 5: Update Frontend Components

The following components need to be updated to use API routes instead of localStorage:

### 5.1 Update Dashboard (`app/dashboard/page.tsx`)

Replace localStorage data fetching with API calls:

```typescript
// Add at top
import { useEffect, useState } from 'react';

// Replace useAppState with API calls
const [controls, setControls] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch('/api/controls?framework=SOC 2 Type II');
      const data = await res.json();
      setControls(data);
    } catch (error) {
      console.error('Error fetching controls:', error);
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);
```

### 5.2 Update Framework Page (`app/framework/page.tsx`)

Update control status changes to use API:

```typescript
const handleStatusChange = async (controlId: string, newStatus: string) => {
  try {
    await fetch('/api/controls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        frameworkName: selectedFramework,
        controlId,
        status: newStatus,
      }),
    });
    // Refresh controls
    fetchControls();
  } catch (error) {
    console.error('Error updating control:', error);
  }
};
```

### 5.3 Update Tasks Page (`app/tasks/page.tsx`)

Replace task management with API calls:

```typescript
// Fetch tasks
const fetchTasks = async () => {
  const res = await fetch('/api/tasks');
  const data = await res.json();
  setTasks(data);
};

// Create task
const createTask = async (taskData) => {
  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  fetchTasks();
};

// Update task
const updateTask = async (id, updates) => {
  await fetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  fetchTasks();
};

// Delete task
const deleteTask = async (id) => {
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  fetchTasks();
};
```

### 5.4 Update Team Page (`app/team/page.tsx`)

Replace team management with API calls:

```typescript
// Fetch team
const fetchTeam = async () => {
  const res = await fetch('/api/team');
  const data = await res.json();
  setTeamMembers(data);
};

// Add member
const addMember = async (memberData) => {
  await fetch('/api/team', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(memberData),
  });
  fetchTeam();
};

// Update member
const updateMember = async (id, updates) => {
  await fetch(`/api/team/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  fetchTeam();
};

// Delete member
const deleteMember = async (id) => {
  await fetch(`/api/team/${id}`, { method: 'DELETE' });
  fetchTeam();
};
```

### 5.5 Update Activity Log (`app/activity/page.tsx`)

Fetch activities from API:

```typescript
const [activities, setActivities] = useState([]);

useEffect(() => {
  async function fetchActivities() {
    const res = await fetch('/api/activities?limit=50');
    const data = await res.json();
    setActivities(data);
  }
  fetchActivities();
}, []);
```

## Phase 6: Remove localStorage Dependencies

After migrating all components to use API routes:

1. **Update `lib/store.tsx`**:
   - Remove localStorage save/load logic
   - Keep only framework selection state (UI state)
   - Remove data management functions

2. **Test thoroughly**:
   - Create/update/delete controls
   - Create/update/delete tasks
   - Create/update/delete team members
   - Verify all data persists after page refresh

## Phase 7: Testing Checklist

- [ ] Database connection works
- [ ] Controls load from database
- [ ] Control status updates persist
- [ ] Tasks CRUD operations work
- [ ] Team member CRUD operations work
- [ ] Activities are logged
- [ ] Notifications work
- [ ] Framework switching works
- [ ] Data persists after browser refresh
- [ ] No console errors

## Phase 8: Data Migration Script (Optional)

If you have existing data in localStorage you want to migrate:

```typescript
// scripts/migrate-localstorage.ts
import { prisma } from '../lib/prisma';

async function migrateLocalStorageData() {
  // Get data from localStorage
  const localData = JSON.parse(localStorage.getItem('auditPortalData') || '{}');
  
  // Migrate controls
  for (const [controlId, status] of Object.entries(localData.controlStatuses)) {
    await prisma.control.update({
      where: { id: controlId },
      data: { status: status as string },
    });
  }
  
  // Migrate tasks
  for (const task of localData.remediationTasks || []) {
    await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        controlId: task.controlId,
        assignedToId: task.assignedTo, // Map to user ID
        dueDate: new Date(task.dueDate),
        notes: task.notes,
      },
    });
  }
  
  console.log('Migration complete!');
}

migrateLocalStorageData();
```

## Rollback Plan

If you need to rollback to localStorage:

1. Keep the old `lib/store.tsx` backed up
2. Revert component changes
3. Clear database: `npx prisma db push --force-reset`

## Performance Considerations

1. **Caching**: Implement React Query or SWR for data caching
2. **Pagination**: Add pagination for large datasets
3. **Optimistic Updates**: Update UI before API response
4. **Loading States**: Show loading indicators during API calls
5. **Error Handling**: Implement proper error handling and retry logic

## Next Steps

After migration:

1. **Authentication**: Implement NextAuth.js for user authentication
2. **Authorization**: Add role-based access control
3. **File Upload**: Implement evidence file upload (S3, Cloudinary)
4. **Real-time Updates**: Add WebSocket support for live updates
5. **Email Notifications**: Send email notifications for important events
6. **Audit Trail**: Enhanced audit logging with user tracking
7. **Reporting**: Generate PDF reports from database data

## Support

If you encounter issues during migration:
- Check database connection
- Verify API routes are working: `curl http://localhost:3000/api/controls?framework=SOC%202%20Type%20II`
- Check Prisma Studio: `npx prisma studio`
- Review server logs for errors
- Open an issue on GitHub

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
