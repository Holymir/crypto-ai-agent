# Deployment Guide - SentiFi AI

## Overview
This guide explains how to deploy your advanced crypto intelligence platform to production. We'll cover multiple deployment options with step-by-step instructions.

---

## Architecture Overview

Your application has 3 main components:
1. **Backend API** (Node.js + Express + Prisma)
2. **Frontend** (React + Vite)
3. **Database** (SQLite - will need to upgrade for production)

---

## Deployment Options Comparison

### Option 1: Railway (Recommended - Easiest)
**Best for:** Quick deployment, hobby projects, startups
- ✅ Deploy both frontend & backend on one platform
- ✅ Built-in PostgreSQL database
- ✅ Automatic deployments from GitHub
- ✅ Free tier: $5 credit/month (enough for testing)
- ✅ Very simple setup
- ❌ Can get expensive as you scale

**Pricing:**
- Free: $5 credit/month
- Pro: $20/month + usage

### Option 2: Vercel + Railway/Render
**Best for:** Production applications
- ✅ Frontend on Vercel (best React hosting)
- ✅ Backend on Railway or Render
- ✅ Separate scaling for frontend/backend
- ✅ Vercel has generous free tier
- ❌ Requires configuring CORS
- ❌ Two platforms to manage

**Pricing:**
- Vercel: Free for hobby projects
- Railway/Render: $5-20/month

### Option 3: AWS (Advanced)
**Best for:** Enterprise, high-traffic applications
- ✅ Most scalable
- ✅ Full control
- ✅ Many services available
- ❌ Complex setup
- ❌ Steeper learning curve
- ❌ Can be expensive if not configured properly

**Pricing:**
- Highly variable, $10-50+/month typical

### Option 4: VPS (DigitalOcean, Linode, Hetzner)
**Best for:** Full control, cost-effective at scale
- ✅ Full server control
- ✅ Predictable pricing
- ✅ Can run everything on one server
- ❌ Requires manual server management
- ❌ Need to handle security, updates, backups

**Pricing:**
- $5-20/month depending on specs

---

## 🌟 RECOMMENDED APPROACH: Railway (Full Stack)

This is the easiest and fastest way to get your app live. Railway can host both your frontend and backend.

### Why Railway?
- One platform for everything
- Automatic GitHub deployments
- Built-in database
- Easy environment variable management
- Great for MVPs and testing

---

## Step-by-Step Deployment Plan

## Phase 1: Preparation (Before Deploying)

### 1. Database Migration (SQLite → PostgreSQL)

**Why?** SQLite is file-based and doesn't work well in cloud environments. PostgreSQL is production-ready.

#### Update Prisma Schema

**File:** `prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

#### Update Dependencies

**File:** `package.json`

```json
{
  "dependencies": {
    "@prisma/client": "^6.17.0",
    "prisma": "^6.17.0"
    // Remove sqlite3 if present
  }
}
```

### 2. Environment Variables Setup

Create production environment variables:

**Backend (.env):**
```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Server
PORT=3001
NODE_ENV=production

# CORS
FRONTEND_URL=https://your-frontend-url.com
```

**Frontend (.env):**
```env
VITE_API_URL=https://your-backend-api.com
```

### 3. Update Frontend API Configuration

**File:** `frontend/src/lib/api.js`

```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 4. Update Backend CORS

**File:** `backend/src/app.js`

```javascript
const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
```

### 5. Add Production Scripts

**File:** `backend/package.json`

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "migrate": "prisma migrate deploy",
    "seed": "node scripts/seed.js"
  }
}
```

---

## Phase 2: Railway Deployment (Recommended)

### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Verify your account

### Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your `crypto-ai-agent` repository
4. Railway will detect it's a Node.js app

### Step 3: Add PostgreSQL Database

1. In your Railway project, click **"New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will create and provision a PostgreSQL instance
4. Copy the `DATABASE_URL` from the PostgreSQL service

### Step 4: Configure Backend Service

1. Click on your backend service
2. Go to **"Variables"** tab
3. Add environment variables:
   ```
   DATABASE_URL=postgresql://... (from PostgreSQL service)
   OPENAI_API_KEY=your_key_here
   NODE_ENV=production
   PORT=3001
   ```

### Step 5: Configure Build Settings

1. In backend service, go to **"Settings"**
2. Set **Root Directory**: `./` (or leave empty)
3. Set **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
4. Set **Start Command**: `npm run server`
5. Enable **Auto Deploy** from main branch

### Step 6: Deploy Frontend

#### Option A: Frontend on Railway (Easier)

1. Click **"New"** → **"GitHub Repo"**
2. Select same repo but configure for frontend:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: Leave empty (static)
3. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-railway-url.railway.app
   ```

