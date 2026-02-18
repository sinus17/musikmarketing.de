import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tiofwmkrbnxgmolifcgw.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'USE_ENV_VAR'

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
