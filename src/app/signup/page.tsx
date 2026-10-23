import Link from "next/link";

export const metadata = { title: "Sign up" };

// ADAPTER STUB: real sign-up (18+ confirmation, versioned consent) is Phase 1.
export default function SignupPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Accounts are not open yet. Sign-up arrives in Phase 1 once the database is connected.
      </p>
      <Link href="/" className="font-medium text-indigo-600 hover:underline">
        Back to home
      </Link>
    </main>
  );
}
