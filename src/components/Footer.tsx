import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
}

const Footer = () => {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('musikmarketing_de_posts')
        .select('id, title, slug, status')
        .eq('status', 'published')
        .order('published_date', { ascending: false, nullsFirst: false })
        .limit(4);

      if (error) throw error;
      setLatestPosts(data || []);
    } catch (error) {
      console.error('Error fetching latest posts:', error);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#000000',
        color: '#9e9e9e',
        py: 6,
        borderTop: '1px solid #2a2a2a',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 2, color: '#ffffff' }}>
              Musikmarketing.de
            </Typography>
            <Typography variant="body2" sx={{ color: '#9e9e9e', mb: 3, lineHeight: 1.6 }}>
              Professionelles Musikmarketing für Musiker & Künstler.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                href="https://instagram.com/swipeup"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#9e9e9e',
                  '&:hover': { color: '#ffffff' },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="https://www.youtube.com/@philipp.swipeup"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#9e9e9e',
                  '&:hover': { color: '#ffffff' },
                }}
              >
                <YouTubeIcon />
              </IconButton>
              <IconButton
                href="https://tiktok.com/@philipp.swipeup"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#9e9e9e',
                  '&:hover': { color: '#ffffff' },
                }}
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#ffffff', fontSize: '0.875rem' }}>
              Unsere Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="/musikmarketing-agentur"
                sx={{
                  color: '#9e9e9e',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': { color: '#ffffff' },
                }}
              >
                Musikmarketing Agentur
              </Link>
              <Link
                href="https://song.so/instagram-ads-blueprint"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#9e9e9e',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': { color: '#ffffff' },
                }}
              >
                Instagram Ads Blueprint
              </Link>
              <Link
                href="https://swipeup-marketing.com/365-content-club"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#9e9e9e',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': { color: '#ffffff' },
                }}
              >
                365 Content Club
              </Link>
              <Link
                href="https://swipeup-marketing.com/analyse"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#9e9e9e',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': { color: '#ffffff' },
                }}
              >
                Social Media Analyse
              </Link>
            </Box>
          </Grid>

          {/* Blog */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#ffffff', fontSize: '0.875rem' }}>
              Blog
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="/blog"
                sx={{
                  color: '#9e9e9e',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': { color: '#ffffff' },
                }}
              >
                Alle Artikel
              </Link>
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  sx={{
                    color: '#9e9e9e',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: '#ffffff' },
                  }}
                >
                  {post.title}
                </Link>
              ))}
            </Box>
          </Grid>

        </Grid>

        <Divider sx={{ my: 4, borderColor: '#2a2a2a' }} />
        
        <Box sx={{ textAlign: 'left' }}>
          <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
            <Link
              href="https://swipeup-marketing.com/impressum"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#9e9e9e',
                textDecoration: 'none',
                fontSize: '0.75rem',
                '&:hover': { color: '#ffffff' },
              }}
            >
              Impressum
            </Link>
            <Link
              href="https://swipeup-marketing.com/datenschutz"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#9e9e9e',
                textDecoration: 'none',
                fontSize: '0.75rem',
                '&:hover': { color: '#ffffff' },
              }}
            >
              Datenschutz
            </Link>
          </Box>
          <Typography variant="body2" sx={{ color: '#9e9e9e', fontSize: '0.75rem' }}>
            &copy; 2025 Musikmarketing.de. Alle Rechte vorbehalten.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
