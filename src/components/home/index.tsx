import { component$, useResource$, Resource } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { NewsCard } from '../components/news-card';
import { TrendingArticle } from '../components/trending-article';
import { NewsletterSignup } from '../components/newsletter-signup';
import { newsCategories } from '~/constants/Data';

export default component$(() => {
    const newsResource = useResource$(async () => {
        try {
            const apiKey = '779e60c18504444b826a7e350149bea4' || 'c48d2e29c2624c46923a444bf20399d0' || 'fbae98d6c8c045f5b378e44df0ed23c3' || 'b1aec816d10b4665830fab8552c2391d' || '86a7bb4748374892af3d34531bb610fe' || 'fb2d6c9f8a7b402e9410221202ad11d6' || 'b1b4d242c61e495893998593b1cec71c' || `d5dd011b95db4254bf82c7083d155fcf` || '88051ca9c9d24521a4a114348dc941ac';
            const url = encodeURI(  
                `https://newsapi.org/v2/everything?q=technology&apiKey=${apiKey}&language=en&sortBy=publishedAt&pageSize=20`
            );
            // https://newsdata.io/api/1/news?apiKey=pub_501748e191671851253a67ffe6b68a4c03d8b&language=en
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch news');
            const data = await response.json();
            if (!data.articles?.length) throw new Error('No articles found');
            return data.articles;
        } catch (error) {
            console.error('News API Error:', error);
            return [];
        }
    });

    const fallbackStyle = {
        backgroundColor: '#e2e8f0', // slate-200 as fallback color
        width: '100%',
        height: '100%',
        objectFit: 'cover' as const,
    };

    return (
        <div class="min-h-screen bg-gray-50">
            <main class="container mx-auto px-4 py-8">
                <Resource
                    value={newsResource}
                    onPending={() => <div class="text-center py-8">Loading news...</div>}
                    onRejected={(error) => (
                        <div class="text-center py-8 text-red-600">
                            Error loading news: {error.message}
                        </div>
                    )}
                    onResolved={(articles) => (
                        <>
                            {/* Breaking News */}
                            {articles[0] && (
                                <div class="bg-red-600 text-white px-4 py-2 mb-6 rounded-md">
                                    <p class="font-bold">
                                        Breaking News: <span class="font-normal">{articles[0].title}</span>
                                    </p>
                                </div>
                            )}

                            {/* Featured Article */}
                            {articles[0] && (
                                <section class="mb-12">
                                    <div class="grid md:grid-cols-2 gap-6 items-center">
                                        <div class="relative h-[400px] rounded-lg overflow-hidden">
                                            <img
                                                src={articles[0].urlToImage || undefined}
                                                alt={articles[0].title}
                                                class="w-full h-full object-cover"
                                                style={!articles[0].urlToImage ? fallbackStyle : undefined}
                                                onError$={(e) => {
                                                    (e.target as HTMLImageElement).style.cssText = `background-color: ${fallbackStyle.backgroundColor};`;
                                                }}
                                            />
                                            <div class="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-sm font-medium rounded-md">
                                                Featured
                                            </div>
                                        </div>
                                        <div class="space-y-4">
                                            <span class="text-sm font-medium text-primary">Technology</span>
                                            <h1 class="text-3xl md:text-4xl font-bold">{articles[0].title}</h1>
                                            <p class="text-gray-600">{articles[0].description}</p>
                                            <div class="flex items-center space-x-2 text-sm text-gray-500">
                                                <span>{articles[0].author || "Unknown Author"}</span>
                                                <span>•</span>
                                                <span>
                                                    {articles[0].publishedAt
                                                        ? new Date(articles[0].publishedAt).toLocaleTimeString()
                                                        : "Recent"}
                                                </span>
                                            </div>
                                            <Link
                                                href={articles[0].url}
                                                class="inline-block bg-primary text-black underline px-4 py-2 rounded-md hover:bg-primary/90"
                                            >
                                                Read Full Story
                                            </Link>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Latest News Grid */}
                            <div class="grid md:grid-cols-3 gap-8">
                                <div class="md:col-span-2">
                                    <div class="flex items-center justify-between mb-6">
                                        <h2 class="text-2xl font-bold">Latest News</h2>
                                        <Link href="/latest" class="text-primary hover:underline">
                                            View All
                                        </Link>
                                    </div>
                                    <div class="grid sm:grid-cols-2 gap-6">
                                        {articles?.slice(0, 10)?.map((article: any, index: number) => (
                                            <NewsCard
                                                key={index}
                                                category="Technology"
                                                title={article.title}
                                                excerpt={article.description}
                                                author={article.author || "Unknown"}
                                                time={
                                                    article.publishedAt
                                                        ? new Date(article.publishedAt).toLocaleTimeString()
                                                        : "Recent"
                                                }
                                                imageUrl={article.urlToImage}
                                                imageFallbackStyle={fallbackStyle}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div class="space-y-8">
                                    <div>
                                        <h3 class="text-xl font-bold mb-4 pb-2 border-b">Trending Now</h3>
                                        <div class="space-y-4">
                                            {articles?.map((article: any, index: number) => (
                                                <TrendingArticle
                                                    key={index}
                                                    number={index + 1}
                                                    title={article.title}
                                                    category="Technology"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <NewsletterSignup />
                                    <div class="bg-gray-200 p-4 rounded-lg text-center">
                                        <p class="text-sm text-gray-500 mb-2">Advertisement</p>
                                        <div class="bg-gray-300 h-60 flex items-center flex-col justify-center">
                                            <img src="https://images.pexels.com/photos/7233356/pexels-photo-7233356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="banner" class="rounded-md w-full h-full object-cover" />
                                        </div>
                                        <p class="text-gray-600 py-2">Ad Space</p>
                                    </div>
                                </div>
                            </div>

                            {/* News Categories - unchanged */}
                            <section class="mt-12">
                                <h2 class="text-2xl font-bold mb-6">News Categories</h2>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {newsCategories.map((category) => (
                                        <>
                                            <Link
                                                key={category.key}
                                                href={category.href}
                                                class="bg-blue-100 relative rounded-lg text-center h-[150px] group overflow-hidden transition-all duration-300 hover:shadow-lg"
                                            >
                                                <img
                                                    src={category.imageUrl}
                                                    alt={`${category.title} category`}
                                                    class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                                                    width={150}
                                                    height={150}
                                                />
                                                {/* Overlay */}
                                                <div class="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300"></div>
                                                {/* Text */}
                                                <span class="absolute inset-0 text-xl font-bold text-white flex items-center justify-center px-4 transition-all duration-300 group-hover:text-2xl">
                                                    {category.title}
                                                </span>
                                            </Link>
                                        </>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}
                />
            </main>
        </div>
    );
});