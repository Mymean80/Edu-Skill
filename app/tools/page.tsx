export default function ToolsPage() {
  return (
    <main className="p-6 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">Tools</h1>
        <p className="text-muted-foreground mt-1">Helpful utilities to enhance your learning.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { name: "Flashcards", desc: "Create and review study cards." },
          { name: "Notes", desc: "Keep organized notes by topic." },
          { name: "Timer", desc: "Use Pomodoro to stay focused." },
        ].map((t) => (
          <article key={t.name} className="rounded-lg border bg-background p-4">
            <h2 className="font-medium">{t.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
