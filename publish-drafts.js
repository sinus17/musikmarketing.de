#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function publishDrafts() {
  try {
    console.log('\n🔍 Searching for draft articles...\n');

    // Fetch all draft posts
    const { data: drafts, error: fetchError } = await supabase
      .from('musikmarketing_de_posts')
      .select('*')
      .eq('status', 'draft');

    if (fetchError) throw fetchError;

    if (!drafts || drafts.length === 0) {
      console.log('✅ No draft articles found. All articles are already published!\n');
      return;
    }

    console.log(`📝 Found ${drafts.length} draft article(s):\n`);
    drafts.forEach((draft, index) => {
      console.log(`   ${index + 1}. ${draft.title} (${draft.slug})`);
    });

    console.log('\n🚀 Publishing all drafts...\n');

    let published = 0;
    let errors = 0;

    for (const draft of drafts) {
      try {
        const { error: updateError } = await supabase
          .from('musikmarketing_de_posts')
          .update({ 
            status: 'published',
            published_date: new Date().toISOString()
          })
          .eq('id', draft.id);

        if (updateError) throw updateError;

        console.log(`✅ Published: ${draft.slug}`);
        published++;
      } catch (error) {
        console.error(`❌ Error publishing ${draft.slug}:`, error.message);
        errors++;
      }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`📊 Results:`);
    console.log(`   ✅ Published: ${published}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log(`${'='.repeat(60)}\n`);

    if (errors === 0) {
      console.log('✨ All drafts published successfully!\n');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

publishDrafts();
