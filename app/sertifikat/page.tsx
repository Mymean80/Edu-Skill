export default function SertifikatPage() {
  return (
    <main className="p-6 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">Sertifikat</h1>
        <p className="text-muted-foreground mt-1">Certificates and achievements you’ve earned.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2].map((i) => (
          <article key={i} className="rounded-lg border bg-background p-4">
            <div className="h-24 w-full rounded-md bg-muted" aria-hidden />
            <h2 className="mt-3 font-medium">Certificate {i}</h2>
            <p className="text-sm text-muted-foreground">Issuer • 2025</p>
          </article>
        ))}
      </section>
    </main>
  )
}
