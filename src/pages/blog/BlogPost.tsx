import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../../lib/supabase'
import {
  Box,
  Container,
  Typography,
  Chip,
  CircularProgress,
  Button,
} from '@mui/material'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image: string | null
  status: 'draft' | 'published'
  published_date: string | null
  author: string
  tags: string[]
  created_at: string
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (slug && authChecked) {
      fetchPost()
    }
  }, [slug, authChecked])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setIsLoggedIn(!!session)
    setAuthChecked(true)
  }

  const fetchPost = async () => {
    try {
      let query = supabase
        .from('musikmarketing_de_posts')
        .select('*')
        .eq('slug', slug)

      if (!isLoggedIn) {
        query = query.eq('status', 'published')
      }

      const { data, error } = await query.single()

      if (error) throw error
      setPost(data)
    } catch (error: any) {
      console.error('Error fetching post:', error)
      setError('Artikel nicht gefunden')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#000',
        }}
      >
        <CircularProgress sx={{ color: '#fff' }} />
      </Box>
    )
  }

  if (error || !post) {
    window.location.href = 'https://musikmarketing.de'
    return null
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Musikmarketing.de</title>
        <meta name="description" content={post.excerpt || post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        {post.cover_image && <meta property="og:image" content={post.cover_image} />}
      </Helmet>

      <Box sx={{ bgcolor: '#000', minHeight: '100vh', py: 8 }}>
        <Container maxWidth="md">
          {/* Cover Image */}
          {post.cover_image && (
            <Box
              component="img"
              src={post.cover_image}
              alt={post.title}
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                borderRadius: 2,
                mb: 4,
              }}
            />
          )}

          {/* Draft Badge */}
          {isLoggedIn && post.status === 'draft' && (
            <Box sx={{ mb: 3 }}>
              <Chip
                label="ENTWURF"
                sx={{
                  bgcolor: '#ff9800',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                }}
              />
            </Box>
          )}

          {/* Title */}
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 900,
              color: '#fff',
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            {post.title}
          </Typography>

          {/* Meta */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              {formatDate(post.published_date)}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              •
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              {post.author}
            </Typography>
          </Box>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: '#1a1a1a',
                    color: '#999',
                    border: '1px solid #333',
                  }}
                />
              ))}
            </Box>
          )}

          {/* Content */}
          <Box
            sx={{
              color: '#e0e0e0',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              '& h2': {
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.75rem',
                mt: 4,
                mb: 2,
              },
              '& h3': {
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.4rem',
                mt: 3,
                mb: 2,
              },
              '& p': {
                mb: 2,
              },
              '& a': {
                color: '#fff',
                textDecoration: 'underline',
              },
              '& ul, & ol': {
                pl: 3,
                mb: 2,
              },
              '& li': {
                mb: 1,
              },
              '& img': {
                maxWidth: '100%',
                borderRadius: 2,
                my: 3,
              },
              '& blockquote': {
                borderLeft: '4px solid #333',
                pl: 3,
                ml: 0,
                color: '#999',
                fontStyle: 'italic',
              },
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Block */}
          <Box
            sx={{
              mt: 6,
              mb: 4,
              p: 4,
              bgcolor: '#1a1a1a',
              borderRadius: 3,
              border: '1px solid #333',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: '#fff',
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
              }}
            >
              Bereit durchzustarten?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#999',
                mb: 3,
                fontSize: '1.1rem',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Buche jetzt deine kostenlose Strategy-Session und erhalte einen individuellen Plan für deine Musikkarriere.
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="https://swipeup-marketing.com/strategy-session"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: '#fff',
                color: '#000',
                fontWeight: 700,
                fontSize: '1rem',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#e0e0e0',
                },
              }}
            >
              Jetzt kostenlose Beratung buchen
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  )
}
