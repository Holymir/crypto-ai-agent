# Database Configuration Guide

This project supports both **SQLite** (local development) and **PostgreSQL** (production) databases.

## Schema Files

- **`prisma/schema.prisma`** - PostgreSQL schema (used in production on Railway)
- **`prisma/schema.sqlite.prisma`** - SQLite schema (used in local development)

## Local Development (SQLite)

### Initial Setup
```bash
# Set DATABASE_URL in .env
DATABASE_URL="file:./dev.db"

# Apply schema to database
npm run prisma:push:local

# Generate Prisma client
npm run prisma:generate:local
```

### Common Commands
```bash
# Push schema changes to SQLite database
npm run prisma:push:local

# Create a migration for SQLite
npm run prisma:migrate:local

# Regenerate Prisma client
npm run prisma:generate:local
```

### Direct Prisma Commands
```bash
# Any Prisma command with SQLite schema
npx prisma <command> --schema=prisma/schema.sqlite.prisma

# Examples:
npx prisma db push --schema=prisma/schema.sqlite.prisma
npx prisma studio --schema=prisma/schema.sqlite.prisma
```

## Production (PostgreSQL)

### Setup on Railway
Railway automatically provides `DATABASE_URL` as an environment variable.

### Common Commands
```bash
# Deploy migrations to production
npm run prisma:deploy

# Generate Prisma client (uses schema.prisma by default)
npm run prisma:generate

# Create a migration
npm run prisma:migrate
```

### Direct Prisma Commands
```bash
# Any Prisma command (uses schema.prisma by default)
npx prisma <command>

# Examples:
npx prisma migrate deploy
npx prisma studio
```

## Important Notes

⚠️ **Schema Synchronization**
- Both schema files must be kept in sync manually
- When you update one, update the other
- The only difference should be the `datasource db { provider }` field

⚠️ **Migrations**
- SQLite and PostgreSQL have different migration files
- Don't mix migration files between databases
- Production uses `prisma migrate deploy` (applies existing migrations)
- Local development can use `prisma db push` (no migration files) or `prisma migrate dev`

## Schema Differences

The schemas are identical except for the datasource:

**PostgreSQL** (`schema.prisma`):
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**SQLite** (`schema.sqlite.prisma`):
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

## Why Two Schema Files?

Prisma doesn't support dynamic `provider` values using `env()`. The workaround is to maintain separate schema files and use the `--schema` flag to specify which one to use.

## Quick Reference

| Environment | Schema File | DATABASE_URL | Command Example |
|------------|------------|--------------|----------------|
| Local | `schema.sqlite.prisma` | `file:./dev.db` | `npm run prisma:push:local` |
| Production | `schema.prisma` | `postgresql://...` | `npm run prisma:deploy` |
