import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data, error } = await supabase
  .from('musikmarketing_de_posts')
  .select('slug, title, status')
  .order('created_at', { ascending: false })
  .limit(10);

if (error) {
  console.error('Error:', error);
} else {
  console.log('Recent articles in database:');
  data.forEach(post => {
    console.log(`  • ${post.slug} (${post.status}) — ${post.title}`);
  });
}
