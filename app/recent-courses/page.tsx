export default function RecentCoursesPage() {
  return (
    <main className="p-6 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">Recent Courses</h1>
        <p className="text-muted-foreground mt-1">Pick up where you left off.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <article key={i} className="rounded-lg border bg-background p-4">
            <div className="h-32 w-full rounded-md bg-muted" aria-hidden />
            <h2 className="mt-3 font-medium">Course {i}</h2>
            <p className="text-sm text-muted-foreground">Short description for a recent course.</p>
          </article>
        ))}
      </section>
    </main>
  )
}
