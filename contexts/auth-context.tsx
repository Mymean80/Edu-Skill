"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  isLoaded: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
  updateCredentials: (newEmail: string, newPassword: string) => void
  currentEmail: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentEmail, setCurrentEmail] = useState("user@gmail.com")
  const [storedEmail, setStoredEmail] = useState("user@gmail.com")
  const [storedPassword, setStoredPassword] = useState("user123")

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth_token")
    const savedEmail = localStorage.getItem("eduskill-email")
    const savedPassword = localStorage.getItem("eduskill-password")
    
    if (savedEmail) setStoredEmail(savedEmail)
    if (savedPassword) setStoredPassword(savedPassword)
    if (savedEmail) setCurrentEmail(savedEmail)
    
    if (storedAuth === "authenticated") {
      setIsAuthenticated(true)
    }
    setIsLoaded(true)
  }, [])

  const login = (email: string, password: string): boolean => {
    const isValid = email === storedEmail && password === storedPassword
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

  const updateCredentials = (newEmail: string, newPassword: string) => {
    setStoredEmail(newEmail)
    setStoredPassword(newPassword)
    setCurrentEmail(newEmail)
    localStorage.setItem("eduskill-email", newEmail)
    localStorage.setItem("eduskill-password", newPassword)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoaded, updateCredentials, currentEmail }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
