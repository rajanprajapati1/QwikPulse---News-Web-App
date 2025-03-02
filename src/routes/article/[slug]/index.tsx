// src/routes/article/[slug]/index.tsx
import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

// Define the article type based on NewsAPI response
interface Article {
  title?: string;
  category?: string; // NewsAPI doesn't provide this directly, we'll infer it
  content?: string | null;
  publishedAt?: string;
  author?: string | null;
  urlToImage?: string | null;
  description?: string | null;
}

// Fetch data from NewsAPI
export const useArticleData = routeLoader$<Article | null>(async ({ params, status }) => {
  const slug = params.slug;
//   const apiKey = env.get("NEWS_API_KEY") || "YOUR_API_KEY_HERE"; // Use env vars in production
   const apiKey  = "779e60c18504444b826a7e350149bea4" || 'c48d2e29c2624c46923a444bf20399d0' || 'fbae98d6c8c045f5b378e44df0ed23c3' || 'b1aec816d10b4665830fab8552c2391d' || '86a7bb4748374892af3d34531bb610fe' || 'fb2d6c9f8a7b402e9410221202ad11d6' || 'b1b4d242c61e495893998593b1cec71c' || `d5dd011b95db4254bf82c7083d155fcf` || '88051ca9c9d24521a4a114348dc941ac';
  const query = slug.replace(/-/g, " "); // Convert slug back to search query

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`
    );
    const data = await response.json();

    if (data.status !== "ok" || !data.articles || data.articles.length === 0) {
      status(404);
      return null;
    }

    // Take the first article that matches (you could refine this logic)
    const article = data.articles[0];
    return {
      title: article.title || "Untitled",
      category: article.source?.name || "Unknown", // Using source as a proxy for category
      content: article.content || article.description || "Content not available",
      publishedAt: article.publishedAt || new Date().toISOString(),
      author: article.author || "Unknown Author",
      urlToImage: article.urlToImage,
      description: article.description,
    };
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    status(500);
    return null;
  }
});

export default component$(() => {
  const article:any = useArticleData();
  const loc = useLocation();
  const requestedSlug = loc.params.slug;

  if (!article.value) {
    return (
      <div class="container mx-auto py-8">
        <h1 class="text-3xl font-bold">Article Not Found</h1>
        <p class="mt-4">
          Sorry, the article "<span class="font-medium text-primary">{requestedSlug.replace(/-/g, " ")}</span>"
          couldn't be found.
        </p>
        <p class="mt-2 text-gray-600">
          It might have been removed or the URL might be incorrect. Try searching for another article!
        </p>
      </div>
    );
  }

  return (
    <article class="container mx-auto py-8 max-w-8xl">
      <h1 class="text-3xl font-bold mb-4">{article.value.title}</h1>
      <div class="flex items-center gap-4 text-sm text-gray-600 mb-6">
        <span>{article.value.category}</span>
        <span>•</span>
        <span>{article && new Date(article?.value?.publishedAt)?.toLocaleDateString()}</span>
      </div>
      {article.value.urlToImage && (
        <img
          src={article.value.urlToImage}
          alt={article.value.title}
          class="w-full  object-cover rounded-lg mb-6"
        />
      )}
      <div class="prose">
        <p>{article.value.content}</p>
      </div>
    </article>
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const article = resolveValue(useArticleData) as Article | null;
  const slug = params.slug.replace(/-/g, " ");

  return {
    title: article
      ? `${article.title} | QwikPulse`
      : `Article "${slug}" Not Found | QwikPulse`,
    meta: [
      {
        name: "description",
        content: article
          ? `Read about ${article.title} in ${article.category} on QwikPulse`
          : `The article "${slug}" was not found on QwikPulse`,
      },
      {
        name: "og:title",
        content: article
          ? `${article.title} | QwikPulse`
          : `Article "${slug}" Not Found | QwikPulse`,
      },
      {
        name: "og:description",
        content: article
          ? `Read about ${article.title} in ${article.category} on QwikPulse`
          : `The article "${slug}" was not found on QwikPulse`,
      },
      {
        name: "og:image",
        content: article?.urlToImage || "/default-og-image.jpg",
      },
    ],
  };
};