#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment variables (from .env.local)
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function publishArticles() {
  const articleFiles = [
    'artikel-plattform-1-spotify.json',
    'artikel-plattform-2-instagram.json',
    'artikel-plattform-3-youtube.json',
    'artikel-plattform-4-tiktok.json',
    'artikel-plattform-5-discord.json',
    'artikel-plattform-6-email.json',
  ];

  let published = 0;
  let errors = 0;

  for (const file of articleFiles) {
    try {
      const filePath = path.join(__dirname, file);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${file}`);
        errors++;
        continue;
      }

      const articleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Prepare data for insertion (only use columns that exist)
      const dataToInsert = {
        title: articleData.title,
        slug: articleData.slug,
        excerpt: articleData.excerpt,
        author: articleData.author,
        status: 'published', // Force publish
        content: articleData.content,
        tags: articleData.tags,
        cover_image: articleData.cover_image,
        published_date: new Date().toISOString(),
      };

      // Check if article already exists
      const { data: existing } = await supabase
        .from('musikmarketing_de_posts')
        .select('id')
        .eq('slug', articleData.slug)
        .maybeSingle();

      let result;
      if (existing) {
        // Update existing
        result = await supabase
          .from('musikmarketing_de_posts')
          .update(dataToInsert)
          .eq('slug', articleData.slug)
          .select();
        console.log(`✏️  Updated: ${articleData.slug}`);
      } else {
        // Insert new
        result = await supabase
          .from('musikmarketing_de_posts')
          .insert([dataToInsert])
          .select();
        console.log(`✅ Published: ${articleData.slug}`);
      }

      if (result.error) {
        throw result.error;
      }

      published++;
    } catch (error) {
      console.error(`❌ Error with ${file}:`, error.message);
      errors++;
    }
  }

  console.log(`\n📊 Results: ${published} published, ${errors} errors`);
  
  if (errors === 0) {
    console.log('✨ All 6 platform articles published successfully!');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

publishArticles();
