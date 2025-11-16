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
  MusicNote as MusicNoteIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#000000',
        color: 'white',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MusicNoteIcon sx={{ color: 'primary.light', mr: 1, fontSize: '2rem' }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                Musikmarketing.de
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: 'grey.300', mb: 3, lineHeight: 1.6 }}>
              Professionelles Musikmarketing für Musiker & Künstler. 
              Steigere deine Reichweite mit unseren bewährten Marketing-Strategien und Tools.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                href="https://instagram.com/swipeup"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'grey.400',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="https://www.youtube.com/@philipp.swipeup"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'grey.400',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                <YouTubeIcon />
              </IconButton>
              <IconButton
                href="https://tiktok.com/@philipp.swipeup"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'grey.400',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Unsere Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="/musikmarketing-agentur"
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                Musikmarketing Agentur
              </Link>
              <Link
                href="https://song.so/instagram-ads-blueprint"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                Instagram Ads Blueprint
              </Link>
              <Link
                href="https://swipeup-marketing.com/365-content-club"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                365 Content Club
              </Link>
              <Link
                href="https://swipeup-marketing.com/analyse"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                Social Media Analyse
              </Link>
            </Box>
          </Grid>

          {/* Blog */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Blog
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="/blog"
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                Alle Artikel
              </Link>
              <Link
                href="/blog/was-ist-musikmarketing"
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                Was ist Musikmarketing?
              </Link>
              <Link
                href="/blog/spotify-verdienst"
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                Spotify Verdienst
              </Link>
              <Link
                href="/blog/musikmarketing-tipps"
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                Musikmarketing Tipps
              </Link>
              <Link
                href="/blog/song-vermarkten"
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                Song vermarkten
              </Link>
            </Box>
          </Grid>

        </Grid>

        <Divider sx={{ my: 4, borderColor: 'grey.800' }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2 }}>
            <Link
              href="https://swipeup-marketing.com/impressum"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'grey.400',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: 'primary.light' },
              }}
            >
              Impressum
            </Link>
            <Link
              href="https://swipeup-marketing.com/datenschutz"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'grey.400',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: 'primary.light' },
              }}
            >
              Datenschutz
            </Link>
          </Box>
          <Typography variant="body2" sx={{ color: 'grey.400' }}>
            &copy; 2025 Musikmarketing.de. Alle Rechte vorbehalten.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
