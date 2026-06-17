import * as React from "react"
import { notFound } from "next/navigation"
import { FACILITIES, getFacilityBySlug } from "@/lib/facilities"
import { FacilityPageClient } from "../facility-page-client"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate dynamic metadata for search engine optimization (SEO)
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const facility = getFacilityBySlug(slug)
  if (!facility) return {}

  return {
    title: `${facility.title} | Susiram Premium Healthcare`,
    description: facility.description,
    openGraph: {
      title: `${facility.title} | Susiram Premium Healthcare`,
      description: facility.description,
      images: [
        {
          url: facility.image,
          width: 1200,
          height: 630,
          alt: facility.title,
        },
      ],
    },
  }
}

// Pre-render dynamic facility detail routes at build time for fast delivery
export async function generateStaticParams() {
  return FACILITIES.map((f) => ({
    slug: f.slug,
  }))
}

export default async function FacilityPage({ params }: PageProps) {
  const { slug } = await params
  const facility = getFacilityBySlug(slug)

  if (!facility) {
    notFound()
  }

  return <FacilityPageClient facility={facility} />
}
