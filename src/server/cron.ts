import { env } from "@/env";

/** Vercel Cron sends `Authorization: Bearer $CRON_SECRET`. Fails closed when unset. */
export function isCronAuthorized(request: Request): boolean {
  const secret = env().CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}
