# Quick Start Guide

Get the Audit Portal running in 5 minutes.

## Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud)

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and add your database URL:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### 3. Setup Database
```bash
npm run db:push    # Push schema
npm run db:seed    # Add initial data
```

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Default Login

After seeding, use these credentials:
- **Email:** sarah.johnson@surepass.com
- **Role:** Auditor
- **Password:** temp-password

## Database Options

### Quick Setup (Cloud - Free):

**Supabase** (Recommended):
1. Go to [supabase.com](https://supabase.com)
2. Create project
3. Copy connection string
4. Paste in `.env` as `DATABASE_URL`

**Neon**:
1. Go to [neon.tech](https://neon.tech)
2. Create project
3. Copy connection string
4. Paste in `.env`

### Local PostgreSQL:

**macOS:**
```bash
brew install postgresql
brew services start postgresql
createdb audit_portal
```

**Ubuntu/Debian:**
```bash
sudo apt install postgresql
sudo systemctl start postgresql
sudo -u postgres createdb audit_portal
```

**Windows:**
Download from [postgresql.org](https://www.postgresql.org/download/windows/)

## Common Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run db:push      # Update database schema
npm run db:seed      # Seed database
npx prisma studio    # Open database GUI
```

## Project Structure

```
app/
├── api/              # API routes (backend)
├── dashboard/        # Dashboard page
├── framework/        # Framework controls
├── tasks/            # Task management
└── team/             # Team management

lib/
├── prisma.ts         # Database client
├── store.tsx         # State management
└── types.ts          # TypeScript types

prisma/
├── schema.prisma     # Database schema
└── seed.js           # Seed script
```

## API Endpoints

```
GET  /api/controls?framework=SOC%202%20Type%20II
POST /api/controls
GET  /api/tasks
POST /api/tasks
GET  /api/team
POST /api/team
GET  /api/activities
GET  /api/notifications?userId=123
```

See [API.md](./API.md) for full documentation.

## Deployment

### Vercel (Easiest):
1. Push to GitHub
2. Import in Vercel
3. Add `DATABASE_URL` env var
4. Deploy

### Railway:
1. Connect GitHub repo
2. Add PostgreSQL service
3. Deploy automatically

See [DEPLOYMENT.md](./DEPLOYMENT.md) for more options.

## Troubleshooting

**Database connection error:**
- Check `DATABASE_URL` in `.env`
- Verify database is running
- Test: `npx prisma db push`

**Port 3000 already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
```

**Build errors:**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## Next Steps

1. ✅ Complete this quick start
2. 📖 Read [README.md](./README.md) for details
3. 🔌 Review [API.md](./API.md) for API docs
4. 🚀 Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment
5. 🔄 See [MIGRATION.md](./MIGRATION.md) to migrate from localStorage

## Support

- 📧 Email: support@surepass.com
- 🐛 Issues: GitHub Issues
- 📚 Docs: See markdown files in root

## Features

- ✅ Framework management (SOC 2, ISO 27001, HIPAA, PCI-DSS, GDPR)
- ✅ Control tracking with status updates
- ✅ Task assignment and management
- ✅ Team member management
- ✅ Activity logging
- ✅ Real-time dashboard metrics
- ✅ Evidence management
- ✅ Notifications system

---

**Ready to build?** Run `npm run dev` and start coding! 🚀
