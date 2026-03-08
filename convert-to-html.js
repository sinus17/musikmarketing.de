#!/usr/bin/env node

import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import MarkdownIt from 'markdown-it';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpb2Z3bWtyYm54Z21vbGlmY2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDI5MjQ0OSwiZXhwIjoyMDc1ODY4NDQ5fQ.aoVHSt3evyhJOKY5_3LbUYlfbrFbuvKOC_NLgNIz4IU';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Create markdown parser
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});

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

function stripFrontmatter(content) {
  // Remove YAML frontmatter if present
  if (content.startsWith('---')) {
    const endIndex = content.indexOf('---', 3);
    if (endIndex !== -1) {
      return content.substring(endIndex + 3).trim();
    }
  }
  return content;
}

async function republishArticles() {
  console.log('\n🚀 Converting Markdown to HTML and republishing...\n');
  console.log('='.repeat(60));
  
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

      // Strip frontmatter and convert to HTML
      const contentWithoutFrontmatter = stripFrontmatter(markdown);
      const htmlContent = md.render(contentWithoutFrontmatter);

      const dataToInsert = {
        title: meta.title,
        slug: meta.slug,
        excerpt: meta.excerpt,
        author: meta.author,
        status: meta.status,
        content: htmlContent, // Now HTML instead of Markdown
        tags: meta.tags,
        cover_image: meta.cover_image,
        published_date: new Date().toISOString(),
      };

      // Update in database
      const result = await supabase
        .from('musikmarketing_de_posts')
        .update(dataToInsert)
        .eq('slug', meta.slug)
        .select();

      if (result.error) {
        throw result.error;
      }

      console.log(`✅ Updated with HTML: ${meta.slug}`);
      updated++;

    } catch (error) {
      console.error(`❌ Error with ${article.file}:`, error.message);
      errors++;
    }
  }

  console.log('='.repeat(60));
  console.log('\n📊 Results:');
  console.log(`   ✅ Articles updated: ${updated}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log('='.repeat(60));

  if (errors === 0) {
    console.log('\n✨ All articles converted to HTML and updated successfully!');
  } else {
    console.log('\n⚠️  Some articles could not be updated.\n');
    process.exit(1);
  }
}

republishArticles();
