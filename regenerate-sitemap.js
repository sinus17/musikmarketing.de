#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const staticRoutes = [
  {
    loc: 'https://musikmarketing.de/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    loc: 'https://musikmarketing.de/musikmarketing-agentur',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    loc: 'https://musikmarketing.de/ultimativer-leitfaden',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    loc: 'https://musikmarketing.de/marketing-handbuch-fuer-artists',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    loc: 'https://musikmarketing.de/ads-schalten-lernen',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    loc: 'https://musikmarketing.de/blog',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '0.9'
  }
];

async function generateSitemap() {
  console.log('🗺️  Generating sitemap...\n');

  try {
    const { data: posts, error } = await supabase
      .from('musikmarketing_de_posts')
      .select('slug, published_date, created_at, status')
      .eq('status', 'published')
      .order('published_date', { ascending: false });

    if (error) throw error;

    console.log(`✅ Found ${posts.length} published blog posts\n`);

    const blogRoutes = posts.map(post => {
      const lastmod = post.published_date || post.created_at;
      const date = new Date(lastmod).toISOString().split('T')[0];
      
      return {
        loc: `https://musikmarketing.de/blog/${post.slug}`,
        lastmod: date,
        changefreq: 'monthly',
        priority: '0.8'
      };
    });

    const allRoutes = [...staticRoutes, ...blogRoutes];

    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

    const publicPath = path.join(__dirname, 'public', 'sitemap.xml');
    fs.writeFileSync(publicPath, sitemapXML);
    console.log(`✅ Sitemap written to: ${publicPath}`);

    const distPath = path.join(__dirname, 'dist', 'sitemap.xml');
    if (fs.existsSync(path.join(__dirname, 'dist'))) {
      fs.writeFileSync(distPath, sitemapXML);
      console.log(`✅ Sitemap written to: ${distPath}`);
    }

    console.log(`\n📊 Sitemap Statistics:`);
    console.log(`   Total URLs: ${allRoutes.length}`);
    console.log(`   Static pages: ${staticRoutes.length}`);
    console.log(`   Blog posts: ${blogRoutes.length}`);
    console.log(`\n✨ Sitemap regenerated successfully!`);
    console.log(`\n📝 Next steps:`);
    console.log(`   1. Submit sitemap to Google Search Console: https://musikmarketing.de/sitemap.xml`);
    console.log(`   2. Request indexing for affected URLs in GSC`);
    console.log(`   3. Wait 24-48 hours for Google to recrawl\n`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