#### Option B: Frontend on Vercel (Recommended for production)

See "Option 2: Vercel Frontend" section below.

### Step 7: Run Database Migration

1. In Railway backend service, click **"Deploy Logs"**
2. Migrations should run automatically during build
3. Or manually run via Railway CLI:
   ```bash
   railway run npx prisma migrate deploy
   ```

### Step 8: Test Your Deployment

1. Railway provides URLs for your services
2. Backend: `https://your-app.railway.app`
3. Frontend: `https://your-frontend.railway.app`
4. Test all functionality

---

## Option 2: Vercel (Frontend) + Railway (Backend)

This is the best option for production as Vercel is optimized for React apps.

### Deploy Backend to Railway

Follow steps 1-5 from Phase 2 above.

### Deploy Frontend to Vercel

#### Step 1: Prepare Frontend

**File:** `frontend/vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 5173,
  },
})
```

#### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Install Vercel for GitHub

#### Step 3: Deploy Frontend

1. Click **"Add New Project"**
2. Import `crypto-ai-agent` repository
3. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Step 4: Add Environment Variables

In Vercel project settings:
```
VITE_API_URL=https://your-backend.railway.app
```

#### Step 5: Deploy

1. Click **"Deploy"**
2. Vercel will build and deploy
3. You'll get a URL like: `https://your-app.vercel.app`

#### Step 6: Update Backend CORS

Update Railway backend environment variable:
```
FRONTEND_URL=https://your-app.vercel.app
```

#### Step 7: Custom Domain (Optional)

1. In Vercel, go to **"Settings"** → **"Domains"**
2. Add your custom domain
3. Update DNS records as instructed
4. Enable automatic HTTPS

---

## Option 3: DigitalOcean VPS (Full Control)

This option gives you complete control but requires more setup.

### Step 1: Create Droplet

