import { Box, Container, Typography, Card, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const links = [
  {
    path: '/ultimativer-leitfaden',
    emoji: '📚',
    title: 'Ultimativer Leitfaden',
    description: 'Kompletter Musikmarketing-Leitfaden 2025 mit allen wichtigen Strategien'
  },
  {
    path: '/marketing-handbuch-fuer-artists',
    emoji: '📖',
    title: 'Marketing Handbuch',
    description: 'Das Independent Artist Handbuch: Release-Strategie, Branding & mehr'
  },
  {
    path: '/ads-schalten-lernen',
    emoji: '📱',
    title: 'Instagram Ads lernen',
    description: 'Lerne Instagram Ads für deine Musik - Der komplette Blueprint'
  },
  {
    path: '/blog',
    emoji: '📝',
    title: 'Musikmarketing Blog',
    description: 'Alle Artikel über Musikmarketing, Spotify & Social Media Strategien'
  },
  {
    path: '/blog/was-ist-musikmarketing',
    emoji: '🎯',
    title: 'Was ist Musikmarketing?',
    description: 'Definition, Strategien & Tipps für Artists'
  },
  {
    path: '/blog/musikmarketing-tipps',
    emoji: '✨',
    title: '10 Musikmarketing Tipps',
    description: 'Strategien für mehr Reichweite'
  },
  {
    path: '/musikmarketing-agentur',
    emoji: '🎵',
    title: 'Musikmarketing Agentur',
    description: 'Professionelle Marketing-Services für Artists'
  },
];

interface InternalLinksProps {
  currentPath?: string;
  title?: string;
}

export default function InternalLinks({ currentPath, title = 'Weitere Ressourcen' }: InternalLinksProps) {
  const filteredLinks = links.filter(link => link.path !== currentPath);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, background: 'rgba(7, 57, 60, 0.3)' }}>
      <Container maxWidth="md">
        <Typography 
          component={motion.h2}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variant="h2"
          fontWeight={700} 
          mb={{ xs: 4, md: 5 }}
          textAlign="center"
          sx={{ 
            color: '#90ddf0',
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          {title}
        </Typography>
        <Grid 
          container 
          spacing={{ xs: 3, md: 4 }}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredLinks.map((link) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              key={link.path}
              component={motion.div}
              variants={itemVariants}
            >
              <Card
                component={Link}
                to={link.path}
                sx={{
                  background: 'rgba(17, 24, 39, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(144, 221, 240, 0.2)',
                  borderRadius: 2,
                  p: { xs: 3, md: 3.5 },
                  height: '100%',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    border: '1px solid rgba(144, 221, 240, 0.5)',
                    boxShadow: '0 8px 24px rgba(144, 221, 240, 0.2)',
                  }
                }}
              >
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Typography sx={{ fontSize: '2.5rem', lineHeight: 1 }}>{link.emoji}</Typography>
                  <Typography 
                    variant="h6" 
                    component="div"
                    fontWeight={700} 
                    color="white"
                    sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
                  >
                    {link.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      flexGrow: 1,
                      fontSize: { xs: '0.875rem', md: '0.95rem' },
                      lineHeight: 1.6
                    }}
                  >
                    {link.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#90ddf0', mt: 'auto', pt: 1 }}>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.875rem' }}>
                      Mehr erfahren
                    </Typography>
                    <ArrowForwardIcon sx={{ ml: 1, fontSize: 18 }} />
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
