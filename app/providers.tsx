"use client"

import type React from "react"
import { Suspense } from "react"
import { Sidebar } from "@/components/sidebar"
import { PageTransition } from "@/components/page-transition"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { LoginPage } from "@/components/login-page"

function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoaded } = useAuth()

  if (!isLoaded) {
    return null
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <>
      <Sidebar />
      <Suspense fallback={null}>
        <PageTransition>{children}</PageTransition>
      </Suspense>
    </>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AuthLayout>{children}</AuthLayout>
      </AuthProvider>
    </LanguageProvider>
  )
}
