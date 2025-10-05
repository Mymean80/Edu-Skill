export default function CalendarPage() {
  return (
    <main className="p-6 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">Calendar</h1>
        <p className="text-muted-foreground mt-1">See upcoming classes, events, and deadlines.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-background p-4">
          <h2 className="font-medium">This Week</h2>
          <ul className="mt-2 text-sm">
            <li className="py-2 border-b last:border-b-0">Mon – Data Science Lecture</li>
            <li className="py-2 border-b last:border-b-0">Wed – Quiz: Linear Algebra</li>
            <li className="py-2">Fri – Project Check-in</li>
          </ul>
        </div>
        <div className="rounded-lg border bg-background p-4">
          <h2 className="font-medium">Next Week</h2>
          <ul className="mt-2 text-sm">
            <li className="py-2 border-b last:border-b-0">Tue – Group Workshop</li>
            <li className="py-2">Thu – Assignment Due</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
