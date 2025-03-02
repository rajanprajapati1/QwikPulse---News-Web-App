import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { NewsCard } from "../../components/components/news-card"

interface Article {
  source?: { name: string };
  title?: string;
  description?: string;
  author?: string | null;
  publishedAt?: string;
  urlToImage?: string | null;
  url?: string;
}

export const useCategoryNews = routeLoader$<
  Promise<{ articles: Article[]; category: string; query: string }>
>(async ({ params, query }) => {
  const category = params.category || "general";
  const q = query.get("q") || "";

  console.log("useCategoryNews running for category:", category, "with query:", q); // Debug log

  // Helper function to normalize MediaStack articles to NewsAPI format
  const normalizeMediaStackArticle = (article: any) => ({
    source: { name: article.source || "Unknown Source" },
    title: article.title || "No Title",
    description: article.description || "No description available.",
    author: article.author || "Staff Reporter",
    publishedAt: article.published_at || new Date().toISOString(),
    urlToImage: article.image || 'https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    url: article.url || "#",
  });

  // First attempt: NewsAPI
  try {
    const newsApiUrl = "https://newsapi.org/v2/top-headlines";
    const newsApiKey = "88051ca9c9d24521a4a114348dc941ac";

    const newsApiParams = new URLSearchParams();
    newsApiParams.append("apiKey", newsApiKey);

    if (category && category !== "latest") {
      newsApiParams.append("category", category);
    }

    if (q) {
      newsApiParams.append("q", q);
    }

    if (!q && (category === "latest" || !category)) {
      newsApiParams.append("country", "us");
    }

    newsApiParams.append("pageSize", "12");

    const newsApiResponse = await fetch(`${newsApiUrl}?${newsApiParams.toString()}`);
    if (!newsApiResponse.ok) {
      throw new Error(`NewsAPI request failed with status ${newsApiResponse.status}`);
    }

    const newsApiData = await newsApiResponse.json();
    if (newsApiData.articles && newsApiData.articles.length > 0) {
      console.log("NewsAPI returned articles:", newsApiData.articles.length); // Debug log
      return {
        articles: newsApiData.articles,
        category: category,
        query: q,
      };
    }
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
  }

  // Fallback to MediaStack API if NewsAPI fails or returns no articles
  try {
    const mediaStackUrl = "https://api.mediastack.com/v1/news";
    const mediaStackApiKey = "0411bee098150a14b712ef9dbdc597ab";

    const mediaStackParams = new URLSearchParams();
    mediaStackParams.append("access_key", mediaStackApiKey);
    if (category && category !== "latest") {
      mediaStackParams.append("categories", category);
    }
    if (q) {
      mediaStackParams.append("keywords", q);
    }
    mediaStackParams.append("limit", "12");

    const mediaStackResponse = await fetch(`${mediaStackUrl}?${mediaStackParams.toString()}`);
    if (!mediaStackResponse.ok) {
      throw new Error(`MediaStack API request failed with status ${mediaStackResponse.status}`);
    }

    const mediaStackData = await mediaStackResponse.json();
    const normalizedArticles = (mediaStackData.data || []).map(normalizeMediaStackArticle);

    console.log("MediaStack returned articles:", normalizedArticles.length); // Debug log
    return {
      articles: normalizedArticles,
      category: category,
      query: q,
    };
  } catch (error) {
    console.error("Error fetching from MediaStack API:", error);
    return { articles: [], category: category, query: q };
  }
});

export default component$(() => {
  const categoryNews:any = useCategoryNews()

  // Format category name for display
  const formatCategoryName = (category: string): string => {
    if (!category || category === "latest") return "Latest News";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getSourceName = (article: Article): string => {
    return article?.source?.name || "Unknown Source";
  };

  const displayTitle = categoryNews.value.query
    ? `Results for "${categoryNews.value.query}"`
    : formatCategoryName(categoryNews.value.category);
    
  return (
    <div class="min-h-screen bg-gray-50">
      {/* Header - Reuse the same header from index.tsx */}
      <header class="sticky top-0 z-50 bg-white shadow-sm">{/* Header content */}</header>

      <main class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">{displayTitle}</h1>

        {categoryNews.value.articles.length > 0 ? (
          <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categoryNews.value.articles.map((article: any, index: number) => (
              <NewsCard
                key={index}
                category={getSourceName(article)}
                title={article.title}
                excerpt={article.description}
                author={article.author || "Staff Reporter"}
                time={new Date(article.publishedAt).toLocaleString()}
                imageUrl={article.urlToImage}
                // url={article.url}
              />
            ))}
          </div>
        ) : (
          <div class="text-center py-12">
            <p class="text-gray-500 text-lg">No articles found for this category.</p>
            <p class="text-gray-400 mt-2">Try searching for a different topic or check back later.</p>
          </div>
        )}
      </main>

      {/* Footer - Reuse the same footer from index.tsx */}
      <footer class="bg-gray-800 text-white mt-12">{/* Footer content */}</footer>
    </div>
  )
})

