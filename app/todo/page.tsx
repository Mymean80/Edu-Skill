"use client"

import { useState } from "react"

export default function TodoPage() {
  const [items, setItems] = useState<string[]>(["Read chapter 3", "Finish quiz 2"])
  const [value, setValue] = useState("")

  return (
    <main className="p-6 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">To Do</h1>
        <p className="text-muted-foreground mt-1">Track and manage your learning tasks.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-[2fr,1fr]">
        <div className="rounded-lg border bg-background p-4">
          <h2 className="font-medium">Tasks</h2>
          <ul className="mt-3 grid gap-2">
            {items.map((t, i) => (
              <li key={i} className="flex items-center justify-between rounded-md border p-2">
                <span>{t}</span>
                <button
                  className="text-sm text-muted-foreground hover:text-foreground"
                  aria-label={`Remove ${t}`}
                  onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              if (!value.trim()) return
              setItems((prev) => [...prev, value.trim()])
              setValue("")
            }}
            aria-label="Add task form"
          >
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Add a task"
              className="w-full rounded-md border bg-background px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button className="rounded-md bg-primary px-3 py-2 text-primary-foreground">Add</button>
          </form>
        </div>

        <div className="rounded-lg border bg-background p-4">
          <h2 className="font-medium">Tips</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Break down large tasks into smaller steps and schedule them on your calendar.
          </p>
        </div>
      </section>
    </main>
  )
}
