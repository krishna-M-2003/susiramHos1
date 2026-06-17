import { SITE_CONFIG } from "@/lib/constants"

export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "name": SITE_CONFIG.name,
    "image": "https://susiramhealth.com/images/og-image.png",
    "logo": "https://susiramhealth.com/images/og-image.png",
    "url": "https://susiramhealth.com",
    "telephone": SITE_CONFIG.contact.phone,
    "emergencyTelephone": SITE_CONFIG.contact.phone,
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "742 Elite Medical Boulevard, Penthouse Suite",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10021",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.771128,
      "longitude": -73.959958
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "medicalSpecialty": [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Oncology",
      "Pediatrics",
      "EmergencyMedicine"
    ],
    "sameAs": [
      SITE_CONFIG.socials.facebook,
      SITE_CONFIG.socials.instagram,
      SITE_CONFIG.socials.twitter,
      SITE_CONFIG.socials.linkedin
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
