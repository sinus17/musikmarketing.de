import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

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
          <Stack spacing={2}>
            {blogPosts.map((post) => (
              <Link
                key={post.path}
                to={post.path}
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
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Typography sx={{ fontSize: '2rem' }}>
                      {post.emoji}
                    </Typography>
                    <Box sx={{ flex: 1 }}>
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
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#9e9e9e',
                          mb: 1,
                          textAlign: 'left'
                        }}
                      >
                        {post.description}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#6e6e6e',
                          fontSize: '0.75rem',
                          textAlign: 'left'
                        }}
                      >
                        {post.date} • {post.readTime}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Link>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
