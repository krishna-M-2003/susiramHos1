"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Star,
  ShieldCheck,
  Award,
  Sparkles,
  HelpCircle,
  Stethoscope,
  ShieldAlert
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookingModal } from "@/components/booking/booking-modal"
import { DoctorModal } from "@/components/booking/doctor-modal"
import { HospitalService, Doctor } from "@/types"

interface DepartmentPageClientProps {
  slug: string
  service: HospitalService
  detail: {
    subtitle: string
    overview: string
    conditions: string[]
    facilities: string[]
    benefits: string[]
    faqs: { q: string; a: string }[]
  }
  specialists: Doctor[]
}

export function DepartmentPageClient({ slug, service, detail, specialists }: DepartmentPageClientProps) {
  const [isBookingOpen, setIsBookingOpen] = React.useState(false)
  const [prefilledDoctor, setPrefilledDoctor] = React.useState("")
  const [prefilledDepartment, setPrefilledDepartment] = React.useState("")

  // Doctor modal states
  const [isDocModalOpen, setIsDocModalOpen] = React.useState(false)
  const [selectedDoctor, setSelectedDoctor] = React.useState<Doctor | null>(null)
  const [docModalInitialTab, setDocModalInitialTab] = React.useState<"profile" | "book">("profile")

  const handleBookDoctor = (doc: Doctor) => {
    setSelectedDoctor(doc)
    setDocModalInitialTab("book")
    setIsDocModalOpen(true)
  }

  const handleOpenDoctorProfile = (doc: Doctor) => {
    setSelectedDoctor(doc)
    setDocModalInitialTab("profile")
    setIsDocModalOpen(true)
  }

  const handleBookDepartment = () => {
    setPrefilledDoctor("")
    setPrefilledDepartment(service.title)
    setIsBookingOpen(true)
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-20 flex flex-col items-center w-full">
      
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px] pointer-events-none -mr-40" />
      <div className="absolute top-96 left-0 w-[400px] h-[400px] rounded-full bg-luxury-gold/5 dark:bg-luxury-gold/10 blur-[100px] pointer-events-none -ml-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full z-10 flex flex-col space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-muted-foreground pt-4">
          <Link href="/" className="hover:text-primary dark:hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/#services" className="hover:text-primary dark:hover:text-foreground transition-colors">Departments</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-luxury-gold-dark dark:text-luxury-gold font-bold">{service.title}</span>
        </nav>

        {/* Hero Banner Section */}
        <section className="flex flex-col space-y-4 max-w-4xl">
          <Badge variant="luxury" className="inline-flex w-fit px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20">
            Center of Excellence
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-primary dark:text-foreground">
            {service.title}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-3xl">
            {detail.subtitle}
          </p>
        </section>

        {/* Content Columns grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Details & Services */}
          <div className="lg:col-span-8 flex flex-col space-y-12">
            
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-medium tracking-tight text-primary dark:text-foreground">
                Department Overview
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed font-sans">
                {detail.overview}
              </p>
            </div>

            {/* Conditions Treated & Services Offered */}
            <div className="grid md:grid-cols-2 gap-8">
              
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-semibold text-primary dark:text-foreground flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-luxury-gold" />
                  Conditions Managed
                </h3>
                <ul className="space-y-2">
                  {detail.conditions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                      <span className="font-sans">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif font-semibold text-primary dark:text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-luxury-gold" />
                  Available Treatments
                </h3>
                <ul className="space-y-2">
                  {service.features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                      <span className="font-sans">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Facilities & Equipment Section */}
            <div className="space-y-5 border-t border-border/60 pt-8">
              <h3 className="text-xl font-serif font-medium text-primary dark:text-foreground">
                Advanced Clinical Facilities
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {detail.facilities.map((fac, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl border border-border/80 bg-zinc-50/50 dark:bg-zinc-900/30">
                    <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-primary dark:text-foreground font-sans">{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="space-y-6 border-t border-border/60 pt-8">
              <h3 className="text-xl font-serif font-medium text-primary dark:text-foreground flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-luxury-gold" />
                Frequently Asked Inquiries
              </h3>
              <div className="space-y-4">
                {detail.faqs.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-border/80 bg-background/50">
                    <span className="text-sm font-bold block text-primary dark:text-foreground mb-1.5 font-serif">
                      Q: {faq.q}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                      A: {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Specialists & Perks */}
          <div className="lg:col-span-4 flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            
            {/* Specialists Panel */}
            <div className="p-6 rounded-2xl border border-border/80 bg-background/60 backdrop-blur-md space-y-6">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold block">
                Department Specialists
              </span>
              
              {specialists.length > 0 ? (
                <div className="space-y-6">
                  {specialists.map((doc) => (
                    <div key={doc.id} className="flex flex-col gap-4 pb-6 border-b border-border/40 last:border-b-0 last:pb-0 group">
                      <div className="flex gap-4 items-center">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-luxury-gold/30 shrink-0">
                          <Image
                            src={doc.image}
                            alt={doc.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-serif font-bold text-primary dark:text-foreground group-hover:text-luxury-gold transition-colors duration-300">
                            {doc.name}
                          </span>
                          <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold font-sans">
                            {doc.role}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                        <span className="font-sans">{doc.education[0]}</span>
                      </div>
                      <Button
                        variant="luxury"
                        className="w-full rounded-xl shadow-md text-xs cursor-pointer font-sans font-semibold"
                        onClick={() => handleBookDoctor(doc)}
                      >
                        Book Consultation
                      </Button>
                      <button
                        onClick={() => handleOpenDoctorProfile(doc)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary dark:hover:text-foreground transition-colors duration-300 py-1 cursor-pointer justify-center focus-visible:outline-none"
                      >
                        <span>View Profile & Credentials</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mb-1">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <p className="font-sans">
                    Our elite board-certified coordinators are available 24/7. Additional specialists from Ivy League medical centers can be rostered for your private consult.
                  </p>
                  <p className="font-semibold text-primary dark:text-foreground font-sans">
                    Please submit a concierge callback request.
                  </p>
                </div>
              )}
            </div>

            {/* Exclusive Perks Card */}
            <div className="p-6 rounded-2xl border border-luxury-gold/30 bg-luxury-gold/5 space-y-4">
              <span className="text-xs uppercase tracking-wider text-luxury-gold-dark dark:text-luxury-gold font-bold block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                Elite Patient Benefits
              </span>
              <ul className="space-y-3">
                {detail.benefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5" />
                    <span className="font-sans">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Global Appointment Call-to-action */}
        <section className="mt-12 rounded-[2.5rem] border border-border/80 bg-background/50 backdrop-blur-md text-foreground p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 transition-colors duration-350">
          <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-luxury-gold/5 dark:bg-luxury-gold/5 blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-xl text-center md:text-left z-10">
            <Badge variant="luxury" className="px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-semibold">
              Consultation Intake
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-primary dark:text-foreground">
              Begin Your Healing Journey
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              Connect directly with our care coordinators to schedule your diagnostics, verify your health parameters, and lock in private guest suite accommodations.
            </p>
          </div>

          <div className="shrink-0 z-10 w-full md:w-auto">
            <Button
              variant="luxury"
              size="lg"
              className="rounded-full shadow-lg group hover:scale-[1.03] active:scale-95 duration-300 w-full md:w-auto font-bold cursor-pointer font-sans"
              onClick={handleBookDepartment}
            >
              Reserve Appointment
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </section>

      </div>

      {/* Dynamic Booking Modal overlay popup */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialDepartment={prefilledDepartment}
        initialDoctor={prefilledDoctor}
      />

      {/* Doctor Profile and Booking modal popup */}
      <DoctorModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        doctor={selectedDoctor}
        initialTab={docModalInitialTab}
      />

    </main>
  )
}
