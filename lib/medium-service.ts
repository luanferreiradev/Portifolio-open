export interface MediumPost {
  id: string
  title: string
  link: string
  pubDate: string
  content: string
  thumbnail: string
  categories: string[]
}

// Adicionar throttling para evitar muitas solicitações em sequência

// Variável para armazenar o timestamp da última requisição
let lastRequestTime = 0;
const THROTTLE_DELAY = 1000; // 1 segundo

export async function getMediumPosts(): Promise<MediumPost[]> {
  // Verificar se já se passou tempo suficiente desde a última requisição
  const now = Date.now();
  if (now - lastRequestTime < THROTTLE_DELAY) {
    // Se a última requisição foi muito recente, espere
    await new Promise(resolve => setTimeout(resolve, THROTTLE_DELAY));
  }
  
  // Atualizar o timestamp da última requisição
  lastRequestTime = Date.now();
  
  // Código existente de busca...
  try {
    console.log("Fetching Medium posts from Heroku API...")
    const response = await fetch("https://flask-api-project-ae80711f33c7.herokuapp.com/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Medium posts fetched successfully:", data)
    return data
  } catch (error) {
    console.error("Failed to fetch Medium posts:", error)
    return []
  }
}

// Fallback data in case the API is unavailable
export const fallbackPosts: MediumPost[] = [
  {
    id: "1",
    title: "Criando APIs RESTful com Spring Boot",
    link: "https://medium.com/@lhferreirad/criando-apis-restful-com-spring-boot",
    pubDate: "2023-10-15",
    content: "Aprenda a criar APIs RESTful robustas e escaláveis com Spring Boot...",
    thumbnail: "/placeholder.svg?height=400&width=600",
    categories: ["Java", "Spring Boot", "API"],
  },
  {
    id: "2",
    title: "Microsserviços com Kotlin e AWS",
    link: "https://medium.com/@lhferreirad/microsservicos-com-kotlin-e-aws",
    pubDate: "2023-11-20",
    content: "Explorando arquiteturas de microsserviços com Kotlin e serviços AWS...",
    thumbnail: "/placeholder.svg?height=400&width=600",
    categories: ["Kotlin", "AWS", "Microservices"],
  },
  {
    id: "3",
    title: "Testes automatizados para aplicações Java",
    link: "https://medium.com/@lhferreirad/testes-automatizados-para-aplicacoes-java",
    pubDate: "2024-01-10",
    content: "Melhores práticas para implementar testes automatizados em aplicações Java...",
    thumbnail: "/placeholder.svg?height=400&width=600",
    categories: ["Java", "Testing", "JUnit"],
  },
  {
    id: "4",
    title: "Angular: Melhores práticas de arquitetura",
    link: "https://medium.com/@lhferreirad/angular-melhores-praticas-de-arquitetura",
    pubDate: "2024-02-05",
    content: "Organizando seu projeto Angular com padrões de arquitetura escaláveis...",
    thumbnail: "/placeholder.svg?height=400&width=600",
    categories: ["Angular", "TypeScript", "Frontend"],
  },
]

// Backup method using Supabase if available
export async function getMediumPostsFromSupabase(): Promise<MediumPost[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase credentials not available")
      return []
    }

    console.log("Fetching Medium posts from Supabase...")
    const response = await fetch(`${supabaseUrl}/rest/v1/medium_posts?select=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Supabase API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("Medium posts fetched from Supabase:", data)
    return data
  } catch (error) {
    console.error("Failed to fetch Medium posts from Supabase:", error)
    return []
  }
}
