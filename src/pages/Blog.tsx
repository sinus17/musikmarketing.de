import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, Card, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import InternalLinks from '../components/InternalLinks';

export default function Blog() {
  const blogPosts = [
    {
      path: '/blog/was-ist-musikmarketing',
      emoji: '🎯',
      title: 'Was ist Musikmarketing?',
      description: 'Definition, Strategien & Tipps für Artists',
      date: '16. Januar 2025',
      readTime: '8 Min.'
    },
    {
      path: '/blog/spotify-verdienst',
      emoji: '💰',
      title: 'Spotify Verdienst',
      description: 'Wie viel zahlt Spotify pro Stream?',
      date: '16. Januar 2025',
      readTime: '7 Min.'
    },
    {
      path: '/blog/song-veroeffentlichen-kosten',
      emoji: '💵',
      title: 'Song veröffentlichen Kosten',
      description: 'Komplette Kostenübersicht für 2024',
      date: '16. Januar 2025',
      readTime: '7 Min.'
    },
    {
      path: '/blog/musikmarketing-tipps',
      emoji: '✨',
      title: '10 Musikmarketing Tipps',
      description: 'Strategien für mehr Reichweite',
      date: '16. Januar 2025',
      readTime: '9 Min.'
    },
    {
      path: '/blog/musikplattform-vergleich',
      emoji: '📊',
      title: 'Musikplattform Vergleich',
      description: 'Welche Plattform zahlt am besten?',
      date: '16. Januar 2025',
      readTime: '7 Min.'
    },
    {
      path: '/blog/song-vermarkten',
      emoji: '🚀',
      title: 'Song vermarkten',
      description: '7-Schritte-Plan für Artists',
      date: '16. Januar 2025',
      readTime: '8 Min.'
    },
    {
      path: '/blog/musik-bekannt',
      emoji: '⭐',
      title: 'Mit Musik bekannt werden',
      description: '5 Strategien für Artists',
      date: '16. Januar 2025',
      readTime: '8 Min.'
    }
  ];

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Musikmarketing Blog",
    "description": "Blog über Musikmarketing, Spotify Promotion, Social Media für Musiker und Artist Marketing Strategien",
    "url": "https://musikmarketing.de/blog",
    "publisher": {
      "@type": "Organization",
      "name": "SwipeUp Marketing",
      "logo": {
        "@type": "ImageObject",
        "url": "https://musikmarketing.de/musikmarketing.png"
      }
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "url": `https://musikmarketing.de${post.path}`,
      "datePublished": "2024-11-16",
      "author": {
        "@type": "Person",
        "name": "Philipp Lützenburger"
      }
    }))
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
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>

      <Box sx={{ background: 'linear-gradient(135deg, #07393c 0%, #0a090c 100%)', pt: { xs: 10, md: 14 }, pb: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography 
            component={motion.h1}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            variant="h1" 
            sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, fontWeight: 800, color: '#90ddf0', mb: { xs: 2, md: 3 }, lineHeight: 1.2, textAlign: 'center' }}
          >
            Musikmarketing Blog
          </Typography>
          <Typography 
            component={motion.h5}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variant="h5" 
            sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: '700px', mx: 'auto', lineHeight: 1.6 }}
          >
            Praxiserprobte Tipps & Strategien für Independent Artists
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 }, background: '#0a090c' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {blogPosts.map((post, index) => (
              <Grid item xs={12} sm={6} md={4} key={post.path}>
                <Card
                  component={motion.div}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  sx={{
                    background: 'rgba(17, 24, 39, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(144, 221, 240, 0.2)',
                    borderRadius: 3,
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      border: '1px solid rgba(144, 221, 240, 0.5)',
                      boxShadow: '0 12px 32px rgba(144, 221, 240, 0.2)',
                    }
                  }}
                >
                  <Link to={post.path} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Typography sx={{ fontSize: '3rem', lineHeight: 1 }}>{post.emoji}</Typography>
                    <Typography 
                      variant="h5" 
                      component="h2"
                      fontWeight={700} 
                      color="white"
                      sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                    >
                      {post.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      sx={{ 
                        flexGrow: 1,
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        lineHeight: 1.6
                      }}
                    >
                      {post.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: '1px solid rgba(144, 221, 240, 0.1)' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        {post.date} • {post.readTime}
                      </Typography>
                      <ArrowForwardIcon sx={{ color: '#90ddf0', fontSize: 20 }} />
                    </Box>
                  </Stack>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <InternalLinks title="Weitere Ressourcen" />
    </>
  );
}
