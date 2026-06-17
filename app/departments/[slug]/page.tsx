import * as React from "react"
import { notFound } from "next/navigation"
import { SERVICES, DOCTORS } from "@/lib/constants"
import { DepartmentPageClient } from "./department-page-client"

// Department details database mapped by slug
const DEPARTMENT_DETAILS: Record<
  string,
  {
    subtitle: string
    overview: string
    conditions: string[]
    facilities: string[]
    benefits: string[]
    faqs: { q: string; a: string }[]
  }
> = {
  cardiology: {
    subtitle: "Nobel-caliber cardiovascular medicine and private post-op suite accommodations.",
    overview: "Susiram's Cardiology Sciences division is at the global forefront of non-invasive diagnostics, robotic-assisted coronary bypass, and clinical research. We offer tailored preventive therapies, express diagnostics, and state-of-the-art interventional suites.",
    conditions: [
      "Coronary Artery Disease",
      "Arrhythmias & Heart Blockages",
      "Congestive Heart Failure",
      "Valvular Heart Disease",
      "Hypertensive Cardiovascular Disease"
    ],
    facilities: [
      "Intraoperative Hybrid Cath Lab",
      "Express Cardiac Scanner Suite",
      "Post-Op Luxury Recovery Wings",
      "Tele-monitoring Command Center"
    ],
    benefits: [
      "Direct Access to Attending Cardiologist",
      "Private Diagnostics Suite (No Waiting Lines)",
      "Dedicated Cardiac Rehabilitation Suite Coordination"
    ],
    faqs: [
      {
        q: "How quickly can I schedule an executive cardiac screening?",
        a: "Executive screenings can be arranged within 24 to 48 hours through our medical coordinator."
      },
      {
        q: "What is your success rate for coronary interventions?",
        a: "Susiram maintains a 99.8% clinical success rate for elective coronary procedures, exceeding international benchmarks."
      }
    ]
  },
  neuroscience: {
    subtitle: "Advanced cognitive diagnostics and computer-guided neuro-navigation.",
    overview: "The Susiram Neurological Institute combines neurosurgical mastery with high-resolution diagnostic imaging. We offer state-of-the-art treatment for complex spinal reconstructions, stroke intervention, and neuro-oncology.",
    conditions: [
      "Brain & Spinal Cord Tumors",
      "Acute Ischemic Stroke",
      "Epilepsy & Seizure Disorders",
      "Parkinson's & Movement Disorders",
      "Chronic Migraine & Neuralgia"
    ],
    facilities: [
      "High-Field Intraoperative MRI (iMRI) Suite",
      "Computer-Assisted Neuro-Navigation Console",
      "Elite Spinal Surgery Theatres",
      "Neuro-Intensive Care Recovery Units"
    ],
    benefits: [
      "Consolidated Multi-specialist Board Reviews",
      "24/7 Access to Dedicated Neuro-ICU coordinators",
      "Customized Neuro-Rehab Gym Suites"
    ],
    faqs: [
      {
        q: "What is an intraoperative MRI?",
        a: "It is an advanced MRI that runs inside the operating theatre to check progress in real time during brain surgery, ensuring complete tumor clearance."
      },
      {
        q: "Do you offer post-stroke neurological rehabilitation?",
        a: "Yes, our dedicated neuro-rehabilitation wing offers intensive physical, speech, and occupational therapies tailored to speed up recovery."
      }
    ]
  },
  orthopedics: {
    subtitle: "Robotic-assisted joint replacement and elite athletic performance recovery.",
    overview: "Susiram's Orthopedic & Joint Center focuses on restoring complete motor performance. Utilizing the Mako robotic-assisted system, we provide high-precision joint replacements and advanced sports medicine.",
    conditions: [
      "Osteoarthritis & Joint Degeneration",
      "ACL & Meniscal Tears",
      "Rotator Cuff & Shoulder Injuries",
      "Complex Spinal Deformities",
      "Rheumatoid Arthritis Complications"
    ],
    facilities: [
      "Mako Surgical Robot Suites",
      "High-Resolution Diagnostic Ultrasound Rooms",
      "Dedicated Orthopedic Recovery Suites",
      "Custom Physical Therapy Gyms"
    ],
    benefits: [
      "Minimally Invasive Techniques for Faster Recovery",
      "Personalized Sports Physiotherapist Assignment",
      "Premium Post-Operative Pain Management Protocols"
    ],
    faqs: [
      {
        q: "How long is the recovery period after a robotic knee replacement?",
        a: "With our Rapid-Walk protocol, patients are usually mobilized within hours of surgery and can return to daily activities in 2 to 4 weeks."
      },
      {
        q: "Do you treat professional sports injuries?",
        a: "Yes, we coordinate care directly with professional athletic organizations and provide elite recovery programs."
      }
    ]
  },
  oncology: {
    subtitle: "Next-generation genomic profiling and target cancer immunotherapy.",
    overview: "Susiram's Precision Oncology center focuses on tumor genotyping to design targeted systemic therapies. Combining radiation oncology (CyberKnife) and personalized infusion programs in a tranquil recovery environment.",
    conditions: [
      "Breast & Gynecological Cancers",
      "Lung & Thoracic Malignancies",
      "Gastrointestinal Cancers",
      "Prostate & Urological Cancers",
      "Hematological Malignancies (Leukemia/Lymphoma)"
    ],
    facilities: [
      "CyberKnife Radiosurgery Suite",
      "Premium Private Infusion Lounges",
      "On-site Genomic Diagnostics Lab",
      "Serene Holistic Healing Gardens"
    ],
    benefits: [
      "Custom Molecular-Targeted Treatment Programs",
      "Private Infusion Suites with Dedicated Nursing Care",
      "Multidisciplinary Tumor Board Consultation"
    ],
    faqs: [
      {
        q: "What is genomic tumor sequencing?",
        a: "It is a molecular test performed on tumor tissue to map its genetic profile, helping us target therapies specific to your cancer's blueprint."
      },
      {
        q: "Are family members accommodated during infusion sessions?",
        a: "Yes, our private infusion suites are designed with family lounges, entertainment centers, and hospitality dining."
      }
    ]
  },
  pediatrics: {
    subtitle: "Nurturing clinical excellence and dedicated private family care wings.",
    overview: "Our Pediatric Specialties division offers premium medical care for infants, children, and adolescents. From diagnostic evaluations to complex pediatric surgeries, we combine high-level medicine with child-friendly environments.",
    conditions: [
      "Pediatric Cardiac Conditions",
      "Childhood Development & Growth Audits",
      "Acute Childhood Illnesses",
      "Juvenile Diabetes & Endocrine Care",
      "Pediatric Musculoskeletal Conditions"
    ],
    facilities: [
      "24/7 Level-3 Neonatal Intensive Care Unit (NICU)",
      "Theme-designed VIP Pediatric Recovery Suites",
      "Express Pediatric Diagnostic Imaging",
      "Childhood Development Evaluation Labs"
    ],
    benefits: [
      "24/7 Direct Coordinator Routing for Emergencies",
      "Child Life Specialists on Staff to Reduce Anxiety",
      "Family Accommodations in Private Rooms"
    ],
    faqs: [
      {
        q: "Can parents stay overnight in the pediatric recovery suites?",
        a: "Absolutely. All pediatric suites include premium sleeper sofas, full bathrooms, and workspace facilities for parents."
      },
      {
        q: "Do you have pediatric emergency physicians on duty?",
        a: "Yes, our pediatric emergency desk is staffed by board-certified pediatric specialists 24/7."
      }
    ]
  },
  "emergency-care": {
    subtitle: "24/7 immediate Level-1 response, private ambulance valet, and express diagnostics.",
    overview: "Susiram's Emergency & Trauma Care center delivers immediate medical response. Supported by in-house advanced imaging, express diagnostic laboratories, and critical care units, we prioritize immediate resuscitation and treatment of life-threatening emergencies.",
    conditions: [
      "Acute Cardiovascular Emergencies",
      "Severe Respiratory Distress",
      "Polytrauma & Spinal Emergencies",
      "Neurological Stroke Emergencies",
      "Severe Allergic Reactions (Anaphylaxis)"
    ],
    facilities: [
      "Level-1 Emergency Trauma Bays",
      "Direct Helipad Intake Suites",
      "Dedicated In-Suite Express CT Scanner",
      "Rapid-Turnaround Biochemistry Lab"
    ],
    benefits: [
      "Immediate Triage and Zero Wait Times for Critical Care",
      "Direct Specialists Callout System (Board-Certified Cardiologists/Neurologists)",
      "Private Inpatient Care Suite Direct Transfers"
    ],
    faqs: [
      {
        q: "What is your average wait time for emergency patients?",
        a: "Susiram operates on a zero-delay triage model; critical emergencies are immediately directed to private trauma suites upon arrival."
      },
      {
        q: "How do you coordinate with emergency ambulances?",
        a: "Our command center coordinates directly with air and road ambulance operators to activate specialized medical boards before the patient arrives."
      }
    ]
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return {}

  return {
    title: `${service.title} | Susiram Premium Healthcare`,
    description: service.description,
  }
}

export default async function DepartmentPage({ params }: PageProps) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  const detail = DEPARTMENT_DETAILS[slug]

  if (!service || !detail) {
    notFound()
  }

  // Filter global doctors matching this specialty
  const specialists = DOCTORS.filter((doc) => {
    const specialtySlug = doc.specialty.toLowerCase()
    if (slug === "cardiology" && specialtySlug.includes("cardio")) return true
    if (slug === "neuroscience" && specialtySlug.includes("neuro")) return true
    if (slug === "orthopedics" && specialtySlug.includes("ortho")) return true
    return false
  })

  return (
    <DepartmentPageClient
      slug={slug}
      service={service}
      detail={detail}
      specialists={specialists}
    />
  )
}
