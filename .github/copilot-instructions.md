# Copilot Instructions for Next.js Dashboard

## Project Overview
This is a **Next.js 16 App Router** dashboard application using React 19, TypeScript, Tailwind CSS, and PostgreSQL. It follows the [Next.js Learn Dashboard course](https://nextjs.org/learn) structure.

## Architecture

### Directory Structure
- `app/` - Next.js App Router pages and API routes
- `app/lib/` - Core utilities: data fetching (`data.ts`), types (`definitions.ts`), helpers (`utils.ts`)
- `app/ui/` - Reusable React components organized by feature (`dashboard/`, `invoices/`, `customers/`)
- `app/seed/` and `app/query/` - API route handlers for database operations
- `public/customers/` - Static customer avatar images

### Data Flow Pattern
1. **Server Components** fetch data directly using functions from `app/lib/data.ts`
2. Data functions use the `postgres` library with tagged template literals for SQL queries
3. Types are defined manually in `app/lib/definitions.ts` (not ORM-generated)
4. Currency amounts are stored in **cents** (integers) and formatted via `formatCurrency()` in `utils.ts`

## Development Commands
```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm start        # Start production server
```

## Key Conventions

### Database & Data Fetching
- Use `postgres` tagged templates for SQL: `` sql`SELECT * FROM table` ``
- All queries include try/catch with console.error and user-friendly error messages
- Parallel data fetching with `Promise.all()` for independent queries (see `fetchCardData()`)
- Pagination uses `ITEMS_PER_PAGE = 6` constant in `data.ts`

### Styling
- **Tailwind CSS** with `@tailwindcss/forms` plugin
- Use `clsx` for conditional class names
- Custom colors defined in `tailwind.config.ts`: `blue-400`, `blue-500`, `blue-600`
- Shimmer animation for loading skeletons (see `skeletons.tsx`)

### Component Patterns
- **Icons**: Use `@heroicons/react/24/outline` - import specific icons, apply `w-6` or `h-[18px]` sizing
- **Fonts**: Inter (body) and Lusitana (headings) via `next/font/google` - exported from `app/ui/fonts.ts`
- **Client components**: Mark with `'use client'` only when needed (hooks, browser APIs)
- **Path aliases**: Use `@/app/` for imports (configured in tsconfig)

### Form & Status Patterns
- Invoice status is a union type: `'pending' | 'paid'`
- Use Zod (`zod`) for form validation
- `use-debounce` for search input handling

## Database Schema (PostgreSQL)
Core tables: `users`, `customers`, `invoices`, `revenue`
- IDs are UUIDs (using `uuid-ossp` extension)
- Seed database via GET request to `/seed` route

## Environment Variables
Required: `POSTGRES_URL` - PostgreSQL connection string with SSL

## Authentication
Uses `next-auth@5.0.0-beta.30` with `bcrypt` for password hashing.
