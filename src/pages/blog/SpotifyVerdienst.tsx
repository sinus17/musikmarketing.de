import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import BlogAuthor from '../../components/BlogAuthor';
import InternalLinks from '../../components/InternalLinks';

export default function SpotifyVerdienst() {
  const publishDate = '2024-11-16';
  const modifiedDate = '2024-11-16';
  
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Spotify Verdienst: Wie viel zahlt Spotify pro Stream? [2024]",
    "description": "Erfahre, wie viel Spotify pro Stream zahlt und wie viele Streams du brauchst, um von deiner Musik leben zu können. Inklusive Rechner und Tabelle.",
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
      "@id": "https://musikmarketing.de/blog/spotify-verdienst"
    },
    "articleSection": "Musikmarketing",
    "keywords": "Spotify Verdienst, Spotify pro Stream, Spotify Einnahmen, Spotify Geld verdienen, Streaming Einnahmen",
    "wordCount": 700,
    "inLanguage": "de-DE"
  };

  return (
    <>
      <Helmet>
        <title>Spotify Verdienst: Wie viel zahlt Spotify pro Stream? [2024]</title>
        <meta name="description" content="Erfahre, wie viel Spotify pro Stream zahlt und wie viele Streams du brauchst, um von deiner Musik leben zu können. Inklusive Rechner und Tabelle." />
        <meta name="keywords" content="Spotify Verdienst, Spotify pro Stream, Spotify Einnahmen, Spotify Geld verdienen, Streaming Einnahmen" />
        <link rel="canonical" href="https://musikmarketing.de/blog/spotify-verdienst" />
        <meta property="og:title" content="Spotify Verdienst: Wie viel zahlt Spotify pro Stream?" />
        <meta property="og:description" content="Erfahre, wie viel Spotify pro Stream zahlt und wie viele Streams du brauchst, um von deiner Musik leben zu können." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://musikmarketing.de/blog/spotify-verdienst" />
        <script type="application/ld+json">
          {JSON.stringify(blogPostingSchema)}
        </script>
      </Helmet>

      <Box sx={{ background: 'linear-gradient(135deg, #07393c 0%, #0a090c 100%)', pt: { xs: 10, md: 14 }, pb: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.5rem' }, fontWeight: 800, color: '#90ddf0', mb: { xs: 2, md: 3 }, lineHeight: 1.2 }}>
            Spotify Verdienst: Wie viel zahlt Spotify pro Stream? [2024]
          </Typography>
          
          <BlogAuthor date="16. Januar 2025" readTime="7 Min. Lesezeit" />
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 }, background: '#0a090c' }}>
        <Container maxWidth="md">
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Card sx={{ background: 'rgba(144, 221, 240, 0.1)', border: '2px solid #90ddf0', borderRadius: 3, p: { xs: 3, md: 4 } }}>
              <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' }, fontWeight: 700, mb: 3, color: '#90ddf0' }}>
                Kurze Antwort
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary' }}>
                Spotify zahlt durchschnittlich zwischen 0,003€ und 0,005€ pro Stream. Das bedeutet, du brauchst etwa 200-333 Streams, um 1€ zu verdienen. Für 1.000€ monatlich benötigst du ca. 250.000 Streams pro Monat.
              </Typography>
            </Card>
          </Box>

          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: { xs: 3, md: 4 }, color: '#90ddf0' }}>
              Spotify Verdienst Tabelle
            </Typography>
            <TableContainer component={Card} sx={{ background: 'rgba(17, 24, 39, 0.8)', border: '1px solid rgba(144, 221, 240, 0.2)' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#90ddf0', fontWeight: 700 }}>Streams</TableCell>
                    <TableCell sx={{ color: '#90ddf0', fontWeight: 700 }}>Verdienst (ca.)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: 'text.primary' }}>1.000</TableCell>
                    <TableCell sx={{ color: 'text.primary' }}>3€ - 5€</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: 'text.primary' }}>10.000</TableCell>
                    <TableCell sx={{ color: 'text.primary' }}>30€ - 50€</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: 'text.primary' }}>100.000</TableCell>
                    <TableCell sx={{ color: 'text.primary' }}>300€ - 500€</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: 'text.primary' }}>1.000.000</TableCell>
                    <TableCell sx={{ color: 'text.primary' }}>3.000€ - 5.000€</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: { xs: 3, md: 4 }, color: '#90ddf0' }}>
              Faktoren, die deinen Spotify Verdienst beeinflussen
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 3 }}>
              <Typography component="li" variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 2 }}>
                <strong>Land der Hörer:</strong> Streams aus den USA und UK zahlen mehr als Streams aus anderen Ländern
              </Typography>
              <Typography component="li" variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 2 }}>
                <strong>Premium vs. Free:</strong> Streams von Premium-Nutzern zahlen deutlich mehr
              </Typography>
              <Typography component="li" variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 2 }}>
                <strong>Vertrag mit Distributor:</strong> Dein Distributor behält einen Teil der Einnahmen
              </Typography>
            </Box>
          </Box>

          <Card sx={{ background: 'rgba(144, 221, 240, 0.1)', border: '2px solid #90ddf0', borderRadius: 3, p: { xs: 3, md: 4 }, textAlign: 'center' }}>
            <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 2, color: '#90ddf0' }}>
              Mehr Streams durch professionelles Marketing
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 3 }}>
              Lerne, wie du deine Spotify Streams organisch und nachhaltig steigern kannst.
            </Typography>
            <Button variant="contained" size="large" href="https://swipeup-marketing.com/strategy-session" target="_blank" endIcon={<ArrowForwardIcon />} sx={{ py: 2, px: 4 }}>
              Kostenlose Strategy-Session buchen
            </Button>
          </Card>
        </Container>
      </Box>

      <InternalLinks currentPath="/blog/spotify-verdienst" />
    </>
  );
}
