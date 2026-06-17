import { MetadataRoute } from "next"
import { SERVICES } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://susiramhealth.com"

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#doctors`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
  ]

  // Architect dynamic paths for individual services in case the patient navigates to detail pages
  const serviceRoutes = SERVICES.map((service) => ({
    url: `${baseUrl}/departments/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes]
}
