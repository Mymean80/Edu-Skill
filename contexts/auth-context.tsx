"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  isLoaded: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth_token")
    if (storedAuth === "authenticated") {
      setIsAuthenticated(true)
    }
    setIsLoaded(true)
  }, [])

  const login = (email: string, password: string): boolean => {
    const isValid = email === "user@gmail.com" && password === "user123"
    if (isValid) {
      setIsAuthenticated(true)
      localStorage.setItem("auth_token", "authenticated")
    }
    return isValid
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("auth_token")
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoaded }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
