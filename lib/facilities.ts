export interface Facility {
  id: string
  slug: string
  title: string
  description: string
  image: string
  iconName: "Cpu" | "Activity" | "Heart" | "ShieldAlert" | "Bed" | "FlaskConical"
  highlights: string[]
  ctaText: string
  overview: string
  features: string[]
  technology: string[]
  benefits: string[]
  gallery: string[]
  faqs: { question: string; answer: string }[]
  contact: { phone: string; email: string; location: string }
}

export const FACILITIES: Facility[] = [
  {
    id: "advanced-operation-theatres",
    slug: "advanced-operation-theatres",
    title: "Advanced Operation Theatres",
    description: "Surgical suites equipped with robotic assistance systems and HEPA sterile filtration for ultimate safety.",
    image: "/images/facilities/operation-theatre.png",
    iconName: "Cpu",
    highlights: [
      "Mako & CyberKnife robotics",
      "Intraoperative MRI integration",
      "Ultra-pure hybrid airflow systems"
    ],
    ctaText: "Explore Surgical Tech",
    overview: "Our Advanced Operation Theatres are designed to support complex surgical procedures with maximum precision and zero-compromise patient safety. Featuring sterile positive-pressure environments and world-class instrumentation, our suites are managed by Ivy-League surgical directors.",
    features: [
      "Robotic-arm assisted surgical guidance systems",
      "Real-time neuro-navigation and digital organ mapping",
      "Positive pressure laminar flow keeping air particulates at absolute zero"
    ],
    technology: [
      "Mako Robotic-Arm Assisted System (Orthopedics)",
      "CyberKnife Robotic Radiosurgery System (Oncology)",
      "Intraoperative MRI (iMRI) real-time scanning suites"
    ],
    benefits: [
      "Minimally invasive incisions for minimal scarring",
      "Drastically reduced recovery window times",
      "Lowest post-operative infection index in the region"
    ],
    gallery: [
      "/images/facilities/operation-theatre.png",
      "/images/facilities/surgical-suite.png"
    ],
    faqs: [
      {
        question: "What is robotic-assisted surgery?",
        answer: "Robotic-assisted surgery allows your surgeon to perform complex procedures with significantly more precision, flexibility, and control than traditional surgical methods."
      },
      {
        question: "How is the sterile environment maintained?",
        answer: "We utilize multi-stage HEPA filtration and positive laminar airflow to cycle and purify the theatre air over 24 times per hour, exceeding standard operating room guidelines."
      }
    ],
    contact: {
      phone: "+1 (800) 555-0199 ext. 401",
      email: "surgery@susiramhealth.com",
      location: "East Wing, 4th Floor"
    }
  },
  {
    id: "imaging-diagnostics",
    slug: "imaging-diagnostics",
    title: "Advanced Imaging & Diagnostics",
    description: "Siemens 3T MRI, GE 256-slice CT, digital ultrasound and expedited diagnostics under one roof.",
    image: "/images/facilities/imaging-diagnostics.png",
    iconName: "Activity",
    highlights: [
      "Quiet-bore 3T MRI systems",
      "Low-radiation 256-slice CT scans",
      "Expedited 2-hour report turnaround"
    ],
    ctaText: "View Diagnostic Tech",
    overview: "Our diagnostic department provides ultra-high resolution structural scans with a focus on guest comfort. By deploying advanced quiet-bore technology and accelerated reconstruction algorithms, we offer detailed reports with reduced testing time.",
    features: [
      "Shorter scan times with intelligent AI reconstruction",
      "Wide quiet-bore systems to accommodate claustrophobic guests",
      "Low-radiation CT imaging matching pediatric-level exposure safety"
    ],
    technology: [
      "Siemens Magnetom Vida 3T MRI System",
      "GE Revolution 256-Slice CT Scanner",
      "High-Definition Voluson 3D/4D Ultrasound"
    ],
    benefits: [
      "Extremely detailed scans ensuring accurate diagnostic paths",
      "Same-day test scheduling with minimal waiting lists",
      "Secure digital dashboard delivery of diagnostic reports"
    ],
    gallery: [
      "/images/facilities/imaging-diagnostics.png",
      "/images/facilities/diagnostics-suite.png"
    ],
    faqs: [
      {
        question: "Do I need to prepare in advance for my scan?",
        answer: "Certain procedures like contrast CTs or MRIs require fasting. Our concierge team will reach out with personalized preparation notes at least 24 hours before your slot."
      },
      {
        question: "How long does it take to receive diagnostic results?",
        answer: "All standard scans are processed and reported within 2 hours. Complex specialty audits are finalized within 24 hours."
      }
    ],
    contact: {
      phone: "+1 (800) 555-0199 ext. 402",
      email: "diagnostics@susiramhealth.com",
      location: "West Wing, Ground Floor"
    }
  },
  {
    id: "intensive-care-unit",
    slug: "intensive-care-unit",
    title: "Intensive Care Unit (ICU)",
    description: "24/7 continuous critical care monitoring staffed by dedicated intensivists and specialized teams.",
    image: "/images/facilities/icu-room.png",
    iconName: "Heart",
    highlights: [
      "24/7 dedicated board intensivists",
      "Advanced life support telemetry",
      "Strict infection isolation suites"
    ],
    ctaText: "Explore ICU Services",
    overview: "Our Intensive Care Unit combines cutting-edge life support platforms with a compassionate 1:1 care model. Staffed continuously by specialized critical care board physicians, we provide rapid-response treatment for unstable patient parameters.",
    features: [
      "Continuous invasive and non-invasive hemodynamic monitoring",
      "Negative-pressure airflow rooms for absolute isolation",
      "Multi-disciplinary triage response teams on stand-by 24/7"
    ],
    technology: [
      "Mindray BeneVision Multi-Parameter Monitors",
      "Hamilton-C6 Intelligent Ventilators",
      "Continuous Renal Replacement Therapy (CRRT) machines"
    ],
    benefits: [
      "1:1 patient-to-nurse monitoring ratios",
      "Instantaneous on-site physician emergency intervention",
      "Tranquil, noise-insulated rooms designed to promote healing"
    ],
    gallery: [
      "/images/facilities/icu-room.png",
      "/images/facilities/vip-suite.png"
    ],
    faqs: [
      {
        question: "What are the visiting hours for the ICU?",
        answer: "To ensure patient rest and safety, visiting is restricted to immediate family. However, our adjoining private lounges remain open for you 24/7."
      },
      {
        question: "How is infection risk managed in the ICU?",
        answer: "We deploy active HEPA filtration, strict hand hygiene protocols, and negative pressure chambers to keep cross-contamination indexes at zero."
      }
    ],
    contact: {
      phone: "+1 (800) 555-0199 ext. 403",
      email: "icu@susiramhealth.com",
      location: "North Tower, 3rd Floor"
    }
  },
  {
    id: "emergency-trauma-center",
    slug: "emergency-trauma-center",
    title: "Emergency & Trauma Center",
    description: "Level-1 emergency response handling critical triages, direct ambulance valets, and helipads.",
    image: "/images/facilities/emergency-room.png",
    iconName: "ShieldAlert",
    highlights: [
      "Level-1 trauma certified response",
      "Direct helipad entry routing",
      "Dedicated trauma surgeon teams"
    ],
    ctaText: "Explore Emergency Care",
    overview: "Susiram's Emergency & Trauma Center operates as a premier Level-1 designated response hub. Operating 24 hours a day, our unit features designated helipads, direct ambulance intake, and dedicated critical surgical suites.",
    features: [
      "Express intake desks bypassing general hospital administration",
      "Dedicated on-site CT and ultrasound scanners within the ER",
      "Direct rapid-link elevator connecting ER to cardiac cath labs"
    ],
    technology: [
      "Dedicated Point-of-Care Blood Gas Analyzers",
      "Sonosite Advanced Ultrasound Trauma systems",
      "Automated chest compression life-support units"
    ],
    benefits: [
      "Immediate triage by certified trauma coordinators",
      "In-suite diagnostics reducing critical transport delay times",
      "Seamless integration with critical surgical departments"
    ],
    gallery: [
      "/images/facilities/emergency-room.png",
      "/images/facilities/surgical-suite.png"
    ],
    faqs: [
      {
        question: "Do you accept walk-in emergencies?",
        answer: "Yes, our Level-1 Emergency room is fully open for all walk-in and ambulance emergencies 24/7/365."
      },
      {
        question: "What should I bring during an emergency intake?",
        answer: "If possible, bring a photo ID and insurance details. However, our medical staff will prioritize immediate clinical care before any documentation."
      }
    ],
    contact: {
      phone: "+1 (800) 555-0199 ext. 911",
      email: "emergency@susiramhealth.com",
      location: "Ground Level, South Entrance"
    }
  },
  {
    id: "private-patient-suites",
    slug: "private-patient-suites",
    title: "Private Patient Suites",
    description: "Luxury healing suites with adjustable beds, en-suite dining, and guest lounge rooms.",
    image: "/images/facilities/patient-suite.png",
    iconName: "Bed",
    highlights: [
      "Five-star private hotel suites",
      "Personal concierge attendance",
      "Custom gourmet chef menu"
    ],
    overview: "Experience clinical care in a recovery suite designed to resemble a premium boutique hotel. Featuring en-suite marble bathrooms, customized circadian rhythm lighting, and separate guest lounges, we ensure your healing journey is exceptionally comfortable.",
    ctaText: "Explore Patient Suites",
    features: [
      "Adjustable therapeutic massage beds with premium organic linens",
      "Gourmet dining with customized menus prepared by our in-house chef",
      "Integrated smart panels controls for lights, climate, and nurse paging"
    ],
    technology: [
      "Circadian Rhythm LED Lighting controls",
      "Intelligent Patient Portals (bedside clinical summaries)",
      "Hidden medical gas output nodes behind premium wood panels"
    ],
    benefits: [
      "Peaceful, quiet environment with advanced soundproofing",
      "Private overnight lounge setups for family members",
      "Expedited healing supported by luxury amenities"
    ],
    gallery: [
      "/images/facilities/patient-suite.png",
      "/images/facilities/vip-suite.png"
    ],
    faqs: [
      {
        question: "Can family members stay overnight?",
        answer: "Yes, each VIP patient suite features an adjacent private lounge room equipped with a comfortable sleeper sofa and separate washroom."
      },
      {
        question: "Are dietary accommodations available?",
        answer: "Absolutely. Our clinical nutritionist and executive chef collaborate to customize your daily menu matching any dietary guidelines."
      }
    ],
    contact: {
      phone: "+1 (800) 555-0199 ext. 404",
      email: "concierge@susiramhealth.com",
      location: "Penthouse Level, Floors 7 & 8"
    }
  },
  {
    id: "laboratory-services",
    slug: "laboratory-services",
    title: "Laboratory Services",
    description: "Fully automated clinical pathology, hematology, and genetic sequencing labs.",
    image: "/images/facilities/lab-services.png",
    iconName: "FlaskConical",
    highlights: [
      "Automated robotic analyzers",
      "Next-Gen Genomic sequencing",
      "Secure encrypted patient portals"
    ],
    ctaText: "Explore Laboratory",
    overview: "Our pathology laboratories process diagnostic tests with maximum precision. Using automated chemical analyzers and Next-Generation Sequencing platforms, we deliver fast, accurate, and validated diagnostics.",
    features: [
      "Automated high-throughput specimen processing",
      "Specialized molecular oncology and genetic auditing suites",
      "Dual-validation protocols overseen by board-certified pathologists"
    ],
    technology: [
      "Illumina NextSeq Genomic Sequencing Platform",
      "Roche Cobas 8000 Clinical Chemistry Line",
      "Qiagen QIAcube Molecular Extraction Automation"
    ],
    benefits: [
      "Extremely high diagnostic precision with dual checks",
      "Rapid turnaround times reducing anxiety and delays",
      "Automatic and encrypted upload to your patient chart"
    ],
    gallery: [
      "/images/facilities/lab-services.png",
      "/images/facilities/fine-dining.png"
    ],
    faqs: [
      {
        question: "Do I need an appointment for standard blood work?",
        answer: "No, walk-ins are welcome for standard diagnostics. However, genetic evaluations require scheduling a consult via your coordinator."
      },
      {
        question: "Are my genetic tests secure?",
        answer: "Yes, all genetic sequences are fully encrypted, HIPAA-compliant, and shared exclusively with your designated specialists."
      }
    ],
    contact: {
      phone: "+1 (800) 555-0199 ext. 405",
      email: "lab@susiramhealth.com",
      location: "West Wing, 2nd Floor"
    }
  }
]

export function getFacilityBySlug(slug: string): Facility | undefined {
  return FACILITIES.find((f) => f.slug === slug)
}
