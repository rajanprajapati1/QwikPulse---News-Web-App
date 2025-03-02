import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"

export interface TrendingArticleProps {
  number?: number
  title?: string
  category?: string
}

export const TrendingArticle = component$<TrendingArticleProps>((props) => {
  const { number, title, category } = props

  return (
    <div class="flex items-start gap-3">
      <span class="text-3xl font-bold flex-[0.1] text-gray-200">{number}</span>
      <div  class="flex-1">
        <Link
          href={`/article/${title?.toLowerCase()?.replace(/\s+/g, "-")}/`}
          class="font-medium hover:text-primary line-clamp-2"
        >
          {title}
        </Link>
        <span class="text-xs text-primary">{category}</span>
      </div>
    </div>
  )
})

