interface WhatsAppEnquiryData {
  name: string
  phone: string
  email: string
  department?: string
  date?: string
  doctor?: string
  service?: string
  message?: string
}

export function sendWhatsAppEnquiry(data: WhatsAppEnquiryData) {
  const whatsappNumber = "916384590679"
  
  // Dynamic page title / URL path
  const pageName = typeof window !== "undefined" ? `${document.title} (${window.location.pathname})` : "Website"
  
  // Format Indian Standard Time (IST) timestamp
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "medium",
  })

  // Format the template strictly for your WhatsApp inbox
  const messageText = `🏥 New Website Enquiry

Full Name:
${data.name || "N/A"}

Phone Number:
${data.phone || "N/A"}

Email:
${data.email || "N/A"}

Department:
${data.department || "N/A"}

Preferred Date:
${data.date || "N/A"}

Doctor:
${data.doctor || "N/A"}

Service:
${data.service || "N/A"}

Message:
${data.message || "N/A"}

Submitted From:
${pageName}

Submission Time:
${timestamp}`

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`
  
  if (typeof window !== "undefined") {
    window.open(whatsappUrl, "_blank")
  }
}
