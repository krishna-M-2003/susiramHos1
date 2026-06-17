import { Metadata } from "next"
import { SITE_CONFIG } from "@/lib/constants"

export const DEFAULT_METADATA: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL("https://susiramhealth.com"),
  alternates: {
    canonical: "https://susiramhealth.com",
  },
  keywords: [
    "premium hospital",
    "luxury healthcare",
    "advanced cardiology",
    "robotic surgery",
    "executive health screenings",
    "VIP medicine",
    "Susiram Health"
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://susiramhealth.com",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "https://susiramhealth.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: ["https://susiramhealth.com/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  }
}

export function generatePageMetadata(title: string, description?: string, path: string = ""): Metadata {
  const canonicalUrl = `https://susiramhealth.com${path}`
  return {
    title,
    description: description || SITE_CONFIG.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description: description || SITE_CONFIG.description,
      url: canonicalUrl,
    },
    twitter: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description: description || SITE_CONFIG.description,
    }
  }
}
