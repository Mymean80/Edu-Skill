"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Sen", progress: 20, duration: "45 mins" },
  { name: "Sel", progress: 35, duration: "1.2 hrs" },
  { name: "Rab", progress: 45, duration: "2 hrs" },
  { name: "Kam", progress: 30, duration: "1 hr" },
  { name: "Jum", progress: 60, duration: "2.5 hrs" },
  { name: "Sab", progress: 75, duration: "3 hrs" },
  { name: "Min", progress: 85, duration: "3.5 hrs" },
]

export function ProgressChart() {
  return (
    <div className="space-y-4">
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={false} />
            <YAxis hide />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-md">
                      <p className="text-sm font-medium text-card-foreground">{`${label}: ${payload[0].value}%`}</p>
                      <p className="text-xs text-muted-foreground mt-1">{`Durasi: ${data.duration}`}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="progress"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#progressGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between px-2">
        {data.map((day, index) => (
          <div
            key={day.name}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary"
          >
            {day.name}
          </div>
        ))}
      </div>
    </div>
  )
}
