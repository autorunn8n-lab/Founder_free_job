# Implementation status

## Phase 0 — Foundation

| Item | Status |
|---|---|
| Next.js scaffold, strict TS, Tailwind | done |
| Brand config (`src/config/brand.ts`) | done |
| Env validation (`src/env.ts`), optional integrations degrade cleanly | done |
| Drizzle schema, core subset (users, roles, profiles, companies, jobs, applications, projects, proposals, posts, audit_logs) | partial: ~20% of the full data model |
| `can()` policy layer + unit tests | done for company and staff rules |
| Landing page, `/api/health`, cron routes with `CRON_SECRET` check | done |
| `/login`, `/signup` | stub (Phase 1) |
| Cron job bodies | stub |
| App shell (sidebar / mobile nav) + placeholder pages | done (no auth gate yet) |
| CI workflow | done (lint, typecheck, test, build, audit); Playwright and seed script not started |
| ROLE_PERMISSIONS doc | done; ARCHITECTURE, DATA_MODEL, SECURITY, TEST_PLAN, DEPLOYMENT not started |

## Not built (later phases)
Auth, onboarding, profiles, feed, search, jobs flow, projects flow, workspace, messaging, moderation, promotion, hardening.
