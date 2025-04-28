"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useScrollToSection() {
  const router = useRouter();

  useEffect(() => {
    // Função para lidar com cliques em links de âncora
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        e.preventDefault();
        
        // Extrai o ID da seção da hash
        const id = anchor.hash.substring(1);
        const element = document.getElementById(id);
        
        if (element) {
          // Atualiza a URL com a hash
          window.history.pushState({}, "", anchor.hash);
          
          // Rola suavemente para a seção
          element.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    };

    // Adiciona o listener no documento
    document.addEventListener("click", handleAnchorClick);
    
    // Verifica se há uma hash na URL ao carregar a página
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 100);
      }
    }
    
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [router]);
}