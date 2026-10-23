import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string().url().optional(),
  DATABASE_URL_UNPOOLED: z.string().url().optional(),
  AUTH_SECRET: z.string().min(32).optional(),
  APP_URL: z.string().url().default("http://localhost:3000"),
  CRON_SECRET: z.string().min(16).optional(),
  EMAIL_MODE: z.enum(["console", "live"]).default("console"),
  RESEND_API_KEY: z.string().optional(),
});

export type Env = z.infer<typeof schema>;

let cached: Env | undefined;

/** Optional integrations switch themselves off when their keys are missing. */
export function env(): Env {
  cached ??= schema.parse(process.env);
  return cached;
}

export const features = {
  database: () => Boolean(env().DATABASE_URL),
  liveEmail: () => env().EMAIL_MODE === "live" && Boolean(env().RESEND_API_KEY),
};
