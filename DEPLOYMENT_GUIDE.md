# Deployment & Development Process Guide

This guide outlines the recommended development and deployment workflow for the Crypto AI Agent project.

## Current Infrastructure

- **Production Domain**: https://sentifi.xyz/
- **Frontend Platform**: Vercel
- **Backend Platform**: Railway
- **Database**: PostgreSQL on Railway

## Branch Strategy

```
main (production) → auto-deploys to sentifi.xyz
├── dev/staging (testing) → auto-deploys to dev.sentifi.xyz
└── feature branches → preview deployments
```

## Environment Architecture

### Production Environment
- **Branch**: `main`
- **Frontend**: https://sentifi.xyz
- **Backend**: https://api.sentifi.xyz (or Railway auto-domain)
- **Database**: Production PostgreSQL instance

### Development Environment
- **Branch**: `dev`
- **Frontend**: https://dev.sentifi.xyz
- **Backend**: https://dev-api.sentifi.xyz
- **Database**: Development PostgreSQL instance (recommended) OR Production DB with read-only access

### Preview Environment (Automatic)
- **Branch**: Any feature branch
- **Frontend**: `https://sentifi-git-{branch-name}.vercel.app`
- **Backend**: Points to dev backend
- **Database**: Development database

## Setup Instructions

### 1. Create Development Branch

```bash
# Create and push dev branch
git checkout -b dev
git push -u origin dev
```

### 2. Configure Subdomains (FREE - No Purchase Needed)

#### Frontend - Vercel Configuration

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add custom domain: `dev.sentifi.xyz`
3. Vercel will provide a CNAME record
4. Go to your domain registrar's DNS settings and add:
   ```
   Type: CNAME
   Name: dev
   Value: cname.vercel-dns.com
   TTL: Auto
   ```
5. In Vercel, assign the `dev` branch to `dev.sentifi.xyz` domain
6. Repeat for production if not already set:
   - Domain: `sentifi.xyz`
   - Branch: `main`

#### Backend - Railway Configuration

1. Go to Railway Dashboard → Your Service → Settings → Domains
2. Click "Generate Domain" or "Custom Domain"
3. For custom domain, add: `dev-api.sentifi.xyz`
4. Railway will provide a target (e.g., `your-app.up.railway.app`)
5. Add CNAME record in your DNS:
   ```
   Type: CNAME
   Name: dev-api
   Value: your-app.up.railway.app
   TTL: Auto
   ```
6. Create a new Railway service for dev environment:
   - Deploy from `dev` branch
   - Configure separate environment variables

For production backend (if not already done):
   - Domain: `api.sentifi.xyz`
   - Branch: `main`

### 3. Set Up Development Database (Recommended)

**Option A: Separate Dev Database (Recommended)**

1. In Railway, add a new PostgreSQL database
2. Name it `postgres-dev`
3. Cost: ~$5-10/month
4. Benefits:
   - Safe testing without production data risk
   - Can test migrations and destructive operations
   - Clean separation of environments

**Option B: Share Production Database (Not Recommended)**

If you must share the production database:
1. Create a read-only database user for dev environment
2. Add environment checks in code to prevent writes
3. Never run migrations from dev
4. Use database connection pooling limits

**Creating Read-Only User (if using Option B):**
```sql
-- Connect to production database
CREATE USER dev_readonly WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE your_db TO dev_readonly;
GRANT USAGE ON SCHEMA public TO dev_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO dev_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO dev_readonly;
```

### 4. Configure Environment Variables

#### Vercel (Frontend)

**Production Environment** (`main` branch):
```env
VITE_API_URL=https://api.sentifi.xyz
VITE_ENVIRONMENT=production
```

**Development Environment** (`dev` branch):
```env
VITE_API_URL=https://dev-api.sentifi.xyz
VITE_ENVIRONMENT=development
```

**Preview Environment** (feature branches):
```env
VITE_API_URL=https://dev-api.sentifi.xyz
VITE_ENVIRONMENT=preview
```

