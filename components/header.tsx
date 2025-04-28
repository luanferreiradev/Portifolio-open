"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/translation"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import { useScrollToSection } from "@/components/scroll-to-section"

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const { t } = useTranslation(language)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  
  // Usar o hook de navegação por âncora
  useScrollToSection();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (mobileMenuOpen && !target.closest(".mobile-menu-container")) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Sanitização de parâmetros de pesquisa ou navegação

  // Função segura para navegação
  const navigateToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    // Sanitizar o ID para evitar injeção
    const sanitizedId = id.replace(/[^a-zA-Z0-9-_]/g, '');
    
    // Para lidar com a navegação direta, precisamos nos certificar de que estamos na página principal
    if (pathname !== "/") {
      router.push(`/#${sanitizedId}`);
      return;
    }
    
    // Se já estamos na página principal, podemos rolar para a seção
    const element = document.getElementById(sanitizedId);
    if (element) {
      // Forçar uma pequena espera para garantir que o menu esteja fechado
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  // Função para navegar para página de artigos
  const navigateToArticles = () => {
    setMobileMenuOpen(false)
    router.push("/articles")
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Theme toggle */}
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full text-gray-600 dark:text-gray-300"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => navigateToSection("about")}
              className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium bg-transparent border-none cursor-pointer"
            >
              {t("nav.about")}
            </button>
            <button
              onClick={() => navigateToSection("education")}
              className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium bg-transparent border-none cursor-pointer"
            >
              {t("nav.education")}
            </button>
            <button
              onClick={() => navigateToSection("experience")}
              className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium bg-transparent border-none cursor-pointer"
            >
              {t("nav.experience")}
            </button>
            <button
              onClick={() => navigateToSection("projects")}
              className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium bg-transparent border-none cursor-pointer"
            >
              {t("nav.projects")}
            </button>
            <button
              onClick={() => navigateToSection("contact")}
              className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium bg-transparent border-none cursor-pointer"
            >
              {t("nav.contact")}
            </button>
            <button
              onClick={navigateToArticles}
              className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium bg-transparent border-none cursor-pointer"
            >
              {t("nav.articles")}
            </button>
          </nav>

          {/* Right side - Language toggle and mobile menu button */}
          <div className="flex items-center gap-4">
            {/* Language Toggle with Flag */}
            <Button
              variant="ghost"
              className="rounded-full overflow-hidden p-0 h-10 w-10"
              onClick={toggleLanguage}
              aria-label={language === "pt" ? "Switch to English" : "Mudar para Português"}
            >
              <Image
                src={
                  language === "pt"
                    ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brasil-tmM6jzS2yFL7DlTSsbN1YqwuIjpUOi.png"
                    : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/estados-unidos-da-america-TCzVGPqSUT8eKNzlPuF60Qb2rnIGRa.png"
                }
                alt={language === "pt" ? "Português" : "English"}
                width={40}
                height={40}
                className="rounded-full"
              />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-full text-gray-600 dark:text-gray-300"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Dropdown style with visible links */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 left-0 bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800 z-40 animate-slide-down mobile-menu-container">
          <nav className="container mx-auto px-4 py-2">
            <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
              <button
                onClick={() => navigateToSection("about")}
                className="py-3 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center bg-transparent border-none text-left w-full"
              >
                {t("nav.about")}
              </button>
              <button
                onClick={() => navigateToSection("education")}
                className="py-3 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center bg-transparent border-none text-left w-full"
              >
                {t("nav.education")}
              </button>
              <button
                onClick={() => navigateToSection("experience")}
                className="py-3 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center bg-transparent border-none text-left w-full"
              >
                {t("nav.experience")}
              </button>
              <button
                onClick={() => navigateToSection("projects")}
                className="py-3 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center bg-transparent border-none text-left w-full"
              >
                {t("nav.projects")}
              </button>
              <button
                onClick={() => navigateToSection("contact")}
                className="py-3 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center bg-transparent border-none text-left w-full"
              >
                {t("nav.contact")}
              </button>
              <button
                onClick={navigateToArticles}
                className="py-3 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center bg-transparent border-none text-left w-full"
              >
                {t("nav.articles")}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
