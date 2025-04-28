import type { Language } from "@/lib/language-context"

export interface ResumeData {
  header: {
    name: string
    location: string
    phone: string
    email: string
    linkedin: string
    github: string
  }
  objective: {
    title: string
    content: string
  }
  summary: {
    title: string
    content: string
  }
  skills: {
    title: string
    categories: {
      title: string
      skills: string
    }[]
  }
  projects: {
    title: string
    items: {
      title: string
      organization: string
      location: string
      date: string
      description: string
      achievements: string[]
    }[]
  }
  experience: {
    title: string
    items: {
      position: string
      company: string
      location: string
      date: string
      description: string
      achievements: string[]
    }[]
  }
  education: {
    title: string
    items: {
      degree: string
      institution: string
      date: string
      courses: string
    }[]
  }
  certifications: {
    title: string
    items: string[]
  }
}

const resumeData: Record<Language, ResumeData> = {
  en: {
    header: {
      name: "LUAN HENRIQUE DE SOUZA FERREIRA",
      location: "Brasília - Federal District",
      phone: "(61) 99880-8317",
      email: "luanhsouzaf@gmail.com",
      linkedin: "https://www.linkedin.com/in/luanferreiradev",
      github: "https://github.com/luanferreiradev",
    },
    objective: {
      title: "OBJECTIVE",
      content: "Java Jr Developer",
    },
    summary: {
      title: "SUMMARY",
      content:
        "Developer with strong experience in Java and focus on object-oriented programming and RESTful API integration, seeking an opportunity as a Java Jr Developer to contribute to scalable and high-performance solutions. I have knowledge in modern technologies and frameworks, including Spring Boot, Angular, NodeJS and SQL and NoSQL databases, as well as best practices in CI/CD and version control with Git.",
    },
    skills: {
      title: "SKILLS",
      categories: [
        {
          title: "Programming Languages",
          skills: "Java, SQL, JavaScript",
        },
        {
          title: "Frameworks and Tools",
          skills: "Spring Boot, Spring MVC, Angular, NodeJS, JSP, HTML, CSS, Bootstrap",
        },
        {
          title: "Web Services and APIs",
          skills: "REST, JSON, SOAP",
        },
        {
          title: "Databases",
          skills: "MySQL, PostgreSQL, MongoDB, Redis",
        },
        {
          title: "Version Control and CI/CD Tools",
          skills: "Git, Subversion, Jenkins, GitLab, Maven",
        },
        {
          title: "Other Skills",
          skills: "Teamwork, Communication, Problem Solving, Agile Methodologies (Scrum)",
        },
      ],
    },
    projects: {
      title: "PROJECTS AND PROGRAMS",
      items: [
        {
          title: "University Ambassador",
          organization: "DIO",
          location: "Brasília/DF",
          date: "Oct 2024 - Present",
          description:
            "I act as a University Ambassador for DIO, organizing events and workshops focused on the technical development of students at the Catholic University of Brasília. I facilitate access to bootcamps, courses, and programming challenges, promoting continuous learning and networking between students and professionals in the field.",
          achievements: [
            "Increased student engagement in promoted bootcamps, encouraging participation in practical challenges.",
            "Contributed to the growth of DIO's presence at the university, strengthening partnerships and expanding access to educational resources.",
          ],
        },
        {
          title: "Java Developer",
          organization: "Academic Project",
          location: "Brasília/DF",
          date: "2023",
          description:
            "Developed a banking system in Java as a team, focusing on OOP for security and efficiency in transactions. The project included account registration, transfers, and transaction history.",
          achievements: [
            "Contributed to a robust account and transaction management structure using Java and MySQL.",
            "Implemented unit tests to ensure system integrity.",
            "Developed a reporting module for a clear view of users' transaction history.",
          ],
        },
      ],
    },
    experience: {
      title: "PROFESSIONAL EXPERIENCE",
      items: [
        {
          position: "Full-stack Developer",
          company: "99Freelas",
          location: "Remote",
          date: "Aug 2022 - Feb 2024",
          description:
            "As a freelancer on the 99Freelas platform, I worked on projects as a full-stack developer using .NET, Angular, Java with Spring and AWS, focusing on creating scalable and robust systems with high code quality and efficiency.",
          achievements: [
            "Developed web systems that meet specific client requirements, applying testing and automation practices.",
            "Collaborated with clients and other developers, improving communication and adaptability.",
            "Used AWS for scalability and security, ensuring a stable and efficient environment.",
            "Used cloud technologies such as AWS to ensure the scalability and efficiency of the implemented systems, allowing them to be maintained in a stable and secure environment.",
          ],
        },
      ],
    },
    education: {
      title: "EDUCATION",
      items: [
        {
          degree: "Bachelor's Degree in Software Engineering",
          institution: "Catholic University of Brasília",
          date: "2023 - 2027",
          courses:
            "Main courses: Object-Oriented Programming, Data Structures, Relational Databases, Requirements Engineering, Algorithms and Programming Logic, Computer Networks, Software Architecture, Web Systems Development, Software Testing, Software Project Management",
        },
        {
          degree: "Technical Degree in Internet Computing",
          institution: "IFNMG Campus Januária",
          date: "2019 - 2023",
          courses:
            "Main courses: Web Development, JavaScript Programming, Database, Object-Oriented Programming, Computer Networks, Interface Design, Operating Systems, Information Security, HTML, CSS and JavaScript, Entrepreneurship and IT Projects",
        },
      ],
    },
    certifications: {
      title: "CERTIFICATIONS AND RELEVANT COURSES",
      items: [
        "2023: Scrum Fundamentals Certified (SFC) – SCRUMstudy",
        "2024: Explorer Badge – Oracle MyLearning (Java Fundamentals)",
        "In progress: Oracle Certified Java Fundamentals (OCA)",
        "In progress: Oracle Certified Java Associate (OCA)",
        "2023: Discover AWS Cloud – LocalizaLabs (5 hours)",
        "2023: Fullstack Java + Angular – DIO + Santander (115 hours)",
        "2022: Frontend Training – Alura + ORACLE (89 hours)",
        "2022: Business Agility Training – Alura + ORACLE (27 hours)",
      ],
    },
  },
  es: {
    header: {
      name: "LUAN HENRIQUE DE SOUZA FERREIRA",
      location: "Brasília - Distrito Federal",
      phone: "(61) 99880-8317",
      email: "luanhsouzaf@gmail.com",
      linkedin: "https://www.linkedin.com/in/luanferreiradev",
      github: "https://github.com/luanferreiradev",
    },
    objective: {
      title: "OBJETIVO",
      content: "Desarrollador Java Jr",
    },
    summary: {
      title: "RESUMEN",
      content:
        "Desarrollador con fuerte experiencia en Java y enfoque en programación orientada a objetos e integración de APIs RESTful, buscando una oportunidad como Desarrollador Java Jr para contribuir a soluciones escalables y de alto rendimiento. Tengo conocimientos en tecnologías y frameworks modernos, incluyendo Spring Boot, Angular, NodeJS y bases de datos SQL y NoSQL, así como mejores prácticas en CI/CD y control de versiones con Git.",
    },
    skills: {
      title: "HABILIDADES",
      categories: [
        {
          title: "Lenguajes de Programación",
          skills: "Java, SQL, JavaScript",
        },
        {
          title: "Frameworks y Herramientas",
          skills: "Spring Boot, Spring MVC, Angular, NodeJS, JSP, HTML, CSS, Bootstrap",
        },
        {
          title: "Servicios Web y APIs",
          skills: "REST, JSON, SOAP",
        },
        {
          title: "Bases de Datos",
          skills: "MySQL, PostgreSQL, MongoDB, Redis",
        },
        {
          title: "Herramientas de Control de Versiones y CI/CD",
          skills: "Git, Subversion, Jenkins, GitLab, Maven",
        },
        {
          title: "Otras Competencias",
          skills: "Trabajo en equipo, Comunicación, Resolución de problemas, Metodologías Ágiles (Scrum)",
        },
      ],
    },
    projects: {
      title: "PROYECTOS Y PROGRAMAS",
      items: [
        {
          title: "Embajador Universitario",
          organization: "DIO",
          location: "Brasília/DF",
          date: "Oct 2024 - Presente",
          description:
            "Actúo como Embajador Universitario de DIO, organizando eventos y talleres enfocados en el desarrollo técnico de los estudiantes de la Universidad Católica de Brasília. Facilito el acceso a bootcamps, cursos y desafíos de programación, promoviendo el aprendizaje continuo y el networking entre estudiantes y profesionales del área.",
          achievements: [
            "Aumenté la participación de los estudiantes en los bootcamps promovidos, incentivando la participación en desafíos prácticos.",
            "Contribuí al crecimiento de la presencia de DIO en la universidad, fortaleciendo alianzas y ampliando el acceso a recursos educativos.",
          ],
        },
        {
          title: "Desarrollador Java",
          organization: "Proyecto Académico",
          location: "Brasília/DF",
          date: "2023",
          description:
            "Desarrollé un sistema bancario en Java en equipo, con enfoque en POO para seguridad y eficiencia en las transacciones. El proyecto incluyó registro de cuentas, transferencias e historial de transacciones.",
          achievements: [
            "Contribuí a una estructura robusta de gestión de cuentas y transacciones usando Java y MySQL.",
            "Implementé pruebas unitarias para asegurar la integridad del sistema.",
            "Desarrollé un módulo de informes para una visión clara del historial de transacciones de los usuarios.",
          ],
        },
      ],
    },
    experience: {
      title: "EXPERIENCIA PROFESIONAL",
      items: [
        {
          position: "Desarrollador Full-stack",
          company: "99Freelas",
          location: "Remoto",
          date: "Ago 2022 - Feb 2024",
          description:
            "Como freelancer en la plataforma 99Freelas, trabajé en proyectos como desarrollador full-stack utilizando .NET, Angular, Java con Spring y AWS, enfocándome en la creación de sistemas escalables y robustos con alta calidad de código y eficiencia.",
          achievements: [
            "Desarrollé sistemas web que atienden requisitos específicos de clientes, aplicando prácticas de pruebas y automatización.",
            "Colaboré con clientes y otros desarrolladores, mejorando la comunicación y adaptabilidad.",
            "Utilicé AWS para escalabilidad y seguridad, garantizando un ambiente estable y eficiente.",
            "Utilicé tecnologías de nube como AWS para garantizar la escalabilidad y eficiencia de los sistemas implementados, permitiendo que fueran mantenidos en un ambiente estable y seguro.",
          ],
        },
      ],
    },
    education: {
      title: "EDUCACIÓN",
      items: [
        {
          degree: "Licenciatura en Ingeniería de Software",
          institution: "Universidad Católica de Brasília",
          date: "2023 - 2027",
          courses:
            "Principales asignaturas: Programación Orientada a Objetos, Estructuras de Datos, Bases de Datos Relacionales, Ingeniería de Requisitos, Algoritmos y Lógica de Programación, Redes de Computadores, Arquitectura de Software, Desarrollo de Sistemas Web, Pruebas de Software, Gestión de Proyectos de Software",
        },
        {
          degree: "Técnico en Informática para Internet",
          institution: "IFNMG Campus Januária",
          date: "2019 - 2023",
          courses:
            "Principales asignaturas: Desarrollo Web, Programación en JavaScript, Base de Datos, Programación Orientada a Objetos, Redes de Computadores, Diseño de Interfaces, Sistemas Operativos, Seguridad de la Información, HTML, CSS y JavaScript, Emprendimiento y Proyectos de TI",
        },
      ],
    },
    certifications: {
      title: "CERTIFICACIONES Y CURSOS RELEVANTES",
      items: [
        "2023: Scrum Fundamentals Certified (SFC) – SCRUMstudy",
        "2024: Explorer Badge – Oracle MyLearning (Java Fundamentals)",
        "En progreso: Oracle Certified Java Fundamentals (OCA)",
        "En progreso: Oracle Certified Java Associate (OCA)",
        "2023: Descubre la Nube AWS – LocalizaLabs (5 horas)",
        "2023: Fullstack Java + Angular – DIO + Santander (115 horas)",
        "2022: Formación Frontend – Alura + ORACLE (89 horas)",
        "2022: Formación Business Agility – Alura + ORACLE (27 horas)",
      ],
    },
  },
  fr: {
    header: {
      name: "LUAN HENRIQUE DE SOUZA FERREIRA",
      location: "Brasília - District Fédéral",
      phone: "(61) 99880-8317",
      email: "luanhsouzaf@gmail.com",
      linkedin: "https://www.linkedin.com/in/luanferreiradev",
      github: "https://github.com/luanferreiradev",
    },
    objective: {
      title: "OBJECTIF",
      content: "Développeur Java Jr",
    },
    summary: {
      title: "RÉSUMÉ",
      content:
        "Développeur avec une forte expérience en Java et axé sur la programmation orientée objet et l'intégration d'API RESTful, à la recherche d'une opportunité en tant que développeur Java Jr pour contribuer à des solutions évolutives et performantes. J'ai des connaissances dans les technologies et frameworks modernes, notamment Spring Boot, Angular, NodeJS et les bases de données SQL et NoSQL, ainsi que les meilleures pratiques en CI/CD et le contrôle de version avec Git.",
    },
    skills: {
      title: "COMPÉTENCES",
      categories: [
        {
          title: "Langages de Programmation",
          skills: "Java, SQL, JavaScript",
        },
        {
          title: "Frameworks et Outils",
          skills: "Spring Boot, Spring MVC, Angular, NodeJS, JSP, HTML, CSS, Bootstrap",
        },
        {
          title: "Services Web et APIs",
          skills: "REST, JSON, SOAP",
        },
        {
          title: "Bases de Données",
          skills: "MySQL, PostgreSQL, MongoDB, Redis",
        },
        {
          title: "Outils de Contrôle de Version et CI/CD",
          skills: "Git, Subversion, Jenkins, GitLab, Maven",
        },
        {
          title: "Autres Compétences",
          skills: "Travail d'équipe, Communication, Résolution de problèmes, Méthodologies Agiles (Scrum)",
        },
      ],
    },
    projects: {
      title: "PROJETS ET PROGRAMMES",
      items: [
        {
          title: "Ambassadeur Universitaire",
          organization: "DIO",
          location: "Brasília/DF",
          date: "Oct 2024 - Présent",
          description:
            "J'agis en tant qu'Ambassadeur Universitaire de DIO, organisant des événements et des ateliers axés sur le développement technique des étudiants de l'Université Catholique de Brasília. Je facilite l'accès aux bootcamps, cours et défis de programmation, promouvant l'apprentissage continu et le réseautage entre étudiants et professionnels du domaine.",
          achievements: [
            "J'ai augmenté l'engagement des étudiants dans les bootcamps promus, encourageant la participation à des défis pratiques.",
            "J'ai contribué à la croissance de la présence de DIO à l'université, renforçant les partenariats et élargissant l'accès aux ressources éducatives.",
          ],
        },
        {
          title: "Développeur Java",
          organization: "Projet Académique",
          location: "Brasília/DF",
          date: "2023",
          description:
            "J'ai développé un système bancaire en Java en équipe, en mettant l'accent sur la POO pour la sécurité et l'efficacité des transactions. Le projet comprenait l'enregistrement des comptes, les transferts et l'historique des transactions.",
          achievements: [
            "J'ai contribué à une structure robuste de gestion des comptes et des transactions en utilisant Java et MySQL.",
            "J'ai implémenté des tests unitaires pour assurer l'intégrité du système.",
            "J'ai développé un module de rapports pour une vision claire de l'historique des transactions des utilisateurs.",
          ],
        },
      ],
    },
    experience: {
      title: "EXPÉRIENCE PROFESSIONNELLE",
      items: [
        {
          position: "Développeur Full-stack",
          company: "99Freelas",
          location: "À distance",
          date: "Août 2022 - Fév 2024",
          description:
            "En tant que freelance sur la plateforme 99Freelas, j'ai travaillé sur des projets en tant que développeur full-stack utilisant .NET, Angular, Java avec Spring et AWS, en me concentrant sur la création de systèmes évolutifs et robustes avec une haute qualité de code et efficacité.",
          achievements: [
            "J'ai développé des systèmes web qui répondent aux exigences spécifiques des clients, en appliquant des pratiques de test et d'automatisation.",
            "J'ai collaboré avec des clients et d'autres développeurs, améliorant la communication et l'adaptabilité.",
            "J'ai utilisé AWS pour l'évolutivité et la sécurité, assurant un environnement stable et efficace.",
            "J'ai utilisé des technologies cloud comme AWS pour assurer l'évolutivité et l'efficacité des systèmes implémentés, permettant leur maintien dans un environnement stable et sécurisé.",
          ],
        },
      ],
    },
    education: {
      title: "ÉDUCATION",
      items: [
        {
          degree: "Licence en Génie Logiciel",
          institution: "Université Catholique de Brasília",
          date: "2023 - 2027",
          courses:
            "Cours principaux: Programmation Orientée Objet, Structures de Données, Bases de Données Relationnelles, Ingénierie des Exigences, Algorithmes et Logique de Programmation, Réseaux Informatiques, Architecture Logicielle, Développement de Systèmes Web, Tests Logiciels, Gestion de Projets Logiciels",
        },
        {
          degree: "Diplôme Technique en Informatique pour Internet",
          institution: "IFNMG Campus Januária",
          date: "2019 - 2023",
          courses:
            "Cours principaux: Développement Web, Programmation JavaScript, Base de Données, Programmation Orientée Objet, Réseaux Informatiques, Conception d'Interfaces, Systèmes d'Exploitation, Sécurité de l'Information, HTML, CSS et JavaScript, Entrepreneuriat et Projets TI",
        },
      ],
    },
    certifications: {
      title: "CERTIFICATIONS ET COURS PERTINENTS",
      items: [
        "2023: Scrum Fundamentals Certified (SFC) – SCRUMstudy",
        "2024: Explorer Badge – Oracle MyLearning (Java Fundamentals)",
        "En cours: Oracle Certified Java Fundamentals (OCA)",
        "En cours: Oracle Certified Java Associate (OCA)",
        "2023: Découvrez le Cloud AWS – LocalizaLabs (5 heures)",
        "2023: Fullstack Java + Angular – DIO + Santander (115 heures)",
        "2022: Formation Frontend – Alura + ORACLE (89 heures)",
        "2022: Formation Business Agility – Alura + ORACLE (27 heures)",
      ],
    },
  },
}

export default resumeData
