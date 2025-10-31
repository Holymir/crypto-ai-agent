# PostgreSQL Local Setup Guide

## Why PostgreSQL for Local Development?

Using PostgreSQL locally (same as production) eliminates migration issues and ensures consistency across environments. No more SQLite vs PostgreSQL differences!

## Quick Start (Recommended)

### 1. Start Docker Desktop
Make sure Docker Desktop is running on your Windows machine.

### 2. Start PostgreSQL using Docker Compose

We already have a `docker-compose.yml` file configured. Simply run:

```bash
npm run docker:up
```

This will:
- Start PostgreSQL 15 in a Docker container
- Create database: `crypto_ai_agent`
- Username: `postgres`
- Password: `postgres`
- Port: `5432`
- Persist data in a Docker volume

### 3. Run Migrations

After PostgreSQL starts, apply all migrations:

```bash
npm run prisma:migrate
```

This will:
- Create a new migration for renaming `bullishValue` to `sentimentScore`
- Apply all migrations to your database
- Generate the Prisma Client

### 4. Start Your Application

```bash
npm run dev
```

## Available NPM Scripts

### Docker Management
- `npm run docker:up` - Start PostgreSQL container
- `npm run docker:down` - Stop PostgreSQL container
- `npm run docker:logs` - View PostgreSQL logs

### Prisma Commands
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Create and apply migrations
- `npm run prisma:deploy` - Apply migrations (production)
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run prisma:reset` - Reset database (WARNING: deletes all data)

## Verifying Setup

### Check if PostgreSQL is running:
```bash
docker ps
```

You should see `crypto-ai-postgres` container with status "Up".

### View database logs:
```bash
npm run docker:logs
```

### Access PostgreSQL shell:
```bash
docker exec -it crypto-ai-postgres psql -U postgres -d crypto_ai_agent
```

Common commands in psql:
- `\dt` - List all tables
- `\d articles` - Describe articles table
- `SELECT * FROM articles LIMIT 5;` - View articles
- `\q` - Quit

## Troubleshooting

### Port 5432 already in use?
Another PostgreSQL instance might be running. Either:
1. Stop the other instance
2. Change the port in `docker-compose.yml` (e.g., `"5433:5432"`)

### Migration errors?
Reset and re-run migrations:
```bash
npm run prisma:reset
npm run prisma:migrate
```

### Database connection issues?
1. Ensure Docker Desktop is running
2. Check container status: `docker ps`
3. View logs: `npm run docker:logs`
4. Verify `.env` has correct DATABASE_URL

## Data Persistence

Your data is stored in a Docker volume named `postgres_data`. This persists even when you stop the container.

To completely remove data:
```bash
npm run docker:down
docker volume rm crypto-ai-agent_postgres_data
```

## Migration from SQLite

If you have existing SQLite data and want to migrate:

1. Export data from SQLite (use a tool like DB Browser for SQLite)
2. Start PostgreSQL: `npm run docker:up`
3. Run migrations: `npm run prisma:migrate`
4. Import data into PostgreSQL

## Using Prisma Studio

Prisma Studio is a visual database browser:

```bash
npm run prisma:studio
```

This opens a GUI at `http://localhost:5555` where you can:
- View all tables
- Browse and edit data
- Run queries

## Daily Workflow

### Starting work:
```bash
npm run docker:up
npm run dev
```

### Stopping work:
```bash
# Stop your app with Ctrl+C
npm run docker:down
```

The container and data persist, so you can restart anytime without losing data.
