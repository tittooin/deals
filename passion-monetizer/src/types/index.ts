export type UserProfile = {
  id: string
  username: string | null
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  links: Record<string, string> | null
  created_at: string
}

export type Article = {
  id: string
  author_id: string
  title: string
  slug: string
  cover_image_url: string | null
  content_json: any
  content_markdown: string | null
  tags: string[]
  read_time_minutes: number
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  likes_count: number
  comments_count: number
  views_count: number
}

export type Deal = {
  id: string
  source: 'amazon' | 'flipkart'
  title: string
  price: number
  discount_percent: number
  rating: number
  category: string
  image_url: string | null
  affiliate_url: string
  created_at: string
}
