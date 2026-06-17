"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShieldCheck, CheckCircle2, ArrowRight, AlertTriangle, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { SERVICES } from "@/lib/constants"
import { sendWhatsAppEnquiry } from "@/lib/whatsapp"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  initialDepartment?: string
  initialDoctor?: string
}

export function BookingModal({ isOpen, onClose, initialDepartment = "", initialDoctor = "" }: BookingModalProps) {
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

  // Synchronize initial values when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: initialDepartment,
        doctor: initialDoctor,
        date: "",
        time: "",
        message: "",
      })
      setErrors({})
      setIsSubmitted(false)
      setIsSubmitting(false)
    }
  }, [isOpen, initialDepartment, initialDoctor])

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

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1200)
  }

  const shakeVariants = {
    shake: {
      x: [0, -6, 6, -6, 6, -3, 3, 0],
      transition: { duration: 0.4 }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Dimmed backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            className="w-full max-w-lg z-10"
          >
            <motion.div
              animate={shakeCount > 0 ? "shake" : ""}
              variants={shakeVariants}
              key={shakeCount}
            >
              <Card className="border border-border/80 shadow-2xl bg-background overflow-hidden rounded-2xl relative max-h-[90vh] flex flex-col">
                
                {/* Floating Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full border border-border/80 bg-background/50 hover:bg-muted text-foreground transition-all duration-300 z-20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold cursor-pointer"
                  aria-label="Close booking modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form-step"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="overflow-y-auto"
                    >
                      <CardHeader className="border-b border-border/50 bg-primary/[0.01] dark:bg-white/[0.01] p-6 pr-12">
                        <CardTitle className="text-xl md:text-2xl font-serif">Reserve Appointment</CardTitle>
                        <CardDescription>Fill out the credentials below to secure your private consultation.</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="p-6 space-y-5">
                        <form onSubmit={handleSubmit} noValidate className="space-y-4">
                          
                          {/* Full Name */}
                          <div className="space-y-1.5">
                            <label htmlFor="modal-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Full Name</label>
                            <input
                              type="text"
                              id="modal-name"
                              name="name"
                              placeholder="Eleanor Sterling"
                              value={formData.name}
                              onChange={handleChange}
                              className={cn(
                                "w-full h-10 px-4 rounded-xl border bg-background focus:ring-1 text-sm transition-all duration-300 focus-visible:outline-none",
                                errors.name
                                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50"
                                  : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                              )}
                            />
                            {errors.name && (
                              <p className="text-[10px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                <span>{errors.name}</span>
                              </p>
                            )}
                          </div>

                          {/* Email Address */}
                          <div className="space-y-1.5">
                            <label htmlFor="modal-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Email Address</label>
                            <input
                              type="email"
                              id="modal-email"
                              name="email"
                              placeholder="eleanor@sterling.com"
                              value={formData.email}
                              onChange={handleChange}
                              className={cn(
                                "w-full h-10 px-4 rounded-xl border bg-background focus:ring-1 text-sm transition-all duration-300 focus-visible:outline-none",
                                errors.email
                                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50"
                                  : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                              )}
                            />
                            {errors.email && (
                              <p className="text-[10px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                <span>{errors.email}</span>
                              </p>
                            )}
                          </div>

                          {/* Phone Number */}
                          <div className="space-y-1.5">
                            <label htmlFor="modal-phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Phone Number</label>
                            <input
                              type="tel"
                              id="modal-phone"
                              name="phone"
                              placeholder="+1 (555) 019-9233"
                              value={formData.phone}
                              onChange={handleChange}
                              className={cn(
                                "w-full h-10 px-4 rounded-xl border bg-background focus:ring-1 text-sm transition-all duration-300 focus-visible:outline-none",
                                errors.phone
                                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50"
                                  : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                              )}
                            />
                            {errors.phone && (
                              <p className="text-[10px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                <span>{errors.phone}</span>
                              </p>
                            )}
                          </div>

                          {/* Department Selection (Pre-selected) */}
                          <div className="space-y-1.5">
                            <label htmlFor="modal-department" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Clinical Specialty</label>
                            <div className="relative">
                              <select
                                id="modal-department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className={cn(
                                  "w-full h-10 px-4 rounded-xl border bg-background focus:ring-1 text-sm transition-all duration-300 focus-visible:outline-none appearance-none pr-10",
                                  errors.department
                                    ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50"
                                    : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                                )}
                              >
                                <option value="" disabled>Select Department</option>
                                {SERVICES.map((s) => (
                                  <option key={s.id} value={s.title}>{s.title}</option>
                                ))}
                              </select>
                              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted-foreground">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                              </div>
                            </div>
                            {errors.department && (
                              <p className="text-[10px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                <span>{errors.department}</span>
                              </p>
                            )}
                          </div>

                          {/* Date selector */}
                          <div className="space-y-1.5">
                            <label htmlFor="modal-date" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Preferred Date</label>
                            <input
                              type="date"
                              id="modal-date"
                              name="date"
                              value={formData.date}
                              onChange={handleChange}
                              className={cn(
                                "w-full h-10 px-4 rounded-xl border bg-background focus:ring-1 text-sm transition-all duration-300 focus-visible:outline-none",
                                errors.date
                                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50"
                                  : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                              )}
                            />
                            {errors.date && (
                              <p className="text-[10px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                <span>{errors.date}</span>
                              </p>
                            )}
                          </div>

                          {/* Preferred Time selector */}
                          <div className="space-y-1.5">
                            <label htmlFor="modal-time" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Preferred Time</label>
                            <div className="relative">
                              <select
                                id="modal-time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className={cn(
                                  "w-full h-10 px-4 rounded-xl border bg-background focus:ring-1 text-sm transition-all duration-300 focus-visible:outline-none appearance-none pr-10",
                                  errors.time ? "border-rose-500/80 focus:ring-rose-500/50" : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                                )}
                              >
                                <option value="" disabled>Select Preferred Time</option>
                                <option value="9 to 12am">9 to 12am</option>
                                <option value="2 to 4 pm">2 to 4 pm</option>
                                <option value="6 to 9pm">6 to 9pm</option>
                              </select>
                              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted-foreground">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                              </div>
                            </div>
                            {errors.time && (
                              <p className="text-[10px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                <span>{errors.time}</span>
                              </p>
                            )}
                          </div>

                          {/* Notes/Message Textarea */}
                          <div className="space-y-1.5">
                            <label htmlFor="modal-message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Notes / Symptoms (Optional)</label>
                            <textarea
                              id="modal-message"
                              name="message"
                              rows={2}
                              placeholder="Any details regarding symptoms or special accommodations..."
                              value={formData.message}
                              onChange={handleChange}
                              className="w-full p-3 rounded-xl border border-border/80 bg-background focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/50 text-sm transition-all duration-300 focus-visible:outline-none resize-none"
                            />
                          </div>

                          {/* HIPAA Protection indicator */}
                          <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-500/5 text-emerald-800 dark:text-emerald-400 border border-emerald-500/10">
                            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-[10px] leading-relaxed">
                              Secured HIPAA Compliant Portal. Your details are encrypted.
                            </span>
                          </div>

                          {/* Submit Button */}
                          <Button
                            type="submit"
                            variant="luxury"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full rounded-xl py-5 shadow-md hover:scale-[1.01] cursor-pointer"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center justify-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary-foreground animate-ping" />
                                <span>Scheduling...</span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-1">
                                <span>Request Consultation</span>
                                <ArrowRight className="w-4 h-4 ml-1" />
                              </div>
                            )}
                          </Button>

                        </form>
                      </CardContent>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success-step"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-6 md:p-8 text-center flex flex-col items-center space-y-5"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>

                      <div className="space-y-1">
                        <CardTitle className="text-xl md:text-2xl font-serif">Consultation Initialized</CardTitle>
                        <CardDescription className="max-w-xs mx-auto text-xs">
                          Thank you, <span className="font-semibold text-primary dark:text-foreground">{formData.name}</span>. Your reservation parameter suite has been locked.
                        </CardDescription>
                      </div>

                      {/* Summary receipt info */}
                      <div className="w-full border border-border/60 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-xl p-4 text-left space-y-2 text-xs">
                        <div className="flex justify-between border-b border-border/40 pb-1.5">
                          <span className="text-muted-foreground">Specialty</span>
                          <span className="font-semibold text-primary dark:text-foreground">{formData.department}</span>
                        </div>
                        {formData.doctor && (
                          <div className="flex justify-between border-b border-border/40 pb-1.5">
                            <span className="text-muted-foreground">Physician</span>
                            <span className="font-semibold text-primary dark:text-foreground">{formData.doctor.split(",")[0]}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-b border-border/40 pb-1.5">
                          <span className="text-muted-foreground">Desired Date</span>
                          <span className="font-semibold text-primary dark:text-foreground">{formData.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            Pending Confirmation
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-muted-foreground max-w-xs mx-auto leading-relaxed">
                        A personal care concierge coordinator will call you at <span className="font-semibold text-primary dark:text-foreground">{formData.phone}</span> within 15 minutes to complete insurance audit verification.
                      </p>

                      <Button
                        variant="luxuryOutline"
                        className="rounded-full cursor-pointer w-full text-xs"
                        onClick={onClose}
                      >
                        Close Window
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </Card>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
