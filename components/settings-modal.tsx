"use client"

import type { ReactNode } from "react"

import { useState, useEffect, useRef } from "react"
import { Settings, Globe, Palette, Moon, Sun, Bell, Save, LogOut, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"

interface SettingsModalProps {
  children: ReactNode
  trigger?: "click" | "hover"
}

export function SettingsModal({ children, trigger = "click" }: SettingsModalProps) {
  const { language, setLanguage: setGlobalLanguage, t } = useLanguage()
  const { logout, updateCredentials, currentEmail } = useAuth()
  const [colorScheme, setColorScheme] = useState("default")
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [newEmail, setNewEmail] = useState(currentEmail)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [credentialError, setCredentialError] = useState("")
  const [credentialSuccess, setCredentialSuccess] = useState(false)
  const [open, setOpen] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isHoveringRef = useRef(false)

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

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      isHoveringRef.current = true
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      hoverTimeoutRef.current = setTimeout(() => {
        if (isHoveringRef.current) {
          setOpen(true)
        }
      }, 200)
    }
  }

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      isHoveringRef.current = false
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      hoverTimeoutRef.current = setTimeout(() => {
        if (!isHoveringRef.current) {
          setOpen(false)
        }
      }, 100)
    }
  }

  const handleSaveChanges = () => {
    localStorage.setItem("eduskill-color-scheme", colorScheme)
    localStorage.setItem("eduskill-dark-mode", darkMode.toString())
    localStorage.setItem("eduskill-notifications", notifications.toString())
    localStorage.setItem("eduskill-auto-save", autoSave.toString())
    setOpen(false)
  }

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  const handleUpdateCredentials = () => {
    setCredentialError("")
    setCredentialSuccess(false)

    if (!newEmail.trim()) {
      setCredentialError(t.language === "id" ? "Email tidak boleh kosong" : "Email cannot be empty")
      return
    }

    if (!newPassword.trim()) {
      setCredentialError(t.language === "id" ? "Kata sandi tidak boleh kosong" : "Password cannot be empty")
      return
    }

    if (newPassword !== confirmPassword) {
      setCredentialError(t.language === "id" ? "Kata sandi tidak cocok" : "Passwords do not match")
      return
    }

    if (newPassword.length < 6) {
      setCredentialError(t.language === "id" ? "Kata sandi minimal 6 karakter" : "Password must be at least 6 characters")
      return
    }

    updateCredentials(newEmail, newPassword)
    setCredentialSuccess(true)
    setNewPassword("")
    setConfirmPassword("")
    setTimeout(() => setCredentialSuccess(false), 3000)
  }

  const colorSchemes = [
    { value: "default", label: "Default Green", preview: "/color-scheme-1.jpg" },
    { value: "ocean", label: "Ocean Blue", preview: "/color-scheme-2.jpg" },
    { value: "teal", label: "Teal Burst", preview: "/color-scheme-3.jpg" },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <DialogTrigger asChild>{children}</DialogTrigger>
      </div>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {t.settings}
            </DialogTitle>
            <DialogDescription>
              {t.language === "id"
                ? "Kelola preferensi dan pengaturan aplikasi Anda"
                : "Manage your application preferences and settings"}
            </DialogDescription>
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
                        <div className="w-16 h-10 rounded overflow-hidden bg-gradient-to-r">
                          <img
                            src={scheme.preview || "/placeholder.svg"}
                            alt={scheme.label}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg"
                            }}
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

            {/* Change Credentials Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5" />
                  {t.language === "id" ? "Ubah Kredensial" : "Change Credentials"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="new-email">{t.email}</Label>
                  <Input
                    id="new-email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder={t.email}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="new-password">{t.password}</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={t.password}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password">
                    {t.language === "id" ? "Konfirmasi Kata Sandi" : "Confirm Password"}
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t.language === "id" ? "Konfirmasi kata sandi" : "Confirm password"}
                    className="mt-1"
                  />
                </div>
                {credentialError && <div className="text-sm text-destructive">{credentialError}</div>}
                {credentialSuccess && (
                  <div className="text-sm text-green-600">
                    {t.language === "id" ? "Kredensial berhasil diperbarui" : "Credentials updated successfully"}
                  </div>
                )}
                <Button className="w-full" onClick={handleUpdateCredentials}>
                  {t.language === "id" ? "Perbarui Kredensial" : "Update Credentials"}
                </Button>
              </CardContent>
            </Card>

            {/* Logout Button Section */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                  <LogOut className="h-5 w-5" />
                  {t.language === "id" ? "Keluar" : "Account"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="w-full flex items-center gap-2" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  {t.keluar}
                </Button>
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
      </div>
    </Dialog>
  )
}
