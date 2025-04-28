export interface GithubRepo {
  id: string
  name: string
  description: string
  url: string
  homepageUrl: string | null
  languages: {
    nodes: {
      name: string
      color: string
    }[]
  }
  stargazerCount: number
  forkCount: number
}

// Fallback repositories to use when GitHub API fails
const fallbackRepos: GithubRepo[] = [
  {
    id: "1",
    name: "Banking System",
    description: "A Java-based banking system with secure transaction processing and account management features.",
    url: "https://github.com/luanferreiradev/banco-malvader",
    homepageUrl: null,
    languages: {
      nodes: [
        { name: "Java", color: "#b07219" },
        { name: "MySQL", color: "#e38c00" },
      ],
    },
    stargazerCount: 5,
    forkCount: 2,
  },
  {
    id: "2",
    name: "Order Management System",
    description: "Web application for managing customer orders, inventory, and sales reports.",
    url: "https://github.com/luanferreiradev/sistema-pedidos",
    homepageUrl: null,
    languages: {
      nodes: [
        { name: "Java", color: "#b07219" },
        { name: "Spring", color: "#6db33f" },
        { name: "Angular", color: "#dd0031" },
      ],
    },
    stargazerCount: 3,
    forkCount: 1,
  },
  {
    id: "3",
    name: "Chess Game",
    description: "Implementation of a chess game with AI opponent and multiplayer capabilities.",
    url: "https://github.com/luanferreiradev/chess",
    homepageUrl: null,
    languages: {
      nodes: [
        { name: "Java", color: "#b07219" },
        { name: "JavaFX", color: "#5382a1" },
      ],
    },
    stargazerCount: 7,
    forkCount: 3,
  },
  {
    id: "4",
    name: "Portfolio Website",
    description: "My personal portfolio website built with Next.js and Tailwind CSS.",
    url: "https://github.com/luanferreiradev/portfolio",
    homepageUrl: "https://luanferreira.dev",
    languages: {
      nodes: [
        { name: "TypeScript", color: "#3178c6" },
        { name: "Next.js", color: "#000000" },
        { name: "Tailwind", color: "#38b2ac" },
      ],
    },
    stargazerCount: 4,
    forkCount: 1,
  },
]

export async function getPinnedRepos(): Promise<GithubRepo[]> {
  try {
    // Faz a requisição para o novo endpoint
    const response = await fetch("https://flask-api-project-ae80711f33c7.herokuapp.com/api/github/pinned-repos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      return fallbackRepos;
    }

    const repos = await response.json();

    // Retorna os repositórios ou os dados de fallback
    return repos.length > 0 ? (repos as GithubRepo[]) : fallbackRepos;
  } catch (error) {
    console.error("Error fetching pinned repositories:", error);
    return fallbackRepos;
  }
}

// Fallback function to fetch repositories using REST API if GraphQL fails
export async function getRepos(): Promise<GithubRepo[]> {
  try {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    }

    // Add authorization header if token exists
    if (token && token.trim() !== "") {
      headers.Authorization = `Bearer ${token}`
    } else {
      console.log("No GitHub token provided for REST API, using public access")
    }

    const response = await fetch("https://api.github.com/users/luanferreiradev/repos?sort=updated&per_page=6", {
      headers,
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`GitHub REST API error: ${response.status}`)
      return fallbackRepos
    }

    const repos = await response.json()

    // Transform the REST API response to match our GithubRepo interface
    return repos.length > 0
      ? repos.map((repo: any) => ({
          id: repo.id.toString(),
          name: repo.name,
          description: repo.description || "No description provided",
          url: repo.html_url,
          homepageUrl: repo.homepage,
          languages: {
            nodes: [], // We don't get languages from this API
          },
          stargazerCount: repo.stargazers_count,
          forkCount: repo.forks_count,
        }))
      : fallbackRepos
  } catch (error) {
    console.error("Error fetching repositories:", error)
    return fallbackRepos
  }
}
