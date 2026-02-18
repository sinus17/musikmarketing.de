import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://tiofwmkrbnxgmolifcgw.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseAnonKey) {
  console.error('❌ Error: VITE_SUPABASE_ANON_KEY not set in environment variables')
  process.exit(1)
}

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
