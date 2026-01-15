import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tiofwmkrbnxgmolifcgw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpb2Z3bWtyYm54Z21vbGlmY2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyOTI0NDksImV4cCI6MjA3NTg2ODQ0OX0.-IA1Wp3b45n0rDFHJoG1rce8LwT7yXcDgzUnt1gloxo'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createAdminUser() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: 'lukas@swipeup-marketing.com',
      password: '!Lukas#2026',
      options: {
        data: {
          role: 'admin'
        }
      }
    })

    if (error) {
      console.error('❌ Error creating admin user:', error.message)
      return
    }

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email:', 'lukas@swipeup-marketing.com')
    console.log('🔑 Password:', '!Lukas#2026')
    console.log('\n⚠️  Note: Check your email to confirm the account if email confirmation is enabled.')
    console.log('📝 User ID:', data.user?.id)
  } catch (err) {
    console.error('❌ Unexpected error:', err)
  }
}

createAdminUser()
