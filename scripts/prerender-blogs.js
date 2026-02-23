import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Supabase credentials not set')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function prebuildBlogPages() {
  console.log('🔄 Fetching published blog posts...')

  const { data: posts, error } = await supabase
    .from('musikmarketing_de_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_date', { ascending: false })

  if (error) {
    console.error('❌ Error fetching posts:', error)
    process.exit(1)
  }

  console.log(`✅ Found ${posts?.length || 0} posts. Generating metadata...`)

  // Read the base HTML template
  const baseHtmlPath = path.join(process.cwd(), 'dist', 'index.html')
  let baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8')

  // For each post, create a pre-rendered version with correct meta tags
  for (const post of posts || []) {
    const slug = post.slug
    const title = post.title
    const excerpt = post.excerpt || post.title
    const coverImage = post.cover_image || 'https://musikmarketing.de/og-image.png'
    const url = `https://musikmarketing.de/blog/${slug}`

    // Create modified HTML with correct meta tags
    let pageHtml = baseHtml
      .replace(
        '<title>musikmarketing-de</title>',
        `<title>${escapeHtml(title)} | musikmarketing.de</title>`
      )
      .replace(
        /(<meta name="description"[^>]*content=")([^"]*)/,
        `$1${escapeHtml(excerpt)}`
      )

    // Add OG tags right before closing head
    const ogTags = `
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(excerpt)}" />
    <meta property="og:image" content="${escapeHtml(coverImage)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(excerpt)}" />
    <meta name="twitter:image" content="${escapeHtml(coverImage)}" />
    <link rel="canonical" href="${url}" />
    </head>`

    pageHtml = pageHtml.replace('</head>', ogTags)

    // Write to blog subdirectory
    const blogDir = path.join(process.cwd(), 'dist', 'blog')
    const slugDir = path.join(blogDir, slug)
    fs.mkdirSync(slugDir, { recursive: true })

    const indexPath = path.join(slugDir, 'index.html')
    fs.writeFileSync(indexPath, pageHtml)

    console.log(`  ✓ ${slug}`)
  }

  console.log(`\n✅ Pre-rendered ${posts?.length || 0} blog pages with correct meta tags!`)
  console.log('📍 Location: dist/blog/[slug]/index.html')
}

// Escape HTML special characters
function escapeHtml(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

prebuildBlogPages().catch(err => {
  console.error('❌ Error:', err)
  process.exit(1)
})
