"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, Calendar, Sparkles, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { useScroll } from "@/hooks/use-scroll"

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const scrolled = useScroll(20)
  const pathname = usePathname()
  const [activeSection, setActiveSection] = React.useState("")

  // Intersection Observer for scroll spy
  React.useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("")
      return
    }

    const sectionIds = ["services", "doctors", "facilities", "reviews"]
    const observedElements = new Set<string>()

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection("")
      }
    }

    const observerOptions = {
      root: null,
      rootMargin: "-15% 0px -60% 0px", // Trigger when section occupies the active viewing zone
      threshold: 0, // Trigger immediately when any part of the section enters the viewing zone
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const setupObserver = () => {
      sectionIds.forEach((id) => {
        if (!observedElements.has(id)) {
          const el = document.getElementById(id)
          if (el) {
            observer.observe(el)
            observedElements.add(id)
          }
        }
      })
    }

    // Run setup immediately
    setupObserver()

    // Periodically retry registration to catch dynamically rendered modules
    const timers = [
      setTimeout(setupObserver, 200),
      setTimeout(setupObserver, 600),
      setTimeout(setupObserver, 1200),
      setTimeout(setupObserver, 2500)
    ]

    const handleScrollAndSetup = () => {
      handleScroll()
      setupObserver()
    }

    window.addEventListener("scroll", handleScrollAndSetup)

    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
      window.removeEventListener("scroll", handleScrollAndSetup)
    }
  }, [pathname])

  // Robust scroll-lock: preserves scroll position, prevents iOS bounce,
  // compensates for scrollbar disappearance to avoid layout shift.
  React.useEffect(() => {
    if (!isOpen) return

    // Capture current scroll position before locking
    const scrollY = window.scrollY
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    // Pin the body at its current position (iOS-safe technique)
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = "0"
    document.body.style.right = "0"
    document.body.style.overflow = "hidden"
    // Compensate for scrollbar disappearance to prevent layout shift
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      // Restore all body styles
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
      // Jump back to the exact scroll position silently
      window.scrollTo({ top: scrollY, behavior: "instant" })
    }
  }, [isOpen])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
          scrolled
            ? "glassmorphism py-3 shadow-md border-border/80"
            : "bg-transparent py-5 border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          
          {/* Logo (Apple & Tesla Minimalist Inspiration) */}
          <Link href="/" className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold rounded-lg p-0.5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-luxury-gold/30 bg-primary/5 dark:bg-white/5 transition-all duration-300 group-hover:border-luxury-gold">
              <Sparkles className="w-5 h-5 text-luxury-gold transition-transform duration-500 group-hover:rotate-12" />
              <div className="absolute inset-0 rounded-full bg-luxury-gold/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-semibold text-lg md:text-xl tracking-wider text-primary dark:text-foreground transition-colors duration-300">
                SUSIRAM
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-luxury-gold-dark dark:text-luxury-gold -mt-1 font-sans">
                Health
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Centered) */}
          <nav className="hidden lg:flex items-center gap-[28px]">
            {NAV_LINKS.map((link) => {
              const isHomePage = pathname === "/"
              const hasHash = link.href.includes("#")
              const linkHash = hasHash ? link.href.split("#")[1] : ""
              const isActive = isHomePage
                ? (link.href === "/" ? activeSection === "" : activeSection === linkHash)
                : (pathname === link.href)

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    if (isHomePage) {
                      setActiveSection(link.href === "/" ? "" : linkHash)
                    }
                  }}
                  className={cn(
                    "relative py-2 px-1 text-sm font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold rounded",
                    isActive
                      ? "text-primary dark:text-foreground"
                      : "text-muted-foreground hover:text-primary dark:hover:text-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-luxury-gold rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Actions Block */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Location Coordinates Icon */}
            <Link
              href="/#location"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-luxury-gold/30 bg-primary/5 dark:bg-white/5 text-muted-foreground hover:border-luxury-gold hover:text-luxury-gold hover:scale-[1.03] transition-all duration-300 cursor-pointer"
              title="Hospital Location & Campus Map"
            >
              <MapPin className="w-4 h-4" />
            </Link>

            {/* Emergency Hotline (Sleek Tesla style secondary element) */}
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:opacity-85 transition-opacity px-3 py-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40"
            >
              <span>ER Direct</span>
            </a>

            {/* Premium Theme Switcher */}
            <ThemeToggle />

            {/* Primary Luxury CTA Button */}
            <Button asChild variant="luxury" size="sm" className="rounded-full shadow-sm hover:scale-[1.02] active:scale-95 duration-300">
              <Link href="/#booking">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Link>
            </Button>
          </div>

          {/* Mobile Right Bar (Theme toggle + Hamburger) */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Location icon - compact for mobile header */}
            <Link
              href="/#location"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-luxury-gold/30 bg-primary/5 dark:bg-white/5 text-muted-foreground hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300"
              title="Hospital Location"
            >
              <MapPin className="w-4 h-4" />
            </Link>

            {/* ER Direct compact pill */}
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="flex items-center gap-1 text-[10px] font-bold text-rose-600 dark:text-rose-400 px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 hover:opacity-85 transition-opacity leading-none"
              title="Emergency Direct Line"
            >
              <span className="relative flex h-1.5 w-1.5 mr-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-600" />
              </span>
              ER
            </a>

            <ThemeToggle />
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full border border-border/80 bg-background/50 hover:bg-muted text-foreground transition-all duration-300 focus-visible:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation (Framer Motion Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur-xl lg:hidden flex flex-col pt-24"
            style={{ overscrollBehavior: "contain", touchAction: "pan-y" }}
          >
            <div className="flex-1 overflow-y-auto overscroll-contain px-8 pb-12 flex flex-col justify-between">
              
              {/* Navigation Links */}
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link, i) => {
                  const isHomePage = pathname === "/"
                  const hasHash = link.href.includes("#")
                  const linkHash = hasHash ? link.href.split("#")[1] : ""
                  const isActive = isHomePage
                    ? (link.href === "/" ? activeSection === "" : activeSection === linkHash)
                    : (pathname === link.href)

                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setIsOpen(false)
                          if (isHomePage) {
                            setActiveSection(link.href === "/" ? "" : linkHash)
                          }
                        }}
                        className={cn(
                          "text-2xl font-serif font-medium tracking-wide transition-colors duration-300",
                          isActive
                            ? "text-luxury-gold"
                            : "text-foreground hover:text-luxury-gold"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="space-y-3 pt-8 border-t border-border"
              >
                {/* Location Link */}
                <Link
                  href="/#location"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-semibold border border-luxury-gold/40 bg-luxury-gold/5 text-luxury-gold-dark dark:text-luxury-gold hover:bg-luxury-gold/10 transition-colors duration-300"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Hospital Location &amp; Campus Map</span>
                </Link>

                {/* Emergency Contact */}
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 animate-pulse" />
                  <span>Call Emergency Services</span>
                </a>

                {/* Primary CTA */}
                <Button
                  asChild
                  variant="luxury"
                  size="lg"
                  className="w-full rounded-xl py-6 text-base shadow-lg hover:scale-100"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/#booking">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Link>
                </Button>

                {/* Working Hours Info */}
                <p className="text-center text-xs text-muted-foreground mt-4 font-medium leading-relaxed">
                  {SITE_CONFIG.contact.workingHours}
                </p>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
