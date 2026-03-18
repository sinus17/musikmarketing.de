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

function stripFrontmatter(content) {
  if (content.startsWith('---')) {
    const endIndex = content.indexOf('---', 3);
    if (endIndex !== -1) {
      return content.substring(endIndex + 3).trim();
    }
  }
  return content;
}

async function publishArticle() {
  console.log('\n🚀 Publishing "Was ist Musikmarketing" article...\n');
  
  try {
    // Read files
    const markdown = fs.readFileSync('blog-articles/was-ist-musikmarketing.md', 'utf8');
    const meta = JSON.parse(fs.readFileSync('was-ist-musikmarketing-article.json', 'utf8'));

    // Convert to HTML
    const contentWithoutFrontmatter = stripFrontmatter(markdown);
    const htmlContent = md.render(contentWithoutFrontmatter);

    const dataToInsert = {
      title: meta.title,
      slug: meta.slug,
      excerpt: meta.excerpt,
      author: meta.author,
      status: meta.status,
      content: htmlContent,
      tags: meta.tags,
      cover_image: meta.cover_image,
      published_date: new Date().toISOString(),
    };

    // Insert into database
    const result = await supabase
      .from('musikmarketing_de_posts')
      .upsert(dataToInsert, { onConflict: 'slug' })
      .select();

    if (result.error) {
      throw result.error;
    }

    console.log('✅ Article published successfully!');
    console.log(`📄 URL: https://musikmarketing.de/blog/${meta.slug}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

publishArticle();
