"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, BookOpen, Calendar, CheckSquare, Bookmark, Award, Settings, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()
  const sidebarWidth = isExpanded ? 256 : 64
  const { t } = useLanguage()

  useEffect(() => {
    if (typeof window === "undefined") return
    document.documentElement.style.setProperty("--sidebar-width", `${sidebarWidth}px`)
    document.body.style.paddingLeft = `${sidebarWidth}px`
    document.body.style.transition = "padding-left 200ms ease"

    return () => {
      document.documentElement.style.removeProperty("--sidebar-width")
      document.body.style.paddingLeft = ""
      document.body.style.transition = ""
    }
  }, [sidebarWidth])

  const menuItems = [
    { icon: Menu, label: t.menu, href: "/menu" },
    { icon: BookOpen, label: t.recentCourses, href: "/recent-courses" },
    { icon: Calendar, label: t.calendar, href: "/calendar" },
    { icon: CheckSquare, label: t.toDo, href: "/todo" },
    { icon: Bookmark, label: t.saved, href: "/saved" },
    { icon: Award, label: t.sertifikat, href: "/sertifikat" },
    { icon: Settings, label: t.tools, href: "/tools" },
  ]

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50",
        isExpanded ? "w-64" : "w-16",
        className,
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Menu className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            {isExpanded && <span className="ml-3 font-heading font-bold text-sidebar-foreground">EduSkill</span>}
          </Link>
        </div>

        {isExpanded && (
          <div className="px-4 pt-3 text-xs uppercase tracking-wide text-muted-foreground">{t.navigasi}</div>
        )}

        {/* Menu Items */}
        <nav
          className="flex-1 p-2 my-0 overflow-y-auto overflow-x-hidden focus:outline-none"
          style={{ maxWidth: "var(--sidebar-width, 256px)" }}
          aria-label="Primary navigation"
        >
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))

              return (
                <li key={index}>
                  <Button
                    asChild
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-12 px-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      !isExpanded && "justify-center px-0",
                      isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Link href={item.href} className="flex w-full items-center">
                      <IconComponent className="h-5 w-5 flex-shrink-0" />
                      {isExpanded && (
                        <>
                          <span className="ml-3 text-sm">{item.label}</span>
                          <ChevronRight className="h-4 w-4 ml-auto opacity-50" aria-hidden="true" />
                        </>
                      )}
                    </Link>
                  </Button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
