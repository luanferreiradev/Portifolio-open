"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "@/lib/translation"
import { ArrowLeft, ExternalLink, RefreshCw, Calendar, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getMediumPosts, getMediumPostsFromSupabase, fallbackPosts, type MediumPost } from "@/lib/medium-service"
import { useLanguage } from "@/lib/language-context"
import DOMPurify from 'isomorphic-dompurify';

export default function Articles() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [articles, setArticles] = useState<MediumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fetchMethod, setFetchMethod] = useState<"api" | "supabase" | "fallback">("api")

  // Fetch posts from backend
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        setError(null)

        let posts: MediumPost[] = []

        if (fetchMethod === "api") {
          console.log("Trying to fetch from Heroku API...")
          posts = await getMediumPosts()
        } else if (fetchMethod === "supabase") {
          console.log("Trying to fetch from Supabase...")
          posts = await getMediumPostsFromSupabase()
        } else {
          console.log("Using fallback data...")
          posts = fallbackPosts
          setFetchMethod("fallback")
        }

        if (posts.length === 0 && fetchMethod === "api") {
          // If Heroku API fails, try Supabase
          console.log("Heroku API returned no posts, trying Supabase...")
          posts = await getMediumPostsFromSupabase()

          if (posts.length > 0) {
            setFetchMethod("supabase")
          } else {
            // If both fail, use fallback data
            console.log("Both APIs failed, using fallback data...")
            posts = fallbackPosts
            setFetchMethod("fallback")
            setError("Could not fetch articles from API. Showing sample articles instead.")
          }
        }

        // Garantir que todos os posts têm IDs únicos
        const postsWithUniqueIds = posts.map((post, index) => {
          if (!post.id) {
            return { ...post, id: `post-${index}` };
          }
          return post;
        });

        setArticles(postsWithUniqueIds)
      } catch (err) {
        console.error("Error fetching posts:", err)
        setError("Failed to load articles. Please try again later.")

        // Use fallback data com IDs garantidos
        const fallbackWithIds = fallbackPosts.map((post, index) => {
          if (!post.id) {
            return { ...post, id: `fallback-${index}` };
          }
          return post;
        });
        
        setArticles(fallbackWithIds)
        setFetchMethod("fallback")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [fetchMethod])

  const handleRetry = () => {
    // Reset to try the primary API again
    setFetchMethod("api")
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat(language === "pt" ? "pt-BR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    } catch (e) {
      return dateString
    }
  }

  // Extract a short excerpt from content
  const getExcerpt = (content: string, maxLength = 150) => {
    // Sanitize HTML antes de processar
    const sanitizedContent = DOMPurify.sanitize(content)
    
    // Remove HTML tags
    const textOnly = sanitizedContent.replace(/<\/?[^>]+(>|$)/g, "")

    if (textOnly.length <= maxLength) return textOnly

    // Find the last space before maxLength
    const lastSpace = textOnly.substring(0, maxLength).lastIndexOf(" ")
    return textOnly.substring(0, lastSpace) + "..."
  }

  // Verificar URLs antes de renderizá-los no componente Button
  const isValidUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return ['http:', 'https:'].includes(parsedUrl.protocol);
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Header />

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t("articles.backToHome")}
          </Link>

          {error && (
            <Button onClick={handleRetry} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              {t("articles.retry")}
            </Button>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 md:mb-12 text-center">
          {t("articles.title")}
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((item) => (
              <Card
                key={`loading-item-${item}`}
                className="bg-gray-100 dark:bg-gray-800 border-0 rounded-2xl overflow-hidden shadow-lg animate-pulse"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mt-6"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {articles.map((article, index) => {
              // Usar um índice como backup caso o ID seja undefined
              const uniqueKey = article.id ? article.id.toString() : `article-${index}`;
              
              return (
                <Card
                  key={uniqueKey}
                  className="bg-white dark:bg-gray-800 border-0 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
                >
                  <div className="relative h-48">
                    <Image
                      src={article.thumbnail && isValidUrl(article.thumbnail) ? article.thumbnail : "/placeholder.svg"}
                      alt={article.title ? article.title.slice(0, 100) : "Article thumbnail"}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Se a imagem falhar, use o placeholder
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{article.title}</h2>

                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(article.pubDate)}</span>
                    </div>

                    {article.categories && article.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.categories.slice(0, 3).map((category, categoryIndex) => (
                          <span
                            key={`${uniqueKey}-category-${categoryIndex}`}
                            className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-full flex items-center"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {category}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-6">
                      {article.content ? getExcerpt(article.content) : "Read this article on Medium..."}
                    </p>

                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg" 
                      asChild
                    >
                      <a
                        href={isValidUrl(article.link) ? article.link : '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        {t("articles.readMore")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {error && (
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            <p>{error}</p>
            {fetchMethod === "fallback" && <p className="mt-2">{t("articles.showingFallback")}</p>}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}