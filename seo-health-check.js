#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSEOHealth() {
  console.log('\n🔍 SEO Health Check for musikmarketing.de\n');
  console.log('='.repeat(60));

  try {
    const { data: posts, error } = await supabase
      .from('musikmarketing_de_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_date', { ascending: false });

    if (error) throw error;

    console.log(`\n📊 Total Published Posts: ${posts.length}\n`);

    let issues = 0;
    let warnings = 0;

    posts.forEach((post, index) => {
      console.log(`\n${index + 1}. ${post.title}`);
      console.log(`   URL: https://musikmarketing.de/blog/${post.slug}`);
      
      // Check title length
      if (post.title.length > 60) {
        console.log(`   ⚠️  Title too long (${post.title.length} chars, recommended: <60)`);
        warnings++;
      } else if (post.title.length < 30) {
        console.log(`   ⚠️  Title too short (${post.title.length} chars, recommended: 30-60)`);
        warnings++;
      } else {
        console.log(`   ✅ Title length: ${post.title.length} chars`);
      }

      // Check excerpt/description
      if (!post.excerpt || post.excerpt.length === 0) {
        console.log(`   ❌ Missing excerpt/meta description`);
        issues++;
      } else if (post.excerpt.length > 160) {
        console.log(`   ⚠️  Excerpt too long (${post.excerpt.length} chars, recommended: <160)`);
        warnings++;
      } else if (post.excerpt.length < 120) {
        console.log(`   ⚠️  Excerpt too short (${post.excerpt.length} chars, recommended: 120-160)`);
        warnings++;
      } else {
        console.log(`   ✅ Excerpt length: ${post.excerpt.length} chars`);
      }

      // Check content length
      const contentLength = post.content ? post.content.length : 0;
      if (contentLength < 1000) {
        console.log(`   ⚠️  Content may be thin (${contentLength} chars, recommended: >2000)`);
        warnings++;
      } else {
        console.log(`   ✅ Content length: ${contentLength} chars`);
      }

      // Check tags
      if (!post.tags || post.tags.length === 0) {
        console.log(`   ⚠️  No tags/keywords defined`);
        warnings++;
      } else {
        console.log(`   ✅ Tags: ${post.tags.length} (${post.tags.join(', ')})`);
      }

      // Check dates
      if (!post.published_date) {
        console.log(`   ⚠️  Missing published_date`);
        warnings++;
      } else {
        const pubDate = new Date(post.published_date);
        const now = new Date();
        const daysDiff = Math.floor((now - pubDate) / (1000 * 60 * 60 * 24));
        console.log(`   ✅ Published: ${daysDiff} days ago`);
      }

      // Check cover image
      if (!post.cover_image) {
        console.log(`   ⚠️  No cover image (recommended for social sharing)`);
        warnings++;
      } else {
        console.log(`   ✅ Cover image: ${post.cover_image}`);
      }
    });

    console.log('\n' + '='.repeat(60));
    console.log('\n📈 SEO Health Summary:');
    console.log(`   Total Posts: ${posts.length}`);
    console.log(`   ❌ Critical Issues: ${issues}`);
    console.log(`   ⚠️  Warnings: ${warnings}`);
    
    if (issues === 0 && warnings === 0) {
      console.log('\n✨ Perfect! All posts have good SEO metadata.');
    } else if (issues === 0) {
      console.log('\n👍 Good! No critical issues, but some optimizations recommended.');
    } else {
      console.log('\n⚠️  Action needed: Fix critical issues for better indexing.');
    }

    console.log('\n📝 Recommendations:');
    console.log('   1. Ensure all posts have unique, compelling titles (30-60 chars)');
    console.log('   2. Write meta descriptions that entice clicks (120-160 chars)');
    console.log('   3. Add relevant tags/keywords to each post');
    console.log('   4. Include cover images for better social sharing');
    console.log('   5. Aim for 1000+ words of quality content per post');
    console.log('   6. Update old posts regularly to keep content fresh\n');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkSEOHealth();
