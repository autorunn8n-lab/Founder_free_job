import { isCronAuthorized } from "@/server/cron";

// ADAPTER STUB: closes jobs/projects past closing date once Phase 3 lands.
export function GET(request: Request) {
  if (!isCronAuthorized(request)) return new Response("Unauthorized", { status: 401 });
  return Response.json({ ok: true, job: "expire-listings", processed: 0 });
}
