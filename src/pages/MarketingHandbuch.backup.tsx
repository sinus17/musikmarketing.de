import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, Button, Card, Grid } from '@mui/material';
import { ArrowForward as ArrowForwardIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import InternalLinks from '../components/InternalLinks';

export default function MarketingHandbuch() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Marketing Handbuch für Independent Artists 2025",
    "description": "Das komplette Marketing Handbuch für Independent Artists: Release-Strategie, Branding, Social Media, Monetarisierung und mehr.",
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
    "datePublished": "2024-11-16",
    "dateModified": "2024-11-16",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://musikmarketing.de/marketing-handbuch-fuer-artists"
    }
  };

  const chapters = [
    {
      number: '01',
      title: 'Deine Artist Brand',
      description: 'Entwickle eine starke, authentische Brand Identity',
      topics: ['Brand Positioning', 'Visual Identity', 'Story & Mission', 'Zielgruppen-Definition']
    },
    {
      number: '02',
      title: 'Release-Strategie',
      description: 'Plane und execute erfolgreiche Releases',
      topics: ['Pre-Release Marketing', 'Launch Day Strategie', 'Post-Release Momentum', 'Content-Planung']
    },
    {
      number: '03',
      title: 'Social Media Mastery',
      description: 'Baue eine starke Präsenz auf allen Plattformen auf',
      topics: ['Instagram Strategie', 'TikTok Content', 'YouTube Growth', 'Community Management']
    },
    {
      number: '04',
      title: 'Spotify & Streaming',
      description: 'Maximiere deine Streams und Einnahmen',
      topics: ['Playlist Pitching', 'Algorithmus-Optimierung', 'Pre-Save Kampagnen', 'Spotify Canvas']
    },
    {
      number: '05',
      title: 'Paid Advertising',
      description: 'Skaliere deine Reichweite mit Ads',
      topics: ['Instagram Ads', 'TikTok Ads', 'Facebook Ads', 'Budget-Optimierung']
    },
    {
      number: '06',
      title: 'Monetarisierung',
      description: 'Verdiene Geld mit deiner Musik',
      topics: ['Streaming Revenue', 'Merchandise', 'Live Shows', 'Brand Deals']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Marketing Handbuch für Independent Artists 2025 | Kompletter Guide</title>
        <meta name="description" content="Das komplette Marketing Handbuch für Independent Artists: Release-Strategie, Branding, Social Media, Monetarisierung und mehr." />
        <meta name="keywords" content="Artist Marketing Handbuch, Independent Artist Guide, Musikmarketing Strategie, Release Planung, Artist Branding" />
        <link rel="canonical" href="https://musikmarketing.de/marketing-handbuch-fuer-artists" />
        <meta property="og:title" content="Marketing Handbuch für Independent Artists 2025" />
        <meta property="og:description" content="Das komplette Marketing Handbuch für Independent Artists." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://musikmarketing.de/marketing-handbuch-fuer-artists" />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
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
            sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4.5rem' }, fontWeight: 800, color: '#90ddf0', mb: { xs: 2, md: 3 }, lineHeight: 1.1, textAlign: 'center' }}
          >
            Marketing Handbuch für Independent Artists
          </Typography>
          <Typography 
            component={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variant="h5" 
            sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}
          >
            Dein kompletter Guide für Release-Strategie, Branding, Social Media und Monetarisierung
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 }, background: '#0a090c' }}>
        <Container maxWidth="lg">
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            sx={{ mb: { xs: 6, md: 8 } }}
          >
            <Card sx={{ background: 'rgba(144, 221, 240, 0.1)', border: '2px solid #90ddf0', borderRadius: 3, p: { xs: 3, md: 5 } }}>
              <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: '#90ddf0' }}>
                Das Independent Artist Handbuch
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 2 }}>
                Als Independent Artist bist du nicht nur Musiker - du bist auch dein eigener Manager, Marketer und Brand Strategist. Dieses Handbuch gibt dir alle Tools und Strategien an die Hand, die du brauchst, um erfolgreich zu sein.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary' }}>
                Von der Entwicklung deiner Artist Brand über die perfekte Release-Strategie bis hin zur Monetarisierung - hier findest du alles, was du wissen musst.
              </Typography>
            </Card>
          </Box>

          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, fontWeight: 700, mb: { xs: 4, md: 5 }, color: '#90ddf0', textAlign: 'center' }}>
              Die 6 Kapitel
            </Typography>

            <Grid container spacing={{ xs: 3, md: 4 }}>
              {chapters.map((chapter, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card 
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    sx={{ 
                      background: 'rgba(17, 24, 39, 0.8)', 
                      border: '1px solid rgba(144, 221, 240, 0.2)', 
                      borderRadius: 3, 
                      p: { xs: 3, md: 4 },
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        border: '1px solid rgba(144, 221, 240, 0.5)',
                      }
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#90ddf0', fontWeight: 700, fontSize: '0.875rem', mb: 1 }}>
                      KAPITEL {chapter.number}
                    </Typography>
                    <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 2, color: 'white' }}>
                      {chapter.title}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.7, color: 'text.secondary', mb: 3 }}>
                      {chapter.description}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      {chapter.topics.map((topic, i) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CheckCircleIcon sx={{ color: '#90ddf0', fontSize: 18 }} />
                          <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.95rem' }}>
                            {topic}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Card sx={{ background: 'rgba(17, 24, 39, 0.8)', border: '1px solid rgba(144, 221, 240, 0.2)', borderRadius: 3, p: { xs: 3, md: 5 } }}>
              <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: '#90ddf0' }}>
                Was du lernen wirst
              </Typography>
              <Grid container spacing={3}>
                {[
                  'Wie du eine starke Artist Brand entwickelst',
                  'Die perfekte Release-Strategie für maximale Reichweite',
                  'Social Media Strategien, die wirklich funktionieren',
                  'Wie du auf Spotify Playlists kommst',
                  'Paid Ads für Musiker - von Anfänger bis Profi',
                  'Verschiedene Einnahmequellen als Artist',
                  'Community Building & Fan-Engagement',
                  'Analytics & Daten-basierte Entscheidungen'
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <CheckCircleIcon sx={{ color: '#90ddf0', fontSize: 24, mt: 0.5 }} />
                      <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.7, color: 'text.primary' }}>
                        {item}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Box>

          <Card 
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            sx={{ background: 'rgba(144, 221, 240, 0.1)', border: '2px solid #90ddf0', borderRadius: 3, p: { xs: 3, md: 5 }, textAlign: 'center' }}
          >
            <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 2, color: '#90ddf0' }}>
              Bereit, deine Musikkarriere zu professionalisieren?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 3 }}>
              Buche eine kostenlose Strategy-Session und erfahre, wie wir dir helfen können, deine Marketing-Strategie zu optimieren.
            </Typography>
            <Button variant="contained" size="large" href="https://swipeup-marketing.com/strategy-session" target="_blank" endIcon={<ArrowForwardIcon />} sx={{ py: 2, px: 4 }}>
              Kostenlose Strategy-Session buchen
            </Button>
          </Card>
        </Container>
      </Box>

      <InternalLinks currentPath="/marketing-handbuch-fuer-artists" />
    </>
  );
}
