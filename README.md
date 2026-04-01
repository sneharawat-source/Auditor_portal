# Audit Portal - Compliance Management System

A modern, enterprise-grade audit and compliance management portal built with Next.js, Prisma, and PostgreSQL.

## Features

- **Framework Management**: Support for SOC 2, ISO 27001, HIPAA, PCI-DSS, and GDPR
- **Control Tracking**: Comprehensive control management with status tracking
- **Task Assignment**: Assign and track audit tasks across team members
- **Team Management**: Full CRUD operations for team members
- **Activity Logging**: Track all changes and activities
- **Notifications**: Real-time notifications for important events
- **Evidence Management**: Upload and manage compliance evidence
- **Dashboard**: Real-time metrics and insights

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **UI**: Tailwind CSS, Radix UI, Lucide Icons
- **State Management**: React Context API

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or pnpm

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd audit-portal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/audit_portal?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 4. Set up the database

```bash
# Push the schema to your database
npm run db:push

# Seed the database with initial data
npm run db:seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following main models:

- **User**: Team members and their roles
- **Framework**: Compliance frameworks (SOC 2, ISO 27001, etc.)
- **Control**: Individual controls within frameworks
- **Task**: Audit tasks assigned to team members
- **Activity**: Activity log for tracking changes
- **Notification**: User notifications
- **Evidence**: Uploaded compliance evidence
- **Policy**: Policy documents linked to controls
- **Comment**: Comments on controls
- **AuditSettings**: Organization and audit period settings

## API Routes

### Controls
- `GET /api/controls?framework=<name>` - Get all controls for a framework
- `POST /api/controls` - Update control status/comment
- `GET /api/controls/[id]` - Get single control
- `PATCH /api/controls/[id]` - Update control

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

### Team
- `GET /api/team` - Get all team members
- `POST /api/team` - Create team member
- `PATCH /api/team/[id]` - Update team member
- `DELETE /api/team/[id]` - Delete team member

### Activities
- `GET /api/activities?limit=<number>` - Get activity log
- `POST /api/activities` - Create activity

### Notifications
- `GET /api/notifications?userId=<id>` - Get user notifications
- `POST /api/notifications` - Create notification
- `PATCH /api/notifications` - Mark as read

### Frameworks
- `GET /api/frameworks` - Get all frameworks

### Audit Settings
- `GET /api/audit-settings` - Get current settings
- `POST /api/audit-settings` - Update settings

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Railway

1. Create new project in Railway
2. Add PostgreSQL database
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Docker

```bash
# Build image
docker build -t audit-portal .

# Run container
docker run -p 3000:3000 --env-file .env audit-portal
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with initial data

## Default Users (After Seeding)

- **Admin**: michael.chen@surepass.com
- **Auditor**: sarah.johnson@surepass.com
- **Compliance**: emily.rodriguez@surepass.com
- **Manager**: david.martinez@surepass.com
- **Auditor**: rachel.kim@surepass.com

(Password: temp-password - Change in production!)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── framework/         # Framework controls page
│   ├── tasks/             # Tasks page
│   ├── team/              # Team management page
│   └── ...
├── components/            # React components
│   ├── ui/               # UI components (Radix)
│   ├── layout/           # Layout components
│   └── ...
├── lib/                   # Utilities and helpers
│   ├── prisma.ts         # Prisma client
│   ├── store.tsx         # State management
│   ├── types.ts          # TypeScript types
│   └── ...
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Prisma schema
│   └── seed.js           # Database seed script
└── public/               # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@surepass.com or open an issue on GitHub.
