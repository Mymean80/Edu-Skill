"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, User, BookOpen, Video, FileText, Award, Settings, History, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProgressChart } from "@/components/progress-chart"
// import { Sidebar } from "@/components/sidebar"
import { SettingsModal } from "@/components/settings-modal"
import { useLanguage } from "@/contexts/language-context"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useLanguage()

  const categories = [
    { icon: BookOpen, title: t.kursusOnline, color: "bg-primary" },
    { icon: Video, title: t.videoTutorial, color: "bg-secondary" },
    { icon: FileText, title: t.artikel, color: "bg-accent" },
    { icon: Award, title: t.sertifikasi, color: "bg-chart-1" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* <Sidebar /> */} {/* Sidebar moved to layout for a dedicated global section */}
      <div className="ml-16">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-card border-b border-border">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-heading font-bold text-primary">EduSkill</h1>
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/abstract-profile.png" alt="Profile" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-4" align="end">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/abstract-profile.png" alt="Profile" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-heading font-semibold text-card-foreground">John Doe</p>
                  <p className="text-sm text-muted-foreground">john.doe@email.com</p>
                </div>
              </div>

              <SettingsModal>
                <Button variant="outline" className="w-full mb-3 bg-transparent" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  {t.editProfile}
                </Button>
              </SettingsModal>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer">
                <History className="h-4 w-4 mr-2" />
                {t.riwayat}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Award className="h-4 w-4 mr-2" />
                {t.sertifikatSaya}
              </DropdownMenuItem>
              <SettingsModal>
                <div className="flex items-center w-full px-2 py-1.5 text-sm cursor-pointer hover:bg-accent rounded-sm">
                  <Settings className="h-4 w-4 mr-2" />
                  {t.pengaturan}
                </div>
              </SettingsModal>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                {t.keluar}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Content */}
        <main className="p-4 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base bg-card border-border"
            />
          </div>

          {/* Progress Pembelajaran - Top section */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h2 className="text-lg font-heading font-semibold mb-4 text-card-foreground">{t.progressPembelajaran}</h2>
              <ProgressChart />
            </CardContent>
          </Card>

          {/* Side by side layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Categories Grid - 2x2 layout */}
            <div>
              <h2 className="text-lg font-heading font-semibold mb-4 text-foreground">{t.materiBelajar}</h2>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category, index) => {
                  const IconComponent = category.icon

                  // derive href based on category title (ID language preserved)
                  let href: string | null = null
                  if (category.title === t.kursusOnline) href = "/recent-courses"
                  if (category.title === t.sertifikasi) href = "/sertifikat"
                  if (category.title === t.artikel) href = "/discussions" // new page

                  const card = (
                    <Card
                      key={index}
                      className="bg-card border-border hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
                        <div className={`${category.color} p-3 rounded-lg text-white`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <h3 className="font-heading font-medium text-card-foreground text-sm">{category.title}</h3>
                      </CardContent>
                    </Card>
                  )

                  // If href is defined, wrap with Link; otherwise render the card as-is
                  return href ? (
                    <Link key={index} href={href} className="block" aria-label={category.title}>
                      {card}
                    </Link>
                  ) : (
                    card
                  )
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-heading font-semibold mb-4 text-card-foreground">{t.aktivitasTerbaru}</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="bg-primary p-2 rounded-full">
                      <BookOpen className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-card-foreground text-sm">{t.menyelesaikan}: React Fundamentals</p>
                      <p className="text-xs text-muted-foreground">2 {t.jamYangLalu}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="bg-secondary p-2 rounded-full">
                      <Video className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-card-foreground text-sm">{t.menonton}: JavaScript ES6 Tutorial</p>
                      <p className="text-xs text-muted-foreground">1 {t.hariYangLalu}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
