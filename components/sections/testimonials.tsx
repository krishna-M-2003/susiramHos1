"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { REVIEWS } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function Testimonials() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(0) // -1 for left, 1 for right
  const [isHovered, setIsHovered] = React.useState(false)

  const handleNext = React.useCallback(() => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length)
  }, [])

  const handlePrev = React.useCallback(() => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)
  }, [])

  // Auto-play cycle every 8 seconds
  React.useEffect(() => {
    if (isHovered) return
    const timer = setInterval(handleNext, 8000)
    return () => clearInterval(timer)
  }, [handleNext, isHovered])

  // Keypress navigation for accessibility
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNext, handlePrev])

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  }

  const activeReview = REVIEWS[activeIndex]

  return (
    <section
      id="reviews"
      aria-label="Patient Testimonials"
      className="relative py-20 lg:py-28 bg-zinc-50/50 dark:bg-zinc-950/20 flex flex-col items-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-luxury-gold/5 dark:bg-luxury-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 dark:bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-8 w-full z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4 mb-16 md:mb-20">
          <Badge variant="luxury" className="px-4 py-1 rounded-full uppercase tracking-widest text-xs font-semibold">
            Patient Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-primary dark:text-foreground">
            Echoes of Recovery & Trust
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Read letters and notes from guests who experienced our unique blend of advanced clinical treatment and five-star hospitality.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative border border-border/60 bg-background/60 backdrop-blur-md p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-2xl premium-shadow overflow-hidden">
          
          <div className="absolute top-8 left-8">
            <Quote className="w-16 h-16 text-luxury-gold/15 dark:text-luxury-gold/10 pointer-events-none" />
          </div>

          <div className="relative min-h-[360px] md:min-h-[280px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid md:grid-cols-12 gap-8 md:gap-12 items-center w-full"
              >
                
                {/* Left Side: Testimonial & Details (8 cols) */}
                <div className="md:col-span-8 flex flex-col space-y-6">
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5" aria-label={`Rated ${activeReview.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < activeReview.rating
                            ? "fill-luxury-gold text-luxury-gold"
                            : "text-border"
                        )}
                      />
                    ))}
                  </div>

                  {/* Feedback Quote */}
                  <p className="text-xl md:text-2xl font-serif text-primary dark:text-foreground italic leading-relaxed tracking-tight">
                    &ldquo;{activeReview.content}&rdquo;
                  </p>

                  {/* Author Meta */}
                  <div className="flex flex-col">
                    <span className="text-base font-serif font-bold text-primary dark:text-foreground">
                      {activeReview.author}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">
                      {activeReview.role}
                    </span>
                  </div>

                </div>

                {/* Right Side: Portrait Image (4 cols) */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-[2rem] overflow-hidden border border-luxury-gold/30 bg-muted shadow-lg shadow-luxury-gold/5 shrink-0">
                    {activeReview.image ? (
                      <Image
                        src={activeReview.image}
                        alt={activeReview.author}
                        fill
                        sizes="(max-w-768px) 160px, 192px"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5 text-xl font-serif font-semibold text-luxury-gold-dark">
                        {activeReview.author.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-8 border-t border-border/60 flex items-center justify-between">
            
            {/* Slide Index Counter */}
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <span className="text-primary dark:text-foreground">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="mx-1.5 text-border">/</span>
              {String(REVIEWS.length).padStart(2, "0")}
            </div>

            {/* Slider Dots */}
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1)
                    setActiveIndex(i)
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i === activeIndex
                      ? "bg-luxury-gold w-6"
                      : "bg-border hover:bg-muted-foreground"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-background/50 hover:bg-muted hover:text-foreground hover:border-luxury-gold/50 transition-all duration-300 focus-visible:outline-none"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-background/50 hover:bg-muted hover:text-foreground hover:border-luxury-gold/50 transition-all duration-300 focus-visible:outline-none"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
