import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, Button, Card } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import InternalLinks from '../components/InternalLinks';

export default function UltimativerLeitfaden() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Ultimativer Musikmarketing Leitfaden 2025 für Independent Artists",
    "description": "Der komplette Musikmarketing-Leitfaden 2025: Von Social Media über Spotify bis zu Paid Ads. Alles was du als Independent Artist wissen musst.",
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
      "@id": "https://musikmarketing.de/ultimativer-leitfaden"
    }
  };

  return (
    <>
      <Helmet>
        <title>Ultimativer Musikmarketing Leitfaden 2025 | Kompletter Guide für Artists</title>
        <meta name="description" content="Der komplette Musikmarketing-Leitfaden 2025: Von Social Media über Spotify bis zu Paid Ads. Alles was du als Independent Artist wissen musst." />
        <meta name="keywords" content="Musikmarketing Leitfaden, Artist Marketing Guide, Musikpromotion, Social Media für Musiker, Spotify Marketing" />
        <link rel="canonical" href="https://musikmarketing.de/ultimativer-leitfaden" />
        <meta property="og:title" content="Ultimativer Musikmarketing Leitfaden 2025" />
        <meta property="og:description" content="Der komplette Musikmarketing-Leitfaden 2025 für Independent Artists." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://musikmarketing.de/ultimativer-leitfaden" />
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
            Ultimativer Musikmarketing Leitfaden 2025
          </Typography>
          <Typography 
            component={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variant="h5" 
            sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}
          >
            Alles was du als Independent Artist über Musikmarketing wissen musst - von Social Media bis Spotify
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
                Warum dieser Leitfaden?
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 2 }}>
                Die Musikindustrie hat sich fundamental verändert. Heute reicht es nicht mehr, nur gute Musik zu machen - du musst auch wissen, wie du sie vermarktest. Dieser Leitfaden gibt dir alle Tools und Strategien an die Hand, die du brauchst, um als Independent Artist erfolgreich zu sein.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary' }}>
                Von Social Media Marketing über Spotify-Promotion bis hin zu Paid Advertising - hier findest du alles, was du wissen musst.
              </Typography>
            </Card>
          </Box>

          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, fontWeight: 700, mb: { xs: 4, md: 5 }, color: '#90ddf0', textAlign: 'center' }}>
              Die 7 Säulen des modernen Musikmarketings
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                {
                  title: '1. Social Media Marketing',
                  description: 'Instagram, TikTok und YouTube sind deine wichtigsten Kanäle. Lerne, wie du eine authentische Präsenz aufbaust, viral gehst und eine engagierte Community schaffst.',
                  points: ['Content-Strategie entwickeln', 'Algorithmus verstehen', 'Engagement maximieren', 'Reels & TikToks optimieren']
                },
                {
                  title: '2. Spotify & Streaming-Strategie',
                  description: 'Streaming ist die Haupteinnahmequelle für Artists. Verstehe, wie der Spotify-Algorithmus funktioniert und wie du auf Playlists kommst.',
                  points: ['Playlist Pitching', 'Pre-Save Kampagnen', 'Spotify Canvas', 'Release-Strategie']
                },
                {
                  title: '3. Content Creation',
                  description: 'Regelmäßiger, hochwertiger Content ist der Schlüssel zum Erfolg. Lerne, wie du Content erstellst, der deine Fans begeistert.',
                  points: ['Behind-the-Scenes', 'Studio Sessions', 'Storytelling', 'Content-Kalender']
                },
                {
                  title: '4. Paid Advertising',
                  description: 'Mit dem richtigen Budget kannst du deine Reichweite exponentiell steigern. Lerne Instagram Ads, TikTok Ads und Spotify Ad Studio.',
                  points: ['Instagram Ads Setup', 'Zielgruppen-Targeting', 'Creative Testing', 'ROI Optimierung']
                },
                {
                  title: '5. E-Mail Marketing',
                  description: 'Deine E-Mail Liste ist dein wertvollstes Asset. Sie gehört dir und kann dir nicht weggenommen werden.',
                  points: ['Liste aufbauen', 'Newsletter-Strategie', 'Automation', 'Conversion optimieren']
                },
                {
                  title: '6. Community Building',
                  description: '1.000 echte Fans sind wertvoller als 100.000 passive Follower. Baue eine Community auf, die dich unterstützt.',
                  points: ['Fan-Engagement', 'Discord/WhatsApp Gruppen', 'Exklusiver Content', 'Meet & Greets']
                },
                {
                  title: '7. Analytics & Optimization',
                  description: 'Daten sind dein bester Freund. Lerne, wie du deine Zahlen interpretierst und deine Strategie optimierst.',
                  points: ['Spotify for Artists', 'Instagram Insights', 'Google Analytics', 'A/B Testing']
                }
              ].map((section, index) => (
                <Card 
                  key={index}
                  component={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  sx={{ 
                    background: 'rgba(17, 24, 39, 0.8)', 
                    border: '1px solid rgba(144, 221, 240, 0.2)', 
                    borderRadius: 3, 
                    p: { xs: 3, md: 4 },
                    '&:hover': {
                      border: '1px solid rgba(144, 221, 240, 0.4)',
                    }
                  }}
                >
                  <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.75rem' }, fontWeight: 700, mb: 2, color: '#90ddf0' }}>
                    {section.title}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 3 }}>
                    {section.description}
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, m: 0 }}>
                    {section.points.map((point, i) => (
                      <Typography key={i} component="li" variant="body2" sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, lineHeight: 1.7, color: 'text.secondary', mb: 1 }}>
                        {point}
                      </Typography>
                    ))}
                  </Box>
                </Card>
              ))}
            </Box>
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
              Bereit, dein Musikmarketing zu meistern?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 3 }}>
              Buche eine kostenlose Strategy-Session und erfahre, wie wir dir helfen können, deine Musikkarriere auf das nächste Level zu bringen.
            </Typography>
            <Button variant="contained" size="large" href="https://swipeup-marketing.com/strategy-session" target="_blank" endIcon={<ArrowForwardIcon />} sx={{ py: 2, px: 4 }}>
              Kostenlose Strategy-Session buchen
            </Button>
          </Card>
        </Container>
      </Box>

      <InternalLinks currentPath="/ultimativer-leitfaden" />
    </>
  );
}
