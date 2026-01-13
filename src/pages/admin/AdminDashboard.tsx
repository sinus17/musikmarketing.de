import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/admin/DashboardLayout'
import { supabase } from '../../lib/supabase'
import { Box, Typography, Grid, Paper } from '@mui/material'

interface Stats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { data: posts, error } = await supabase
        .from('musikmarketing_de_posts')
        .select('status')

      if (error) throw error

      const total = posts?.length || 0
      const published = posts?.filter(p => p.status === 'published').length || 0
      const draft = posts?.filter(p => p.status === 'draft').length || 0

      setStats({
        totalPosts: total,
        publishedPosts: published,
        draftPosts: draft,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { label: 'Gesamt Posts', value: stats.totalPosts, color: '#fff', href: '/admin/blog' },
    { label: 'Veröffentlicht', value: stats.publishedPosts, color: '#4caf50', href: '/admin/blog' },
    { label: 'Entwürfe', value: stats.draftPosts, color: '#ff9800', href: '/admin/blog' },
  ]

  return (
    <DashboardLayout>
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: 2,
            mb: 4,
          }}
        >
          Dashboard
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.label}>
              <Link to={card.href} style={{ textDecoration: 'none' }}>
                <Paper
                  sx={{
                    p: 3,
                    bgcolor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: card.color,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                    {card.label}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      color: card.color,
                    }}
                  >
                    {loading ? '...' : card.value}
                  </Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Typography
          variant="h6"
          sx={{ color: '#fff', fontWeight: 700, mb: 2 }}
        >
          Schnellaktionen
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Link to="/admin/blog/create" style={{ textDecoration: 'none' }}>
              <Paper
                sx={{
                  px: 3,
                  py: 2,
                  bgcolor: '#fff',
                  color: '#000',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: '#e0e0e0',
                  },
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  + Neuer Blog-Post
                </Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/admin/blog" style={{ textDecoration: 'none' }}>
              <Paper
                sx={{
                  px: 3,
                  py: 2,
                  bgcolor: '#2a2a2a',
                  color: '#fff',
                  borderRadius: 2,
                  cursor: 'pointer',
                  border: '1px solid #333',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#555',
                  },
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  📝 Alle Posts verwalten
                </Typography>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  )
}