To set these in Vercel:
1. Go to Project Settings → Environment Variables
2. Add each variable
3. Select which environments it applies to (Production, Preview, Development)

#### Railway (Backend)

**Production Service** (from `main` branch):
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/prod_db
PORT=3000
FRONTEND_URL=https://sentifi.xyz
CORS_ORIGIN=https://sentifi.xyz
```

**Development Service** (from `dev` branch):
```env
NODE_ENV=development
DATABASE_URL=postgresql://user:password@host:port/dev_db
PORT=3000
FRONTEND_URL=https://dev.sentifi.xyz
CORS_ORIGIN=https://dev.sentifi.xyz
```

To set these in Railway:
1. Go to your service → Variables
2. Add each variable
3. Deploy separate services for prod and dev with different variables

### 5. Configure Auto-Deployment

#### Vercel Auto-Deployment

1. Go to Project Settings → Git
2. Configure:
   - **Production Branch**: `main` → deploys to `sentifi.xyz`
   - **Branch Deployments**: Enabled for all branches
   - **Ignored Build Step**: Configure if needed

3. Vercel will automatically:
   - Deploy `main` to production domain
   - Deploy `dev` to dev domain (if configured)
   - Create preview URLs for all other branches

#### Railway Auto-Deployment

1. Create two services (or use separate projects):

   **Production Service:**
   - Source: GitHub repository
   - Branch: `main`
   - Auto-deploy: Enabled
   - Domain: `api.sentifi.xyz`

   **Development Service:**
   - Source: Same GitHub repository
   - Branch: `dev`
   - Auto-deploy: Enabled
   - Domain: `dev-api.sentifi.xyz`

2. Configure deployment triggers:
   - Settings → Deployments → Auto-Deploy: On
   - Watch Paths: Configure if you want to deploy only on certain file changes

## Development Workflow

### Feature Development

```bash
# 1. Create feature branch from dev
git checkout dev
git pull origin dev
git checkout -b feature/new-feature

# 2. Make changes and test locally
npm run dev # frontend
npm start   # backend

# 3. Commit and push
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 4. This automatically creates a preview deployment:
#    https://sentifi-git-feature-new-feature.vercel.app
```

### Testing on Development Environment

```bash
# 1. Merge feature into dev branch
git checkout dev
git pull origin dev
git merge feature/new-feature

# 2. Push to dev
git push origin dev

# 3. This auto-deploys to:
#    Frontend: https://dev.sentifi.xyz
#    Backend: https://dev-api.sentifi.xyz

# 4. Test thoroughly on dev environment
```

### Production Deployment

```bash
# 1. After testing on dev, merge to main
git checkout main
git pull origin main
git merge dev

# 2. Push to production
git push origin main

# 3. This auto-deploys to:
#    Frontend: https://sentifi.xyz
#    Backend: https://api.sentifi.xyz

# 4. Monitor deployment and verify production
```

## Database Migrations

### Development Environment

```bash
# Run migrations on dev database
NODE_ENV=development npm run migrate

# Or if using separate Railway service, run in Railway console
```

### Production Environment

```bash
# IMPORTANT: Always test migrations on dev first!

# Run migrations on production database
NODE_ENV=production npm run migrate

