// src/routes/search/[query]/index.tsx
import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { NewsCard } from "~/components/components/news-card";

interface Article {
  category?: string;
  title?: string;
  excerpt?: string;
  author?: string;
  time?: string;
  imageUrl?: string;
  imageFallbackStyle?: { backgroundColor?: string };
  description?:string;
}

export const useSearchResults = routeLoader$<Article[]>(async ({ params,  status }) => {
  const query = decodeURIComponent(params.query);
  // const apiKey = "88051ca9c9d24521a4a114348dc941ac"
  const apikey1 = "0411bee098150a14b712ef9dbdc597ab";
  // https://api.mediastack.com/v1/news?access_key=0411bee098150a14b712ef9dbdc597ab&keywords=sport

  if (!apikey1) {
    console.error("NewsAPI key is missing. Please set NEWS_API_KEY in your environment variables.");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.mediastack.com/v1/news?access_key=0411bee098150a14b712ef9dbdc597ab&keywords=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      console.error(`NewsAPI request failed: ${response.status} - ${response.statusText}`);
      status(500);
      return [];
    }

    const data = await response.json();

    if (!data?.data || data?.data?.length === 0) {
      console.log(`No articles found for query: "${query}"`);
      return [];
    }

    return data?.data?.map((article: any) => ({
      category: article?.source || "News",
      title: article?.title || "Untitled",
      excerpt: article?.description || "No description available",
      author: article?.author || "Unknown Author",
      time: new Date(article?.published_at).toLocaleDateString(),
      imageUrl: article?.image || "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      imageFallbackStyle: { backgroundColor: "#e5e7eb" },
    }));
  } catch (error) {
    console.error("Error fetching search results:", error);
    status(500);
    return [];
  }
});

export default component$(() => {
  const searchResults = useSearchResults();
  const loc = useLocation();
  const query = decodeURIComponent(loc.params.query);

  return (
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      {searchResults.value.length > 0 ? (
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {searchResults.value.map((article) => (
            <NewsCard
              key={article.title}
              category={article.category}
              title={article.title}
              excerpt={article.excerpt}
              author={article.author}
              time={article.time}
              imageUrl={article.imageUrl}
              imageFallbackStyle={article.imageFallbackStyle}
            />
          ))}
        </div>
      ) : (
        <div class="text-gray-600">
          <p>No articles found for "<span class="font-medium">{query}</span>".</p>
          <p class="mt-2">
            Try searching for a different topic or check back later. This could be due to:
          </p>
          <ul class="list-disc ml-6 mt-2">
            <li>No matching articles in our news source.</li>
            <li>A temporary issue with the news service.</li>
          </ul>
        </div>
      )}
    </div>
  );
});

export const documentHead: DocumentHead = ({ params }) => {
  return {
    title: `Search Results for "${params.query}"`,
    meta: [
      {
        name: "description",
        content: `Search results for ${params.query}`,
      },
    ],
  };
};