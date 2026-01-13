import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      navigate('/admin/dashboard')
    }
    setCheckingSession(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      navigate('/admin/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login fehlgeschlagen')
    } finally {
      setLoading(false)
    }
  }

  if (checkingSession) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#fff' }} />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: '#1a1a1a',
          borderRadius: 3,
          p: 4,
          border: '1px solid #333',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: 2,
            mb: 1,
            textAlign: 'center',
          }}
        >
          Admin
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#666', mb: 4, textAlign: 'center' }}
        >
          Musikmarketing.de Dashboard
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="E-Mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                bgcolor: '#0a0a0a',
                '& fieldset': { borderColor: '#333' },
                '&:hover fieldset': { borderColor: '#555' },
                '&.Mui-focused fieldset': { borderColor: '#fff' },
              },
              '& .MuiInputLabel-root': { color: '#666' },
              '& .MuiInputBase-input': { color: '#fff' },
            }}
          />

          <TextField
            fullWidth
            label="Passwort"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                bgcolor: '#0a0a0a',
                '& fieldset': { borderColor: '#333' },
                '&:hover fieldset': { borderColor: '#555' },
                '&.Mui-focused fieldset': { borderColor: '#fff' },
              },
              '& .MuiInputLabel-root': { color: '#666' },
              '& .MuiInputBase-input': { color: '#fff' },
            }}
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              bgcolor: '#fff',
              color: '#000',
              py: 1.5,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: 16,
              '&:hover': { bgcolor: '#e0e0e0' },
              '&:disabled': { bgcolor: '#555', color: '#999' },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Anmelden'}
          </Button>
        </form>
      </Box>
    </Box>
  )
}
