"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Reduzir para apenas inglês e português
export type Language = "en" | "pt"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Proteção contra manipulação maliciosa do estado
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Load language preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedLanguage = localStorage.getItem("language") as Language;
        if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt")) {
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        // Fallback to default language
        setLanguage("en");
      }
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("language", language);
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }
  }, [language]);

  // Simplificar para alternar apenas entre português e inglês
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pt" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
