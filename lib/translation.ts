"use client"

import { useCallback } from "react"
import type { Language } from "./language-context"

// Translation data
const translations = {
  en: {
    nav: {
      about: "About",
      education: "Education",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
      articles: "Articles",
    },
    hero: {
      name: "Luan Ferreira",
      description:
        "Software Engineer Student and Full-stack Developer with experience in Java, Spring Boot, and modern web technologies. Passionate about creating efficient and scalable solutions.",
      contact: "Contact Me",
      resume: "Download Resume",
      photoAlt: "Luan Ferreira's profile photo",
    },
    about: {
      title: "About Me",
      paragraph1:
        "I'm a Software Engineering student at the Catholic University of Brasília with a strong foundation in Java development and web technologies. I'm passionate about creating efficient, scalable, and user-friendly applications.",
      paragraph2:
        "With experience in both backend and frontend development, I enjoy working on full-stack projects that challenge me to grow and learn new technologies. I'm particularly interested in Java ecosystem, Spring Boot, and modern JavaScript frameworks.",
      paragraph3:
        "When I'm not coding, I enjoy contributing to open-source projects, participating in coding challenges, and sharing knowledge with the developer community.",
    },
    education: {
      title: "Education",
      degree1: "Bachelor's Degree in Software Engineering",
      school1: "Catholic University of Brasília",
      period1: "2023 - 2027",
      description1:
        "Focusing on software development methodologies, algorithms, data structures, and modern programming paradigms. Participating in practical projects and research initiatives.",
      degree2: "Technical Degree in Internet Computing",
      school2: "IFNMG Campus Januária",
      period2: "2019 - 2023",
      description2:
        "Learned web development fundamentals, database management, programming logic, and computer networks. Developed practical projects applying these concepts.",
    },
    experience: {
      title: "Professional Experience",
      position1: "Full-stack Developer",
      company1: "99Freelas",
      period1: "Aug 2022 - Feb 2024",
      responsibility1: {
        1: "Developed web applications using Java, Spring Boot, and modern frontend frameworks",
        2: "Collaborated with clients to understand requirements and deliver high-quality solutions",
        3: "Implemented cloud-based architectures using AWS services for scalability and reliability",
      },
      position2: "Software Development Intern",
      company2: "Tribunal Regional Federal da 1ª Região",
      period2: "Apr 2025 - Present",
      responsibility2: {
        1: "Assisting in the development and maintenance of judicial systems",
        2: "Implementing new features and fixing bugs in Java-based applications",
        3: "Collaborating with the development team on software architecture and design",
      },
    },
    projects: {
      title: "Projects",
      loading: "Loading projects from GitHub...",
      error: "Could not fetch GitHub projects",
      retry: "Retry",
      viewGithub: "GitHub",
      viewDemo: "Demo",
      noDescription: "No description provided",
      dragInstruction: "Drag horizontally to see more projects",
      project1: {
        title: "Banking System",
        description: "A Java-based banking system with secure transaction processing and account management features.",
        technologies: "Java, MySQL, Spring Boot",
      },
      project2: {
        title: "Order Management System",
        description: "Web application for managing customer orders, inventory, and sales reports.",
        technologies: "Java, Spring, Angular, PostgreSQL",
      },
      project3: {
        title: "Chess Game",
        description: "Implementation of a chess game with AI opponent and multiplayer capabilities.",
        technologies: "Java, JavaFX, Socket Programming",
      },
    },
    contact: {
      title: "Get in Touch",
      getInTouch: "Contact Information",
      message: "Feel free to reach out if you're looking for a developer, have a question, or just want to connect.",
      form: {
        name: "Your Name",
        email: "Your Email",
        message: "Your Message",
        send: "Send Message",
      },
    },
    footer: {
      copyright: "© 2024 All rights reserved.",
    },
    articles: {
      title: "Articles",
      backToHome: "Back to Home",
      readMore: "Read Article",
      retry: "Retry",
      showingFallback: "Showing sample articles instead.",
      apiError: "Could not fetch articles from API. Showing sample articles instead.",
    },
  },
  pt: {
    nav: {
      about: "Sobre",
      education: "Educação",
      experience: "Experiência",
      projects: "Projetos",
      contact: "Contato",
      articles: "Artigos",
    },
    hero: {
      name: "Luan Ferreira",
      description:
        "Estudante de Engenharia de Software e Desenvolvedor Full-stack com experiência em Java, Spring Boot e tecnologias web modernas. Apaixonado por criar soluções eficientes e escaláveis.",
      contact: "Entre em Contato",
      resume: "Baixar Currículo",
      photoAlt: "Foto de perfil de Luan Ferreira",
    },
    about: {
      title: "Sobre Mim",
      paragraph1:
        "Sou estudante de Engenharia de Software na Universidade Católica de Brasília com uma base sólida em desenvolvimento Java e tecnologias web. Sou apaixonado por criar aplicações eficientes, escaláveis e amigáveis ao usuário.",
      paragraph2:
        "Com experiência em desenvolvimento backend e frontend, gosto de trabalhar em projetos full-stack que me desafiam a crescer e aprender novas tecnologias. Tenho interesse particular no ecossistema Java, Spring Boot e frameworks JavaScript modernos.",
      paragraph3:
        "Quando não estou codificando, gosto de contribuir para projetos open-source, participar de desafios de programação e compartilhar conhecimento com a comunidade de desenvolvedores.",
    },
    education: {
      title: "Educação",
      degree1: "Bacharelado em Engenharia de Software",
      school1: "Universidade Católica de Brasília",
      period1: "2023 - 2027",
      description1:
        "Foco em metodologias de desenvolvimento de software, algoritmos, estruturas de dados e paradigmas de programação modernos. Participação em projetos práticos e iniciativas de pesquisa.",
      degree2: "Técnico em Informática para Internet",
      school2: "IFNMG Campus Januária",
      period2: "2019 - 2023",
      description2:
        "Aprendi fundamentos de desenvolvimento web, gerenciamento de banco de dados, lógica de programação e redes de computadores. Desenvolvi projetos práticos aplicando esses conceitos.",
    },
    experience: {
      title: "Experiência Profissional",
      position1: "Desenvolvedor Full-stack",
      company1: "99Freelas",
      period1: "Ago 2022 - Fev 2024",
      responsibility1: {
        1: "Desenvolvi aplicações web usando Java, Spring Boot e frameworks frontend modernos",
        2: "Colaborei com clientes para entender requisitos e entregar soluções de alta qualidade",
        3: "Implementei arquiteturas baseadas em nuvem usando serviços AWS para escalabilidade e confiabilidade",
      },
      position2: "Estagiário em Desenvolvimento de Software",
      company2: "Tribunal Regional Federal da 1ª Região",
      period2: "Abr 2025 - Presente",
      responsibility2: {
        1: "Auxiliando no desenvolvimento e manutenção de sistemas judiciais",
        2: "Implementando novas funcionalidades e corrigindo bugs em aplicações baseadas em Java",
        3: "Colaborando com a equipe de desenvolvimento em arquitetura e design de software",
      },
    },
    projects: {
      title: "Projetos",
      loading: "Carregando projetos do GitHub...",
      error: "Não foi possível buscar projetos do GitHub",
      retry: "Tentar Novamente",
      viewGithub: "GitHub",
      viewDemo: "Demo",
      noDescription: "Sem descrição fornecida",
      dragInstruction: "Arraste horizontalmente para ver mais projetos",
      project1: {
        title: "Sistema Bancário",
        description:
          "Um sistema bancário baseado em Java com processamento seguro de transações e recursos de gerenciamento de contas.",
        technologies: "Java, MySQL, Spring Boot",
      },
      project2: {
        title: "Sistema de Gerenciamento de Pedidos",
        description: "Aplicação web para gerenciamento de pedidos de clientes, inventário e relatórios de vendas.",
        technologies: "Java, Spring, Angular, PostgreSQL",
      },
      project3: {
        title: "Jogo de Xadrez",
        description: "Implementação de um jogo de xadrez com oponente IA e capacidades multiplayer.",
        technologies: "Java, JavaFX, Socket Programming",
      },
    },
    contact: {
      title: "Entre em Contato",
      getInTouch: "Informações de Contato",
      message:
        "Sinta-se à vontade para entrar em contato se estiver procurando um desenvolvedor, tiver uma pergunta ou apenas quiser se conectar.",
      form: {
        name: "Seu Nome",
        email: "Seu Email",
        message: "Sua Mensagem",
        send: "Enviar Mensagem",
      },
    },
    footer: {
      copyright: "© 2024 Todos os direitos reservados.",
    },
    articles: {
      title: "Artigos",
      backToHome: "Voltar para Home",
      readMore: "Ler Artigo",
      retry: "Tentar Novamente",
      showingFallback: "Mostrando artigos de exemplo.",
      apiError: "Não foi possível buscar artigos da API. Mostrando artigos de exemplo.",
    },
  },
}

// Simplified translation function
export function useTranslation(language: Language) {
  const t = useCallback(
    (key: string) => {
      const keys = key.split(".")
      let value: any = translations[language]

      for (const k of keys) {
        if (value && value[k]) {
          value = value[k]
        } else {
          return key
        }
      }

      return value
    },
    [language],
  )

  return { t }
}
