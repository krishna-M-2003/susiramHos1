"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Star,
  GraduationCap,
  Award,
  Clock,
  Globe,
  Briefcase,
  ShieldCheck,
  Building,
  Phone,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Doctor } from "@/types"
import { SITE_CONFIG } from "@/lib/constants"
import { sendWhatsAppEnquiry } from "@/lib/whatsapp"

// Map specialties to dynamic departments
const specialtyToDepartmentMap: Record<string, string> = {
  Cardiology: "Cardiology Sciences",
  Neurology: "Neurological Institute",
  Orthopedics: "Orthopedic & Joint Center",
}

// Complete rich profile data matching the requirements
const DOCTOR_ADDITIONAL_DETAILS: Record<
  string,
  {
    certifications: string[]
    languages: string[]
    expertise: string[]
    affiliation: string
  }
> = {
  "dr-adrian-vance": {
    certifications: [
      "Board Certified in Cardiovascular Disease (ABIM)",
      "Fellow of the American College of Cardiology (FACC)",
      "Board Certified in Interventional Cardiology"
    ],
    languages: ["English (Native)", "Spanish (Conversational)"],
    expertise: [
      "Transcatheter Aortic Valve Replacement (TAVR)",
      "Minimally Invasive Coronary Interventions",
      "Complex Coronary Angioplasty",
      "Preventive Cardiopulmonary Medicine"
    ],
    affiliation: "Susiram Cardiovascular Center of Excellence"
  },
  "dr-elena-rostova": {
    certifications: [
      "Board Certified in Psychiatry and Neurology (ABPN)",
      "Fellow of the American Association of Neurological Surgeons",
      "Active Director of Surgical Neuro-oncology board"
    ],
    languages: ["English (Fluent)", "Russian (Native)", "German (Conversational)"],
    expertise: [
      "Computer-Assisted Brain Tumor Resections",
      "Precision Neuro-Navigation & CyberKnife",
      "Complex Spinal Decompressions & Reconstructions",
      "Deep Brain Stimulation (DBS) Auditing"
    ],
    affiliation: "Susiram Neurological Institute"
  },
  "dr-marcus-thorne": {
    certifications: [
      "Board Certified in Orthopedic Surgery (ABOS)",
      "Fellow of the American Academy of Orthopaedic Surgeons (FAAOS)",
      "Active Consultant for Professional Athletic Associations"
    ],
    languages: ["English (Native)", "French (Conversational)"],
    expertise: [
      "Mako Robotic-Assisted Hip & Knee Replacements",
      "Elite Sports Medicine & Arthroscopic Repairs",
      "Rapid-Mobilization Rehabilitation Protocols",
      "Minimally Invasive Reconstructive Joint Surgery"
    ],
    affiliation: "Susiram Orthopedic & Joint Center"
  }
}

interface DoctorModalProps {
  isOpen: boolean
  onClose: () => void
  doctor: Doctor | null
  initialTab?: "profile" | "book"
}

