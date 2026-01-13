import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, Stack, CircularProgress, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  status: 'draft' | 'published';
  published_date: string | null;
  author: string;
  tags: string[];
  created_at: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthAndFetchPosts();
  }, []);

  const checkAuthAndFetchPosts = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsLoggedIn(!!session);
    await fetchPosts(!!session);
  };

  const fetchPosts = async (loggedIn: boolean) => {
    try {
      let query = supabase
        .from('musikmarketing_de_posts')
        .select('*')
        .order('published_date', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (!loggedIn) {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
      <Helmet>
        <title>Musikmarketing Blog | Tipps & Strategien für Artists</title>
        <meta name="description" content="Lerne Musikmarketing: Spotify Promotion, Social Media Strategien, Release-Planung & mehr. Praxiserprobte Tipps für Independent Artists." />
        <meta name="keywords" content="Musikmarketing Blog, Artist Marketing, Spotify Tipps, Social Media für Musiker, Musikpromotion" />
        <link rel="canonical" href="https://musikmarketing.de/blog" />
        <meta property="og:title" content="Musikmarketing Blog | Tipps & Strategien für Artists" />
        <meta property="og:description" content="Lerne Musikmarketing: Spotify Promotion, Social Media Strategien, Release-Planung & mehr." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://musikmarketing.de/blog" />
      </Helmet>

      <Box sx={{ 
        minHeight: '100vh',
        background: '#000000',
        py: 8,
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            sx={{ 
              mb: 2,
              fontWeight: 700,
              color: '#ffffff',
              textAlign: 'left',
            }}
          >
            Musikmarketing Blog
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 6, 
              color: '#9e9e9e',
              maxWidth: '700px',
              textAlign: 'left',
            }}
          >
            Praxiserprobte Tipps und Strategien für Independent Artists
          </Typography>

          {/* Blog Posts Grid */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#fff' }} />
            </Box>
          ) : posts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography sx={{ color: '#666' }}>
                Noch keine Blog-Posts vorhanden
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      p: 3,
                      background: '#000000',
                      border: '1px solid #2a2a2a',
                      borderRadius: '4px',
                      transition: 'border-color 0.2s',
                      '&:hover': {
                        border: '1px solid #4a4a4a',
                      }
                    }}
                  >
                    {/* Cover Image */}
                    {post.cover_image && (
                      <Box
                        component="img"
                        src={post.cover_image}
                        alt={post.title}
                        sx={{
                          width: '100%',
                          height: 200,
                          objectFit: 'cover',
                          borderRadius: 1,
                          mb: 2,
                        }}
                      />
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        {/* Draft Badge */}
                        {isLoggedIn && post.status === 'draft' && (
                          <Chip
                            label="ENTWURF"
                            size="small"
                            sx={{
                              bgcolor: '#ff9800',
                              color: '#000',
                              fontWeight: 700,
                              fontSize: '0.7rem',
                              mb: 1,
                            }}
                          />
                        )}

                        <Typography 
                          variant="h3" 
                          sx={{ 
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            color: '#ffffff',
                            mb: 0.5,
                            textAlign: 'left'
                          }}
                        >
                          {post.title}
                        </Typography>
                        
                        {post.excerpt && (
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#9e9e9e',
                              mb: 1,
                              textAlign: 'left'
                            }}
                          >
                            {post.excerpt}
                          </Typography>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#6e6e6e',
                              fontSize: '0.75rem',
                            }}
                          >
                            {formatDate(post.published_date || post.created_at)}
                          </Typography>
                          {post.author && (
                            <>
                              <Typography variant="caption" sx={{ color: '#6e6e6e' }}>•</Typography>
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  color: '#6e6e6e',
                                  fontSize: '0.75rem',
                                }}
                              >
                                {post.author}
                              </Typography>
                            </>
                          )}
                        </Box>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1.5 }}>
                            {post.tags.map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{
                                  bgcolor: '#1a1a1a',
                                  color: '#999',
                                  border: '1px solid #333',
                                  fontSize: '0.7rem',
                                  height: 'auto',
                                  py: 0.5,
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Link>
              ))}
            </Stack>
          )}
        </Container>
      </Box>
    </>
  );
}
