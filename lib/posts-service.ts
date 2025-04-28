export interface Post {
  id: string
  title: string
  link: string
  image: string
}

export async function getPosts(): Promise<Post[]> {
  try {
    // Log the URL we're trying to fetch from
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    console.log("Fetching posts from:", `${backendUrl}/api/posts`)

    // Make sure the URL is properly formatted
    if (!backendUrl) {
      console.error("Backend URL is not defined")
      return []
    }

    // Add proper headers and credentials
    const response = await fetch(`${backendUrl}/api/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // Don't include credentials unless specifically needed
      // credentials: 'include',
      // Add cache control to avoid caching issues
      cache: "no-cache",
    })

    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Posts fetched successfully:", data)
    return data
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    // Return empty array instead of throwing to avoid breaking the UI
    return []
  }
}

// Alternative method using Supabase if direct API call fails
export async function getPostsFromSupabase(): Promise<Post[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase URL or key is not defined")
      return []
    }

    // Create a simple fetch to Supabase REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/posts?select=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Error fetching posts from Supabase: ${response.status}`)
    }

    const data = await response.json()
    console.log("Posts fetched from Supabase:", data)
    return data
  } catch (error) {
    console.error("Failed to fetch posts from Supabase:", error)
    return []
  }
}
