"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Plus, 
  Minus, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Building 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Facility } from "@/lib/facilities"

interface FacilityPageClientProps {
  facility: Facility
}

export function FacilityPageClient({ facility }: FacilityPageClientProps) {
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null)
  const [selectedImage, setSelectedImage] = React.useState<string>(facility.gallery[0] || facility.image)

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx)
  }

  return (
    <div className="relative min-h-screen bg-background pb-20 font-sans">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-luxury-gold/5 dark:bg-luxury-gold/5 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 dark:bg-primary/5 blur-[120px] pointer-events-none -z-10" />

      {/* Hero Banner Section */}
      <div className="relative w-full h-[360px] md:h-[450px] overflow-hidden flex items-end">
        <Image
          src={facility.image}
          alt={facility.title}
          fill
          priority
          className="object-cover brightness-75 dark:brightness-[0.4] transition-all duration-300"
        />
        {/* Base tinted overlay for contrast */}
        <div className="absolute inset-0 bg-white/40 dark:bg-black/50 transition-colors duration-300" />
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Hero Content Area */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full z-10 pb-8 md:pb-12">
          {/* Breadcrumbs Navigation */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground dark:text-zinc-400 mb-4 font-medium" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-luxury-gold-dark dark:hover:text-luxury-gold transition-colors duration-200">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Facilities</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-luxury-gold-dark dark:text-luxury-gold font-semibold truncate max-w-[200px] md:max-w-none">
              {facility.title}
            </span>
          </nav>

          {/* Heading */}
          <div className="space-y-3 max-w-4xl">
            <Badge variant="luxury" className="px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">
              Facility Suite
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-foreground dark:text-white">
              {facility.title}
            </h1>
            <p className="text-muted-foreground dark:text-zinc-200 text-sm md:text-base max-w-2xl leading-relaxed">
              {facility.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full mt-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Panel: In-Depth Overview & Facility Features */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Facility Overview Description */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-primary dark:text-foreground font-semibold flex items-center gap-2">
                <Building className="w-5 h-5 text-luxury-gold" />
                Facility Overview
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {facility.overview}
              </p>
            </section>

            {/* Key Features, Technology & Benefits Side-by-Side Sections */}
            <div className="grid sm:grid-cols-2 gap-8 mt-6">
              
              {/* Key Features */}
              <Card className="border border-border/80 bg-background/50 shadow-sm rounded-2xl">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-serif font-bold text-primary dark:text-foreground flex items-center gap-2 border-b border-border/60 pb-2.5">
                    <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {facility.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Patient Benefits */}
              <Card className="border border-border/80 bg-background/50 shadow-sm rounded-2xl">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-serif font-bold text-primary dark:text-foreground flex items-center gap-2 border-b border-border/60 pb-2.5">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold" />
                    Benefits for Patients
                  </h3>
                  <ul className="space-y-3">
                    {facility.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

            </div>

            {/* Medical Technology & Equipment */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-primary dark:text-foreground font-semibold flex items-center gap-2">
                <Cpu className="w-5 h-5 text-luxury-gold" />
                Technology & Equipment
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {facility.technology.map((tech, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl border border-border/60 bg-zinc-50/50 dark:bg-zinc-900/30 text-center"
                  >
                    <span className="text-xs font-bold text-primary dark:text-foreground block mb-1">
                      {tech.split(" (")[0]}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {tech.includes(" (") ? tech.split(" (")[1].replace(")", "") : "Advanced System"}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Interactive Photo Gallery */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-primary dark:text-foreground font-semibold">
                Photo Gallery
              </h2>
              
              {/* Big Highlight Photo */}
              <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-border bg-zinc-100">
                <Image
                  src={selectedImage}
                  alt={`${facility.title} Gallery Asset`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnails list */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {facility.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border-2 cursor-pointer transition-all duration-300 ${
                      selectedImage === img ? "border-luxury-gold shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${facility.title} Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Frequently Asked Questions (FAQ Accordion with Motion) */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-primary dark:text-foreground font-semibold">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {facility.faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx
                  return (
                    <div 
                      key={idx}
                      className="border border-border/60 rounded-xl overflow-hidden bg-background/50"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full py-4 px-5 flex items-center justify-between text-left text-sm font-semibold text-primary dark:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors duration-200 cursor-pointer focus-visible:outline-none"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <Minus className="w-4 h-4 text-luxury-gold shrink-0 ml-4" /> : <Plus className="w-4 h-4 text-luxury-gold shrink-0 ml-4" />}
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="px-5 pb-5 text-xs text-muted-foreground leading-relaxed border-t border-border/30 pt-3">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </section>

          </div>

          {/* Right Panel: Sticky Concierge and Appointment Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            
            <Card className="border border-border/80 shadow-xl bg-background/60 backdrop-blur-md overflow-hidden rounded-2xl">
              <CardContent className="p-6 space-y-6">
                
                {/* Desk Header */}
                <div className="text-center space-y-2 border-b border-border/60 pb-4">
                  <span className="text-[10px] text-luxury-gold font-bold uppercase tracking-widest block">Concierge Desk</span>
                  <h3 className="text-lg font-serif font-semibold text-primary dark:text-foreground">
                    Reserve Clinic Booking
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Connect directly with the clinical triage coordinator of this facility.
                  </p>
                </div>

                {/* Info List */}
                <div className="space-y-4 text-xs">
                  
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block font-medium uppercase tracking-wider">Direct Hotline</span>
                      <a href={`tel:${facility.contact.phone}`} className="font-bold hover:text-luxury-gold transition-colors duration-200">
                        {facility.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block font-medium uppercase tracking-wider">Email Inquiry</span>
                      <a href={`mailto:${facility.contact.email}`} className="font-bold hover:text-luxury-gold transition-colors duration-200">
                        {facility.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block font-medium uppercase tracking-wider">Hospital Location</span>
                      <span className="font-bold text-primary dark:text-foreground">
                        {facility.contact.location}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Primary Call-to-Action Booking Button */}
                <Button 
                  asChild 
                  variant="luxury" 
                  size="lg" 
                  className="w-full rounded-xl py-5 shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform duration-300 cursor-pointer"
                >
                  <Link href="/#booking">
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </Link>
                </Button>

              </CardContent>
            </Card>

            {/* Clinical standards assurance card */}
            <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-emerald-800 dark:text-emerald-400 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider block">Verified Clinical Standards</span>
                <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400/80 leading-relaxed">
                  This facility matches all international medical accreditation benchmarks for sanitation, patient safety, and instrumentation calibration.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}
