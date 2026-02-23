import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data, error } = await supabase
  .from('musikmarketing_de_posts')
  .select('*')
  .limit(1);

if (data && data.length > 0) {
  console.log('Sample article columns:');
  console.log(Object.keys(data[0]).sort());
} else {
  console.log('No articles found or error:', error);
}
