"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "id" | "en"

interface Translations {
  // Sidebar
  menu: string
  recentCourses: string
  calendar: string
  toDo: string
  saved: string
  sertifikat: string
  tools: string
  navigasi: string

  // Homepage
  searchPlaceholder: string
  progressPembelajaran: string
  materiBelajar: string
  kursusOnline: string
  videoTutorial: string
  artikel: string
  sertifikasi: string
  aktivitasTerbaru: string
  menyelesaikan: string
  menonton: string
  jamYangLalu: string
  hariYangLalu: string

  // Profile dropdown
  editProfile: string
  riwayat: string
  sertifikatSaya: string
  pengaturan: string
  keluar: string

  // Settings
  settings: string
  language: string
  selectLanguage: string
  bahasaIndonesia: string
  english: string
  colorScheme: string
  display: string
  darkMode: string
  preferences: string
  notifications: string
  autoSave: string
  saveChanges: string
}

const translations: Record<Language, Translations> = {
  id: {
    menu: "Menu",
    recentCourses: "Recent Courses",
    calendar: "Calendar",
    toDo: "To Do",
    saved: "Saved",
    sertifikat: "Sertifikat",
    tools: "Tools",
    navigasi: "NAVIGASI",

    searchPlaceholder: "Cari kursus, tutorial, atau artikel...",
    progressPembelajaran: "Progress Pembelajaran",
    materiBelajar: "Materi belajar manufaktur",
    kursusOnline: "Kursus Online",
    videoTutorial: "Video Tutorial",
    artikel: "Artikel",
    sertifikasi: "Sertifikasi",
    aktivitasTerbaru: "Aktivitas Terbaru",
    menyelesaikan: "Menyelesaikan",
    menonton: "Menonton",
    jamYangLalu: "jam yang lalu",
    hariYangLalu: "hari yang lalu",

    editProfile: "Edit Profile",
    riwayat: "Riwayat",
    sertifikatSaya: "Sertifikat Saya",
    pengaturan: "Pengaturan",
    keluar: "Keluar",

    settings: "Pengaturan",
    language: "Bahasa",
    selectLanguage: "Pilih Bahasa",
    bahasaIndonesia: "Bahasa Indonesia",
    english: "English",
    colorScheme: "Skema Warna",
    display: "Tampilan",
    darkMode: "Mode Gelap",
    preferences: "Preferensi",
    notifications: "Notifikasi",
    autoSave: "Simpan Otomatis",
    saveChanges: "Simpan Perubahan",
  },
  en: {
    menu: "Menu",
    recentCourses: "Recent Courses",
    calendar: "Calendar",
    toDo: "To Do",
    saved: "Saved",
    sertifikat: "Certificate",
    tools: "Tools",
    navigasi: "NAVIGATION",

    searchPlaceholder: "Search courses, tutorials, or articles...",
    progressPembelajaran: "Learning Progress",
    materiBelajar: "Manufacturing learning materials",
    kursusOnline: "Online Courses",
    videoTutorial: "Video Tutorials",
    artikel: "Articles",
    sertifikasi: "Certification",
    aktivitasTerbaru: "Recent Activity",
    menyelesaikan: "Completed",
    menonton: "Watching",
    jamYangLalu: "hours ago",
    hariYangLalu: "day ago",

    editProfile: "Edit Profile",
    riwayat: "History",
    sertifikatSaya: "My Certificates",
    pengaturan: "Settings",
    keluar: "Logout",

    settings: "Settings",
    language: "Language",
    selectLanguage: "Select Language",
    bahasaIndonesia: "Bahasa Indonesia",
    english: "English",
    colorScheme: "Color Scheme",
    display: "Display",
    darkMode: "Dark Mode",
    preferences: "Preferences",
    notifications: "Notifications",
    autoSave: "Auto Save",
    saveChanges: "Save Changes",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id")

  // Load language from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("eduskill-language") as Language
    if (saved && (saved === "id" || saved === "en")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("eduskill-language", lang)
  }

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
