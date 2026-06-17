import type { Metadata } from "next"
import { Outfit, Playfair_Display } from "next/font/google"
import { Providers } from "@/components/providers"
import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { AmbientGlow } from "@/components/common/ambient-glow"
import { StructuredData } from "@/components/common/structured-data"
import { WhatsAppWidget } from "@/components/common/whatsapp-widget"
import { HashScrollHandler } from "@/components/common/hash-scroll-handler"
import { DEFAULT_METADATA } from "./metadata"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = DEFAULT_METADATA

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${outfit.variable} ${playfair.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-luxury-gold selection:text-primary-foreground">
        <StructuredData />
        <Providers>
          <HashScrollHandler />
          <AmbientGlow />
          <Header />
          <main className="flex-1 flex flex-col pt-16">
            {children}
          </main>
          <Footer />
          <WhatsAppWidget />
        </Providers>
      </body>
    </html>
  )
}
