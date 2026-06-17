"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Heart, Brain, Activity, Baby, ShieldAlert, Clock, ArrowRight, CheckCircle2 } from "lucide-react"
import { SERVICES } from "@/lib/constants"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const iconMap = {
  Heart,
  Brain,
  Activity,
  ShieldAlert,
  Baby,
  Clock,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
    },
  },
}

export function Departments() {
  return (
    <section id="services" className="relative overflow-hidden py-20 lg:py-28 bg-zinc-50/50 dark:bg-zinc-950/20 flex flex-col items-center">
      
      {/* Decorative Accent Lights */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[min(600px,100%)] h-[600px] rounded-full bg-primary/5 dark:bg-primary/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-20">
          <Badge variant="luxury" className="px-4 py-1 rounded-full uppercase tracking-widest text-xs font-semibold">
            Centers of Excellence
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-primary dark:text-foreground">
            Bespoke Clinical Specialties
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Every department combines Nobel-caliber clinical research with state-of-the-art medical systems, wrapped inside high-end guest hospitality.
          </p>
        </div>

        {/* Departments Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES.map((dept) => {
            const IconComponent = iconMap[dept.icon as keyof typeof iconMap] || Heart
            return (
              <motion.div
                key={dept.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group h-full"
              >
                <Card className="h-full flex flex-col justify-between border border-border/80 bg-background/60 backdrop-blur-md transition-all duration-300 hover:border-luxury-gold/50 hover:shadow-xl hover:shadow-luxury-gold/5">
                  <CardHeader className="space-y-4">
                    
                    {/* Icon Container with glowing effects */}
                    <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/5 group-hover:bg-primary text-primary group-hover:text-primary-foreground dark:bg-white/5 dark:text-foreground dark:group-hover:bg-white dark:group-hover:text-primary transition-all duration-500">
                      <IconComponent className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 rounded-2xl bg-luxury-gold/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                    </div>

                    {/* Department Title */}
                    <CardTitle className="text-xl md:text-2xl font-serif text-primary dark:text-foreground font-semibold group-hover:text-luxury-gold-dark dark:group-hover:text-luxury-gold transition-colors duration-300">
                      {dept.title}
                    </CardTitle>

                    {/* Description */}
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                      {dept.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-1">
                    
                    {/* Clinical Features List */}
                    <ul className="space-y-2.5" aria-label={`Key features of ${dept.title}`}>
                      {dept.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  {/* Accessible action card footer */}
                  <CardFooter className="pt-4 border-t border-border/60">
                    <LinkButton
                      href={`/departments/${dept.slug}`}
                      ariaLabel={`Explore treatments in ${dept.title}`}
                    />
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}

interface LinkButtonProps {
  href: string
  ariaLabel: string
}

// Accessible Focusable Action Wrapper
function LinkButton({ href, ariaLabel }: LinkButtonProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:text-luxury-gold-dark dark:text-foreground dark:hover:text-luxury-gold transition-colors duration-300 group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
    >
      <span>Explore Department</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
    </a>
  )
}
