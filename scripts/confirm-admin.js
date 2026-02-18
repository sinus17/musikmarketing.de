import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tiofwmkrbnxgmolifcgw.supabase.co'
// For admin operations, we need the service role key, but we'll use a workaround with SQL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'USE_ENV_VAR'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function confirmUser() {
  try {
    console.log('⚠️  Note: Email confirmation requires service role key or SQL access.')
    console.log('📝 Please run this SQL query in your Supabase SQL Editor:')
    console.log('\n---SQL QUERY---')
    console.log(`UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    confirmed_at = NOW()
WHERE email = 'lukas@swipeup-marketing.com';`)
    console.log('---END SQL---\n')
    console.log('Or disable email confirmation in:')
    console.log('Supabase Dashboard → Authentication → Settings → "Enable email confirmations" (toggle off)')
  } catch (err) {
    console.error('❌ Error:', err)
  }
}

confirmUser()
