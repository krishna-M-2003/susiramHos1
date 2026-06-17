import { SiteConfig, HospitalService, Doctor, Review } from "@/types"

export const SITE_CONFIG: SiteConfig = {
  name: "Susiram Premium Health",
  title: "Susiram Premium Healthcare | Luxury Care & Advanced Medicine",
  tagline: "Where luxury hospitality meets world-class medicine",
  description: "Experience world-class healthcare designed around your comfort and privacy. Combining state-of-the-art medical technology with high-end clinical expertise.",
  contact: {
    phone: "+1 (800) 555-0199",
    email: "concierge@susiramhealth.com",
    address: "742 Elite Medical Boulevard, Penthouse Suite, New York, NY 10021",
    workingHours: "24/7 Premium Care | Consultations: Mon-Sat 8:00 AM - 8:00 PM"
  },
  socials: {
    facebook: "https://facebook.com/susiramhealth",
    instagram: "https://instagram.com/susiramhealth",
    twitter: "https://twitter.com/susiramhealth",
    linkedin: "https://linkedin.com/company/susiramhealth"
  }
}

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Our Doctors", href: "/#doctors" },
  { label: "Luxury Facilities", href: "/#facilities" },
  { label: "Patient Reviews", href: "/#reviews" }
]

export const SERVICES: HospitalService[] = [
  {
    id: "cardio",
    slug: "cardiology",
    title: "Cardiology Sciences",
    description: "State-of-the-art heart care including non-invasive diagnostics, luxury recovery suites, and cutting-edge interventional cardiology led by world-renowned specialists.",
    icon: "Heart",
    details: "Our cardiac center offers comprehensive preventive, diagnostic, therapeutic, and rehabilitative services. Our state-of-the-art cath labs and dedicated cardiac intensive care units ensure optimal clinical outcomes for every patient.",
    features: [
      "24/7 Interventional Cardiac Suite",
      "Advanced Hybrid Operating Rooms",
      "Executive Cardiac Screening Programs",
      "Post-procedure Luxury Rehabilitation Suites"
    ]
  },
  {
    id: "neuro",
    slug: "neuroscience",
    title: "Neurological Institute",
    description: "Advanced neurological and neurosurgical treatments using minimally invasive procedures, precision robotic surgical tools, and custom rehab options.",
    icon: "Brain",
    details: "The Neurological Institute at Susiram is dedicated to offering personalized therapies for complex brain, spine, and nerve disorders. We utilize cutting-edge neuro-imaging and navigation techniques for neurosurgery.",
    features: [
      "Intraoperative MRI (iMRI) technology",
      "Minimally Invasive Spine Surgery",
      "Comprehensive Stroke Center of Excellence",
      "Cognitive and Motor Rehabilitation Programs"
    ]
  },
  {
    id: "ortho",
    slug: "orthopedics",
    title: "Orthopedic & Joint Center",
    description: "High-precision robotic joint replacements, sports medicine, and custom physical therapy designed to restore full mobility and athletic performance quickly.",
    icon: "Activity",
    details: "We specialize in the treatment of joint pain, sports injuries, and musculoskeletal conditions. Our orthopedic surgeons utilize the latest robotic-assisted surgical systems for precision joint replacements.",
    features: [
      "Mako Robotic-Assisted Surgery",
      "Elite Sports Medicine & Arthroscopy",
      "Custom Physical Therapy Gyms",
      "Rapid-Recovery Mobilization Protocols"
    ]
  },
  {
    id: "oncology",
    slug: "oncology",
    title: "Precision Oncology",
    description: "Personalized cancer care incorporating genetic sequencing, target therapies, immunotherapy, and holistic wellness support in a serene environment.",
    icon: "ShieldAlert",
    details: "Our Oncology program focuses on highly personalized cancer treatments tailored to the molecular blueprint of each tumor. We provide systemic therapies, targeted radiation, and supportive luxury therapies.",
    features: [
      "Next-Generation Genomic Testing",
      "Advanced Immunotherapy Programs",
      "Precision CyberKnife Stereotactic Radiosurgery",
      "Integrative Care & Spiritual Support Gardens"
    ]
  },
  {
    id: "pediatrics",
    slug: "pediatrics",
    title: "Pediatric Specialties",
    description: "Compassionate clinical excellence for infants, children, and adolescents, featuring premium family-friendly private care suites and pediatric specialists.",
    icon: "Baby",
    details: "Our pediatric wing provides complete inpatient and outpatient care, from immunizations and development milestones audits to specialized pediatric surgeries and emergency treatment.",
    features: [
      "Dedicated Child-Friendly VIP Suites",
      "24/7 Neonatal Intensive Care (NICU)",
      "Pediatric Surgery & Anesthesia Specialists",
      "Developmental and Behavior Assessments"
    ]
  },
  {
    id: "emergency",
    slug: "emergency-care",
    title: "Emergency & Trauma Care",
    description: "Immediate Level-1 trauma response operating 24/7, supported by in-house advanced imaging, express diagnostic labs, and critical care units.",
    icon: "Clock",
    details: "Susiram's emergency response is staffed by emergency board-certified clinicians ready to treat life-threatening conditions immediately.",
    features: [
      "24/7 Level-1 Trauma Response",
      "Direct Helipad & Ambulance Valet Intake",
      "Dedicated Rapid-Triage Systems",
      "In-Suite Express Diagnostic Scanner"
    ]
  }
]

