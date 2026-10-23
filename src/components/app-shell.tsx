import Link from "next/link";
import { Home, Search, Briefcase, FolderKanban, MessageSquare } from "lucide-react";
import { brand } from "@/config/brand";

const nav = [
  { href: "/feed", label: "Feed", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/messages", label: "Messages", icon: MessageSquare },
];

const linkClass =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:hover:bg-zinc-900";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <aside className="hidden w-60 shrink-0 flex-col gap-1 border-r border-zinc-200 p-4 md:flex dark:border-zinc-800">
        <Link href="/" className="mb-4 px-3 text-lg font-semibold tracking-tight">
          {brand.name}
        </Link>
        <nav aria-label="Primary" className="flex flex-col gap-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={linkClass}>
              <Icon aria-hidden className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 px-4 pb-24 pt-6 md:px-8 md:pb-8">{children}</main>

      <nav
        aria-label="Primary mobile"
        className="fixed inset-x-0 bottom-0 flex justify-around border-t border-zinc-200 bg-white py-2 md:hidden dark:border-zinc-800 dark:bg-zinc-950"
      >
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 text-xs focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            <Icon aria-hidden className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
