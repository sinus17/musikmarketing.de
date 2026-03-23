#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const problematicUrls = [
  'spotify-verdienst',
  'hypeddit-alternative-song-so',
  'musik-influencer-partnerships',
  'musikplattform-vergleich',
  'musik-bekannt'
];

const problematicPages = [
  'marketing-handbuch-fuer-artists'
];

async function checkPages() {
  console.log('\n🔍 Checking if problematic pages exist in database...\n');
  console.log('='.repeat(60));

  if (!supabaseUrl || !supabaseKey) {
    console.log('\n⚠️  Supabase credentials not found in environment');
    console.log('Checking article JSON files instead...\n');
    
    const fs = await import('fs');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    console.log('📋 Blog Posts (from publish-all-articles.js):');
    const publishScript = fs.readFileSync(path.join(__dirname, 'publish-all-articles.js'), 'utf8');
    const articleFilesMatch = publishScript.match(/articleFiles = \[([\s\S]*?)\]/);
    
    if (articleFilesMatch) {
      const files = articleFilesMatch[1]
        .split('\n')
        .map(line => line.trim().replace(/[',]/g, ''))
        .filter(line => line.endsWith('.json'));
      
      console.log(`\nFound ${files.length} article files:\n`);
      
      files.forEach(file => {
        const exists = fs.existsSync(path.join(__dirname, file));
        const status = exists ? '✅' : '❌';
        console.log(`${status} ${file}`);
        
        if (exists) {
          try {
            const content = JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf8'));
            console.log(`   Slug: ${content.slug}`);
            console.log(`   Title: ${content.title}`);
            console.log(`   Status: ${content.status || 'published'}\n`);
          } catch (e) {
            console.log(`   ⚠️  Error reading file\n`);
          }
        }
      });
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('\n🔎 Checking for problematic URLs:\n');
    
    problematicUrls.forEach(slug => {
      const found = fs.readdirSync(__dirname)
        .filter(f => f.endsWith('.json'))
        .some(file => {
          try {
            const content = JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf8'));
            return content.slug === slug;
          } catch {
            return false;
          }
        });
      
      console.log(`${found ? '✅' : '❌'} /blog/${slug}`);
    });
    
    console.log('\n🔎 Checking for problematic static pages:\n');
    problematicPages.forEach(page => {
      console.log(`⚠️  /${page} - This is a static page, check src/App.tsx for route`);
    });
    
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data: allPosts, error } = await supabase
      .from('musikmarketing_de_posts')
      .select('slug, title, status')
      .order('slug');

    if (error) throw error;

    console.log(`\n✅ Found ${allPosts.length} total posts in database\n`);

    console.log('🔎 Checking problematic blog URLs:\n');
    
    problematicUrls.forEach(slug => {
      const post = allPosts.find(p => p.slug === slug);
      if (post) {
        console.log(`✅ /blog/${slug}`);
        console.log(`   Title: ${post.title}`);
        console.log(`   Status: ${post.status}\n`);
      } else {
        console.log(`❌ /blog/${slug} - NOT FOUND IN DATABASE`);
        console.log(`   Action: Need to publish this article\n`);
      }
    });

    console.log('🔎 Checking problematic static pages:\n');
    problematicPages.forEach(page => {
      console.log(`⚠️  /${page}`);
      console.log(`   This is a static page - check src/App.tsx for route\n`);
    });

    console.log('='.repeat(60));
    console.log('\n📊 Summary:\n');
    
    const foundBlogPosts = problematicUrls.filter(slug => 
      allPosts.some(p => p.slug === slug)
    );
    
    const missingBlogPosts = problematicUrls.filter(slug => 
      !allPosts.some(p => p.slug === slug)
    );

    console.log(`✅ Found in database: ${foundBlogPosts.length}/${problematicUrls.length}`);
    console.log(`❌ Missing from database: ${missingBlogPosts.length}/${problematicUrls.length}`);
    
    if (missingBlogPosts.length > 0) {
      console.log('\n⚠️  Missing blog posts:');
      missingBlogPosts.forEach(slug => {
        console.log(`   - /blog/${slug}`);
      });
      console.log('\n💡 Action: Check if JSON files exist and run publish script');
    }

    console.log('\n📋 All published posts in database:');
    const published = allPosts.filter(p => p.status === 'published');
    published.forEach(post => {
      console.log(`   ✅ /blog/${post.slug}`);
    });

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

checkPages();
