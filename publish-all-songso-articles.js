#!/usr/bin/env node

import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// Use provided service role key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpb2Z3bWtyYm54Z21vbGlmY2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDI5MjQ0OSwiZXhwIjoyMDc1ODY4NDQ5fQ.aoVHSt3evyhJOKY5_3LbUYlfbrFbuvKOC_NLgNIz4IU';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const articles = [
  {
    file: 'blog-articles/song-so-review.md',
    meta: 'song-so-review-article.json'
  },
  {
    file: 'blog-articles/intellijend-alternative-song-so.md',
    meta: 'intellijend-alternative-article.json'
  },
  {
    file: 'blog-articles/hypeddit-alternative-song-so.md',
    meta: 'hypeddit-alternative-article.json'
  },
  {
    file: 'blog-articles/feature-fm-alternative-song-so.md',
    meta: 'feature-fm-alternative-article.json'
  },
  {
    file: 'blog-articles/toneden-alternative-song-so.md',
    meta: 'toneden-alternative-article.json'
  },
  {
    file: 'blog-articles/linkfire-alternative-song-so.md',
    meta: 'linkfire-alternative-article.json'
  },
  {
    file: 'blog-articles/submithub-alternative-song-so.md',
    meta: 'submithub-alternative-article.json'
  },
  {
    file: 'blog-articles/beste-linkfire-hypeddit-feature-fm-alternativen-2026.md',
    meta: 'beste-alternativen-article.json'
  }
];

async function publishArticles() {
  console.log('\n🚀 Publishing all 8 song.so articles...\n');
  console.log('='.repeat(60));
  
  let published = 0;
  let updated = 0;
  let errors = 0;

  for (const article of articles) {
    try {
      // Check if files exist
      if (!fs.existsSync(article.file) || !fs.existsSync(article.meta)) {
        console.log(`⚠️  Files not found: ${article.file} or ${article.meta}`);
        errors++;
        continue;
      }

      // Read files
      const markdown = fs.readFileSync(article.file, 'utf8');
      const meta = JSON.parse(fs.readFileSync(article.meta, 'utf8'));

      const dataToInsert = {
        title: meta.title,
        slug: meta.slug,
        excerpt: meta.excerpt,
        author: meta.author,
        status: meta.status,
        content: markdown,
        tags: meta.tags,
        cover_image: meta.cover_image,
        published_date: new Date().toISOString(),
      };

      // Check if article already exists
      const { data: existing } = await supabase
        .from('musikmarketing_de_posts')
        .select('id')
        .eq('slug', meta.slug)
        .maybeSingle();

      let result;
      if (existing) {
        result = await supabase
          .from('musikmarketing_de_posts')
          .update(dataToInsert)
          .eq('slug', meta.slug)
          .select();
        console.log(`✏️  Updated: ${meta.slug}`);
        updated++;
      } else {
        result = await supabase
          .from('musikmarketing_de_posts')
          .insert([dataToInsert])
          .select();
        console.log(`✅ Published: ${meta.slug}`);
        published++;
      }

      if (result.error) {
        throw result.error;
      }

    } catch (error) {
      console.error(`❌ Error with ${article.file}:`, error.message);
      errors++;
    }
  }

  console.log('='.repeat(60));
  console.log('\n📊 Results:');
  console.log(`   ✅ New articles published: ${published}`);
  console.log(`   ✏️  Existing articles updated: ${updated}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log('='.repeat(60));

  if (errors === 0) {
    console.log('\n✨ All 8 articles published successfully!');
    console.log('\n📝 Published Articles:');
    console.log('   1. song.so Review');
    console.log('   2. Intellijend Alternative');
    console.log('   3. Hypeddit Alternative');
    console.log('   4. Feature.fm Alternative');
    console.log('   5. ToneDen Alternative');
    console.log('   6. Linkfire Alternative');
    console.log('   7. SubmitHub Alternative');
    console.log('   8. Beste 7 Alternativen (Best-of)');
    console.log('\n🗺️  Remember to regenerate your sitemap!\n');
  } else {
    console.log('\n⚠️  Some articles could not be published. Check errors above.\n');
    process.exit(1);
  }
}

publishArticles();
