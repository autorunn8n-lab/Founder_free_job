export function ComingSoon({ title, phase }: { title: string; phase: string }) {
  return (
    <section className="mx-auto max-w-xl py-12">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        This area is not built yet. It is planned for {phase}.
      </p>
    </section>
  );
}
