import Link from "next/link";

export const metadata = { title: "Log in" };

// ADAPTER STUB: real auth (Better Auth) is Phase 1 and needs DATABASE_URL + AUTH_SECRET.
export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Sign-in is not enabled yet. It arrives in Phase 1 once the database is connected.
      </p>
      <Link href="/" className="font-medium text-indigo-600 hover:underline">
        Back to home
      </Link>
    </main>
  );
}
