"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useTranslation } from "@/lib/translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ExternalLink, Download } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"
import PDFGenerator from "@/components/pdf-generator"

export default function ResumeContent() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [stackIndex, setStackIndex] = useState(0)
  const projectsRef = useRef<HTMLDivElement>(null)

  const stacks = ["Software Engineer Student", "Full-stack Developer", "Java", "Node.js", "React"]

  useEffect(() => {
    const interval = setInterval(() => {
      setStackIndex((prevIndex) => (prevIndex + 1) % stacks.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Project carousel navigation
  const scrollProjects = (direction: "left" | "right") => {
    if (projectsRef.current) {
      const scrollAmount = direction === "left" ? -projectsRef.current.offsetWidth : projectsRef.current.offsetWidth

      projectsRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Sample projects with links
  const projects = [
    {
      id: 1,
      title: t("projects.project1.title"),
      description: t("projects.project1.description"),
      technologies: t("projects.project1.technologies"),
      link: "https://github.com/luanferreiradev/banco-malvader",
    },
    {
      id: 2,
      title: t("projects.project2.title"),
      description: t("projects.project2.description"),
      technologies: t("projects.project2.technologies"),
      link: "https://github.com/luanferreiradev/sistema-pedidos",
    },
    {
      id: 3,
      title: t("projects.project3.title"),
      description: t("projects.project3.description"),
      technologies: t("projects.project3.technologies"),
      link: "https://github.com/luanferreiradev/chess",
    },
    // Add more projects if needed
    {
      id: 4,
      title: "Portfolio Website",
      description: "My personal portfolio website built with Next.js and Tailwind CSS.",
      technologies: "Next.js, TypeScript, Tailwind CSS",
      link: "https://github.com/luanferreiradev/portfolio",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Interactive Resume</h1>
          <div className="flex items-center gap-4">
            <DownloadButton />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section - Apple-inspired with photo on right */}
        <section className="py-16 md:py-24 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 text-left mb-16 md:mb-0 animate-fade-in">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                  {t("hero.name")}
                </h1>
                <div className="h-8 overflow-hidden mb-8">
                  <p className="text-xl md:text-2xl text-red-600 dark:text-red-400 font-medium animate-slide-up">
                    {stacks[stackIndex]}
                  </p>
                </div>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
                  {t("hero.description")}
                </p>

                <div className="flex flex-wrap gap-4 sm:gap-6 mt-8 sm:mt-10">
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full"
                    asChild
                  >
                    <a href="#contact">{t("hero.contact")}</a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-gray-800 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full"
                  >
                    {t("hero.resume")}
                  </Button>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-center animate-float">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/85955653-FINwFJDe8SdQ3PzJXwzklx8zu1naOO.jpeg"
                    alt={t("hero.photoAlt")}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resume PDF Section */}
        <section id="resume" className="py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12 md:mb-16">
              Resume
            </h2>
            <div className="max-w-4xl mx-auto">
              <PDFGenerator />
            </div>
          </div>
        </section>

        {/* Projects Section - Horizontal Scrolling */}
        <section id="projects" className="py-16 md:py-24 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12 md:mb-16">
              {t("projects.title")}
            </h2>

            {/* Project Navigation Buttons */}
            <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-gray-800"
                onClick={() => scrollProjects("left")}
                aria-label="Previous projects"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-gray-800"
                onClick={() => scrollProjects("right")}
                aria-label="Next projects"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Scrollable Projects Container */}
            <div
              ref={projectsRef}
              className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide max-w-6xl mx-auto"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-full sm:w-[calc(100%/2-16px)] lg:w-[calc(100%/3-16px)] px-2 snap-center"
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    link={project.link}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Apple-inspired */}
        <section id="contact" className="py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12 md:mb-16">
              {t("contact.title")}
            </h2>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white dark:bg-gray-800 border-0 rounded-2xl shadow-xl overflow-hidden animate-fade-in">
                <CardContent className="p-6 sm:p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {t("contact.getInTouch")}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">{t("contact.message")}</p>
                      <div className="space-y-6">
                        <a
                          href="mailto:luanhsouzaf@gmail.com"
                          className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-red-600 dark:text-red-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                              <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                          </div>
                          <span className="text-lg">luanhsouzaf@gmail.com</span>
                        </a>
                        <a
                          href="https://github.com/luanferreiradev"
                          className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-red-600 dark:text-red-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                          </div>
                          <span className="text-lg">github.com/luanferreiradev</span>
                        </a>
                        <a
                          href="https://linkedin.com/in/luanferreiradev"
                          className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-red-600 dark:text-red-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                          </div>
                          <span className="text-lg">linkedin.com/in/luanferreiradev</span>
                        </a>
                      </div>
                    </div>
                    <form className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          {t("contact.form.name")}
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-400 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          {t("contact.form.email")}
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-400 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          {t("contact.form.message")}
                        </label>
                        <textarea
                          id="message"
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-400 dark:bg-gray-700 dark:text-white"
                        ></textarea>
                      </div>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-5 sm:py-6 rounded-lg text-base sm:text-lg">
                        {t("contact.form.send")}
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Luan Ferreira. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function ProjectCard({
  title,
  description,
  technologies,
  link,
}: {
  title: string
  description: string
  technologies: string
  link?: string
}) {
  return (
    <Card className="bg-white dark:bg-gray-800 border-0 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in h-full flex flex-col">
      <div className="h-48 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-800">
        <div className="h-full w-full flex items-center justify-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white px-6 text-center">{title}</h3>
        </div>
      </div>
      <CardContent className="p-6 flex-grow flex flex-col justify-between">
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{description}</p>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {technologies.split(", ").map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {link && (
            <Button
              variant="outline"
              className="w-full border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-gray-800 mt-4"
              asChild
            >
              <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                View Project <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)

      // Get the iframe element
      const iframe = document.querySelector("iframe") as HTMLIFrameElement

      if (iframe && iframe.src) {
        // Create a link element
        const link = document.createElement("a")
        link.href = iframe.src
        link.download = "resume.pdf"

        // Append to the document
        document.body.appendChild(link)

        // Trigger download
        link.click()

        // Clean up
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error("Error downloading PDF:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button onClick={handleDownload} disabled={isDownloading} className="flex items-center gap-2">
      <Download className="h-4 w-4" />
      <span>{isDownloading ? "Downloading..." : "Download PDF"}</span>
    </Button>
  )
}
