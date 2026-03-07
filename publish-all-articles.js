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

async function publishArticles() {
  const articleFiles = [
    'artikel-1-musikmarketing-2026.json',
    'artikel-2-tiktok-viral.json',
    'artikel-3-10k-follower.json',
    'artikel-hub-musikmarketing-2026-kompletter-leitfaden.json',
    'artikel-hub-musikmarketing-2026-v2.json',
    'artikel-hub-musikmarketing-2026.json',
    'artikel-plattform-1-spotify.json',
    'artikel-plattform-2-instagram.json',
    'artikel-plattform-3-youtube.json',
    'artikel-plattform-4-tiktok.json',
    'artikel-plattform-5-discord.json',
    'artikel-plattform-6-email.json',
    'artikel-spoke-1-anfaenger.json',
    'artikel-spoke-2-strategie.json',
    'artikel-spoke-3-tools.json',
    'artikel-spoke-4-social-media.json',
    'artikel-spoke-5-spotify.json',
    'artikel-spoke-6-budget-roi.json',
    'artikel-spoke-7-fehler.json',
    'artikel-spoke-budget-roi.json',
    'artikel-spoke-fehler-musikmarketing.json',
    'artikel-spoke-instagram-reels.json',
    'artikel-spoke-musikmarketing-anfaenger.json',
    'artikel-spoke-spotify-marketing.json',
    'artikel-spoke-tiktok-musikmarketing.json',
    'artikel-spoke-tools-musikmarketing.json',
    'artikel-spoke-youtube-shorts.json',
  ];

  let published = 0;
  let updated = 0;
  let errors = 0;

  console.log(`\n🚀 Publishing ${articleFiles.length} articles...\n`);

  for (const file of articleFiles) {
    try {
      const filePath = path.join(__dirname, file);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${file}`);
        errors++;
        continue;
      }

      const articleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      const dataToInsert = {
        title: articleData.title,
        slug: articleData.slug,
        excerpt: articleData.excerpt,
        author: articleData.author || 'Jana',
        status: articleData.status || 'published',
        content: articleData.content,
        tags: articleData.tags || [],
        cover_image: articleData.cover_image || null,
        published_date: new Date().toISOString(),
      };

      const { data: existing } = await supabase
        .from('musikmarketing_de_posts')
        .select('id')
        .eq('slug', articleData.slug)
        .maybeSingle();

      let result;
      if (existing) {
        result = await supabase
          .from('musikmarketing_de_posts')
          .update(dataToInsert)
          .eq('slug', articleData.slug)
          .select();
        console.log(`✏️  Updated: ${articleData.slug}`);
        updated++;
      } else {
        result = await supabase
          .from('musikmarketing_de_posts')
          .insert([dataToInsert])
          .select();
        console.log(`✅ Published: ${articleData.slug}`);
        published++;
      }

      if (result.error) {
        throw result.error;
      }

    } catch (error) {
      console.error(`❌ Error with ${file}:`, error.message);
      errors++;
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 Results:`);
  console.log(`   ✅ New articles published: ${published}`);
  console.log(`   ✏️  Existing articles updated: ${updated}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log(`${'='.repeat(60)}\n`);
  
  if (errors === 0) {
    console.log('✨ All articles processed successfully!');
    console.log('🗺️  Now regenerating sitemap...\n');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

publishArticles();
