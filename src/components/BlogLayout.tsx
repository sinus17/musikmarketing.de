import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, Button } from '@mui/material';

interface BlogLayoutProps {
  title: string;
  description: string;
  keywords?: string;
  children: ReactNode;
  author?: string;
  date?: string;
}

const BlogLayout = ({ 
  title, 
  description, 
  keywords, 
  children,
  author = "SwipeUp Marketing Team",
  date 
}: BlogLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{title} | Musikmarketing.de</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${title} | Musikmarketing.de`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Box sx={{ 
        minHeight: '100vh',
        background: '#000000',
        py: 8,
      }}>
        <Container maxWidth="md">
          {/* Header */}
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                mb: 2,
                fontWeight: 700,
                color: '#ffffff',
                textAlign: 'left',
              }}
            >
              {title}
            </Typography>
            
            {date && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#9e9e9e',
                  textAlign: 'left',
                  mb: 1,
                }}
              >
                {date}
              </Typography>
            )}
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#9e9e9e',
                textAlign: 'left',
              }}
            >
              Von {author}
            </Typography>
          </Box>

          {/* Content */}
          <Box sx={{ 
            color: '#ffffff',
            '& h2': {
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              mb: 2,
              mt: 4,
              textAlign: 'left',
            },
            '& h3': {
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#ffffff',
              mb: 2,
              mt: 3,
              textAlign: 'left',
            },
            '& p': {
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#9e9e9e',
              mb: 2,
              textAlign: 'left',
            },
            '& ul, & ol': {
              color: '#9e9e9e',
              mb: 2,
              pl: 3,
              textAlign: 'left',
            },
            '& li': {
              mb: 1,
            },
            '& a': {
              color: '#ffffff',
              textDecoration: 'underline',
              '&:hover': {
                opacity: 0.8,
              }
            },
            '& strong': {
              color: '#ffffff',
              fontWeight: 600,
            }
          }}>
            {children}
          </Box>

          {/* CTA */}
          <Box sx={{ 
            mt: 8,
            p: 4,
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '4px',
            textAlign: 'left'
          }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: '#ffffff' }}>
              Bereit für professionelles Musikmarketing?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: '#9e9e9e' }}>
              Buche jetzt deine kostenlose Strategy-Session und erhalte einen individuellen Plan für deine Musikkarriere.
            </Typography>
            <Button
              variant="contained"
              href="https://swipeup-marketing.com/strategy-session"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kostenlose Beratung buchen
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BlogLayout;
