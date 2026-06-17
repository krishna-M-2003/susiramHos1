"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, GraduationCap, Calendar, ArrowRight } from "lucide-react"
import { DOCTORS } from "@/lib/constants"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DoctorModal } from "@/components/booking/doctor-modal"

const specialtyToDepartmentMap: Record<string, string> = {
  Cardiology: "Cardiology Sciences",
  Neurology: "Neurological Institute",
  Orthopedics: "Orthopedic & Joint Center",
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

export function Doctors() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedDoctor, setSelectedDoctor] = React.useState<any>(null)
  const [initialTab, setInitialTab] = React.useState<"profile" | "book">("profile")

  const handleOpenProfile = (doc: any) => {
    setSelectedDoctor(doc)
    setInitialTab("profile")
    setIsModalOpen(true)
  }

  const handleOpenBook = (doc: any) => {
    setSelectedDoctor(doc)
    setInitialTab("book")
    setIsModalOpen(true)
  }

  return (
    <section id="doctors" className="relative overflow-hidden py-20 lg:py-28 bg-background flex flex-col items-center">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-luxury-gold/5 dark:bg-luxury-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-20">
          <Badge variant="luxury" className="px-4 py-1 rounded-full uppercase tracking-widest text-xs font-semibold">
            Medical Staff
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-primary dark:text-foreground">
            Bespoke Medical Leadership
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Consult with board-certified department heads and clinical researchers. Academic experts committed to patient safety and recovery.
          </p>
        </div>

        {/* Doctors Directory Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {DOCTORS.map((doctor) => (
            <motion.div
              key={doctor.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group h-full"
            >
              <Card className="h-full flex flex-col justify-between overflow-hidden border border-border/80 bg-background/50 backdrop-blur-md transition-all duration-300 hover:border-luxury-gold/50 hover:shadow-xl">
                
                {/* Image Section (Apple Product-like Design) */}
                <div className="relative w-full h-[320px] overflow-hidden bg-muted">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Rating Tag Overlay */}
                  <div className="absolute top-4 left-4 glassmorphism px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/40 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-luxury-gold text-luxury-gold" />
                    <span className="text-xs font-bold text-primary dark:text-foreground">
                      {doctor.rating.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      ({doctor.reviewsCount})
                    </span>
                  </div>

                  {/* Specialty Overlay Badge */}
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="default" className="bg-primary/95 hover:bg-primary text-white border-none py-1 px-3 shadow-md rounded-lg">
                      {doctor.specialty}
                    </Badge>
                  </div>
                </div>

                {/* Content Section */}
                <CardHeader className="space-y-2 pb-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-luxury-gold-dark dark:text-luxury-gold uppercase tracking-wider">
                      {doctor.experience}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-serif text-primary dark:text-foreground font-bold group-hover:text-luxury-gold-dark dark:group-hover:text-luxury-gold transition-colors duration-300">
                    {doctor.name}
                  </CardTitle>
                  <CardDescription className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {doctor.role}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {doctor.bio}
                  </p>
                  
                  {/* Qualification Detail */}
                  <div className="flex items-start gap-2.5 pt-2 text-xs text-muted-foreground border-t border-border/50">
                    <GraduationCap className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-semibold block text-primary dark:text-foreground">Education & Training:</span>
                      <span className="text-[11px] leading-relaxed block">
                        {doctor.education[0]} • {doctor.education[1].split("-")[0].trim()}
                      </span>
                    </div>
                  </div>
                </CardContent>

                {/* Footer CTAs */}
                <CardFooter className="flex flex-col gap-3 pt-4 border-t border-border/60">
                  <Button
                    variant="luxury"
                    className="w-full rounded-xl shadow-md group/btn transition-transform duration-300 active:scale-[0.98] cursor-pointer"
                    onClick={() => handleOpenBook(doctor)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Consultation
                  </Button>
                  <button
                    onClick={() => handleOpenProfile(doctor)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary dark:hover:text-foreground transition-colors duration-300 py-1 cursor-pointer focus-visible:outline-none"
                  >
                    <span>View Profile & Credentials</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </CardFooter>

              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>

      <DoctorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctor={selectedDoctor}
        initialTab={initialTab}
      />

    </section>
  )
}
