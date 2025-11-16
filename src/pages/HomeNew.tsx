import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import LiquidGlass from 'liquid-glass-react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Stack,
} from '@mui/material';
import {
  MusicNote as MusicNoteIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  BarChart as BarChartIcon,
  ArrowForward as ArrowForwardIcon,
  AutoAwesome as SparkleIcon,
  Waves as WaveIcon,
} from '@mui/icons-material';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Helmet>
        <title>Musikmarketing | Professionelles Marketing für Musiker & Künstler</title>
        <meta 
          name="description" 
          content="Professionelles Musikmarketing für Musiker & Künstler. Steigere deine Reichweite mit unseren bewährten Marketing-Strategien, Instagram Ads und Social Media Tools." 
        />
        <meta name="keywords" content="Musikmarketing, Musik Marketing, Musik Promotion, Musik vermarkten, Social Media Marketing, Instagram Marketing, Musik streamen, Künstler Marketing, Musiker Promotion" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://musikmarketing.de/" />
        <meta property="og:title" content="Musikmarketing | Professionelles Marketing für Musiker & Künstler" />
        <meta property="og:description" content="Steigere deine Reichweite mit professionellem Musikmarketing. Instagram Ads, Content-Strategien und Social Media Analyse für Musiker." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://musikmarketing.de/" />
      </Helmet>

      {/* Dark Space Background Container */}
      <Box 
        ref={containerRef}
        sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a090c 0%, #07393c 50%, #0a090c 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 20%, rgba(144, 221, 240, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(44, 102, 110, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(7, 57, 60, 0.05) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
          }
        }}
      >
        {/* Floating Particles */}
        <Box sx={{ position: 'absolute', top: '10%', left: '10%', opacity: 0.3 }}>
          <SparkleIcon sx={{ fontSize: '2rem', color: 'primary.light', animation: 'float 6s ease-in-out infinite' }} />
        </Box>
        <Box sx={{ position: 'absolute', top: '20%', right: '15%', opacity: 0.2 }}>
          <WaveIcon sx={{ fontSize: '1.5rem', color: 'secondary.light', animation: 'float 8s ease-in-out infinite reverse' }} />
        </Box>
        <Box sx={{ position: 'absolute', bottom: '30%', left: '20%', opacity: 0.25 }}>
          <MusicNoteIcon sx={{ fontSize: '1.8rem', color: 'success.light', animation: 'float 7s ease-in-out infinite' }} />
        </Box>


        {/* Hero Section */}
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Box sx={{ display: 'inline-block', mb: 4 }}>
                <Box sx={{ 
                  width: '120px', 
                  height: '120px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: 'rgba(10, 9, 12, 0.6)', 
                  backdropFilter: 'blur(20px)', 
                  borderRadius: '24px', 
                  border: '1px solid rgba(144, 221, 240, 0.2)',
                  mx: 'auto',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    border: '1px solid rgba(144, 221, 240, 0.4)',
                    boxShadow: '0 0 30px rgba(144, 221, 240, 0.2)',
                    transform: 'translateY(-4px)',
                  }
                }}>
                  <MusicNoteIcon sx={{ fontSize: '3rem', color: 'primary.light' }} />
                </Box>
              </Box>

              <Typography 
                variant="h1" 
                sx={{ 
                  mb: 4,
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                  lineHeight: 1.1,
                  color: 'text.primary',
                  textShadow: '0 0 30px rgba(144, 221, 240, 0.3)',
                }}
              >
                für die{' '}
                <Box component="span" sx={{ 
                  fontFamily: '"Instrument Serif", serif', 
                  fontStyle: 'italic', 
                  background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Musikmarketing-Skills
                </Box>
                <br />
                der Zukunft
              </Typography>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 6, 
                  color: 'text.secondary',
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.5,
                  fontWeight: 400,
                }}
              >
                Erlerne durch unsere Online-Kurse gefragte{' '}
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                  Musikmarketing-Skills
                </Box>
                , mit denen du dich langfristig{' '}
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                  erfolgreich selbstständig
                </Box>{' '}
                machen kannst.
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                href="https://swipeup-marketing.com/analyse"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  borderRadius: '50px',
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                  boxShadow: '0 0 30px rgba(144, 221, 240, 0.4)',
                  '&:hover': {
                    boxShadow: '0 0 40px rgba(144, 221, 240, 0.6)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Kostenlose Beratung erhalten
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* What Makes Us Special Section */}
      <Box sx={{ py: 12, background: 'linear-gradient(135deg, #07393c 0%, #0a090c 100%)', position: 'relative' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" sx={{ 
              mb: 6, 
              fontWeight: 700, 
              color: 'text.primary',
              textAlign: 'center'
            }}>
              Das zeichnet{' '}
              <Box component="span" sx={{ 
                fontFamily: '"Instrument Serif", serif', 
                fontStyle: 'italic', 
                background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                musikmarketing.de
              </Box>{' '}
              aus
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={6}>
            <Box sx={{ 
              flex: 1, 
              textAlign: 'center', 
              p: 4,
              background: 'rgba(10, 9, 12, 0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(144, 221, 240, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '1px solid rgba(144, 221, 240, 0.4)',
                boxShadow: '0 0 30px rgba(144, 221, 240, 0.2)',
                transform: 'translateY(-4px)',
              }
            }}>
              <Box sx={{ mb: 3 }}>
                <CheckCircleIcon sx={{ fontSize: '4rem', color: 'primary.light' }} />
              </Box>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                Umfangreiche{' '}
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                  Komplettlösungen
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Unsere Online-Kurse haben den Anspruch, deine einzige Quelle für Informationen zu sein. 
                Du lernst bei uns alles, was du brauchst, um dein{' '}
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                  Musikmarketing
                </Box>{' '}
                wirklich zu beherrschen – kein Vorwissen nötig.
              </Typography>
            </Box>

            <Box sx={{ 
              flex: 1, 
              textAlign: 'center', 
              p: 4,
              background: 'rgba(15, 15, 35, 0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(167, 139, 250, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '1px solid rgba(167, 139, 250, 0.4)',
                boxShadow: '0 0 30px rgba(167, 139, 250, 0.2)',
                transform: 'translateY(-4px)',
              }
            }}>
              <Box sx={{ mb: 3 }}>
                <TrendingUpIcon sx={{ fontSize: '4rem', color: 'secondary.light' }} />
              </Box>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                Aktuelles Wissen direkt aus der{' '}
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'secondary.light' }}>
                  Praxis
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Alle gelehrten Skills setzen wir selbst täglich ein, sowie hunderte unserer über{' '}
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'secondary.light' }}>
                  1.000 erfolgreichen Musiker
                </Box>
                , die wir bereits betreut haben.
              </Typography>
            </Box>

            <Box sx={{ 
              flex: 1, 
              textAlign: 'center', 
              p: 4,
              background: 'rgba(15, 15, 35, 0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '1px solid rgba(16, 185, 129, 0.4)',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)',
                transform: 'translateY(-4px)',
              }
            }}>
              <Box sx={{ mb: 3 }}>
                <BarChartIcon sx={{ fontSize: '4rem', color: 'success.light' }} />
              </Box>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                Großes{' '}
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'success.light' }}>
                  Marktpotenzial
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Zu jedem dieser Skills haben wir genügend Beispiele von Musikern, die ausschließlich mit einem dieser Skills ein{' '}
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'success.light' }}>
                  erfolgreiches Business
                </Box>{' '}
                aufgebaut haben.
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Skills Selection Section */}
      <Box sx={{ py: 12, background: 'linear-gradient(135deg, #0a090c 0%, #07393c 100%)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" sx={{ mb: 4, fontWeight: 700, color: 'text.primary' }}>
              Wähle einen{' '}
              <Box component="span" sx={{ 
                fontFamily: '"Instrument Serif", serif', 
                fontStyle: 'italic', 
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Skill
              </Box>
              , den du meistern möchtest
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
            {/* Instagram Ads & Social Media Marketing */}
              <Card sx={{ 
                flex: 1,
                p: 4,
                background: 'rgba(15, 15, 35, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                borderRadius: '24px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '1px solid rgba(96, 165, 250, 0.5)',
                  boxShadow: '0 0 30px rgba(96, 165, 250, 0.3)',
                },
              }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  Instagram Ads &{' '}
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                    Social Media Marketing
                  </Box>
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                  Lerne professionelle Instagram Ads zu schalten und deine Social Media Präsenz aufzubauen.
                </Typography>
                <Button
                  variant="contained"
                  href="https://song.so/instagram-ads-blueprint"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    mb: 1,
                    background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                    boxShadow: '0 0 20px rgba(96, 165, 250, 0.3)',
                    '&:hover': {
                      boxShadow: '0 0 30px rgba(96, 165, 250, 0.5)',
                    }
                  }}
                >
                  Instagram Ads Blueprint
                </Button>
              </Card>
            </LiquidGlass>

            {/* Content Creation */}
            <LiquidGlass
              displacementScale={40}
              blurAmount={0.12}
              saturation={125}
              aberrationIntensity={1.2}
              elasticity={0.35}
              cornerRadius={24}
              mouseContainer={containerRef}
              style={{ flex: 1 }}
            >
              <Card sx={{ 
                flex: 1,
                p: 4,
                background: 'rgba(15, 15, 35, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(167, 139, 250, 0.3)',
                borderRadius: '24px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '1px solid rgba(167, 139, 250, 0.5)',
                  boxShadow: '0 0 30px rgba(167, 139, 250, 0.3)',
                },
              }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'secondary.light' }}>
                    Content Creation
                  </Box>{' '}
                  für Musiker
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                  Täglich neue Content-Ideen und Strategien für deine Social Media Kanäle.
                </Typography>
                <Button
                  variant="contained"
                  href="https://swipeup-marketing.com/365-content-club"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    mb: 1,
                    background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
                    boxShadow: '0 0 20px rgba(167, 139, 250, 0.3)',
                    '&:hover': {
                      boxShadow: '0 0 30px rgba(167, 139, 250, 0.5)',
                    }
                  }}
                >
                  365 Content Club
                </Button>
              </Card>
            </LiquidGlass>

            {/* Analyse & Beratung */}
            <LiquidGlass
              displacementScale={40}
              blurAmount={0.12}
              saturation={125}
              aberrationIntensity={1.2}
              elasticity={0.35}
              cornerRadius={24}
              mouseContainer={containerRef}
              style={{ flex: 1 }}
            >
              <Card sx={{ 
                flex: 1,
                p: 4,
                background: 'rgba(15, 15, 35, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '24px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '1px solid rgba(16, 185, 129, 0.5)',
                  boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)',
                },
              }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'success.light' }}>
                    Kostenlose
                  </Box>{' '}
                  Analyse & Beratung
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                  Erhalte eine kostenlose Analyse deiner Social Media Profile und persönliche Beratung.
                </Typography>
                <Button
                  variant="contained"
                  href="https://swipeup-marketing.com/analyse"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    mb: 1,
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
                    '&:hover': {
                      boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)',
                    }
                  }}
                >
                  Kostenlose Analyse
                </Button>
              </Card>
            </LiquidGlass>
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        py: 12, 
        background: 'linear-gradient(135deg, #07393c 0%, #0a090c 100%)', 
        color: 'white', 
        textAlign: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 30%, rgba(96, 165, 250, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(167, 139, 250, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <LiquidGlass
            displacementScale={50}
            blurAmount={0.15}
            saturation={130}
            aberrationIntensity={2}
            elasticity={0.4}
            cornerRadius={32}
            mouseContainer={containerRef}
            style={{ display: 'inline-block', marginBottom: '2rem' }}
          >
            <Typography variant="h3" sx={{ 
              mb: 4, 
              fontWeight: 700,
              p: 3,
              background: 'rgba(15, 15, 35, 0.4)',
              backdropFilter: 'blur(20px)',
              borderRadius: '32px',
              border: '1px solid rgba(96, 165, 250, 0.2)'
            }}>
              Mit welchem{' '}
              <Box component="span" sx={{ 
                fontFamily: '"Instrument Serif", serif', 
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Skill
              </Box>{' '}
              solltest du starten?
            </Typography>
          </LiquidGlass>
          
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
            Erhalte deine{' '}
            <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
              persönliche Beratung
            </Box>{' '}
            und finde heraus, welcher Musikmarketing-Skill am besten zu dir passt.
          </Typography>
          
          <LiquidGlass
            displacementScale={48}
            blurAmount={0.1}
            saturation={140}
            aberrationIntensity={1.5}
            elasticity={0.3}
            cornerRadius={50}
            mouseContainer={containerRef}
            style={{ display: 'inline-block' }}
          >
            <Button
              variant="contained"
              size="large"
              href="https://swipeup-marketing.com/analyse"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
                backgroundColor: 'white',
                color: 'primary.main',
                borderRadius: '50px',
                textTransform: 'none',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  backgroundColor: 'grey.100',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              Erhalte individuelle Hilfe zur Wahl deines{' '}
              <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', ml: 0.5 }}>
                Musikmarketing-Skills
              </Box>
            </Button>
          </LiquidGlass>
        </Container>
      </Box>
    </>
  );
};

export default Home;
