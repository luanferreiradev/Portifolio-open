"use client"

import { useEffect, useState } from "react"
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"
import { useLanguage } from "@/lib/language-context"
import resumeData from "@/data/resume-data"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function PDFGenerator() {
  const { language } = useLanguage()
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const data = resumeData[language]

  useEffect(() => {
    async function generatePDF() {
      const pdfDoc = await PDFDocument.create()
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
      const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)

      const page = pdfDoc.addPage([612, 792]) // Letter size
      const { width, height } = page.getSize()
      const margin = 50
      let y = height - margin
      const lineHeight = 14

      // Helper function to add text
      const addText = (text: string, x: number, fontSize: number, isBold = false, maxWidth?: number) => {
        const font = isBold ? timesRomanBoldFont : timesRomanFont

        if (maxWidth) {
          // Simple word wrapping
          const words = text.split(" ")
          let line = ""

          for (const word of words) {
            const testLine = line + (line ? " " : "") + word
            const testWidth = font.widthOfTextAtSize(testLine, fontSize)

            if (testWidth > maxWidth && line) {
              page.drawText(line, { x, y, size: fontSize, font })
              y -= lineHeight
              line = word
            } else {
              line = testLine
            }
          }

          if (line) {
            page.drawText(line, { x, y, size: fontSize, font })
          }
        } else {
          page.drawText(text, { x, y, size: fontSize, font })
        }

        y -= lineHeight
      }

      // Add section title
      const addSectionTitle = (title: string) => {
        y -= 10 // Add some space before section
        addText(title, margin, 12, true)
        page.drawLine({
          start: { x: margin, y: y + 5 },
          end: { x: width - margin, y: y + 5 },
          thickness: 1,
          color: rgb(0, 0, 0),
        })
        y -= 5
      }

      // Header
      addText(data.header.name, margin, 16, true)
      addText(`${data.header.location} | ${data.header.phone}`, margin, 10)
      addText(`Email: ${data.header.email} | LinkedIn: ${data.header.linkedin}`, margin, 10)

      // Objective
      addSectionTitle(data.objective.title)
      addText(data.objective.content, margin, 10, false, width - 2 * margin)

      // Summary
      addSectionTitle(data.summary.title)
      addText(data.summary.content, margin, 10, false, width - 2 * margin)

      // Skills
      addSectionTitle(data.skills.title)
      for (const category of data.skills.categories) {
        addText(`${category.title}: ${category.skills}`, margin, 10, false, width - 2 * margin)
      }

      // Projects
      addSectionTitle(data.projects.title)
      for (const project of data.projects.items) {
        addText(`${project.title} | ${project.organization} - ${project.location}`, margin, 10, true)
        addText(project.date, margin, 10)
        addText(project.description, margin, 10, false, width - 2 * margin)
        for (const achievement of project.achievements) {
          addText(`- ${achievement}`, margin + 10, 10, false, width - 2 * margin - 10)
        }
        y -= 5 // Add space between projects
      }

      // Experience
      addSectionTitle(data.experience.title)
      for (const exp of data.experience.items) {
        addText(`${exp.position} | ${exp.company} - ${exp.location}`, margin, 10, true)
        addText(exp.date, margin, 10)
        addText(exp.description, margin, 10, false, width - 2 * margin)
        for (const achievement of exp.achievements) {
          addText(`- ${achievement}`, margin + 10, 10, false, width - 2 * margin - 10)
        }
        y -= 5 // Add space between experiences
      }

      // Education
      addSectionTitle(data.education.title)
      for (const edu of data.education.items) {
        addText(`${edu.degree} - ${edu.institution}`, margin, 10, true)
        addText(edu.date, margin, 10)
        addText(edu.courses, margin, 10, false, width - 2 * margin)
        y -= 5 // Add space between education items
      }

      // Certifications
      addSectionTitle(data.certifications.title)
      for (const cert of data.certifications.items) {
        addText(`- ${cert}`, margin, 10, false, width - 2 * margin)
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      setPdfUrl(url)

      return () => {
        URL.revokeObjectURL(url)
      }
    }

    generatePDF()
  }, [language, data])

  const openInNewTab = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer")
    }
  }

  if (!pdfUrl) {
    return <div className="flex justify-center items-center h-[800px]">Loading PDF...</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-[800px] border border-gray-300 rounded-lg overflow-hidden">
        <iframe src={pdfUrl} className="w-full h-full" title="Resume PDF" />
      </div>
      <div className="flex justify-center gap-4">
        <Button onClick={openInNewTab} className="flex items-center gap-2 bg-red-600 hover:bg-red-700">
          <ExternalLink className="h-4 w-4" />
          <span>Open in New Tab</span>
        </Button>
      </div>
    </div>
  )
}
