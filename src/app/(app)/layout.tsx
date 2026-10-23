import { AppShell } from "@/components/app-shell";

// ADAPTER STUB: no session check yet. Phase 1 adds requireUser() here.
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
