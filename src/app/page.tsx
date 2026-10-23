import Link from "next/link";
import { Briefcase, Users, Rocket } from "lucide-react";
import { brand } from "@/config/brand";

const journeys = [
  {
    icon: Rocket,
    title: "Hire & build",
    who: "Founders and companies",
    body: "Post jobs and projects, review applicants and proposals, and run delivery with your team in one workspace.",
  },
  {
    icon: Briefcase,
    title: "Find work",
    who: "Freelancers",
    body: "Showcase your portfolio, send proposals, form consent-based teams and deliver through milestones.",
  },
  {
    icon: Users,
    title: "Grow your career",
    who: "Job seekers",
    body: "Build a profile and CV, control who sees it, apply to roles and always know where you stand.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
        <span className="text-lg font-semibold tracking-tight">{brand.name}</span>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/login" className="hover:underline">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
        <section className="max-w-2xl">
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{brand.tagline}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {brand.positioning}
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            One account, three journeys. Move from discovery to a real outcome: a hire, a won
            project or a delivered milestone.
          </p>
        </section>

        <section aria-label="Journeys" className="mt-14 grid gap-5 sm:grid-cols-3">
          {journeys.map(({ icon: Icon, title, who, body }) => (
            <article
              key={title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <Icon aria-hidden className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="mt-4 text-lg font-semibold">{title}</h2>
              <p className="text-sm text-zinc-500">{who}</p>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{body}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="mx-auto w-full max-w-5xl px-6 py-8 text-sm text-zinc-500">
        Pre-launch build. Legal pages require legal review before public launch.
      </footer>
    </div>
  );
}
