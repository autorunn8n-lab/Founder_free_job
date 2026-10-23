import { isCronAuthorized } from "@/server/cron";

// ADAPTER STUB: saved-search and reminder digests arrive with Phase 2.
export function GET(request: Request) {
  if (!isCronAuthorized(request)) return new Response("Unauthorized", { status: 401 });
  return Response.json({ ok: true, job: "digests", processed: 0 });
}
