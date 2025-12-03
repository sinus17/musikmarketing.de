import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, Button, Card } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BlogAuthor from '../../components/BlogAuthor';
import InternalLinks from '../../components/InternalLinks';

export default function WasIstMusikmarketing() {
  const publishDate = '2024-11-16';
  const modifiedDate = '2024-11-16';
  
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Was ist Musikmarketing? Definition, Strategien & Tipps für Artists",
    "description": "Musikmarketing umfasst alle Maßnahmen, um deine Musik bekannt zu machen. Lerne die wichtigsten Strategien für Social Media, Spotify & mehr.",
    "image": "https://musikmarketing.de/musikmarketing.png",
    "author": {
      "@type": "Person",
      "name": "Philipp Lützenburger",
      "url": "https://www.linkedin.com/in/philipp-l%C3%BCtzenburger-7b9b9b1b0/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SwipeUp Marketing",
      "logo": {
        "@type": "ImageObject",
        "url": "https://musikmarketing.de/musikmarketing.png"
      }
    },
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://musikmarketing.de/blog/was-ist-musikmarketing"
    },
    "articleSection": "Musikmarketing",
    "keywords": "Musikmarketing, Musik Marketing, Artist Marketing, Musik vermarkten, Social Media Marketing für Musiker",
    "wordCount": 800,
    "inLanguage": "de-DE"
  };

  return (
    <>
      <Helmet>
        <title>Was ist Musikmarketing? Definition & Strategien für Artists 2024</title>
        <meta name="description" content="Musikmarketing umfasst alle Maßnahmen, um deine Musik bekannt zu machen. Lerne die wichtigsten Strategien für Social Media, Spotify & mehr." />
        <meta name="keywords" content="Musikmarketing, Musik Marketing, Artist Marketing, Musik vermarkten, Social Media Marketing für Musiker" />
        <link rel="canonical" href="https://musikmarketing.de/blog/was-ist-musikmarketing" />
        <meta property="og:title" content="Was ist Musikmarketing? Definition & Strategien für Artists" />
        <meta property="og:description" content="Musikmarketing umfasst alle Maßnahmen, um deine Musik bekannt zu machen. Lerne die wichtigsten Strategien für Social Media, Spotify & mehr." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://musikmarketing.de/blog/was-ist-musikmarketing" />
        <script type="application/ld+json">
          {JSON.stringify(blogPostingSchema)}
        </script>
      </Helmet>

      <Box sx={{ background: 'linear-gradient(135deg, #07393c 0%, #0a090c 100%)', pt: { xs: 10, md: 14 }, pb: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography 
            component={motion.h1}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            variant="h1" 
            sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.5rem' }, fontWeight: 800, color: '#90ddf0', mb: { xs: 2, md: 3 }, lineHeight: 1.2 }}
          >
            Was ist Musikmarketing? Definition, Strategien & Tipps für Artists
          </Typography>
          
          <BlogAuthor date="16. Januar 2025" readTime="8 Min. Lesezeit" />
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 }, background: '#0a090c' }}>
        <Container maxWidth="md">
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{ mb: { xs: 6, md: 8 } }}
          >
            <Card sx={{ background: 'rgba(144, 221, 240, 0.1)', border: '2px solid #90ddf0', borderRadius: 3, p: { xs: 3, md: 4 } }}>
              <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' }, fontWeight: 700, mb: 3, color: '#90ddf0' }}>
                Kurze Antwort
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary' }}>
                Musikmarketing umfasst alle Maßnahmen und Strategien, um deine Musik bei deiner Zielgruppe bekannt zu machen und eine treue Fanbase aufzubauen. Dazu gehören Social Media Marketing, Spotify-Promotion, Content Creation, Paid Ads und Community-Building.
              </Typography>
            </Card>
          </Box>

          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: { xs: 3, md: 4 }, color: '#90ddf0' }}>
              Die 5 wichtigsten Bereiche des Musikmarketings
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 2, color: '#90ddf0' }}>
                1. Social Media Marketing
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 2 }}>
                Instagram, TikTok und YouTube sind die wichtigsten Plattformen für Artists. Hier baust du deine Community auf und zeigst deine Persönlichkeit hinter der Musik.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 2, color: '#90ddf0' }}>
                2. Spotify & Streaming-Promotion
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 2 }}>
                Playlist-Pitching, Pre-Save-Kampagnen und Spotify Canvas sind essenzielle Tools, um auf Streaming-Plattformen zu wachsen.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 2, color: '#90ddf0' }}>
                3. Content Creation
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 2 }}>
                Regelmäßiger, authentischer Content ist der Schlüssel. Behind-the-Scenes, Studio-Sessions und persönliche Stories verbinden dich mit deinen Fans.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 2, color: '#90ddf0' }}>
                4. Paid Advertising
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 2 }}>
                Instagram Ads, TikTok Ads und Spotify Ad Studio ermöglichen es dir, gezielt neue Hörer zu erreichen und deine Reichweite zu skalieren.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 2, color: '#90ddf0' }}>
                5. Community Building
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 2 }}>
                Eine engagierte Community ist wertvoller als Millionen passive Follower. Interagiere mit deinen Fans, antworte auf Kommentare und baue echte Beziehungen auf.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: { xs: 3, md: 4 }, color: '#90ddf0' }}>
              Warum ist Musikmarketing so wichtig?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 3 }}>
              In einer Zeit, in der täglich über 100.000 neue Songs auf Spotify hochgeladen werden, reicht gute Musik allein nicht mehr aus. Musikmarketing hilft dir:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 3 }}>
              <Typography component="li" variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 1 }}>
                Aus der Masse herauszustechen
              </Typography>
              <Typography component="li" variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 1 }}>
                Deine Zielgruppe gezielt zu erreichen
              </Typography>
              <Typography component="li" variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 1 }}>
                Eine treue Fanbase aufzubauen
              </Typography>
              <Typography component="li" variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 1 }}>
                Von deiner Musik leben zu können
              </Typography>
            </Box>
          </Box>

          <Card 
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            sx={{ background: 'rgba(144, 221, 240, 0.1)', border: '2px solid #90ddf0', borderRadius: 3, p: { xs: 3, md: 4 }, textAlign: 'center' }}
          >
            <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 2, color: '#90ddf0' }}>
              Bereit, dein Musikmarketing auf das nächste Level zu bringen?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 3 }}>
              Buche eine kostenlose Strategy-Session und erfahre, wie wir dir helfen können, deine Musik erfolgreich zu vermarkten.
            </Typography>
            <Button variant="contained" size="large" href="https://swipeup-marketing.com/strategy-session" target="_blank" endIcon={<ArrowForwardIcon />} sx={{ py: 2, px: 4 }}>
              Kostenlose Strategy-Session buchen
            </Button>
          </Card>
        </Container>
      </Box>

      <InternalLinks currentPath="/blog/was-ist-musikmarketing" />
    </>
  );
}
