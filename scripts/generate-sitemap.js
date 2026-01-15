import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabaseUrl = 'https://tiofwmkrbnxgmolifcgw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpb2Z3bWtyYm54Z21vbGlmY2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyOTI0NDksImV4cCI6MjA3NTg2ODQ0OX0.-IA1Wp3b45n0rDFHJoG1rce8LwT7yXcDgzUnt1gloxo'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const hostname = 'https://musikmarketing.de'

async function generateSitemap() {
  try {
    console.log('🔄 Fetching blog posts from Supabase...')
    
    // Fetch all published blog posts
    const { data: posts, error } = await supabase
      .from('musikmarketing_de_posts')
      .select('slug, published_date, created_at')
      .eq('status', 'published')
      .order('published_date', { ascending: false })

    if (error) {
      console.error('❌ Error fetching posts:', error)
      process.exit(1)
    }

    console.log(`✅ Found ${posts?.length || 0} published blog posts`)

    // Static routes
    const staticRoutes = [
      {
        url: '/',
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        url: '/musikmarketing-agentur',
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        url: '/blog',
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
    ]

    // Dynamic blog post routes
    const blogRoutes = (posts || []).map(post => ({
      url: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(post.published_date || post.created_at).toISOString(),
    }))

    // Combine all routes
    const allRoutes = [...staticRoutes, ...blogRoutes]

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${hostname}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    // Write to dist folder
    const distPath = path.join(process.cwd(), 'dist', 'sitemap.xml')
    fs.mkdirSync(path.dirname(distPath), { recursive: true })
    fs.writeFileSync(distPath, sitemap)

    console.log('✅ Sitemap generated successfully!')
    console.log(`📝 Total URLs: ${allRoutes.length}`)
    console.log(`📍 Location: ${distPath}`)
  } catch (err) {
    console.error('❌ Error generating sitemap:', err)
    process.exit(1)
  }
}

generateSitemap()
