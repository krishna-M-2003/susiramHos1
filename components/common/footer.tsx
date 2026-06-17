"use client"

import * as React from "react"
import Link from "next/link"
import { Sparkles, ShieldCheck, Phone, Clock, Calendar } from "lucide-react"
import { SITE_CONFIG, NAV_LINKS, SERVICES } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950/40 border-t border-border/80 overflow-hidden" aria-label="Hospital Footer">
      
      {/* Top Section: Quick Timing & Assistance Banner Card */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-12 border-b border-border/60">
        <div className="relative overflow-hidden rounded-3xl border border-luxury-gold/20 bg-background/50 backdrop-blur-md p-8 md:p-10 lg:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Decorative mesh light */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-luxury-gold/5 blur-3xl pointer-events-none" />
          
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <Badge variant="luxury" className="px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-semibold">
              Emergency & Care Timings
            </Badge>
            <h3 className="text-2xl md:text-3xl font-serif font-medium tracking-tight text-primary dark:text-foreground">
              Compassionate Care, Round the Clock
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              At Susiram, we are dedicated to providing accessible, high-quality medical services to our community. Our emergency response, critical care units, and primary trauma wards are fully operational 24 hours a day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:max-w-md">
            <div className="p-4 rounded-2xl border border-border/60 bg-muted/30 backdrop-blur-sm space-y-2">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Emergency Dept.</span>
              </div>
              <p className="text-xl font-serif font-bold text-primary dark:text-foreground">Open 24/7</p>
              <p className="text-[11px] text-muted-foreground">Always active for trauma & intensive care.</p>
            </div>
            
            <div className="p-4 rounded-2xl border border-border/60 bg-muted/30 backdrop-blur-sm space-y-2">
              <div className="flex items-center gap-2 text-luxury-gold">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">OPD Consultations</span>
              </div>
              <p className="text-xl font-serif font-bold text-primary dark:text-foreground">Mon - Sat</p>
              <p className="text-[11px] text-muted-foreground">8:00 AM to 8:00 PM for outpatient visits.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Middle Section: Apple-Style Directory Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Brand details (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group focus-visible:outline-none">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-luxury-gold/30 bg-primary/5 dark:bg-white/5 transition-all duration-300">
                <Sparkles className="w-4 h-4 text-luxury-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-semibold text-base tracking-wider text-primary dark:text-foreground">
                  SUSIRAM
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] font-semibold text-luxury-gold-dark dark:text-luxury-gold -mt-1 font-sans">
                  Health
                </span>
              </div>
            </Link>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Experience the pinnacle of medical care designed around your safety, discretion, and comfort. Uncompromising quality from advanced clinical labs to VIP inpatient recovery wings.
            </p>

            <div className="flex items-start gap-2.5 p-3.5 rounded-lg border border-emerald-500/10 bg-emerald-500/5 text-emerald-800 dark:text-emerald-400 max-w-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider block">HIPAA & JCI Accredited</span>
                <span className="text-[9px] text-emerald-800/80 dark:text-emerald-400/80 leading-relaxed block">
                  Audited by Joint Commission International for outstanding patient safety.
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Specialties (3 cols) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-primary dark:text-foreground">
              Clinical Specialities
            </h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link href={`/departments/${service.slug}`} className="hover:text-luxury-gold transition-colors duration-300">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-primary dark:text-foreground">
              Patient Desk
            </h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/#booking"
                  className="hover:text-luxury-gold transition-colors duration-300"
                >
                  Book Appointment
                </Link>
              </li>
              {NAV_LINKS.filter((link) => link.href !== "/").map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-luxury-gold transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/careers" className="hover:text-luxury-gold transition-colors duration-300">
                  Careers Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Emergency Widget (3 cols) */}
          <div className="lg:col-span-3 flex flex-col space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest font-bold text-primary dark:text-foreground">
                Concierge Coordinates
              </h3>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="leading-relaxed">
                  {SITE_CONFIG.contact.address}
                </li>
                <li>
                  <span className="block text-[10px] text-muted-foreground uppercase tracking-wider">Concierge Line</span>
                  <a href={`tel:${SITE_CONFIG.contact.phone}`} className="font-bold text-primary dark:text-foreground hover:text-luxury-gold transition-colors duration-300">
                    {SITE_CONFIG.contact.phone}
                  </a>
                </li>
                <li>
                  <span className="block text-[10px] text-muted-foreground uppercase tracking-wider">Email Inquiry</span>
                  <a href={`mailto:${SITE_CONFIG.contact.email}`} className="font-bold text-primary dark:text-foreground hover:text-luxury-gold transition-colors duration-300">
                    {SITE_CONFIG.contact.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Glowing Emergency Call Widget */}
            <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-700 dark:text-rose-400 shadow-lg shadow-rose-500/5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider">24/7 Emergency Dispatch</span>
              </div>
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="text-lg font-bold flex items-center gap-1.5 hover:opacity-85 transition-opacity"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>+1 (800) 555-0199</span>
              </a>
            </div>
          </div>

        </div>

        {/* Lower Legal Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>© {currentYear} {SITE_CONFIG.name}. All privileges reserved.</span>
            
            {/* Social linkages */}
            <div className="flex items-center gap-2.5 ml-2 border-l border-border/80 pl-4">
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary dark:hover:text-foreground transition-colors duration-300"
                aria-label="Visit Facebook"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary dark:hover:text-foreground transition-colors duration-300"
                aria-label="Visit Instagram"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary dark:hover:text-foreground transition-colors duration-300"
                aria-label="Visit LinkedIn"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a
                href={SITE_CONFIG.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary dark:hover:text-foreground transition-colors duration-300"
                aria-label="Visit Twitter"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-luxury-gold transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-luxury-gold transition-colors duration-300">Terms of Care</Link>
            <Link href="/hipaa" className="hover:text-luxury-gold transition-colors duration-300">HIPAA Guidelines</Link>
            <Link href="/nondiscrimination" className="hover:text-luxury-gold transition-colors duration-300">Nondiscrimination Notice</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