1. Go to [digitalocean.com](https://digitalocean.com)
2. Create new Droplet:
   - **OS**: Ubuntu 22.04 LTS
   - **Plan**: Basic $6/month (2GB RAM)
   - **Datacenter**: Closest to your users
   - **Authentication**: SSH Key (recommended)

### Step 2: Initial Server Setup

```bash
# SSH into your server
ssh root@your_server_ip

# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Nginx
apt install -y nginx

# Install PM2 (Process Manager)
npm install -g pm2
```

### Step 3: Setup PostgreSQL

```bash
# Switch to postgres user
sudo -i -u postgres

# Create database and user
createdb crypto_ai_agent
createuser crypto_user
psql

# In psql:
ALTER USER crypto_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE crypto_ai_agent TO crypto_user;
\q
exit
```

### Step 4: Deploy Application

```bash
# Create app directory
mkdir -p /var/www/crypto-ai-agent
cd /var/www/crypto-ai-agent

# Clone repository
git clone https://github.com/yourusername/crypto-ai-agent.git .

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
npm run build
cd ..

# Setup environment variables
nano .env
# Add your DATABASE_URL, OPENAI_API_KEY, etc.

# Run migrations
npx prisma migrate deploy

# Start backend with PM2
pm2 start backend/src/server.js --name crypto-backend
pm2 startup
pm2 save
```

### Step 5: Configure Nginx

```bash
nano /etc/nginx/sites-available/crypto-ai-agent
```

**Nginx configuration:**

```nginx
server {
    listen 80;
    server_name your_domain.com;

    # Frontend
    location / {
        root /var/www/crypto-ai-agent/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/crypto-ai-agent /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 6: Setup SSL with Let's Encrypt

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your_domain.com
```

### Step 7: Setup Automatic Deployments

Create deploy script:

```bash
nano /var/www/crypto-ai-agent/deploy.sh
```

```bash
#!/bin/bash
cd /var/www/crypto-ai-agent
git pull origin main
npm install
cd frontend
npm install
npm run build
cd ..
npx prisma migrate deploy
pm2 restart crypto-backend
```

```bash
chmod +x deploy.sh
```

---

## Phase 3: Post-Deployment

### 1. Monitor Your Application

#### Railway
- Built-in metrics and logs
- View in Railway dashboard

#### PM2 (VPS)
```bash
pm2 monit
pm2 logs crypto-backend
```

### 2. Setup Error Tracking

Add Sentry (optional but recommended):

```bash
npm install @sentry/node
```

**File:** `backend/src/app.js`

```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "your_sentry_dsn",
  environment: process.env.NODE_ENV,
});
```

### 3. Setup Uptime Monitoring

Use services like:
- [UptimeRobot](https://uptimerobot.com) (Free)
- [Pingdom](https://www.pingdom.com)
- [BetterUptime](https://betterstack.com/uptime)

### 4. Database Backups

#### Railway
- Automatic daily backups included
- Manual backup: Use Railway CLI

#### VPS PostgreSQL
```bash
# Create backup script
nano /root/backup-db.sh
```

```bash
#!/bin/bash
pg_dump crypto_ai_agent > /backups/db-$(date +%Y%m%d).sql
# Upload to S3 or backup service
```

```bash
# Add to crontab
crontab -e
# Add: 0 2 * * * /root/backup-db.sh
```

### 5. Environment Checklist

- [ ] All environment variables set
- [ ] Database migrations run
- [ ] CORS configured correctly
- [ ] HTTPS/SSL enabled
- [ ] Error tracking setup
- [ ] Monitoring setup
- [ ] Backups configured
- [ ] DNS configured (if custom domain)

---

## Troubleshooting Common Issues

### Issue: CORS Errors

**Solution:**
```javascript
// backend/src/app.js
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
```

### Issue: Database Connection Fails

**Solution:**
- Check DATABASE_URL format
- Verify PostgreSQL is running
- Check SSL settings for hosted databases
- Add `?sslmode=require` to connection string if needed

### Issue: Build Fails on Railway

**Solution:**
- Check Node version matches local (use `.nvmrc`)
- Verify all dependencies are in package.json
- Check build logs for specific errors
- Make sure `prisma generate` runs before build

### Issue: Environment Variables Not Loading

**Solution:**
- Restart services after adding variables
- Use correct prefix for Vite (`VITE_`)
- Check for typos in variable names
- Verify variables are set in correct service

---

## Cost Breakdown

### Budget Option (~$5-10/month)
- Railway Free Tier: $5 credit/month
- Custom domain: $10-15/year
- **Total: ~$5-10/month**

### Recommended Option (~$20-30/month)
- Railway Pro: $20/month
- Vercel Free tier
- Custom domain: $10-15/year
- **Total: ~$20-30/month**

### VPS Option (~$10-20/month)
- DigitalOcean Droplet: $6-12/month
- Backups: $1-2/month
- Domain: $10-15/year
- **Total: ~$10-20/month**

---

## Performance Optimization

### 1. Frontend Optimization
- Enable Vite build optimizations
- Add compression
- Use CDN for assets
- Implement code splitting

### 2. Backend Optimization
- Add Redis caching
- Enable compression middleware
- Optimize database queries
- Add connection pooling

### 3. Database Optimization
- Add indexes on frequently queried fields
- Regular VACUUM on PostgreSQL
- Monitor slow queries

---

## Security Checklist

- [ ] All secrets in environment variables (never in code)
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting on API endpoints
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (Prisma helps with this)
- [ ] Regular dependency updates
- [ ] API key rotation schedule
- [ ] Database backups encrypted
- [ ] Server firewall configured (if VPS)

---

## Recommended Deployment: Railway

For your project, I recommend starting with Railway because:

1. **Easiest Setup** - 15 minutes to deploy
2. **All-in-One** - Database, backend, frontend in one platform
3. **Automatic Deployments** - Push to GitHub = auto deploy
4. **Affordable** - $5 credit gets you started
5. **Scalable** - Easy to upgrade as you grow

### Quick Start Commands

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to existing project
railway link

# Add PostgreSQL
railway add

# Deploy
railway up
```

---

## Next Steps After Deployment

1. Test all features thoroughly
2. Set up monitoring and alerts
3. Share with users and get feedback
4. Monitor costs and usage
5. Implement features from ROADMAP.md
6. Consider adding authentication
7. Set up analytics

---

## Support Resources

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **DigitalOcean Tutorials**: https://www.digitalocean.com/community/tutorials

---

*Last Updated: 2025-10-13*
