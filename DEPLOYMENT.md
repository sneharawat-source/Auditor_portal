# Deployment Guide

This guide covers deploying the Audit Portal to various platforms.

## Prerequisites

- PostgreSQL database (hosted or managed)
- Environment variables configured
- Code pushed to Git repository

## Option 1: Vercel (Easiest)

Vercel is the recommended platform for Next.js applications.

### Steps:

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Set up PostgreSQL database**:
   - Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
   - Or use [Supabase](https://supabase.com) (free tier available)
   - Or use [Neon](https://neon.tech) (serverless Postgres)

3. **Import your project**:
   - Click "New Project" in Vercel dashboard
   - Import from GitHub/GitLab/Bitbucket
   - Select your repository

4. **Configure environment variables**:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-random-secret-key
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete

6. **Run database migrations**:
   ```bash
   # After first deployment, run from local machine:
   DATABASE_URL="your-production-db-url" npx prisma db push
   DATABASE_URL="your-production-db-url" npm run db:seed
   ```

### Automatic Deployments

Vercel automatically deploys on every push to your main branch.

## Option 2: Railway

Railway provides easy deployment with built-in PostgreSQL.

### Steps:

1. **Create Railway account** at [railway.app](https://railway.app)

2. **Create new project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add PostgreSQL**:
   - Click "New" → "Database" → "PostgreSQL"
   - Railway automatically creates DATABASE_URL

4. **Add environment variables**:
   - Go to your service → Variables
   - Add:
     ```
     NEXTAUTH_URL=${{RAILWAY_PUBLIC_DOMAIN}}
     NEXTAUTH_SECRET=your-random-secret-key
     ```

5. **Deploy**:
   - Railway automatically builds and deploys
   - Get your public URL from the deployment

6. **Run migrations**:
   ```bash
   # Connect to Railway PostgreSQL and run:
   npx prisma db push
   npm run db:seed
   ```

## Option 3: Docker + Any Cloud Provider

Deploy using Docker to AWS, GCP, Azure, DigitalOcean, etc.

### Build Docker Image:

```bash
docker build -t audit-portal .
```

### Run Locally:

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_URL="http://localhost:3000" \
  -e NEXTAUTH_SECRET="your-secret" \
  audit-portal
```

### Push to Container Registry:

```bash
# Docker Hub
docker tag audit-portal your-username/audit-portal
docker push your-username/audit-portal

# AWS ECR
aws ecr get-login-password --region region | docker login --username AWS --password-stdin account-id.dkr.ecr.region.amazonaws.com
docker tag audit-portal account-id.dkr.ecr.region.amazonaws.com/audit-portal
docker push account-id.dkr.ecr.region.amazonaws.com/audit-portal
```

### Deploy to Cloud:

#### AWS ECS/Fargate:
1. Create ECS cluster
2. Create task definition with your image
3. Create service with load balancer
4. Configure environment variables

#### Google Cloud Run:
```bash
gcloud run deploy audit-portal \
  --image your-username/audit-portal \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL="postgresql://..."
```

#### Azure Container Instances:
```bash
az container create \
  --resource-group myResourceGroup \
  --name audit-portal \
  --image your-username/audit-portal \
  --dns-name-label audit-portal \
  --ports 3000 \
  --environment-variables DATABASE_URL="postgresql://..."
```

## Option 4: Traditional VPS (DigitalOcean, Linode, etc.)

### Steps:

1. **Set up server**:
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PostgreSQL
   sudo apt install postgresql postgresql-contrib
   ```

2. **Clone repository**:
   ```bash
   git clone <your-repo-url>
   cd audit-portal
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment**:
   ```bash
   cp .env.example .env
   nano .env  # Edit with your values
   ```

5. **Set up database**:
   ```bash
   npm run db:push
   npm run db:seed
   ```

6. **Build application**:
   ```bash
   npm run build
   ```

7. **Set up PM2 for process management**:
   ```bash
   npm install -g pm2
   pm2 start npm --name "audit-portal" -- start
   pm2 save
   pm2 startup
   ```

8. **Set up Nginx reverse proxy**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

9. **Set up SSL with Let's Encrypt**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Database Providers

### Recommended PostgreSQL Providers:

1. **Vercel Postgres** - Integrated with Vercel
2. **Supabase** - Free tier, great for development
3. **Neon** - Serverless Postgres, auto-scaling
4. **Railway** - Built-in with Railway deployments
5. **AWS RDS** - Enterprise-grade, scalable
6. **DigitalOcean Managed Databases** - Simple, affordable

## Environment Variables

Required environment variables for production:

```env
# Database (Required)
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# App URL (Required)
NEXTAUTH_URL="https://your-production-domain.com"

# Secret Key (Required - Generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-random-secret-key-min-32-chars"

# Optional
NODE_ENV="production"
```

## Post-Deployment Checklist

- [ ] Database is accessible from application
- [ ] Environment variables are set correctly
- [ ] Database schema is pushed (`npx prisma db push`)
- [ ] Database is seeded with initial data (`npm run db:seed`)
- [ ] Application is accessible via HTTPS
- [ ] SSL certificate is configured
- [ ] Monitoring is set up (Vercel Analytics, Sentry, etc.)
- [ ] Backups are configured for database
- [ ] Change default user passwords
- [ ] Test all major features

## Monitoring & Logging

### Vercel:
- Built-in analytics and logging
- Real-time function logs
- Performance insights

### Railway:
- Built-in logs viewer
- Metrics dashboard
- Deployment history

### Self-hosted:
- Use PM2 for logs: `pm2 logs audit-portal`
- Set up log rotation
- Consider tools like Sentry for error tracking

## Scaling Considerations

1. **Database Connection Pooling**: Use Prisma's connection pooling
2. **CDN**: Use Vercel's CDN or Cloudflare
3. **Caching**: Implement Redis for session/data caching
4. **Load Balancing**: Use multiple instances behind load balancer
5. **Database Replicas**: Set up read replicas for heavy read workloads

## Troubleshooting

### Build Fails:
- Check TypeScript errors: `npm run lint`
- Verify all dependencies are installed
- Check Node.js version (18+)

### Database Connection Issues:
- Verify DATABASE_URL format
- Check firewall rules
- Ensure database accepts connections from your host

### Application Crashes:
- Check logs for errors
- Verify environment variables
- Check database connectivity
- Ensure sufficient memory/resources

## Security Best Practices

1. **Change default passwords** immediately after seeding
2. **Use strong NEXTAUTH_SECRET** (min 32 characters)
3. **Enable HTTPS** for all production deployments
4. **Set up database backups** regularly
5. **Implement rate limiting** on API routes
6. **Use environment variables** for all secrets
7. **Keep dependencies updated** regularly
8. **Enable CORS** only for trusted domains
9. **Implement proper authentication** (NextAuth.js recommended)
10. **Regular security audits** with `npm audit`

## Support

For deployment issues:
- Check the [Next.js deployment docs](https://nextjs.org/docs/deployment)
- Check the [Prisma deployment docs](https://www.prisma.io/docs/guides/deployment)
- Open an issue on GitHub
- Contact support@surepass.com
