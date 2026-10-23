# Decisions and assumptions

- **Stack:** Next.js (App Router, `src/`), TypeScript strict, Tailwind, Drizzle + Neon Postgres, deployed on Vercel. Package manager is npm because pnpm is not installed on the build machine.
- **Region:** `bom1` (Mumbai) for functions; pick the matching Neon region (`aws-ap-south-1`).
- **IDs:** `gen_random_uuid()` (UUID v4) for now. UUID v7 needs an app-side generator; revisit before Phase 1 migrations ship.
- **Auth:** Better Auth is planned for Phase 1. Not wired yet because it needs a database.
- **Database:** Neon via Vercel Marketplace (chosen by the founder). The app boots without `DATABASE_URL`; `/api/health` reports `database: false`.
- **Confidentiality:** all pages send `noindex`. Turn on Vercel Deployment Protection for previews and production before sharing the URL.
- **Hosting plan:** Vercel Hobby is non-commercial and only allows daily cron runs, so `expire-listings` runs daily (`0 1 * * *`) for now. Move to Pro before launch and restore the hourly schedule.
- **Payments, SMS, real email:** off. No real side effects.
- **Deploy path:** the Vercel connector in this environment could not access the team, so deployment goes through GitHub import in the Vercel dashboard.
