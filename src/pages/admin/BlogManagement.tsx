import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/admin/DashboardLayout'
import { supabase } from '../../lib/supabase'
import {
  Box,
  Typography,
  Button,
  ButtonGroup,
  Paper,
  Chip,
  CircularProgress,
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddIcon from '@mui/icons-material/Add'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image: string | null
  status: 'draft' | 'published'
  published_date: string | null
  author: string
  tags: string[]
  created_at: string
}

export default function BlogManagement() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<Post[]>([])
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('musikmarketing_de_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm('Möchtest du diesen Post wirklich löschen?')) return

    try {
      const { error } = await supabase
        .from('musikmarketing_de_posts')
        .delete()
        .eq('id', id)

      if (error) throw error

      console.log('✅ Post gelöscht')
      fetchPosts()
    } catch (error: any) {
      console.error('❌ Error deleting post:', error)
      alert(`Fehler beim Löschen: ${error.message}`)
    }
  }

  const filteredPosts = posts.filter((post) => {
    if (filter === 'all') return true
    return post.status === filter
  })

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Kein Datum'
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <DashboardLayout>
      <Box sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            Blog Management
          </Typography>
          <Link to="/admin/blog/create" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: '#fff',
                color: '#000',
                '&:hover': { bgcolor: '#e0e0e0' },
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Neuer Post
            </Button>
          </Link>
        </Box>

        {/* Filter Buttons */}
        <ButtonGroup sx={{ mb: 3 }}>
          {(['all', 'published', 'draft'] as const).map((status) => (
            <Button
              key={status}
              onClick={() => setFilter(status)}
              sx={{
                bgcolor: filter === status ? '#fff' : '#2a2a2a',
                color: filter === status ? '#000' : '#999',
                '&:hover': { bgcolor: filter === status ? '#e0e0e0' : '#333' },
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              {status === 'all' ? 'Alle' : status === 'published' ? 'Veröffentlicht' : 'Entwürfe'}
            </Button>
          ))}
        </ButtonGroup>

        {/* Posts List */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#fff' }} />
          </Box>
        ) : filteredPosts.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              bgcolor: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography sx={{ color: '#666', mb: 2 }}>
              Noch keine Blog-Posts vorhanden.
            </Typography>
            <Link to="/admin/blog/create" style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                Erstelle deinen ersten Post →
              </Button>
            </Link>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredPosts.map((post) => (
              <Paper
                key={post.id}
                onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                sx={{
                  position: 'relative',
                  bgcolor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#555',
                  },
                }}
              >
                {/* Background Image */}
                {post.cover_image && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${post.cover_image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: 0.1,
                      filter: 'blur(4px)',
                    }}
                  />
                )}

                <Box sx={{ position: 'relative', p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: '#fff',
                          mb: 0.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {formatDate(post.published_date)} • {post.author}
                      </Typography>
                    </Box>

                    <Chip
                      label={post.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                      size="small"
                      sx={{
                        bgcolor: post.status === 'published' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                        color: post.status === 'published' ? '#4caf50' : '#ff9800',
                        fontWeight: 500,
                        ml: 2,
                      }}
                    />
                  </Box>

                  {post.excerpt && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#999',
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.excerpt}
                    </Typography>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {post.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: '#2a2a2a',
                            color: '#999',
                            fontSize: 12,
                          }}
                        />
                      ))}
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/admin/blog/edit/${post.id}`)
                      }}
                      size="small"
                      sx={{ color: '#fff' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(`/blog/${post.slug}`, '_blank')
                      }}
                      size="small"
                      sx={{ color: '#666' }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        deletePost(post.id)
                      }}
                      size="small"
                      sx={{ color: '#f44336' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </DashboardLayout>
  )
}
