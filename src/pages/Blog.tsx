import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, Stack, CircularProgress, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { generateBreadcrumbSchema } from '../utils/seo';

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

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://musikmarketing.de' },
    { name: 'Blog', url: 'https://musikmarketing.de/blog' },
  ]);

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
        <title>Musikmarketing Blog: Tipps & Strategien für Artists 2026</title>
        <meta name="description" content="Musikmarketing Blog mit praxiserprobten Tipps: Spotify Promotion, Instagram Marketing, TikTok Strategien & Release-Planung für Independent Artists." />
        <meta name="keywords" content="Musikmarketing Blog, Artist Marketing, Spotify Tipps, Social Media für Musiker, Musikpromotion, Instagram Marketing, TikTok für Musiker" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://musikmarketing.de/blog" />
        <meta property="og:title" content="Musikmarketing Blog: Tipps & Strategien für Artists 2026" />
        <meta property="og:description" content="Musikmarketing Blog mit praxiserprobten Tipps: Spotify Promotion, Instagram Marketing, TikTok Strategien & Release-Planung für Independent Artists." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://musikmarketing.de/blog" />
        <meta property="og:image" content="https://musikmarketing.de/musikmarketing.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            ...breadcrumbSchema
          })}
        </script>
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
              mb: 3, 
              color: '#9e9e9e',
              maxWidth: '800px',
              textAlign: 'left',
              fontSize: '1.1rem',
            }}
          >
            Praxiserprobte Musikmarketing-Tipps und Strategien für Independent Artists
          </Typography>

          {/* SEO Content Box */}
          <Box sx={{ 
            mb: 6,
            p: 3,
            background: '#0a0a0a',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            maxWidth: '800px',
          }}>
            <Typography sx={{ color: '#b0b0b0', mb: 2, lineHeight: 1.7 }}>
              Willkommen im <strong style={{ color: '#ffffff' }}>Musikmarketing Blog</strong> von musikmarketing.de. 
              Hier findest du aktuelle Artikel, Guides und Strategien rund um <strong style={{ color: '#ffffff' }}>Musikpromotion</strong>, 
              Social Media Marketing und Artist Development. Alle Inhalte basieren auf praktischer Erfahrung aus hunderten 
              erfolgreichen Kampagnen.
            </Typography>
            <Typography sx={{ color: '#b0b0b0', lineHeight: 1.7 }}>
              Themen: Instagram Marketing für Musiker, Spotify Promotion, TikTok Strategien, Release-Planung, 
              Paid Ads für Artists und vieles mehr.
            </Typography>
          </Box>

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
                    {/* Cover Image - Disabled */}

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
