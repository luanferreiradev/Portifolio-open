"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTranslation } from "@/lib/translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import { ChevronLeft, ChevronRight, ExternalLink, Star, GitFork, Loader2 } from "lucide-react"
import { getPinnedRepos, getRepos, type GithubRepo } from "@/lib/github-service"

export default function Home() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [stackIndex, setStackIndex] = useState(0)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const stacks = ["Software Engineer Student", "Full-stack Developer", "Java", "Node.js", "React"]

  const [githubProjects, setGithubProjects] = useState<GithubRepo[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [projectError, setProjectError] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState<"github" | "fallback">("github")

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

  // Mouse drag scrolling for projects
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!projectsRef.current) return

    setIsDragging(true)
    setStartX(e.pageX - projectsRef.current.offsetLeft)
    setScrollLeft(projectsRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !projectsRef.current) return

    e.preventDefault()
    const x = e.pageX - projectsRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    projectsRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    async function fetchGithubProjects() {
      setIsLoadingProjects(true)
      setProjectError(null)

      try {
        // Try to fetch pinned repos first
        let repos = await getPinnedRepos()

        // Check if we got fallback data
        if (repos.length > 0 && repos[0].id === "1" && repos[0].name === "Banking System") {
          setDataSource("fallback")
        } else {
          setDataSource("github")

          // If no pinned repos, try to fetch regular repos
          if (repos.length === 0) {
            repos = await getRepos()
            if (repos.length > 0 && repos[0].id === "1" && repos[0].name === "Banking System") {
              setDataSource("fallback")
            }
          }
        }

        setGithubProjects(repos)
      } catch (error) {
        console.error("Error fetching GitHub projects:", error)
        setProjectError("Failed to load projects from GitHub. Showing sample projects instead.")
        setDataSource("fallback")
      } finally {
        setIsLoadingProjects(false)
      }
    }

    fetchGithubProjects()
  }, [])

  // Adicione este useEffect para configurar o auto-scroll

  // Auto-scroll para os projetos
  useEffect(() => {
    if (!projectsRef.current) return;
    
    // Tempo em milissegundos entre cada movimento
    const SCROLL_INTERVAL = 3000;
    // Quantidade a ser deslocada
    const SCROLL_AMOUNT = 300; 
    
    let scrollDirection = 1; // 1 para direita, -1 para esquerda
    let scrollTimer: NodeJS.Timeout;
    
    const autoScroll = () => {
      if (!projectsRef.current) return;
      
      const maxScroll = projectsRef.current.scrollWidth - projectsRef.current.clientWidth;
      const currentScroll = projectsRef.current.scrollLeft;
      
      // Muda a direção quando alcança os limites
      if (currentScroll >= maxScroll - 5) {
        scrollDirection = -1;
      } else if (currentScroll <= 5) {
        scrollDirection = 1;
      }
      
      projectsRef.current.scrollBy({
        left: SCROLL_AMOUNT * scrollDirection,
        behavior: 'smooth'
      });
    };
    
    // Inicia o timer para auto-scroll
    scrollTimer = setInterval(autoScroll, SCROLL_INTERVAL);
    
    // Função para pausar o auto-scroll quando o usuário interage
    const pauseScroll = () => {
      clearInterval(scrollTimer);
    };
    
    // Função para retomar o auto-scroll após um período de inatividade
    const resumeScroll = () => {
      clearInterval(scrollTimer);
      scrollTimer = setInterval(autoScroll, SCROLL_INTERVAL);
    };
    
    // Adiciona listeners para pausar durante interação
    if (projectsRef.current) {
      projectsRef.current.addEventListener('mouseenter', pauseScroll);
      projectsRef.current.addEventListener('touchstart', pauseScroll);
      projectsRef.current.addEventListener('mouseleave', resumeScroll);
      projectsRef.current.addEventListener('touchend', () => {
        // Delay para retomar após o toque terminar
        setTimeout(resumeScroll, 1000);
      });
    }
    
    // Limpeza do efeito
    return () => {
      clearInterval(scrollTimer);
      if (projectsRef.current) {
        projectsRef.current.removeEventListener('mouseenter', pauseScroll);
        projectsRef.current.removeEventListener('touchstart', pauseScroll);
        projectsRef.current.removeEventListener('mouseleave', resumeScroll);
        projectsRef.current.removeEventListener('touchend', resumeScroll);
      }
    };
  }, [projectsRef.current]); // Dependência no ref, só roda uma vez depois da montagem

  // Na parte do botão de currículo, adicione validação de caminho

  const safeResumePath = (path: string) => {
    // Verifica se o caminho é válido e contém apenas caracteres seguros
    const safePath = path.replace(/[^a-zA-Z0-9-_.\/]/g, '');
    
    // Certifique-se de que o caminho começa com /pdf/ e termina com .pdf
    if (!safePath.startsWith('/pdf/') || !safePath.endsWith('.pdf')) {
      return '/pdf/default-resume.pdf';
    }
    
    return safePath;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Header />

      <main>
        {/* Hero Section - Apple-inspired with photo on right */}
        <section id="hero" className="section-primary py-16 md:py-24 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 text-left mb-16 md:mb-0 animate-fade-in md:pl-8 lg:pl-12">
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
                    asChild
                  >
                    <a 
                      href={safeResumePath(language === "pt" ? "/pdf/CV Luan Ferreira.pdf" : "/pdf/_Luan_Ferreira_Resume.pdf")} 
                      download
                    >
                      {language === "pt" ? "Baixar Currículo" : "Download Resume"}
                    </a>
                  </Button>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-center animate-float md:pr-4">
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

        <section id="about" className="section-secondary py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12 md:mb-16">
              {t("about.title")}
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("about.paragraph1")}
              </p>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("about.paragraph2")}
              </p>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("about.paragraph3")}
              </p>
            </div>
          </div>
        </section>

        <section id="education" className="section-primary py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12 md:mb-16">
              {t("education.title")}
            </h2>
            <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
              <Card className="bg-white dark:bg-gray-800 border-0 rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 animate-fade-in">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                    <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600 dark:bg-red-500 flex items-center justify-center text-white text-xl font-bold">
                      SE
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {t("education.degree1")}
                      </h3>
                      <p className="text-lg md:text-xl text-red-600 dark:text-red-400">{t("education.school1")}</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{t("education.period1")}</p>
                      <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed text-base sm:text-lg">
                        {t("education.description1")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 animate-fade-in">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                    <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600 dark:bg-red-500 flex items-center justify-center text-white text-xl font-bold">
                      IC
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {t("education.degree2")}
                      </h3>
                      <p className="text-lg md:text-xl text-red-600 dark:text-red-400">{t("education.school2")}</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{t("education.period2")}</p>
                      <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed text-base sm:text-lg">
                        {t("education.description2")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="experience" className="section-secondary py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12 md:mb-16">
              {t("experience.title")}
            </h2>
            <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
              {/* New Experience - TRF */}
              <Card className="bg-white dark:bg-gray-800 border-0 rounded-2xl shadow-xl overflow-hidden animate-fade-in">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                    <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600 dark:bg-red-500 flex items-center justify-center text-white text-xl font-bold">
                      TRF
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {t("experience.position2")}
                      </h3>
                      <p className="text-lg md:text-xl text-red-600 dark:text-red-400">{t("experience.company2")}</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{t("experience.period2")}</p>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-4 space-y-2 leading-relaxed text-base sm:text-lg">
                        <li>{t("experience.responsibility2.1")}</li>
                        <li>{t("experience.responsibility2.2")}</li>
                        <li>{t("experience.responsibility2.3")}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Existing Experience - 99Freelas */}
              <Card className="bg-white dark:bg-gray-800 border-0 rounded-2xl shadow-xl overflow-hidden animate-fade-in">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                    <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600 dark:bg-red-500 flex items-center justify-center text-white text-xl font-bold">
                      99
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {t("experience.position1")}
                      </h3>
                      <p className="text-lg md:text-xl text-red-600 dark:text-red-400">{t("experience.company1")}</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{t("experience.period1")}</p>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-4 space-y-2 leading-relaxed text-base sm:text-lg">
                        <li>{t("experience.responsibility1.1")}</li>
                        <li>{t("experience.responsibility1.2")}</li>
                        <li>{t("experience.responsibility1.3")}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="projects" className="section-primary py-16 md:py-24 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12 md:mb-16">
              {t("projects.title")}
            </h2>

            {/* Scrollable Projects Container with Mouse Drag and Auto-scroll */}
            <div
              ref={projectsRef}
              className={`flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide max-w-6xl mx-auto ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={(e) => {
                if (!projectsRef.current) return;
                setIsDragging(true);
                setStartX(e.touches[0].pageX - projectsRef.current.offsetLeft);
                setScrollLeft(projectsRef.current.scrollLeft);
              }}
              onTouchMove={(e) => {
                if (!isDragging || !projectsRef.current) return;
                const x = e.touches[0].pageX - projectsRef.current.offsetLeft;
                const walk = (x - startX) * 2;
                projectsRef.current.scrollLeft = scrollLeft - walk;
              }}
              onTouchEnd={() => setIsDragging(false)}
            >
              {isLoadingProjects ? (
                // Loading state
                <div className="flex-shrink-0 w-full flex items-center justify-center py-20">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-10 w-10 text-red-600 dark:text-red-400 animate-spin mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
                  </div>
                </div>
              ) : (
                // Display GitHub projects or fallback projects
                githubProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex-shrink-0 w-full sm:w-[calc(100%/2-16px)] lg:w-[calc(100%/3-16px)] px-2 snap-center"
                  >
                    <GithubProjectCard project={project} />
                  </div>
                ))
              )}
            </div>

            {/* Data source information */}
            {dataSource === "fallback" && (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
                {projectError || "Showing sample projects. GitHub API access requires authentication."}
              </p>
            )}

            {/* Scroll instruction */}
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">{t("projects.dragInstruction")}</p>
          </div>
        </section>

        <section id="contact" className="section-secondary py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
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
                    <form className="space-y-6" onSubmit={(e) => {
                      e.preventDefault();
                      const nameInput = document.getElementById('name') as HTMLInputElement;
                      const emailInput = document.getElementById('email') as HTMLInputElement;
                      const messageInput = document.getElementById('message') as HTMLTextAreaElement;
                      
                      const name = nameInput.value;
                      const email = emailInput.value;
                      const message = messageInput.value;
                      
                      // Criar corpo do email formatado
                      const mailtoBody = `Nome: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMensagem:%0D%0A${message}`;
                      const mailtoSubject = "Contato pelo Portfolio";
                      
                      // Abrir o cliente de email padrão
                      window.open(`mailto:luanhsouzaf@gmail.com?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`, '_blank');
                    }}>
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
                          required
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
                          required
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
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-400 dark:bg-gray-700 dark:text-white"
                        ></textarea>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-5 sm:py-6 rounded-lg text-base sm:text-lg"
                      >
                        {t("contact.form.send")}
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="resume" className="section-primary py-16 md:py-24 lg:py-32">
          {/* Conteúdo */}
        </section>
      </main>

      <Footer />
    </div>
  )
}

function GithubProjectCard({ project }: { project: GithubRepo }) {
  return (
    <Card className="bg-white dark:bg-gray-800 border-0 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in h-full flex flex-col">
      <div className="h-48 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-800">
        <div className="h-full w-full flex items-center justify-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white px-6 text-center">{project.name}</h3>
        </div>
      </div>
      <CardContent className="p-6 flex-grow flex flex-col justify-between">
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          {project.description || "No description provided"}
        </p>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.languages.nodes.map((lang, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full"
                style={{
                  backgroundColor: `${lang.color}20`, // Add transparency
                  color: lang.color,
                }}
              >
                {lang.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mt-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1" />
              <span>{project.stargazerCount}</span>
            </div>
            <div className="flex items-center">
              <GitFork className="h-4 w-4 mr-1" />
              <span>{project.forkCount}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              className="flex-1 border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-gray-800"
              asChild
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                GitHub <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>

            {project.homepageUrl && (
              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" asChild>
                <a
                  href={project.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  Demo <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
