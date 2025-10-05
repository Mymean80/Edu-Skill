export default function SavedPage() {
  return (
    <main className="p-6 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">Saved</h1>
        <p className="text-muted-foreground mt-1">Your bookmarks and saved materials.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <article key={i} className="rounded-lg border bg-background p-4">
            <h2 className="font-medium">Saved Item {i}</h2>
            <p className="text-sm text-muted-foreground">
              A short description about this saved resource. Useful for quick revisits.
            </p>
          </article>
        ))}
      </section>
    </main>
  )
}
