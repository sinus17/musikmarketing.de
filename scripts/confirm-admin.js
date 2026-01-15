import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tiofwmkrbnxgmolifcgw.supabase.co'
// For admin operations, we need the service role key, but we'll use a workaround with SQL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpb2Z3bWtyYm54Z21vbGlmY2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyOTI0NDksImV4cCI6MjA3NTg2ODQ0OX0.-IA1Wp3b45n0rDFHJoG1rce8LwT7yXcDgzUnt1gloxo'

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
