import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Box, Typography, Button, CircularProgress } from '@mui/material'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/admin')
      }
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [navigate])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session?.user ?? null)
    setLoading(false)

    if (!session) {
      navigate('/admin')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin')
  }

  if (loading) {
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

  if (!user) {
    return null
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Blog', href: '/admin/blog', icon: '📝' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#000', display: 'flex' }}>
      {/* Sidebar */}
      <Box
        component="aside"
        sx={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: 256,
          bgcolor: '#1a1a1a',
          borderRight: '1px solid #333',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ p: 3 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: 2,
                cursor: 'pointer',
                '&:hover': { color: '#666' },
                transition: 'color 0.3s',
              }}
            >
              Musikmarketing
            </Typography>
          </Link>
          <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
            Admin Panel
          </Typography>
        </Box>

        <Box component="nav" sx={{ px: 2, flex: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                to={item.href}
                style={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    mb: 1,
                    bgcolor: isActive ? '#fff' : 'transparent',
                    color: isActive ? '#000' : '#999',
                    fontWeight: isActive ? 700 : 400,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: isActive ? '#fff' : '#2a2a2a',
                      color: '#fff',
                    },
                  }}
                >
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <span>{item.name}</span>
                </Box>
              </Link>
            )
          })}
        </Box>

        {/* User Info & Logout */}
        <Box sx={{ p: 2, borderTop: '1px solid #333' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: '#666' }}>
              Angemeldet als:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#fff',
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user.email}
            </Typography>
          </Box>
          <Button
            onClick={handleLogout}
            fullWidth
            sx={{
              bgcolor: 'rgba(244, 67, 54, 0.1)',
              color: '#f44336',
              '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.2)' },
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Abmelden
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          ml: '256px',
          minHeight: '100vh',
          flex: 1,
          bgcolor: '#000',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