export function DoctorModal({ isOpen, onClose, doctor, initialTab = "profile" }: DoctorModalProps) {
  const [activeTab, setActiveTab] = React.useState<"profile" | "book">("profile")

  // Sync active tab with parent triggers
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab)
      setIsSubmitted(false)
      setIsSubmitting(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        message: "",
      })
      setErrors({})
    }
  }, [isOpen, initialTab])

  // Sync escape key closing
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  })
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [shakeCount, setShakeCount] = React.useState(0)

  if (!doctor) return null

  const extraDetails = DOCTOR_ADDITIONAL_DETAILS[doctor.id] || {
    certifications: ["Board Certified Specialist"],
    languages: ["English"],
    expertise: [doctor.specialty],
    affiliation: "Susiram Premium Health Center"
  }

  const departmentName = specialtyToDepartmentMap[doctor.specialty] || "Susiram Specialist Desk"

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      department: departmentName,
      doctor: doctor.name,
      date: formData.date + (formData.time ? ` at ${formData.time}` : ""),
      service: doctor.specialty,
      message: formData.message || undefined,
    })

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1200)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          
          {/* Dimmed backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.1 }}
            className="w-full max-w-3xl z-10"
          >
            <motion.div
              animate={shakeCount > 0 ? { x: [0, -6, 6, -6, 6, -3, 3, 0] } : ""}
              transition={{ duration: 0.4 }}
              key={shakeCount}
            >
              <Card className="border border-border/80 shadow-2xl bg-background overflow-hidden rounded-2xl relative w-full h-[530px] max-h-[calc(100vh-2rem)] md:h-[570px] md:max-h-[85vh] flex flex-col">
                
                {/* Floating Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full border border-border/80 bg-background/50 hover:bg-muted text-foreground transition-all duration-300 z-20 cursor-pointer focus-visible:outline-none"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header Profile Summary (Static) */}
                <div className="p-6 md:p-8 bg-zinc-50 dark:bg-zinc-950/40 border-b border-border/60 flex flex-col sm:flex-row items-center sm:items-start gap-6 pr-12">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-luxury-gold/40 shrink-0">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-col text-center sm:text-left space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <Badge variant="luxury" className="text-[10px] py-0.5 uppercase tracking-widest font-semibold">
                        {doctor.specialty}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-semibold">
                        <Star className="w-3.5 h-3.5 fill-luxury-gold text-luxury-gold" />
                        <span className="text-foreground font-bold">{doctor.rating.toFixed(1)}</span>
                        <span>({doctor.reviewsCount} patient reviews)</span>
                      </div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-serif font-bold text-primary dark:text-foreground">
                      {doctor.name}
                    </h2>
                    
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
                      <Building className="w-3.5 h-3.5 text-luxury-gold" />
                      {extraDetails.affiliation}
                    </p>
                  </div>
                </div>

                {/* Tabs Selector Bar */}
                <div className="flex border-b border-border/60 bg-background px-6">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={cn(
                      "py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 relative cursor-pointer",
                      activeTab === "profile" ? "text-luxury-gold-dark dark:text-luxury-gold" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Profile & Credentials
                    {activeTab === "profile" && (
                      <motion.div layoutId="modalTabLine" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-luxury-gold rounded-full" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("book")}
                    className={cn(
                      "py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 relative cursor-pointer",
                      activeTab === "book" ? "text-luxury-gold-dark dark:text-luxury-gold" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Book Consultation
                    {activeTab === "book" && (
                      <motion.div layoutId="modalTabLine" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-luxury-gold rounded-full" />
                    )}
                  </button>
                </div>

                {/* Content Panel Area */}
                <div className="flex-1 overflow-y-auto min-h-0 p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    
                    {/* Tab 1: Profile details */}
                    {activeTab === "profile" && (
                      <motion.div
                        key="tab-profile"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid md:grid-cols-2 gap-8 text-sm"
                      >
                        
                        {/* Left Side: Biography & Specialties */}
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                              <Briefcase className="w-4 h-4 text-luxury-gold" />
                              Professional Biography
                            </span>
                            <p className="text-muted-foreground leading-relaxed text-xs">
                              {doctor.bio}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                              Clinical Expertise
                            </span>
                            <ul className="space-y-1.5">
                              {extraDetails.expertise.map((exp, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5" />
                                  <span>{exp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-luxury-gold" />
                              Consultation Hours
                            </span>
                            <p className="text-xs font-semibold text-primary dark:text-foreground">
                              {doctor.availability.days.join(", ")}
                              <span className="block text-muted-foreground font-normal text-[11px] mt-0.5">
                                {doctor.availability.hours}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Right Side: Credentials & Achievements */}
                        <div className="space-y-6">
                          
                          <div className="space-y-2">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                              <GraduationCap className="w-4 h-4 text-luxury-gold" />
                              Education & Training
                            </span>
                            <ul className="space-y-1.5 text-xs text-muted-foreground">
                              {doctor.education.map((edu, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-luxury-gold font-bold">•</span>
                                  <span>{edu}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                              <Award className="w-4 h-4 text-luxury-gold" />
                              Board Certifications
                            </span>
                            <ul className="space-y-1.5 text-xs text-muted-foreground">
                              {extraDetails.certifications.map((cert, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-luxury-gold font-bold">•</span>
                                  <span>{cert}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                              <Globe className="w-4 h-4 text-luxury-gold" />
                              Languages Spoken
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {extraDetails.languages.join(", ")}
                            </p>
                          </div>

                        </div>

                      </motion.div>
                    )}

                    {/* Tab 2: Booking Form */}
                    {activeTab === "book" && (
                      <motion.div
                        key="tab-book"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AnimatePresence mode="wait">
                          {!isSubmitted ? (
                            <form onSubmit={handleSubmit} noValidate className="space-y-4 max-w-md mx-auto">
                              
                              <div className="p-3 bg-zinc-50 dark:bg-zinc-950/20 rounded-xl border border-border/60 text-xs flex flex-wrap gap-x-4 gap-y-1 justify-between">
                                <div>
                                  <span className="text-muted-foreground">Booking Desk:</span>
                                  <span className="font-semibold text-primary dark:text-foreground ml-1">{doctor.name.split(",")[0]}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Specialty:</span>
                                  <span className="font-semibold text-primary dark:text-foreground ml-1">{departmentName}</span>
                                </div>
                              </div>

                              {/* Full Name */}
                              <div className="space-y-1">
                                <label htmlFor="doc-modal-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Full Name</label>
                                <input
                                  type="text"
                                  id="doc-modal-name"
                                  name="name"
                                  placeholder="Eleanor Sterling"
                                  value={formData.name}
                                  onChange={handleChange}
                                  className={cn(
                                    "w-full h-10 px-4 rounded-xl border bg-background focus:ring-1 text-xs transition-all duration-300 focus-visible:outline-none",
                                    errors.name ? "border-rose-500/80 focus:ring-rose-500/50" : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                                  )}
                                />
                                {errors.name && (
                                  <p className="text-[10px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                    <AlertTriangle className="w-3.5 h-3.5" />
                                    <span>{errors.name}</span>
                                  </p>
                                )}
                              </div>

                              {/* Email & Phone grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label htmlFor="doc-modal-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Email</label>
                                  <input
                                    type="email"
                                    id="doc-modal-email"
                                    name="email"
                                    placeholder="eleanor@sterling.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={cn(
                                      "w-full h-10 px-4 rounded-xl border bg-background focus:ring-1 text-xs transition-all duration-300 focus-visible:outline-none",
                                      errors.email ? "border-rose-500/80 focus:ring-rose-500/50" : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                                    )}
                                  />
                                  {errors.email && (
                                    <p className="text-[10px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                      <AlertTriangle className="w-3.5 h-3.5" />
                                      <span>{errors.email}</span>
                                    </p>
                                  )}
                                </div>
                                <div className="space-y-1">
                                  <label htmlFor="doc-modal-phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Phone</label>
                                  <input
                                    type="tel"
                                    id="doc-modal-phone"
                                    name="phone"
                                    placeholder="+1 (555) 019-9233"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={cn(
                                      "w-full h-10 px-4 rounded-xl border bg-background focus:ring-1 text-xs transition-all duration-300 focus-visible:outline-none",
                                      errors.phone ? "border-rose-500/80 focus:ring-rose-500/50" : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                                    )}
                                  />
                                  {errors.phone && (
                                    <p className="text-[10px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                      <AlertTriangle className="w-3.5 h-3.5" />
                                      <span>{errors.phone}</span>
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Date Selection */}
                              <div className="space-y-1">
                                <label htmlFor="doc-modal-date" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Preferred Date</label>
                                <input
                                  type="date"
                                  id="doc-modal-date"
                                  name="date"
                                  value={formData.date}
                                  onChange={handleChange}
                                  className={cn(
                                    "w-full h-10 px-4 rounded-xl border bg-background focus:ring-1 text-xs transition-all duration-300 focus-visible:outline-none",
                                    errors.date ? "border-rose-500/80 focus:ring-rose-500/50" : "border-border/80 focus:border-luxury-gold focus:ring-luxury-gold/50"
                                  )}
                                />
                                {errors.date && (
                                  <p className="text-[10px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium mt-1">
                                    <AlertTriangle className="w-3.5 h-3.5" />
                                    <span>{errors.date}</span>
                                  </p>
                                )}
                              </div>

                              {/* Preferred Time selection */}
                              <div className="space-y-1">
                                <label htmlFor="doc-modal-time" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Preferred Time</label>
                                <div className="relative">
                                  <select
                                    id="doc-modal-time"
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
                                    <AlertTriangle className="w-3.5 h-3.5" />
                                    <span>{errors.time}</span>
                                  </p>
                                )}
                              </div>

                              {/* Textarea */}
                              <div className="space-y-1">
                                <label htmlFor="doc-modal-message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Notes (Optional)</label>
                                <textarea
                                  id="doc-modal-message"
                                  name="message"
                                  rows={2}
                                  placeholder="Provide symptom details or special requests..."
                                  value={formData.message}
                                  onChange={handleChange}
                                  className="w-full p-3 rounded-xl border border-border/80 bg-background focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/50 text-xs transition-all duration-300 focus-visible:outline-none resize-none"
                                />
                              </div>

                              {/* HIPAA Shield */}
                              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/5 text-emerald-800 dark:text-emerald-400 border border-emerald-500/10">
                                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                                <span className="text-[10px]">HIPAA Compliant & Fully Encrypted.</span>
                              </div>

                              {/* Submit */}
                              <Button
                                type="submit"
                                variant="luxury"
                                size="lg"
                                disabled={isSubmitting}
                                className="w-full rounded-xl py-5 shadow-md hover:scale-[1.01] cursor-pointer"
                              >
                                {isSubmitting ? "Scheduling Consultation..." : "Request Appointment"}
                              </Button>

                            </form>
                          ) : (
                            <motion.div
                              key="doc-booking-success"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-center flex flex-col items-center space-y-4 py-6 max-w-sm mx-auto"
                            >
                              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <CheckCircle2 className="w-8 h-8" />
                              </div>
                              <h3 className="text-lg font-serif font-bold text-primary dark:text-foreground">
                                Consultation Reserved
                              </h3>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                Thank you, <span className="font-semibold text-primary dark:text-foreground">{formData.name}</span>. Your appointment date of <span className="font-semibold text-primary dark:text-foreground">{formData.date}</span> with {doctor.name.split(",")[0]} has been securely logged.
                              </p>
                              <div className="w-full bg-zinc-50 dark:bg-zinc-950/20 border border-border/60 rounded-xl p-3 text-left text-[11px] space-y-1.5">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Department</span>
                                  <span className="font-bold text-primary dark:text-foreground">{departmentName}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Specialist</span>
                                  <span className="font-bold text-primary dark:text-foreground">{doctor.name.split(",")[0]}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Concierge Direct</span>
                                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Triage Callback Pending</span>
                                </div>
                              </div>
                              <Button
                                variant="luxuryOutline"
                                className="rounded-full w-full cursor-pointer text-xs"
                                onClick={onClose}
                              >
                                Close Profile
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

              </Card>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
