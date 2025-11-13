"use client"

import type React from "react"

import { useState } from "react"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export function LoginPage() {
  const [email, setEmail] = useState("user@gmail.com")
  const [password, setPassword] = useState("user123")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))

    const isValid = login(email, password)
    if (!isValid) {
      setError(t.invalidCredentials || "Invalid email or password")
      setPassword("")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md bg-card border-border shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-3 rounded-lg">
              <BookOpen className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-heading">{t.login || "Login"}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.loginDescription || "Enter your credentials to access EduSkill"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                {t.email || "Email"}
              </label>
              <Input
                id="email"
                type="email"
                placeholder="user@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                className="bg-background border-border"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                {t.password || "Password"}
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                className="bg-background border-border"
                disabled={isLoading}
              />
            </div>

            {error && <div className="text-sm text-destructive font-medium">{error}</div>}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? t.loggingIn || "Logging in..." : t.login || "Login"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              {t.defaultCredentials || "Demo credentials: user@gmail.com / user123"}
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
