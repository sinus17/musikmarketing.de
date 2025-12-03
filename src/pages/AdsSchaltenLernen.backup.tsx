import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, Button, Card, Grid, Stack } from '@mui/material';
import { ArrowForward as ArrowForwardIcon, TrendingUp, AttachMoney, People, Speed } from '@mui/icons-material';
import { motion } from 'framer-motion';
import InternalLinks from '../components/InternalLinks';

export default function AdsSchaltenLernen() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Instagram Ads für Musiker lernen 2025 | Kompletter Blueprint",
    "description": "Lerne Instagram Ads für deine Musik: Kompletter Blueprint von Setup bis Optimierung. Erreiche tausende potenzielle Fans mit dem richtigen Budget.",
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
      "@id": "https://musikmarketing.de/ads-schalten-lernen"
    }
  };

  const benefits = [
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#90ddf0' }} />,
      title: 'Skalierbare Reichweite',
      description: 'Erreiche tausende potenzielle Fans in wenigen Tagen'
    },
    {
      icon: <AttachMoney sx={{ fontSize: 40, color: '#90ddf0' }} />,
      title: 'Kosteneffizient',
      description: 'Schon ab 5€/Tag kannst du messbare Ergebnisse erzielen'
    },
    {
      icon: <People sx={{ fontSize: 40, color: '#90ddf0' }} />,
      title: 'Präzises Targeting',
      description: 'Erreiche genau die Menschen, die deine Musik lieben werden'
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: '#90ddf0' }} />,
      title: 'Schnelle Ergebnisse',
      description: 'Sehe erste Ergebnisse bereits nach 24-48 Stunden'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Facebook Business Manager Setup',
      description: 'Erstelle deinen Business Manager Account und verbinde deine Instagram Seite. Das ist die Grundlage für alle deine Ads.',
      details: ['Business Manager Account erstellen', 'Instagram Seite verbinden', 'Zahlungsmethode hinzufügen', 'Pixel installieren']
    },
    {
      step: '02',
      title: 'Zielgruppen-Definition',
      description: 'Definiere deine perfekte Zielgruppe basierend auf Interessen, Demografie und Verhalten.',
      details: ['Interessen-Targeting', 'Lookalike Audiences', 'Custom Audiences', 'Demografische Filter']
    },
    {
      step: '03',
      title: 'Creative Erstellung',
      description: 'Erstelle scroll-stopping Creatives, die Aufmerksamkeit erregen und zum Klicken animieren.',
      details: ['Video-Ads erstellen', 'Carousel Ads', 'Story Ads', 'Copywriting Basics']
    },
    {
      step: '04',
      title: 'Kampagnen-Setup',
      description: 'Richte deine erste Kampagne ein mit dem richtigen Ziel, Budget und Zeitplan.',
      details: ['Kampagnenziel wählen', 'Budget festlegen', 'Laufzeit planen', 'Placements optimieren']
    },
    {
      step: '05',
      title: 'Testing & Optimierung',
      description: 'Teste verschiedene Creatives und Zielgruppen, um herauszufinden, was am besten funktioniert.',
      details: ['A/B Testing', 'Creative Testing', 'Audience Testing', 'Budget Optimierung']
    },
    {
      step: '06',
      title: 'Scaling & Analytics',
      description: 'Skaliere erfolgreiche Kampagnen und analysiere deine Daten für kontinuierliche Verbesserung.',
      details: ['Erfolgreiche Ads skalieren', 'ROI berechnen', 'Conversion Tracking', 'Reporting']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Instagram Ads für Musiker lernen 2025 | Kompletter Blueprint</title>
        <meta name="description" content="Lerne Instagram Ads für deine Musik: Kompletter Blueprint von Setup bis Optimierung. Erreiche tausende potenzielle Fans mit dem richtigen Budget." />
        <meta name="keywords" content="Instagram Ads Musiker, Facebook Ads Musik, Paid Advertising Artists, Social Media Ads, Musikpromotion Ads" />
        <link rel="canonical" href="https://musikmarketing.de/ads-schalten-lernen" />
        <meta property="og:title" content="Instagram Ads für Musiker lernen 2025" />
        <meta property="og:description" content="Lerne Instagram Ads für deine Musik - Der komplette Blueprint." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://musikmarketing.de/ads-schalten-lernen" />
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
            Instagram Ads für Musiker lernen
          </Typography>
          <Typography 
            component={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variant="h5" 
            sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}
          >
            Der komplette Blueprint: Von Setup bis Optimierung - Erreiche tausende potenzielle Fans
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
                Warum Instagram Ads für Musiker?
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 2 }}>
                Organisches Wachstum auf Instagram ist schwieriger denn je. Der Algorithmus bevorzugt Accounts, die bereits groß sind. Mit Instagram Ads kannst du dieses Problem umgehen und gezielt Menschen erreichen, die deine Musik lieben werden.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary' }}>
                Das Beste: Du brauchst kein riesiges Budget. Schon mit 5-10€ pro Tag kannst du hunderte potenzielle Fans erreichen und deine Musik promoten.
              </Typography>
            </Card>
          </Box>

          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, fontWeight: 700, mb: { xs: 4, md: 5 }, color: '#90ddf0', textAlign: 'center' }}>
              Die Vorteile von Instagram Ads
            </Typography>

            <Grid container spacing={{ xs: 3, md: 4 }}>
              {benefits.map((benefit, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card 
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    sx={{ 
                      background: 'rgba(17, 24, 39, 0.8)', 
                      border: '1px solid rgba(144, 221, 240, 0.2)', 
                      borderRadius: 3, 
                      p: { xs: 3, md: 4 },
                      height: '100%',
                      textAlign: 'center',
                      '&:hover': {
                        border: '1px solid rgba(144, 221, 240, 0.5)',
                      }
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{benefit.icon}</Box>
                    <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 2, color: 'white' }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.7, color: 'text.secondary' }}>
                      {benefit.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, fontWeight: 700, mb: { xs: 4, md: 5 }, color: '#90ddf0', textAlign: 'center' }}>
              Der 6-Schritte Blueprint
            </Typography>

            <Stack spacing={4}>
              {steps.map((step, index) => (
                <Card 
                  key={index}
                  component={motion.div}
                  initial={{ opacity: 0, x: -30 }}
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Typography variant="h6" sx={{ 
                      color: '#90ddf0', 
                      fontWeight: 700, 
                      fontSize: '2rem',
                      opacity: 0.5
                    }}>
                      {step.step}
                    </Typography>
                    <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.75rem' }, fontWeight: 700, color: '#90ddf0' }}>
                      {step.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 3 }}>
                    {step.description}
                  </Typography>
                  <Grid container spacing={2}>
                    {step.details.map((detail, i) => (
                      <Grid item xs={12} sm={6} key={i}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#90ddf0' }} />
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
                            {detail}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              ))}
            </Stack>
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
              Bereit, mit Instagram Ads durchzustarten?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 3 }}>
              Buche eine kostenlose Strategy-Session und erfahre, wie wir dir helfen können, erfolgreiche Ad-Kampagnen zu schalten.
            </Typography>
            <Button variant="contained" size="large" href="https://swipeup-marketing.com/strategy-session" target="_blank" endIcon={<ArrowForwardIcon />} sx={{ py: 2, px: 4 }}>
              Kostenlose Strategy-Session buchen
            </Button>
          </Card>
        </Container>
      </Box>

      <InternalLinks currentPath="/ads-schalten-lernen" />
    </>
  );
}