export const DOCTORS: Doctor[] = [
  {
    id: "dr-adrian-vance",
    name: "Dr. Adrian Vance, MD, FACC",
    specialty: "Cardiology",
    role: "Chief of Interventional Cardiology",
    image: "/images/doctors/dr-adrian-vance.png",
    bio: "Dr. Vance is a pioneer in transcatheter aortic valve replacements (TAVR) and has over 20 years of clinical leadership in elite cardiac institutions.",
    rating: 4.9,
    reviewsCount: 342,
    experience: "22 Years of Experience",
    education: [
      "MD - Harvard Medical School",
      "Residency in Internal Medicine - Johns Hopkins Hospital",
      "Fellowship in Cardiology - Cleveland Clinic"
    ],
    achievements: [
      "Voted Best Cardiologist in NY (2022-2025)",
      "Published 80+ peer-reviewed papers in New England Journal of Medicine",
      "Pioneered micro-catheter cardiac interventions"
    ],
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      hours: "9:00 AM - 4:00 PM"
    }
  },
  {
    id: "dr-elena-rostova",
    name: "Dr. Elena Rostova, PhD, MD",
    specialty: "Neurology",
    role: "Director of Surgical Neuro-oncology",
    image: "/images/doctors/dr-elena-rostova.png",
    bio: "Dr. Rostova specializes in computer-assisted brain tumor resections and complex spinal reconstructions, utilizing state-of-the-art robotic assistance.",
    rating: 5.0,
    reviewsCount: 215,
    experience: "15 Years of Experience",
    education: [
      "MD - Stanford University School of Medicine",
      "PhD in Neuro-biology - Stanford University",
      "Residency in Neurosurgery - Mayo Clinic"
    ],
    achievements: [
      "Recipient of the National Neurological Research Award",
      "Founder of the Precision Neuro-Navigation Consortium",
      "Over 1,000 successful complex robotic brain surgeries"
    ],
    availability: {
      days: ["Tuesday", "Thursday"],
      hours: "10:00 AM - 5:00 PM"
    }
  },
  {
    id: "dr-marcus-thorne",
    name: "Dr. Marcus Thorne, MD",
    specialty: "Orthopedics",
    role: "Head of Sports Medicine & Robotic Joint Replacement",
    image: "/images/doctors/dr-marcus-thorne.png",
    bio: "Dr. Thorne focuses on rapid mobilization orthopedic surgeries, helping elite athletes and active individuals return to peak performance in record time.",
    rating: 4.8,
    reviewsCount: 412,
    experience: "18 Years of Experience",
    education: [
      "MD - Yale School of Medicine",
      "Residency in Orthopedic Surgery - Hospital for Special Surgery (HSS)",
      "Fellowship in Sports Medicine - UCSF Medical Center"
    ],
    achievements: [
      "Chief Medical Consultant for Professional Athletic Associations",
      "Pioneered the 'Rapid-Walk' post-hip replacement protocol",
      "Outstanding Educator Award in Robotic Orthopedic Surgery"
    ],
    availability: {
      days: ["Monday", "Tuesday", "Thursday"],
      hours: "8:30 AM - 3:30 PM"
    }
  }
]

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Eleanor Sterling",
    role: "Executive Director",
    content: "The level of care at Susiram is unmatched. From the private check-in lounge to the incredible expertise of Dr. Vance, I felt completely supported. It felt more like a luxury wellness retreat than a medical facility.",
    rating: 5,
    image: "/images/reviews/eleanor.png"
  },
  {
    id: "rev-2",
    author: "Richard Henderson",
    role: "Tech Entrepreneur",
    content: "I underwent robotic-assisted knee surgery with Dr. Thorne. The precision of the procedure and the dedication of the physical therapy team had me walking pain-free within weeks. An absolute first-class experience.",
    rating: 5,
    image: "/images/reviews/richard.png"
  },
  {
    id: "rev-3",
    author: "Charlotte Dupond",
    role: "Diplomat",
    content: "Susiram's Executive Health screening is efficient, highly detailed, and exceptionally comfortable. The diagnostic summary was comprehensive, and the consultation resolved all my health concerns in a single day.",
    rating: 5,
    image: "/images/reviews/charlotte.png"
  }
]
