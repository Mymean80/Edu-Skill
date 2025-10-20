"use client"

import React from "react"

import type { ReactNode } from "react"

import { useState, useEffect } from "react"
import { Settings, Globe, Palette, Moon, Sun, Bell, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"

interface SettingsModalProps {
  children: ReactNode
  trigger?: "click" | "hover"
}

export function SettingsModal({ children, trigger = "click" }: SettingsModalProps) {
  const { language, setLanguage: setGlobalLanguage, t } = useLanguage()
  const [colorScheme, setColorScheme] = useState("default")
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [open, setOpen] = useState(false)
  const [hoverOpen, setHoverOpen] = useState(false)
  const hoverTimeoutRef = React.createRef<any>()

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-color-scheme", colorScheme)
    if (darkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [colorScheme, darkMode])

  useEffect(() => {
    const savedColorScheme = localStorage.getItem("eduskill-color-scheme")
    const savedDarkMode = localStorage.getItem("eduskill-dark-mode")
    const savedNotifications = localStorage.getItem("eduskill-notifications")
    const savedAutoSave = localStorage.getItem("eduskill-auto-save")

    if (savedColorScheme) setColorScheme(savedColorScheme)
    if (savedDarkMode) setDarkMode(savedDarkMode === "true")
    if (savedNotifications) setNotifications(savedNotifications === "true")
    if (savedAutoSave) setAutoSave(savedAutoSave === "true")
  }, [])

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      hoverTimeoutRef.current = setTimeout(() => {
        setOpen(true)
      }, 200)
    }
  }

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      setOpen(false)
    }
  }

  const handleSaveChanges = () => {
    localStorage.setItem("eduskill-color-scheme", colorScheme)
    localStorage.setItem("eduskill-dark-mode", darkMode.toString())
    localStorage.setItem("eduskill-notifications", notifications.toString())
    localStorage.setItem("eduskill-auto-save", autoSave.toString())
    setOpen(false)
  }

  const colorSchemes = [
    { value: "default", label: "Default Green", preview: "/color-scheme-1.png" },
    { value: "ocean", label: "Ocean Blue", preview: "/color-scheme-2.png" },
    { value: "teal", label: "Teal Burst", preview: "/color-scheme-3.png" },
  ]

  return (
    <Dialog open={open} onOpenChange={trigger === "click" ? setOpen : undefined}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <DialogTrigger asChild>{children}</DialogTrigger>
      </div>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t.settings}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="h-5 w-5" />
                {t.language}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={language} onValueChange={setGlobalLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectLanguage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">{t.bahasaIndonesia}</SelectItem>
                  <SelectItem value="en">{t.english}</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Color Scheme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="h-5 w-5" />
                {t.colorScheme}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {colorSchemes.map((scheme) => (
                  <div
                    key={scheme.value}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      colorScheme === scheme.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setColorScheme(scheme.value)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 rounded overflow-hidden">
                        <img
                          src={scheme.preview || "/placeholder.svg"}
                          alt={scheme.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{scheme.label}</span>
                      {colorScheme === scheme.value && <div className="ml-auto w-4 h-4 bg-primary rounded-full" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                {t.display}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex items-center gap-2">
                  {t.darkMode}
                </Label>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </CardContent>
          </Card>

          {/* Other Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="h-5 w-5" />
                {t.preferences}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">{t.notifications}</Label>
                <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-save">{t.autoSave}</Label>
                <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="flex items-center gap-2" onClick={handleSaveChanges}>
              <Save className="h-4 w-4" />
              {t.saveChanges}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
