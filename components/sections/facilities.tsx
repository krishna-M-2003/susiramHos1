"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Cpu, Activity, Heart, ShieldAlert, Bed, FlaskConical, ArrowRight, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FACILITIES } from "@/lib/facilities"

// Map icon string names to dynamic React components
const iconMap = {
  Cpu,
  Activity,
  Heart,
  ShieldAlert,
  Bed,
  FlaskConical,
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

export function Facilities() {
  return (
    <section id="facilities" className="relative overflow-hidden py-20 lg:py-28 bg-background flex flex-col items-center border-t border-border/60">
      
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-luxury-gold/5 dark:bg-luxury-gold/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-20">
          <Badge variant="luxury" className="px-4 py-1 rounded-full uppercase tracking-widest text-xs font-semibold">
            Medical Infrastructure
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-primary dark:text-foreground">
            World-Class Clinical Facilities
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-sans">
            Explore our advanced clinical environments designed around guest safety, private accommodations, and medical precision. Discover where premium hospitality meets modern science.
          </p>
        </div>
 
        {/* Facilities Grid - Responsive 3 Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {FACILITIES.map((facility) => {
            const IconComponent = iconMap[facility.iconName] || Activity
            return (
              <motion.div
                key={facility.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group h-full"
              >
                <Card className="h-full flex flex-col justify-between overflow-hidden border border-border/80 bg-background/50 backdrop-blur-md transition-all duration-300 hover:border-luxury-gold/50 hover:shadow-xl hover:shadow-luxury-gold/5">
                  
                  {/* Image Block */}
                  <div className="relative w-full h-[240px] overflow-hidden bg-muted">
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={facility.id === "advanced-operation-theatres" || facility.id === "imaging-diagnostics"}
                    />
                    
                    {/* Icon Circle */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-primary/90 hover:bg-primary text-white dark:bg-card/90 dark:text-luxury-gold flex items-center justify-center shadow-lg border border-white/20">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
 
                  {/* Header Title */}
                  <CardHeader className="space-y-2 pb-2">
                    <CardTitle className="text-xl font-serif text-primary dark:text-foreground font-semibold group-hover:text-luxury-gold-dark dark:group-hover:text-luxury-gold transition-colors duration-300">
                      {facility.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground line-clamp-2 min-h-[40px]">
                      {facility.description}
                    </CardDescription>
                  </CardHeader>
 
                  {/* Features Highlights */}
                  <CardContent className="space-y-4 flex-1 pb-4">
                    <ul className="space-y-2" aria-label={`Highlights of ${facility.title}`}>
                      {facility.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <ShieldCheck className="w-4 h-4 text-luxury-gold shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
 
                  {/* Accessible action card footer linking to dynamic facility subpages */}
                  <CardFooter className="pt-4 border-t border-border/60">
                    <Button variant="luxuryOutline" size="sm" className="w-full rounded-xl cursor-pointer" asChild>
                      <Link href={`/facilities/${facility.slug}`}>
                        <span>{facility.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Link>
                    </Button>
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
