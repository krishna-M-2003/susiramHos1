"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Mail, Clock, ShieldCheck, CheckCircle2, ArrowRight, AlertTriangle, Building, Video } from "lucide-react"
import { SERVICES, DOCTORS, SITE_CONFIG } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { sendWhatsAppEnquiry } from "@/lib/whatsapp"

export function BookingForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
    message: "",
  })

  React.useEffect(() => {
    const handleSetMode = (e: Event) => {
      const customEvent = e as CustomEvent<{
        doctor?: string
        department?: string
      }>
      if (customEvent.detail) {
        setFormData((prev) => {
          const next = { ...prev }
          if (customEvent.detail.doctor) {
            next.doctor = customEvent.detail.doctor
          }
          if (customEvent.detail.department) {
            next.department = customEvent.detail.department
          }
          return next
        })
      }
    }
    window.addEventListener("set-booking-mode", handleSetMode)

    // Parse URL query parameters if present on mount
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const deptParam = params.get("department")
      const docParam = params.get("doctor")
      if (deptParam || docParam) {
        setFormData((prev) => {
          const next = { ...prev }
          if (deptParam) next.department = deptParam
          if (docParam) next.doctor = docParam
          return next
        })

        // Smooth scroll to the form element once it mounts in the DOM
        setTimeout(() => {
          const bookingSection = document.getElementById("booking")
          if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }, 150)
      }
    }

    return () => {
      window.removeEventListener("set-booking-mode", handleSetMode)
    }
  }, [])

  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [shakeCount, setShakeCount] = React.useState(0)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = "Full name must be at least 3 characters."
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address."
    }
    
    const phoneRegex = /^\+?[0-9\s-]{10,15}$/
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)."
    }
    
    if (!formData.department) {
      newErrors.department = "Please select a clinical specialty."
    }
    
    if (!formData.doctor) {
      newErrors.doctor = "Please select a specialist physician."
    }
    
    if (!formData.date) {
      newErrors.date = "Please select an appointment date."
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.date = "Appointment date cannot be in the past."
      }
    }

    if (!formData.time) {
      newErrors.time = "Please select a preferred time slot."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error as soon as the user starts correcting the field
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) {
      setShakeCount((prev) => prev + 1)
      return
    }

    setIsSubmitting(true)

    sendWhatsAppEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      department: formData.department,
      doctor: formData.doctor || undefined,
      date: formData.date + (formData.time ? ` at ${formData.time}` : ""),
      service: formData.department,
      message: formData.message || undefined,
    })
    
    // Simulate premium server API callback
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  const shakeVariants = {
    shake: {
      x: [0, -8, 8, -8, 8, -4, 4, 0],
      transition: { duration: 0.4 }
    }
  }

  return (
    <section id="booking" className="relative overflow-hidden py-20 lg:py-28 bg-background flex flex-col items-center">
      
      {/* Background decoration blur lights */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-luxury-gold/5 dark:bg-luxury-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-12 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 dark:bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Concierge Info */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="space-y-4">
              <Badge variant="luxury" className="px-4 py-1 rounded-full uppercase tracking-widest text-xs font-semibold">
                Appointments
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-primary dark:text-foreground">
                Reserve Your Private Consultation
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Connect with our Ivy-League clinical experts. Every request is managed directly by a dedicated medical coordinator who will handle your schedule, records routing, and suite accommodations.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              
              <div className="flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-zinc-50/50 dark:bg-zinc-900/30">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-semibold">Concierge Line</span>
                  <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-sm font-bold text-primary dark:text-foreground hover:text-luxury-gold transition-colors duration-300">
                    {SITE_CONFIG.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-zinc-50/50 dark:bg-zinc-900/30">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-semibold">Inquiries Email</span>
                  <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-sm font-bold text-primary dark:text-foreground hover:text-luxury-gold transition-colors duration-300">
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-zinc-50/50 dark:bg-zinc-900/30">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-semibold">Consultation Hours</span>
                  <span className="text-sm font-bold text-primary dark:text-foreground">
                    {SITE_CONFIG.contact.workingHours.split("|")[1].trim()}
                  </span>
                </div>
              </div>

            </div>

            {/* Quality Standard badge */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-emerald-800 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-xs font-bold uppercase tracking-wider">Secured HIPAA Complaint Portal</span>
                <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400/80 leading-relaxed">
                  Your medical records, symptoms, and scheduling parameters are encrypted and strictly protected under HIPAA confidentiality regulations.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Form Container */}
          <div className="lg:col-span-7">
            <motion.div
              animate={shakeCount > 0 ? "shake" : ""}
              variants={shakeVariants}
              key={shakeCount}
            >
              <Card className="border border-border/80 shadow-2xl bg-background/50 backdrop-blur-md overflow-hidden rounded-2xl">
                
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="booking-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardHeader className="border-b border-border/50 bg-primary/[0.02] dark:bg-white/[0.01] p-6 sm:p-8">
                        <CardTitle className="text-xl md:text-2xl font-serif">Consultation Intake Form</CardTitle>
                        <CardDescription>Fill out the fields below, and our care coordinators will reach out shortly.</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit} noValidate className="space-y-6">
                          
                          {/* Row 1: Name & Email */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Full Name</label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Eleanor Sterling"
                                value={formData.name}
                                onChange={handleChange}
                                aria-invalid={errors.name ? "true" : "false"}
                                aria-describedby={errors.name ? "name-error" : undefined}
                                className={cn(
                                  "w-full h-11 px-4 rounded-xl border bg-background/50 focus:ring-1 text-sm transition-all duration-300 focus-visible:outline-none",
                                  errors.name
                                    ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50"
                                    : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                                )}
                              />
                              {errors.name && (
                                <p id="name-error" className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{errors.name}</span>
                                </p>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Email Address</label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="eleanor@sterling.com"
                                value={formData.email}
                                onChange={handleChange}
                                aria-invalid={errors.email ? "true" : "false"}
                                aria-describedby={errors.email ? "email-error" : undefined}
                                className={cn(
                                  "w-full h-11 px-4 rounded-xl border bg-background/50 focus:ring-1 text-sm transition-all duration-300 focus-visible:outline-none",
                                  errors.email
                                    ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50"
                                    : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                                )}
                              />
                              {errors.email && (
                                <p id="email-error" className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{errors.email}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Row 2: Phone & Department */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Phone Number</label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="+1 (555) 019-9233"
                                value={formData.phone}
                                onChange={handleChange}
                                aria-invalid={errors.phone ? "true" : "false"}
                                aria-describedby={errors.phone ? "phone-error" : undefined}
                                className={cn(
                                  "w-full h-11 px-4 rounded-xl border bg-background/50 focus:ring-1 text-sm transition-all duration-300 focus-visible:outline-none",
                                  errors.phone
                                    ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50"
                                    : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                                )}
                              />
                              {errors.phone && (
                                <p id="phone-error" className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{errors.phone}</span>
                                </p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="department" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Clinical Specialty</label>
                              <div className="relative">
                                <select
                                  id="department"
                                  name="department"
                                  value={formData.department}
                                  onChange={handleChange}
                                  aria-invalid={errors.department ? "true" : "false"}
                                  aria-describedby={errors.department ? "dept-error" : undefined}
                                  className={cn(
                                    "w-full h-11 px-4 rounded-xl border bg-background/50 focus:ring-1 text-sm transition-all duration-300 focus-visible:outline-none appearance-none pr-10",
                                    errors.department
                                      ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50"
                                      : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                                  )}
                                >
                                  <option value="" disabled className="bg-card text-muted-foreground">Select Department</option>
                                  {SERVICES.map((s) => (
                                    <option key={s.id} value={s.title} className="bg-card text-foreground">{s.title}</option>
                                  ))}
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted-foreground">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                                </div>
                              </div>
                              {errors.department && (
                                <p id="dept-error" className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{errors.department}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Row 3: Doctor & Date */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label htmlFor="doctor" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Specialist Physician</label>
                              <div className="relative">
                                <select
                                  id="doctor"
                                  name="doctor"
                                  value={formData.doctor}
                                  onChange={handleChange}
                                  aria-invalid={errors.doctor ? "true" : "false"}
                                  aria-describedby={errors.doctor ? "doctor-error" : undefined}
                                  className={cn(
                                    "w-full h-11 px-4 rounded-xl border bg-background/50 focus:ring-1 text-sm transition-all duration-300 focus-visible:outline-none appearance-none pr-10",
                                    errors.doctor
                                      ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50"
                                      : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                                  )}
                                >
                                  <option value="" disabled className="bg-card text-muted-foreground">Select Doctor</option>
                                  {DOCTORS.map((d) => (
                                    <option key={d.id} value={d.name} className="bg-card text-foreground">{d.name}</option>
                                  ))}
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted-foreground">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                                </div>
                              </div>
                              {errors.doctor && (
                                <p id="doctor-error" className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{errors.doctor}</span>
                                </p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="date" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Desired Date</label>
                              <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                aria-invalid={errors.date ? "true" : "false"}
                                aria-describedby={errors.date ? "date-error" : undefined}
                                className={cn(
                                  "w-full h-11 px-4 rounded-xl border bg-background/50 focus:ring-1 text-sm transition-all duration-300 focus-visible:outline-none",
                                  errors.date
                                    ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50"
                                    : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                                )}
                              />
                              {errors.date && (
                                <p id="date-error" className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{errors.date}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Row 4: Preferred Time */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label htmlFor="time" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Preferred Time</label>
                              <div className="relative">
                                <select
                                  id="time"
                                  name="time"
                                  value={formData.time}
                                  onChange={handleChange}
                                  aria-invalid={errors.time ? "true" : "false"}
                                  aria-describedby={errors.time ? "time-error" : undefined}
                                  className={cn(
                                    "w-full h-11 px-4 rounded-xl border bg-background/50 focus:ring-1 text-sm transition-all duration-300 focus-visible:outline-none appearance-none pr-10",
                                    errors.time
                                      ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50"
                                      : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                                  )}
                                >
                                  <option value="" disabled className="bg-card text-muted-foreground">Select Preferred Time</option>
                                  <option value="9 to 12am" className="bg-card text-foreground">9 to 12am</option>
                                  <option value="2 to 4 pm" className="bg-card text-foreground">2 to 4 pm</option>
                                  <option value="6 to 9pm" className="bg-card text-foreground">6 to 9pm</option>
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted-foreground">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                                </div>
                              </div>
                              {errors.time && (
                                <p id="time-error" className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{errors.time}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Textarea: Additional notes */}
                          <div className="space-y-2">
                            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Notes / Symptoms Summary (Optional)</label>
                            <textarea
                              id="message"
                              name="message"
                              rows={3}
                              placeholder="Provide any details regarding symptoms, past history, or special concierge requests..."
                              value={formData.message}
                              onChange={handleChange}
                              className="w-full p-4 rounded-xl border border-border/80 bg-background/50 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/50 text-sm transition-all duration-300 focus-visible:outline-none resize-none"
                            />
                          </div>

                          {/* Submit Button */}
                          <Button
                            type="submit"
                            variant="luxury"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full rounded-xl py-6 shadow-lg hover:scale-[1.01]"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary-foreground animate-ping" />
                                <span>Securing Time Slot...</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <span>Request Appointment</span>
                                <ArrowRight className="w-4 h-4 ml-1" />
                              </div>
                            )}
                          </Button>

                        </form>
                      </CardContent>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="booking-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, type: "spring" }}
                      className="p-8 sm:p-12 text-center flex flex-col items-center space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>

                      <div className="space-y-2">
                        <CardTitle className="text-2xl font-serif">Consultation Initialized</CardTitle>
                        <CardDescription className="max-w-md mx-auto text-sm">
                          Thank you, <span className="font-semibold text-primary dark:text-foreground">{formData.name}</span>. Your appointment booking parameters have been securely stored.
                        </CardDescription>
                      </div>

                      {/* Receipt Details Card */}
                      <div className="w-full max-w-md border border-border/60 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-xl p-5 text-left space-y-3 text-sm">
                        <div className="flex justify-between border-b border-border/40 pb-2">
                          <span className="text-muted-foreground">Physician</span>
                          <span className="font-semibold text-primary dark:text-foreground">{formData.doctor.split(",")[0]}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/40 pb-2">
                          <span className="text-muted-foreground">Department</span>
                          <span className="font-semibold text-primary dark:text-foreground">{formData.department}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/40 pb-2">
                          <span className="text-muted-foreground">Reserved Date</span>
                          <span className="font-semibold text-primary dark:text-foreground">{formData.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            Pending Confirmation
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                          A personal care concierge officer will call you at <span className="font-semibold text-primary dark:text-foreground">{formData.phone}</span> within 15 minutes to confirm your consultation type (virtual or in-clinic), complete insurance verifications, and lock in your suite accommodations.
                        </p>
                        <Button
                          variant="luxuryOutline"
                          className="rounded-full cursor-pointer"
                          onClick={() => {
                            setIsSubmitted(false)
                            setFormData({
                              name: "",
                              email: "",
                              phone: "",
                              department: "",
                              doctor: "",
                              date: "",
                              time: "",
                              message: "",
                            })
                            setErrors({})
                          }}
                        >
                          Book Another Appointment
                        </Button>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </Card>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
