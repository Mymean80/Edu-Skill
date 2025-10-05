"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 1500)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className={`page-transition ${isAnimating ? "page-transition-enter" : ""}`} key={pathname}>
      {children}
    </div>
  )
}
