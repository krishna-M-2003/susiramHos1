"use client"

import * as React from "react"
import { MapPin, ShieldCheck, Compass, Car, PhoneCall, Compass as Helicopter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SITE_CONFIG } from "@/lib/constants"

export function LocationSection() {
  return (
    <section id="location" className="relative overflow-hidden py-20 lg:py-28 bg-zinc-50 dark:bg-zinc-950/20 border-t border-border/60 flex flex-col items-center">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-luxury-gold/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-20">
          <Badge variant="luxury" className="px-4 py-1 rounded-full uppercase tracking-widest text-xs font-semibold">
            Campus Navigation
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-primary dark:text-foreground">
            Location & Campus Access
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Conveniently situated in New York's premier medical district. Explore access details for private vehicles, valet services, and emergency air transport.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Direct Access Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Location Card */}
            <div className="flex gap-4 p-5 rounded-2xl border border-border/80 bg-background/50 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">HQ Address</span>
                <p className="text-sm font-serif font-bold text-primary dark:text-foreground leading-relaxed">
                  {SITE_CONFIG.contact.address}
                </p>
              </div>
            </div>

            {/* Private Driveway & Valet */}
            <div className="flex gap-4 p-5 rounded-2xl border border-border/80 bg-background/50 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Valet Parking & Chauffeurs</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Complimentary valet parking is available 24/7 at our secure canopy entrance. Direct, private elevator access to VIP suites is monitored continuously for client privacy.
                </p>
              </div>
            </div>

            {/* Heliport Coordinates */}
            <div className="flex gap-4 p-5 rounded-2xl border border-border/80 bg-background/50 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Executive Helipad Coordinates</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Rooftop Level 1 emergency air-intake helipad coordinates: <span className="font-semibold text-primary dark:text-foreground">40.7711° N, 73.9594° W</span>. Pre-clearance and air traffic routing can be arranged through the emergency triage desk.
                </p>
              </div>
            </div>

            {/* HIPAA Compliance Seal */}
            <div className="flex items-start gap-2.5 p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-emerald-800 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider block">Secured Medical Perimeter</span>
                <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400/80 leading-relaxed">
                  Our private patient bays and loading driveway are fully gated, insulated, and protected to ensure patient identity security.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Custom Visual Map Schematic */}
          <div className="lg:col-span-7">
            <Card className="border border-border/80 bg-background/50 backdrop-blur-md overflow-hidden rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col items-center">
              
              <div className="w-full flex items-center justify-between mb-4 border-b border-border/50 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-luxury-gold animate-ping" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-foreground">Campus Access Map</span>
                </div>
                <span className="text-[10px] text-muted-foreground">Schematic view</span>
              </div>

              {/* Vector SVG Schematic Map representing luxury medical campus */}
              {/* Vector SVG Schematic Map representing luxury medical campus */}
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 p-4 flex items-center justify-center transition-all duration-300">
                
                {/* SVG Schematic map */}
                <svg className="w-full h-full max-h-[320px] select-none" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid Lines */}
                  <line x1="50" y1="0" x2="50" y2="300" className="stroke-zinc-200/50 dark:stroke-zinc-800/40" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="150" y1="0" x2="150" y2="300" className="stroke-zinc-200/50 dark:stroke-zinc-800/40" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="250" y1="0" x2="250" y2="300" className="stroke-zinc-200/50 dark:stroke-zinc-800/40" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="350" y1="0" x2="350" y2="300" className="stroke-zinc-200/50 dark:stroke-zinc-800/40" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1="50" x2="400" y2="50" className="stroke-zinc-200/50 dark:stroke-zinc-800/40" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1="150" x2="400" y2="150" className="stroke-zinc-200/50 dark:stroke-zinc-800/40" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1="250" x2="400" y2="250" className="stroke-zinc-200/50 dark:stroke-zinc-800/40" strokeWidth="0.5" strokeDasharray="3 3" />

                  {/* Main Roads */}
                  <path d="M 0,220 L 400,220" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="20" strokeLinecap="round" />
                  <path d="M 120,0 L 120,300" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="20" strokeLinecap="round" />

                  <text x="210" y="224" className="fill-zinc-500 dark:fill-zinc-400 font-bold" fontSize="7" letterSpacing="0.1em">ELITE MEDICAL BOULEVARD</text>
                  <text x="126" y="50" className="fill-zinc-500 dark:fill-zinc-400 font-bold" fontSize="7" letterSpacing="0.1em" transform="rotate(90, 126, 50)">PARK AVENUE EXT.</text>

                  {/* Hospital Main Campus Outline */}
                  <rect x="180" y="40" width="180" height="130" rx="12" className="fill-white dark:fill-zinc-900/50 stroke-luxury-gold/50 dark:stroke-luxury-gold" strokeWidth="1.5" />
                  
                  {/* Hospital Sub-Wings */}
                  <rect x="200" y="60" width="60" height="40" rx="6" className="fill-zinc-50 dark:fill-zinc-800/60 stroke-zinc-200 dark:stroke-zinc-700" strokeWidth="1" />
                  <rect x="280" y="60" width="60" height="40" rx="6" className="fill-zinc-50 dark:fill-zinc-800/60 stroke-zinc-200 dark:stroke-zinc-700" strokeWidth="1" />
                  <rect x="200" y="115" width="140" height="40" rx="6" className="fill-zinc-50 dark:fill-zinc-800/60 stroke-zinc-200 dark:stroke-zinc-700" strokeWidth="1" />

                  <text x="230" y="83" className="fill-luxury-gold-dark dark:fill-luxury-gold font-bold" fontSize="8" textAnchor="middle">EAST WING</text>
                  <text x="310" y="83" className="fill-luxury-gold-dark dark:fill-luxury-gold font-bold" fontSize="8" textAnchor="middle">WEST WING</text>
                  <text x="270" y="138" className="fill-zinc-800 dark:fill-zinc-100 font-bold" fontSize="9" textAnchor="middle" letterSpacing="0.05em">MAIN CLINICAL BLOCK</text>

                  {/* Heliport (Rooftop) */}
                  <circle cx="330" cy="80" r="14" className="fill-zinc-50 dark:fill-zinc-900 stroke-rose-500/80 dark:stroke-rose-500" strokeWidth="1.5" />
                  <text x="330" y="84" className="fill-rose-600 dark:fill-rose-400 font-bold" fontSize="11" textAnchor="middle">H</text>

                  {/* VIP Canopy / Valet Entrance */}
                  <path d="M 180,185 L 210,185 L 210,170" className="stroke-luxury-gold-dark dark:stroke-luxury-gold" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="180" cy="185" r="4" className="fill-luxury-gold-dark dark:fill-luxury-gold" />
                  <text x="220" y="188" className="fill-luxury-gold-dark dark:fill-luxury-gold font-bold" fontSize="8">VIP VALET INTAKE</text>

                  {/* Compass Indicator */}
                  <g transform="translate(45, 55)">
                    <circle cx="0" cy="0" r="18" className="fill-zinc-50 dark:fill-zinc-900 stroke-zinc-200 dark:stroke-zinc-850" strokeWidth="1" />
                    <line x1="0" y1="-14" x2="0" y2="14" className="stroke-luxury-gold-dark dark:stroke-luxury-gold" strokeWidth="1.5" />
                    <line x1="-14" y1="0" x2="14" y2="0" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" />
                    <polygon points="0,-14 -4,-2 4,-2" className="fill-luxury-gold-dark dark:fill-luxury-gold" />
                    <text x="0" y="-19" className="fill-zinc-500 dark:fill-zinc-400 font-bold" fontSize="8" textAnchor="middle">N</text>
                  </g>
                </svg>

                {/* Floating Indicators */}
                <div className="absolute top-4 right-4 flex flex-col gap-1.5 text-[9px] font-semibold text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-luxury-gold border border-luxury-gold/30 shrink-0" />
                    <span>Susiram Campus Portal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-emerald-500 shrink-0 animate-pulse" />
                    <span>Complimentary Valet Bays</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-rose-500 shrink-0" />
                    <span>Rooftop Emergency Helipad</span>
                  </div>
                </div>

              </div>
              
              <div className="w-full text-center mt-4 text-[10px] text-muted-foreground leading-relaxed">
                Entrance driveway is situated off <span className="font-semibold text-primary dark:text-foreground">Elite Medical Boulevard</span>. Private security dispatch is active 24/7.
              </div>

            </Card>
          </div>

        </div>

      </div>
    </section>
  )
}
