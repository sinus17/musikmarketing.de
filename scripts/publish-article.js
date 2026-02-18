#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// CONFIG
// ============================================

const SUPABASE_URL = 'https://tiofwmkrbnxgmolifcgw.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpb2Z3bWtyYm54Z21vbGlmY2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDI5MjQ0OSwiZXhwIjoyMDc1ODY4NDQ5fQ.aoVHSt3evyhJOKY5_3LbUYlfbrFbuvKOC_NLgNIz4IU';
const TABLE_NAME = 'musikmarketing_de_posts';
const BASE_URL = 'https://musikmarketing.de/blog';

// ============================================
// HELPERS
// ============================================

function log(emoji, msg) {
  console.log(`${emoji} ${msg}`);
}

async function validateJson(filePath) {
  log('🔍', 'JSON validieren...');
  
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    // Check required fields
    const required = ['title', 'slug', 'excerpt', 'content', 'status', 'author', 'tags'];
    const missing = required.filter(field => !data[field]);
    
    if (missing.length > 0) {
      throw new Error(`Fehlende Felder: ${missing.join(', ')}`);
    }
    
    log('✅', `JSON valide! (${data.title})`);
    return data;
  } catch (error) {
    throw new Error(`JSON Validierung fehlgeschlagen: ${error.message}`);
  }
}

async function publishToSupabase(article) {
  log('📤', 'Zu Supabase publishen...');
  
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Normalize article data
    const payload = {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      cover_image: article.cover_image || null,
      status: article.status || 'published',
      author: article.author || 'Jana SwipeUp',
      tags: article.tags || [],
      published_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Check if slug already exists
    const { data: existing } = await supabase
      .from(TABLE_NAME)
      .select('id')
      .eq('slug', payload.slug);
    
    let result;
    if (existing && existing.length > 0) {
      // Update existing
      log('♻️', `Artikel existiert bereits, updaten: ${payload.slug}`);
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .update(payload)
        .eq('slug', payload.slug)
        .select();
      
      if (error) throw error;
      result = data[0];
    } else {
      // Insert new
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert([payload])
        .select();
      
      if (error) throw error;
      result = data[0];
    }
    
    log('✅', `Artikel published! ID: ${result.id}`);
    return result;
  } catch (error) {
    throw new Error(`Supabase Publikation fehlgeschlagen: ${error.message}`);
  }
}

async function regenerateSitemap() {
  log('🗺️', 'Sitemap regenerieren...');
  
  try {
    const { stdout, stderr } = await execAsync(
      'npm run generate:sitemap',
      { cwd: path.join(__dirname, '..') }
    );
    
    if (stderr && !stderr.includes('✅')) {
      console.error(stderr);
    }
    
    log('✅', 'Sitemap regeneriert');
  } catch (error) {
    throw new Error(`Sitemap-Regenerierung fehlgeschlagen: ${error.message}`);
  }
}

async function submitToGoogle() {
  log('🔍', 'Google Search Console Submit...');
  
  try {
    const { stdout, stderr } = await execAsync(
      'npm run submit:google',
      { cwd: path.join(__dirname, '..') }
    );
    
    if (stderr) {
      console.error(stderr);
    }
    
    if (stdout.includes('Sitemap erfolgreich eingereicht')) {
      log('✅', 'Google Search Console aktualisiert');
    } else {
      log('⚠️', 'Google Submit hatte ein Problem - aber Sitemap wird trotzdem gecrawlt');
    }
  } catch (error) {
    // Google Submit ist optional - nicht critical
    log('⚠️', `Google Submit fehlgeschlagen: ${error.message}`);
  }
}

async function savePublishLog(article, articleUrl) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ✅ PUBLISHED: "${article.title}" (${article.slug})
  URL: ${articleUrl}
  Author: ${article.author}
  Tags: ${article.tags.join(', ')}
---\n`;

  try {
    const logPath = path.join(__dirname, '../logs/publish-history.log');
    const logsDir = path.dirname(logPath);
    
    await fs.mkdir(logsDir, { recursive: true });
    await fs.appendFile(logPath, logEntry);
    
    log('📋', `Publish Log gespeichert`);
  } catch (error) {
    console.error('⚠️ Fehler beim Speichern des Logs:', error.message);
  }
}

async function sendNotification(article, articleUrl) {
  log('💬', 'Sende WhatsApp Benachrichtigung...');
  
  try {
    // Schreibe JSON für OpenClaw message tool
    const notification = {
      action: 'send',
      channel: 'whatsapp',
      to: '+4915904485630',
      message: `✅ **Artikel published!**\n\n📝 "${article.title}"\n🔗 ${articleUrl}\n\n👨‍💻 Author: ${article.author}\n🏷️ Tags: ${article.tags.join(', ')}`
    };
    
    console.log('\n📤 WhatsApp Nachricht wird vorbereitet:');
    console.log(JSON.stringify(notification, null, 2));
    
    // Speichere für manuelles Senden
    const notifPath = path.join(__dirname, '../logs/pending-notification.json');
    await fs.writeFile(notifPath, JSON.stringify(notification, null, 2));
    
    log('✅', 'WhatsApp Benachrichtigung vorbereitet (wird manuell gesendet)');
  } catch (error) {
    console.error('⚠️ Fehler bei WhatsApp:', error.message);
  }
}

// ============================================
// MAIN
// ============================================

async function main() {
  try {
    const args = process.argv.slice(2);
    
    if (!args[0]) {
      console.error('\n❌ Fehler: JSON-Datei erforderlich');
      console.error('Usage: node scripts/publish-article.js <article.json>\n');
      process.exit(1);
    }
    
    const filePath = path.resolve(args[0]);
    
    console.log('\n🚀 === MUSIKMARKETING ARTICLE PUBLISHER ===\n');
    log('📂', `Datei: ${filePath}`);
    
    // Step 1: Validate
    const article = await validateJson(filePath);
    
    // Step 2: Publish
    const published = await publishToSupabase(article);
    
    // Step 3: Regenerate Sitemap
    await regenerateSitemap();
    
    // Step 4: Submit to Google
    await submitToGoogle();
    
    // Generate URLs
    const articleUrl = `${BASE_URL}/${article.slug}`;
    
    // Step 5: Save log
    await savePublishLog(article, articleUrl);
    
    // Step 6: Send notification
    await sendNotification(article, articleUrl);
    
    console.log('\n' + '='.repeat(50));
    log('✨', 'FERTIG! Artikel ist live!\n');
    log('🔗', `URL: ${articleUrl}\n`);
    
  } catch (error) {
    console.error('\n❌ FEHLER:', error.message);
    process.exit(1);
  }
}

main();
