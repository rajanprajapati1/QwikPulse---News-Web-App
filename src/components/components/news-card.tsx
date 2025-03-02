import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"

export interface NewsCardProps {
  category: string
  title: string
  excerpt: string
  author: string
  time: string
  imageUrl: string
  imageFallbackStyle : any
}

export const NewsCard = component$<NewsCardProps>((props) => {
  const { category, title, excerpt, author, time, imageUrl ,imageFallbackStyle } = props

  return (
    <article class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <div class="relative h-48"> 
        <img src={imageUrl }  class="w-full h-full object-cover "
        onError$={(e) => {
          (e.target as HTMLImageElement ).src = `https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;
        }}
        />
        <div class="absolute top-3 left-3 bg-primary/90 text-white px-2 py-1 text-xs font-medium rounded">
          {category}
        </div>
      </div>
      <div class="p-4">
        <h3 class="font-bold text-lg mb-2 line-clamp-2">
          <Link href={`/article/${title.toLowerCase().replace(/\s+/g, "-")}/`} class="hover:text-primary">
            {title}
          </Link>
        </h3>
        <p class="text-gray-600 text-sm mb-3 line-clamp-2">{excerpt}</p>
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span>{author}</span>
          <span>{time}</span>
        </div>
      </div>
    </article>
  )
})

