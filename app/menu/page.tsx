import Link from "next/link"

export default function MenuPage() {
  return (
    <main className="p-6 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">Menu</h1>
        <p className="text-muted-foreground mt-1">Quick access to key areas of EduSkill.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/recent-courses"
          className="rounded-lg border bg-background p-4 hover:bg-accent hover:text-accent-foreground"
        >
          <div className="font-medium">Recent Courses</div>
          <p className="text-sm text-muted-foreground mt-1">Jump back into what you were learning.</p>
        </Link>
        <Link
          href="/calendar"
          className="rounded-lg border bg-background p-4 hover:bg-accent hover:text-accent-foreground"
        >
          <div className="font-medium">Calendar</div>
          <p className="text-sm text-muted-foreground mt-1">View upcoming classes and deadlines.</p>
        </Link>
        <Link href="/todo" className="rounded-lg border bg-background p-4 hover:bg-accent hover:text-accent-foreground">
          <div className="font-medium">To&nbsp;Do</div>
          <p className="text-sm text-muted-foreground mt-1">Track assignments and tasks.</p>
        </Link>
        <Link
          href="/saved"
          className="rounded-lg border bg-background p-4 hover:bg-accent hover:text-accent-foreground"
        >
          <div className="font-medium">Saved</div>
          <p className="text-sm text-muted-foreground mt-1">Bookmarks and saved resources.</p>
        </Link>
        <Link
          href="/sertifikat"
          className="rounded-lg border bg-background p-4 hover:bg-accent hover:text-accent-foreground"
        >
          <div className="font-medium">Sertifikat</div>
          <p className="text-sm text-muted-foreground mt-1">Certificates you’ve earned.</p>
        </Link>
        <Link
          href="/tools"
          className="rounded-lg border bg-background p-4 hover:bg-accent hover:text-accent-foreground"
        >
          <div className="font-medium">Tools</div>
          <p className="text-sm text-muted-foreground mt-1">Helpful utilities and study aids.</p>
        </Link>
      </section>
    </main>
  )
}
