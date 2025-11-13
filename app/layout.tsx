import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "EduSkill - Edukasi dan Pengembangan Skill",
  description: "Platform pembelajaran untuk mengembangkan skill dan kemampuan Anda",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`font-sans ${dmSans.variable} ${spaceGrotesk.variable}`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
