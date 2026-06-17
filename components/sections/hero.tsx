"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, Award, Stethoscope, Activity, Heart, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

const floatingCardVariants = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 12,
      delay: 0.6,
    },
  },
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-16 lg:py-24 flex flex-col items-center">
      
      {/* Premium Ambient Light Gradients (Tesla style visual design) */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px] pointer-events-none -mr-20 sm:-mr-40 -mt-10 sm:-mt-20" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full bg-luxury-gold/5 dark:bg-luxury-gold/10 blur-[100px] pointer-events-none -ml-20 sm:-ml-40 -mb-10 sm:-mb-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column: Value Proposition & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8"
          >
            {/* Glowing JCI Trust Badge */}
            <motion.div variants={itemVariants}>
              <Badge
                variant="luxury"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-luxury-gold/10 text-luxury-gold-dark dark:text-luxury-gold border border-luxury-gold/20"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
                JCI Accredited Medical Center of Excellence
              </Badge>
            </motion.div>

            {/* Apple-style Headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-primary dark:text-foreground">
                The pinnacle of <br />
                <span className="luxury-gradient-text font-serif">clinical science.</span> <br />
                Bespoke clinical care.
              </h1>
              <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-xl leading-relaxed font-sans">
                Experience world-class outpatient care and advanced diagnostics tailored to your absolute privacy. Combining Nobel-caliber clinical research with elite guest hospitality.
              </p>
            </motion.div>

            {/* Action CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button asChild variant="luxury" size="lg" className="rounded-full shadow-lg group hover:scale-[1.03] active:scale-95 duration-300">
                <Link href="/#booking">
                  Book Appointment
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="luxuryOutline" size="lg" className="rounded-full hover:scale-[1.03] active:scale-95 duration-300">
                <Link href="/#services">
                  Explore Specialties
                </Link>
              </Button>
            </motion.div>

            {/* Awards Indicators */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-border/80 flex flex-wrap items-center gap-6"
            >
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Recognized Credentials:
              </span>
              <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-luxury-gold" />
                  <span>Clinical Excellence Award Winner</span>
                </div>
                <div className="h-4 w-px bg-border/80" />
                <div className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-luxury-gold" />
                  <span>Advanced Technology Leader</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Visual Composition */}
          <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[480px] lg:h-[520px] flex items-center justify-center pointer-events-none overflow-hidden">
            
            {/* Visual Backplate with high-resolution interior image */}
            <div className="absolute inset-4 sm:inset-0 rounded-[2.5rem] border border-border/60 overflow-hidden shadow-2xl -rotate-3">
              <Image
                src="/images/hero-interior.png"
                alt="Susiram Premium Doctor"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top opacity-95 dark:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>

            {/* Layered Floating Card 1: Medical Diagnostics (Right Aligned) */}
            <motion.div
              variants={floatingCardVariants}
              initial="hidden"
              animate="visible"
              className="absolute top-8 right-0 w-[200px] sm:w-[240px] glassmorphism p-3 sm:p-5 rounded-2xl shadow-xl flex flex-col gap-2 sm:gap-3 border border-white/60 dark:border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-rose-500/10 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-rose-500" />
                  </div>
                  <span className="text-xs font-semibold text-primary dark:text-foreground">Cardiac Sciences</span>
                </div>
                <Badge variant="outline" className="text-[9px] border-emerald-500/30 text-emerald-600 bg-emerald-500/5 px-2">
                  LIVE OUTCOMES
                </Badge>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-serif font-bold tracking-tight text-primary dark:text-foreground">99.8%</span>
                <span className="text-xs text-muted-foreground">success rate</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "99.8%" }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full"
                  />
                </div>
                <span className="text-[10px] text-muted-foreground block">Surpassing international benchmark averages</span>
              </div>
            </motion.div>

            {/* Layered Floating Card 2: Elite Care Standards (Left Aligned) */}
            <motion.div
              variants={floatingCardVariants}
              initial="hidden"
              animate="visible"
              className="absolute bottom-12 left-0 w-[180px] sm:w-[220px] glassmorphism p-3 sm:p-5 rounded-2xl shadow-xl flex flex-col gap-2 sm:gap-3 border border-white/60 dark:border-white/10"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                  <Award className="w-4 h-4 text-luxury-gold" />
                </div>
                <span className="text-xs font-semibold text-primary dark:text-foreground">Elite Care Standards</span>
              </div>
              <ul className="space-y-2">
                {["Direct Coordinator Access", "Private Consulting Rooms", "Advanced Diagnostic Labs"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-luxury-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Layered Floating Card 3: Consulting Physicians (Centered/Bottom Right) */}
            <motion.div
              variants={floatingCardVariants}
              initial="hidden"
              animate="visible"
              className="absolute bottom-32 right-2 sm:right-4 glassmorphism p-3 sm:p-4 rounded-xl shadow-lg flex items-center gap-2 sm:gap-3 border border-white/60 dark:border-white/10"
            >
              <div className="flex -space-x-2.5">
                {[
                  { text: "AV", bg: "bg-emerald-700" },
                  { text: "ER", bg: "bg-blue-800" },
                  { text: "MT", bg: "bg-indigo-700" },
                ].map((user, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white shadow-md",
                      user.bg
                    )}
                  >
                    {user.text}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground block font-medium">On-Duty Specialists</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Consulting Live
                </span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Global Statistics Grid Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 lg:mt-28 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 border-t border-border pt-12"
        >
          {[
            { value: "99.8%", label: "Clinical Success", desc: "For complex bypass operations", icon: Heart },
            { value: "150+", label: "Board Physicians", desc: "Ivy-league educated experts", icon: Stethoscope },
            { value: "Gold Seal", label: "JCI Accredited", desc: "Highest patient safety score", icon: ShieldCheck },
            { value: "24/7", label: "Clinical Desk", desc: "Direct coordinator routing", icon: Clock },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col space-y-1 group">
              <div className="flex items-center gap-2 text-luxury-gold">
                <stat.icon className="w-5 h-5" />
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  {stat.label}
                </span>
              </div>
              <span className="text-3xl lg:text-4xl font-serif font-semibold text-primary dark:text-foreground tracking-tight group-hover:text-luxury-gold transition-colors duration-300">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground leading-relaxed">
                {stat.desc}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
