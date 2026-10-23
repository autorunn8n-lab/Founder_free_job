import { connection } from "next/server";
import { features } from "@/env";

export async function GET() {
  await connection();
  return Response.json({ ok: true, database: features.database() });
}
