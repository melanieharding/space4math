import { createClient } from '@/prismicio'
import { asDate } from '@prismicio/client'
export default async function sitemap() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const pages = await client.getAllByType('page')
  const sitemapPages = pages.map(page => ({
    url: `https://${settings.data.domain || `example.com`}${page.url}`,
    lastModified: asDate(page.last_publication_date),
  }))
  const homepage = await client.getSingle('homepage')
  const sitemapHomepage = {
    url: `https://${settings.data.domain || `example.com`}${homepage.url}`,
    lastModified: asDate(homepage.last_publication_date),
  }
  const posts = await client.getAllByType('post')
  const sitemapPosts = posts.map(post => ({
    url: `https://${settings.data.domain || `example.com`}${post.url}`,
    lastModified: asDate(post.last_publication_date),
  }))
  return [sitemapHomepage, ...sitemapPages, ...sitemapPosts]
}
