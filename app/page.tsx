import dynamic from "next/dynamic"
import { Hero } from "@/components/sections/hero"

// Skeleton component for Departments section loading
const DepartmentsSkeleton = () => (
  <div className="py-20 lg:py-28 max-w-7xl mx-auto px-6 md:px-8 w-full animate-pulse space-y-12 bg-background">
    <div className="h-5 w-28 bg-muted rounded-full mx-auto" />
    <div className="h-10 w-80 bg-muted rounded-full mx-auto" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-[280px] bg-muted rounded-3xl" />
      ))}
    </div>
  </div>
)

// Skeleton component for Doctors section loading
const DoctorsSkeleton = () => (
  <div className="py-20 lg:py-28 max-w-7xl mx-auto px-6 md:px-8 w-full animate-pulse space-y-12 bg-background">
    <div className="h-5 w-28 bg-muted rounded-full mx-auto" />
    <div className="h-10 w-80 bg-muted rounded-full mx-auto" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-[460px] bg-muted rounded-3xl" />
      ))}
    </div>
  </div>
)

// Skeleton component for Facilities section loading
const FacilitiesSkeleton = () => (
  <div className="py-20 lg:py-28 max-w-7xl mx-auto px-6 md:px-8 w-full animate-pulse space-y-12 bg-background border-t border-border/60">
    <div className="h-5 w-28 bg-muted rounded-full mx-auto" />
    <div className="h-10 w-80 bg-muted rounded-full mx-auto" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-[380px] bg-muted rounded-3xl" />
      ))}
    </div>
  </div>
)

// Skeleton component for Testimonials section loading
const TestimonialsSkeleton = () => (
  <div className="py-20 lg:py-28 max-w-5xl mx-auto px-6 md:px-8 w-full animate-pulse space-y-12 bg-zinc-50/50 dark:bg-zinc-950/20">
    <div className="h-5 w-28 bg-muted rounded-full mx-auto" />
    <div className="h-10 w-80 bg-muted rounded-full mx-auto" />
    <div className="h-[360px] bg-muted rounded-[2.5rem]" />
  </div>
)

// Skeleton component for BookingForm section loading
const BookingFormSkeleton = () => (
  <div className="py-20 lg:py-28 max-w-4xl mx-auto px-6 md:px-8 w-full animate-pulse space-y-12 bg-background">
    <div className="h-5 w-28 bg-muted rounded-full mx-auto" />
    <div className="h-10 w-80 bg-muted rounded-full mx-auto" />
    <div className="h-[520px] bg-muted rounded-3xl" />
  </div>
)

// Below-the-fold components are loaded dynamically with server-side pre-rendering enabled (ssr: true)
// This splits the JS bundle, reduces initial bundle payload, and retains perfect SEO search engine indexability.
const Departments = dynamic(() => import("@/components/sections/departments").then((mod) => mod.Departments), {
  loading: DepartmentsSkeleton,
  ssr: true,
})

const Doctors = dynamic(() => import("@/components/sections/doctors").then((mod) => mod.Doctors), {
  loading: DoctorsSkeleton,
  ssr: true,
})

const Facilities = dynamic(() => import("@/components/sections/facilities").then((mod) => mod.Facilities), {
  loading: FacilitiesSkeleton,
  ssr: true,
})

const Testimonials = dynamic(() => import("@/components/sections/testimonials").then((mod) => mod.Testimonials), {
  loading: TestimonialsSkeleton,
  ssr: true,
})

const BookingForm = dynamic(() => import("@/components/sections/booking-form").then((mod) => mod.BookingForm), {
  loading: BookingFormSkeleton,
  ssr: true,
})

const LocationSection = dynamic(() => import("@/components/sections/location").then((mod) => mod.LocationSection), {
  loading: () => <div className="py-20 animate-pulse bg-background h-[360px] w-full" />,
  ssr: true,
})

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <Hero />
      <Departments />
      <Doctors />
      <Facilities />
      <Testimonials />
      <BookingForm />
      <LocationSection />
    </div>
  )
}