# Or run in Railway production service console
```

**Best Practices:**
- Always test migrations on dev database first
- Create rollback scripts for critical migrations
- Backup production database before major migrations
- Run migrations during low-traffic periods

## Rollback Procedures

### Frontend Rollback (Vercel)

1. Go to Vercel Dashboard → Deployments
2. Find the last known good deployment
3. Click "..." → "Promote to Production"
4. Or redeploy from specific commit:
   ```bash
   git checkout main
   git reset --hard <good-commit-hash>
   git push --force origin main
   ```

### Backend Rollback (Railway)

1. Go to Railway Dashboard → Deployments
2. Click on a previous deployment
3. Click "Redeploy"
4. Or redeploy from specific commit:
   ```bash
   git checkout main
   git reset --hard <good-commit-hash>
   git push --force origin main
   ```

### Database Rollback

1. If you have a backup:
   ```bash
   # Restore from backup
   pg_restore -d database_name backup_file.dump
   ```

2. If you have rollback migrations:
   ```bash
   npm run migrate:rollback
   ```

## Monitoring & Logging

### Vercel Logs
- Go to Project → Deployments → Select deployment → View logs
- Real-time logs available in dashboard
- Set up log drains for external monitoring

### Railway Logs
- Go to Service → Deployments → View logs
- Use Railway CLI: `railway logs`
- Set up log aggregation if needed

### Database Monitoring
- Railway Dashboard → Database service → Metrics
- Monitor connection count, CPU, memory usage
- Set up alerts for high usage

## Cost Breakdown

| Item | Cost | Notes |
|------|------|-------|
| Main domain (sentifi.xyz) | Varies | Already owned |
| Subdomains (dev.sentifi.xyz, etc.) | **FREE** | Included with main domain |
| Vercel Frontend (Hobby) | **FREE** | Unlimited preview deployments |
| Vercel Frontend (Pro) | $20/month | If you need more |
| Railway Backend (Free tier) | **FREE** | 500 hours/month, $5 credit |
| Railway Backend (paid) | $5+/month | Pay for usage |
| Production Database | $5-10/month | Depends on size |
| Development Database | $5-10/month | Optional but recommended |
| **Total Minimum** | **$0-10/month** | Using free tiers |
| **Total Recommended** | **$15-30/month** | With dev database |

## Troubleshooting

### Issue: Environment variables not updating

**Solution:**
1. Check if variables are set in correct environment (Production vs Preview vs Development)
2. Trigger a new deployment after changing variables
3. Clear Vercel/Railway cache if needed

### Issue: Subdomain not working

**Solution:**
1. Verify DNS propagation (use https://dnschecker.org)
2. DNS changes can take up to 48 hours
3. Check CNAME record is pointing to correct target
4. Ensure SSL certificate is generated (automatic on Vercel/Railway)

### Issue: Database connection errors on dev

**Solution:**
1. Verify `DATABASE_URL` is correct for dev environment
2. Check database is accessible (not blocked by IP whitelist)
3. Verify database user has correct permissions
4. Check connection pool limits

### Issue: CORS errors between frontend and backend

**Solution:**
1. Verify `CORS_ORIGIN` includes the correct frontend URL
2. Check if both http/https are handled
3. Ensure credentials are allowed if using cookies/auth
4. Update backend CORS configuration

## Security Best Practices

1. **Never commit sensitive data**
   - Use `.env.local` for local development
   - Use platform environment variables for deployments
   - Add `.env*` to `.gitignore`

2. **Database Access**
   - Use different credentials for each environment
   - Limit permissions (read-only for dev if sharing prod DB)
   - Enable SSL connections
   - Whitelist IP addresses if possible

3. **API Keys**
   - Rotate keys periodically
   - Use different keys for prod and dev
   - Never expose keys in frontend code
   - Use backend environment variables only

4. **Domain Security**
   - Enable DNSSEC if available
   - Use SSL/TLS (automatic on Vercel/Railway)
   - Configure CSP headers
   - Enable HSTS

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Git Flow Guide](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Environment Variables Best Practices](https://12factor.net/config)

## Quick Reference Commands

```bash
# Switch to dev environment
git checkout dev
git pull origin dev

# Create new feature
git checkout -b feature/my-feature

# Deploy to dev
git checkout dev
git merge feature/my-feature
git push origin dev

# Deploy to production
git checkout main
git merge dev
git push origin main

# Check deployment status
# Vercel: https://vercel.com/dashboard
# Railway: https://railway.app/dashboard

# View logs
railway logs  # Railway CLI
# Vercel logs: View in dashboard
```

---

**Last Updated**: 2025-10-29
**Maintained By**: Development Team
