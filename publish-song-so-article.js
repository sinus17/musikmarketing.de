#!/usr/bin/env node

import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Read the markdown file
const markdown = fs.readFileSync('./blog-articles/song-so-review.md', 'utf8');

// Extract title from markdown (first # heading)
const titleMatch = markdown.match(/^# (.+)$/m);
const title = titleMatch ? titleMatch[1] : 'song.so Review - Smartlinks & Landing Pages für Artists & Labels';

// Create excerpt (first paragraph after title)
const contentAfterTitle = markdown.split('\n\n').slice(1).join('\n\n');
const excerpt = contentAfterTitle.split('\n\n')[0].substring(0, 200) + '...';

const articleData = {
  title: title,
  slug: 'song-so-review-smartlinks-landingpages-artists-labels',
  excerpt: excerpt,
  author: 'Philipp Lützenburger',
  status: 'published',
  content: markdown,
  tags: ['Tools', 'Meta Ads', 'TikTok Ads', 'Spotify Marketing', 'Landing Pages', 'Conversion Tracking'],
  cover_image: null,
  published_date: new Date().toISOString(),
};

async function publishArticle() {
  try {
    console.log('\n🚀 Publishing song.so article...\n');

    // Check if article already exists
    const { data: existing } = await supabase
      .from('musikmarketing_de_posts')
      .select('id')
      .eq('slug', articleData.slug)
      .maybeSingle();

    let result;
    if (existing) {
      result = await supabase
        .from('musikmarketing_de_posts')
        .update(articleData)
        .eq('slug', articleData.slug)
        .select();
      console.log(`✏️  Updated: ${articleData.slug}`);
    } else {
      result = await supabase
        .from('musikmarketing_de_posts')
        .insert([articleData])
        .select();
      console.log(`✅ Published: ${articleData.slug}`);
    }

    if (result.error) {
      throw result.error;
    }

    console.log('\n✨ Article published successfully!');
    console.log(`📝 Title: ${articleData.title}`);
    console.log(`🔗 Slug: ${articleData.slug}`);
    console.log(`📊 Word count: ~${markdown.split(/\s+/).length} words\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

publishArticle();
