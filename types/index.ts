export interface Doctor {
  id: string
  name: string
  specialty: string
  role: string
  image: string
  bio: string
  rating: number
  reviewsCount: number
  experience: string
  education: string[]
  achievements: string[]
  availability: {
    days: string[]
    hours: string
  }
}

export interface HospitalService {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  details: string
  features: string[]
}

export interface Review {
  id: string
  author: string
  role: string
  content: string
  rating: number
  image?: string
}

export interface AppointmentInput {
  name: string
  email: string
  phone: string
  date: string
  time: string
  doctor: string
  service: string
  message?: string
}

export interface SiteConfig {
  name: string
  title: string
  tagline: string
  description: string
  contact: {
    phone: string
    email: string
    address: string
    workingHours: string
  }
  socials: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
}
