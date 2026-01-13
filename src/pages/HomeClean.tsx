import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  Chip,
} from '@mui/material';
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

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('musikmarketing_de_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_date', { ascending: false, nullsFirst: false })
        .limit(3);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoadingPosts(false);
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
        <title>Musikmarketing | Professionelles Marketing für Musiker & Künstler</title>
        <meta 
          name="description" 
          content="Erlerne essenzielle Musikmarketing-Skills, um dich als Artist erfolgreich selbst zu vermarkten in einer Zeit, in der Sichtbarkeit auf Social Media immer wichtiger wird." 
        />
        <meta name="keywords" content="Musikmarketing, Musik Marketing, Musik Promotion, Musik vermarkten, Social Media Marketing, Instagram Marketing, Musik streamen, Künstler Marketing, Musiker Promotion" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://musikmarketing.de/" />
        <meta property="og:title" content="Musikmarketing | Professionelles Marketing für Musiker & Künstler" />
        <meta property="og:description" content="Steigere deine Reichweite mit professionellem Musikmarketing. Instagram Ads, Content-Strategien und Social Media Analyse für Musiker." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://musikmarketing.de/" />
      </Helmet>

      {/* Main Container - Black Background */}
      <Box sx={{ 
        minHeight: '100vh',
        background: '#000000',
        py: 8,
      }}>
        <Container maxWidth="lg">
          {/* Blog Section - Media Outlet Style */}
          <Box sx={{ mb: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h2" sx={{ 
                fontWeight: 700, 
                color: '#ffffff',
                textAlign: 'left'
              }}>
                Neueste Artikel
              </Typography>
              <Button
                component={Link}
                to="/blog"
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': { color: '#9e9e9e' }
                }}
              >
                Alle Artikel →
              </Button>
            </Box>

            {!loadingPosts && posts.length > 0 && (
              <Grid container spacing={3}>
                {/* Featured Post - Large */}
                {posts[0] && (
                  <Grid item xs={12} md={8}>
                    <Link to={`/blog/${posts[0].slug}`} style={{ textDecoration: 'none' }}>
                      <Box
                        sx={{
                          height: '100%',
                          background: '#0a0a0a',
                          border: '1px solid #2a2a2a',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          transition: 'all 0.3s',
                          '&:hover': {
                            border: '1px solid #4a4a4a',
                            transform: 'translateY(-4px)',
                          }
                        }}
                      >
                        {posts[0].cover_image && (
                          <Box
                            component="img"
                            src={posts[0].cover_image}
                            alt={posts[0].title}
                            sx={{
                              width: '100%',
                              height: 400,
                              objectFit: 'cover',
                            }}
                          />
                        )}
                        <Box sx={{ p: 4 }}>
                          {posts[0].tags && posts[0].tags.length > 0 && (
                            <Chip
                              label={posts[0].tags[0]}
                              size="small"
                              sx={{
                                bgcolor: '#1a1a1a',
                                color: '#fff',
                                border: '1px solid #333',
                                mb: 2,
                                fontWeight: 600,
                                fontSize: '0.75rem',
                              }}
                            />
                          )}
                          <Typography
                            variant="h3"
                            sx={{
                              fontSize: '1.75rem',
                              fontWeight: 700,
                              color: '#ffffff',
                              mb: 2,
                              lineHeight: 1.3,
                            }}
                          >
                            {posts[0].title}
                          </Typography>
                          {posts[0].excerpt && (
                            <Typography
                              variant="body1"
                              sx={{
                                color: '#9e9e9e',
                                mb: 2,
                                lineHeight: 1.6,
                              }}
                            >
                              {posts[0].excerpt}
                            </Typography>
                          )}
                          <Typography variant="caption" sx={{ color: '#666', fontSize: '0.875rem' }}>
                            {formatDate(posts[0].published_date || posts[0].created_at)}
                          </Typography>
                        </Box>
                      </Box>
                    </Link>
                  </Grid>
                )}

                {/* Side Posts - Smaller */}
                <Grid item xs={12} md={4}>
                  <Stack spacing={3}>
                    {posts.slice(1, 3).map((post) => (
                      <Link key={post.id} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                        <Box
                          sx={{
                            background: '#0a0a0a',
                            border: '1px solid #2a2a2a',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            transition: 'all 0.3s',
                            '&:hover': {
                              border: '1px solid #4a4a4a',
                              transform: 'translateY(-2px)',
                            }
                          }}
                        >
                          {post.cover_image && (
                            <Box
                              component="img"
                              src={post.cover_image}
                              alt={post.title}
                              sx={{
                                width: '100%',
                                height: 180,
                                objectFit: 'cover',
                              }}
                            />
                          )}
                          <Box sx={{ p: 3 }}>
                            {post.tags && post.tags.length > 0 && (
                              <Chip
                                label={post.tags[0]}
                                size="small"
                                sx={{
                                  bgcolor: '#1a1a1a',
                                  color: '#fff',
                                  border: '1px solid #333',
                                  mb: 1.5,
                                  fontWeight: 600,
                                  fontSize: '0.7rem',
                                  height: 'auto',
                                  py: 0.5,
                                }}
                              />
                            )}
                            <Typography
                              variant="h5"
                              sx={{
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: '#ffffff',
                                mb: 1,
                                lineHeight: 1.3,
                              }}
                            >
                              {post.title}
                            </Typography>
                            {post.excerpt && (
                              <Typography
                                variant="body2"
                                sx={{
                                  color: '#9e9e9e',
                                  mb: 1.5,
                                  lineHeight: 1.5,
                                  fontSize: '0.875rem',
                                }}
                              >
                                {post.excerpt.length > 120 ? `${post.excerpt.substring(0, 120)}...` : post.excerpt}
                              </Typography>
                            )}
                            <Typography variant="caption" sx={{ color: '#666', fontSize: '0.8rem' }}>
                              {formatDate(post.published_date || post.created_at)}
                            </Typography>
                          </Box>
                        </Box>
                      </Link>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            )}

            {!loadingPosts && posts.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography sx={{ color: '#666' }}>
                  Noch keine Blog-Posts vorhanden
                </Typography>
              </Box>
            )}
          </Box>

          {/* CTA Section */}
          <Box sx={{ 
            p: 4,
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '4px',
            textAlign: 'left'
          }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: '#ffffff' }}>
              Bereit durchzustarten?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: '#9e9e9e' }}>
              Buche jetzt deine kostenlose Strategy-Session und erhalte einen individuellen Plan für deine Musikkarriere.
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="https://swipeup-marketing.com/strategy-session"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jetzt kostenlose Beratung buchen
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
