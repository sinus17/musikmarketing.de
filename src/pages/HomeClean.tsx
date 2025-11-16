import { Helmet } from 'react-helmet-async';
import { useRef, useState } from 'react';
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
  AutoAwesome as SparkleIcon,
  Waves as WaveIcon,
  PlayArrow as PlayArrowIcon,
  AutoMode as AutoModeIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
  Balance as BalanceIcon,
} from '@mui/icons-material';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<'time' | 'money' | 'balanced'>('balanced');

  return (
    <>
      <Helmet>
        <title>Musikmarketing | Professionelles Marketing für Musiker & Künstler</title>
        <meta 
          name="description" 
          content="Erlerne essenzielle Musikmarketing-Skills, um dich als Artist erfolgreich selbst zu vermarkten in einer Zeit, in der Sichtbarkeit auf Social Media immer wichtiger wird." 
        />
        <meta name="keywords" content="Musikmarketing, Musik Marketing, Musik Promotion, Musik vermarkten, Social Media Marketing, Instagram Marketing, Musik streamen, Künstler Marketing, Musiker Promotion" />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Musikmarketing.de",
            "description": "Professionelles Musikmarketing für Musiker & Künstler. Erlerne essenzielle Marketing-Skills für deine Musikkarriere.",
            "url": "https://musikmarketing.de",
            "publisher": {
              "@type": "Organization",
              "name": "SwipeUp Marketing",
              "url": "https://swipeup-marketing.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://musikmarketing.de/musikmarketing.png"
              }
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://musikmarketing.de/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "mainEntity": {
              "@type": "Course",
              "name": "Musikmarketing Skills für Artists",
              "description": "Lerne Musikmarketing, welches Artists zum wachsen bringt",
              "provider": {
                "@type": "Organization",
                "name": "SwipeUp Marketing",
                "url": "https://swipeup-marketing.com"
              },
              "courseMode": "online",
              "educationalLevel": "Beginner to Advanced",
              "about": [
                "Instagram Marketing für Musiker",
                "TikTok Strategien für Artists",
                "Spotify Algorithmus verstehen",
                "Paid Ads für Musikpromotion",
                "Direct-To-Fan Marketing"
              ]
            }
          })}
        </script>
        
        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SwipeUp Marketing",
            "alternateName": "Musikmarketing.de",
            "url": "https://musikmarketing.de",
            "logo": "https://musikmarketing.de/musikmarketing.png",
            "description": "Führende Musikmarketing Agentur in Deutschland. Betreibt das Ratgeber Portal musikmarketing.de für Artists und Musiker.",
            "foundingDate": "2020",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "DE"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://swipeup-marketing.com/strategy-session"
            },
            "sameAs": [
              "https://swipeup-marketing.com"
            ],
            "offers": {
              "@type": "Offer",
              "name": "Kostenlose Strategy-Session",
              "description": "Kostenlose Beratung für Musikmarketing Strategien",
              "url": "https://swipeup-marketing.com/strategy-session",
              "price": "0",
              "priceCurrency": "EUR"
            }
          })}
        </script>
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
        <Box sx={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: 2, md: 4 },
          pb: { xs: 4, md: 8 }
        }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'inline-block', mb: 4 }}>
                <Box sx={{ 
                  width: '80px', 
                  height: '80px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: 'rgba(10, 9, 12, 0.6)', 
                  backdropFilter: 'blur(20px)', 
                  borderRadius: '20px', 
                  border: '1px solid rgba(144, 221, 240, 0.2)',
                  mx: 'auto',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    border: '1px solid rgba(144, 221, 240, 0.4)',
                    boxShadow: '0 0 30px rgba(144, 221, 240, 0.2)',
                    transform: 'translateY(-4px)',
                  }
                }}>
                  <MusicNoteIcon sx={{ fontSize: '2rem', color: 'primary.light' }} />
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
                Lerne{' '}
                <Box component="span" sx={{ 
                  fontFamily: '"Instrument Serif", serif', 
                  fontStyle: 'italic', 
                  background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Musikmarketing,
                </Box>
                {' '}welches Artists zum wachsen bringt
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
                Erlerne essenzielle{' '}
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                  Musikmarketing-Skills
                </Box>
                , um dich als Artist{' '}
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                  erfolgreich selbst zu vermarkten
                </Box>{' '}
                in einer Zeit, in der Sichtbarkeit auf Social Media immer wichtiger wird.
              </Typography>
              
              <Button
                variant="contained"
                size="medium"
                href="https://swipeup-marketing.com/analyse"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: '50px',
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                  boxShadow: '0 0 30px rgba(144, 221, 240, 0.4)',
                  whiteSpace: 'nowrap',
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
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6 }}>
                Unsere Online-Kurse haben den Anspruch, deine einzige Quelle für Informationen zu sein. 
                Du lernst bei uns alles, was du als{' '}
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                  Artist brauchst
                </Box>
                , um dich erfolgreich selbst zu vermarkten – kein Vorwissen nötig.
              </Typography>
            </Box>

            <Box sx={{ 
              flex: 1, 
              textAlign: 'center', 
              p: 4,
              background: 'rgba(10, 9, 12, 0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(44, 102, 110, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '1px solid rgba(44, 102, 110, 0.4)',
                boxShadow: '0 0 30px rgba(44, 102, 110, 0.2)',
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
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6 }}>
                Alle gelehrten Skills setzen wir selbst täglich ein, sowie hunderte{' '}
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'secondary.light' }}>
                  erfolgreicher Artists
                </Box>
                , die ihre Karriere mit diesen Strategien aufgebaut haben.
              </Typography>
            </Box>

            <Box sx={{ 
              flex: 1, 
              textAlign: 'center', 
              p: 4,
              background: 'rgba(10, 9, 12, 0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(7, 57, 60, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '1px solid rgba(7, 57, 60, 0.4)',
                boxShadow: '0 0 30px rgba(7, 57, 60, 0.2)',
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
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6 }}>
                Zu jedem dieser Skills haben wir genügend Beispiele von Artists, die ausschließlich mit einem dieser Skills eine{' '}
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'success.light' }}>
                  erfolgreiche Musikkarriere
                </Box>{' '}
                aufgebaut haben.
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Journey Section */}
      <Box sx={{ py: 12, background: 'linear-gradient(135deg, #0a090c 0%, #07393c 100%)', position: 'relative' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" sx={{ 
              mb: 6, 
              fontWeight: 700, 
              color: 'text.primary',
              textAlign: 'center'
            }}>
              Dein Weg, um als{' '}
              <Box component="span" sx={{ 
                fontFamily: '"Instrument Serif", serif', 
                fontStyle: 'italic', 
                background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Artist sichtbar zu werden
              </Box>
            </Typography>
          </Box>

          {/* Vertical Journey Steps */}
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            {/* Step 1 */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              mb: 8,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                left: '40px',
                top: '80px',
                bottom: '-32px',
                width: '2px',
                background: 'linear-gradient(180deg, rgba(144, 221, 240, 0.5) 0%, rgba(44, 102, 110, 0.3) 100%)',
                zIndex: 0,
              }
            }}>
              <Box sx={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 4,
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 0 30px rgba(144, 221, 240, 0.3)',
              }}>
                <svg width="40" height="40" viewBox="0 0 640 640" fill="none">
                  <path d="M519.8 126.4C536.6 120.8 545.6 102.7 540 85.9C534.4 69.1 516.3 60.1 499.6 65.6L386.6 103.3C372.7 79.8 347 64 317.7 64C273.5 64 237.7 99.8 237.7 144C237.7 147 237.9 149.9 238.2 152.8L115.6 193.6C98.8 199.2 89.8 217.3 95.4 234.1C101 250.9 119.1 259.9 135.9 254.3L271.4 209.1C275.9 212.3 280.7 215 285.8 217.3L285.8 544C285.8 561.7 300.1 576 317.8 576L509.8 576C527.5 576 541.8 561.7 541.8 544C541.8 526.3 527.5 512 509.8 512L349.8 512L349.8 217.3C370.8 208.1 387 190.3 394 168.3L519.9 126.3zM437.3 352L509.7 227.8L582.1 352L437.2 352zM509.7 448C572.6 448 624.9 414 635.7 369.1C638.3 358.1 634.7 346.8 629 337L533.8 173.8C528.8 165.2 519.6 160 509.7 160C499.8 160 490.6 165.3 485.6 173.8L390.4 337.1C384.7 346.9 381.1 358.2 383.7 369.2C394.5 414 446.8 448.1 509.7 448.1zM126.8 355.8L199.2 480L54.3 480L126.7 355.8zM.9 497.1C11.7 542 64 576 126.8 576C189.6 576 242 542 252.8 497.1C255.4 486.1 251.8 474.8 246.1 465L150.9 301.8C145.9 293.2 136.7 288 126.8 288C116.9 288 107.7 293.3 102.7 301.8L7.6 465.1C1.9 474.9-1.7 486.2 .9 497.2z" fill="white"/>
                </svg>
              </Box>
              <Box sx={{ flex: 1, pt: 1 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                  1. Lerne die{' '}
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                    Grundlagen
                  </Box>
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.6 }}>
                  Wie man in der heutigen Zeit Releases mit modernen und erprobten Strategien vermarktet und mit den 2 Währungen{' '}
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                    (Zeit und/oder Geld)
                  </Box>{' '}
                  bezahlt. Lege fest, wie viel du von was einsetzen kannst.
                </Typography>
                
                {/* Currency Options */}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Box 
                    onClick={() => setSelectedCurrency('money')}
                    sx={{ 
                      flex: 1,
                      p: 3,
                      background: selectedCurrency === 'money' ? 'rgba(44, 102, 110, 0.2)' : 'rgba(44, 102, 110, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      border: selectedCurrency === 'money' ? '2px solid rgba(44, 102, 110, 0.6)' : '1px solid rgba(44, 102, 110, 0.2)',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      transform: selectedCurrency === 'money' ? 'scale(1.02)' : 'scale(1)',
                      '&:hover': {
                        border: '1px solid rgba(44, 102, 110, 0.4)',
                        transform: selectedCurrency === 'money' ? 'scale(1.02) translateY(-2px)' : 'translateY(-2px)',
                      }
                    }}>
                    <MoneyIcon sx={{ fontSize: '2rem', color: 'secondary.light', mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Nur Geld, keine Zeit
                    </Typography>
                  </Box>
                  <Box 
                    onClick={() => setSelectedCurrency('balanced')}
                    sx={{ 
                      flex: 1,
                      p: 3,
                      background: 'rgba(144, 221, 240, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      border: '2px solid rgba(144, 221, 240, 0.6)',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 20px rgba(144, 221, 240, 0.3)',
                      '&:hover': {
                        border: '2px solid rgba(144, 221, 240, 0.8)',
                        transform: 'scale(1.05) translateY(-2px)',
                        boxShadow: '0 0 25px rgba(144, 221, 240, 0.4)',
                      }
                    }}>
                    <BalanceIcon sx={{ fontSize: '2rem', color: 'success.light', mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      Etwas Geld, etwas Zeit
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      display: 'block', 
                      mt: 0.5, 
                      color: 'success.light', 
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      fontSize: '0.7rem'
                    }}>
                      Empfohlen
                    </Typography>
                  </Box>
                  <Box 
                    onClick={() => setSelectedCurrency('time')}
                    sx={{ 
                      flex: 1,
                      p: 3,
                      background: selectedCurrency === 'time' ? 'rgba(44, 102, 110, 0.2)' : 'rgba(44, 102, 110, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      border: selectedCurrency === 'time' ? '2px solid rgba(44, 102, 110, 0.6)' : '1px solid rgba(44, 102, 110, 0.2)',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      transform: selectedCurrency === 'time' ? 'scale(1.02)' : 'scale(1)',
                      '&:hover': {
                        border: '1px solid rgba(44, 102, 110, 0.4)',
                        transform: selectedCurrency === 'time' ? 'scale(1.02) translateY(-2px)' : 'translateY(-2px)',
                      }
                    }}>
                    <TimeIcon sx={{ fontSize: '2rem', color: 'secondary.light', mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Nur Zeit, kein Geld
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>

            {/* Step 2 */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              mb: 8,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                left: '40px',
                top: '80px',
                bottom: '-32px',
                width: '2px',
                background: 'linear-gradient(180deg, rgba(44, 102, 110, 0.5) 0%, rgba(7, 57, 60, 0.3) 100%)',
                zIndex: 0,
              }
            }}>
              <Box sx={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2c666e 0%, #07393c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 4,
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 0 30px rgba(44, 102, 110, 0.3)',
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17zM12 3 1 9l11 6 9-4.91V17h2V9z" fill="white"/>
                </svg>
              </Box>
              <Box sx={{ flex: 1, pt: 1 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                  2. Eigne dir diese Strategien mit Hilfe unserer{' '}
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'secondary.light' }}>
                    intensiven Online-Kurse
                  </Box>{' '}
                  an
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.6 }}>
                  Kompakte, aber intensive Online-Kurse unter{' '}
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'secondary.light', fontWeight: 600 }}>
                    7 Tagen
                  </Box>
                  . Alles was du brauchst, um sofort loszulegen – ohne Zeitverschwendung.
                </Typography>

                {/* Dynamic Recommendations based on selected currency */}
                {selectedCurrency === 'balanced' && (
                  <Box sx={{ 
                    p: 4,
                    background: 'rgba(144, 221, 240, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    border: '2px solid rgba(144, 221, 240, 0.3)',
                    textAlign: 'center',
                    boxShadow: '0 0 20px rgba(144, 221, 240, 0.2)',
                  }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.light' }}>
                      🎯 Empfohlen für dich
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                      Perfekte Balance aus Zeit und Budget - ideal für nachhaltiges Wachstum
                    </Typography>
                    <Button
                      variant="contained"
                      href="https://song.so/instagram-ads-blueprint"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                        boxShadow: '0 0 20px rgba(144, 221, 240, 0.3)',
                        px: 4,
                        py: 1.5,
                        '&:hover': {
                          boxShadow: '0 0 30px rgba(144, 221, 240, 0.5)',
                        }
                      }}
                    >
                      Instagram Ads Blueprint
                    </Button>
                  </Box>
                )}

                {selectedCurrency === 'time' && (
                  <Box sx={{ 
                    p: 4,
                    background: 'rgba(44, 102, 110, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    border: '2px solid rgba(44, 102, 110, 0.3)',
                    textAlign: 'center',
                    boxShadow: '0 0 20px rgba(44, 102, 110, 0.2)',
                  }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'secondary.light' }}>
                      ⏰ Perfekt für dich
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                      Organisches Wachstum durch Content - investiere Zeit statt Geld
                    </Typography>
                    <Button
                      variant="contained"
                      href="https://swipeup-marketing.com/365-content-club"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        background: 'linear-gradient(135deg, #2c666e 0%, #07393c 100%)',
                        boxShadow: '0 0 20px rgba(44, 102, 110, 0.3)',
                        px: 4,
                        py: 1.5,
                        '&:hover': {
                          boxShadow: '0 0 30px rgba(44, 102, 110, 0.5)',
                        }
                      }}
                    >
                      365 Content Club
                    </Button>
                  </Box>
                )}

                {selectedCurrency === 'money' && (
                  <Box sx={{ 
                    p: 4,
                    background: 'rgba(44, 102, 110, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    border: '2px solid rgba(44, 102, 110, 0.3)',
                    textAlign: 'center',
                    boxShadow: '0 0 20px rgba(44, 102, 110, 0.2)',
                  }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'secondary.light' }}>
                      💰 Ideal für dich
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                      Schnelle Ergebnisse durch professionelle Beratung - investiere Geld statt Zeit
                    </Typography>
                    <Button
                      variant="contained"
                      href="https://swipeup-marketing.com/strategy-session"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        background: 'linear-gradient(135deg, #2c666e 0%, #07393c 100%)',
                        boxShadow: '0 0 20px rgba(44, 102, 110, 0.3)',
                        px: 4,
                        py: 1.5,
                        '&:hover': {
                          boxShadow: '0 0 30px rgba(44, 102, 110, 0.5)',
                        }
                      }}
                    >
                      Strategy-Session buchen
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Step 3 */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              mb: 8,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                left: '40px',
                top: '80px',
                bottom: '-32px',
                width: '2px',
                background: 'linear-gradient(180deg, rgba(7, 57, 60, 0.5) 0%, rgba(144, 221, 240, 0.3) 100%)',
                zIndex: 0,
              }
            }}>
              <Box sx={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #07393c 0%, #90ddf0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 4,
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 0 30px rgba(7, 57, 60, 0.3)',
              }}>
                <PlayArrowIcon sx={{ fontSize: '2.5rem', color: 'white' }} />
              </Box>
              <Box sx={{ flex: 1, pt: 1 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                  3. Wende die erlernten Strategien{' '}
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'success.light' }}>
                    direkt an
                  </Box>
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  Setze das Gelernte sofort mit deinem{' '}
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'success.light' }}>
                    nächsten Release
                  </Box>{' '}
                  um und teste dein Wissen in der Praxis. Echte Erfahrungen sammeln ist der Schlüssel zum Erfolg.
                </Typography>
              </Box>
            </Box>

            {/* Step 4 */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              position: 'relative',
            }}>
              <Box sx={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 4,
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 0 30px rgba(144, 221, 240, 0.4)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}>
                <AutoModeIcon sx={{ fontSize: '2.5rem', color: 'white' }} />
              </Box>
              <Box sx={{ flex: 1, pt: 1 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                  4. Baue dir eine{' '}
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                    automatisierte Fan-Gewinnungs-Maschine
                  </Box>{' '}
                  auf
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  Die dir{' '}
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                    auf Autopilot im Schlaf
                  </Box>{' '}
                  neue potenzielle Hörer für deine Musik liefert und diese in langfristige Fans verwandelt.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Marketing Strategy Section */}
      <Box sx={{ py: 12, background: 'linear-gradient(135deg, #0a090c 0%, #07393c 100%)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" sx={{ mb: 4, fontWeight: 700, color: 'text.primary' }}>
              Deine{' '}
              <Box component="span" sx={{ 
                fontFamily: '"Instrument Serif", serif', 
                fontStyle: 'italic', 
                background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                auf dich zugeschnittene
              </Box>
              <br />
              Musikmarketing-Strategie
            </Typography>
            <Typography variant="h6" sx={{ mb: 6, color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
              Basierend auf deinen Ressourcen und Zielen entwickeln wir gemeinsam die perfekte{' '}
              <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                Marketing-Strategie
              </Box>{' '}
              für deine Musikkarriere.
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
            {/* Branding & Artist Identity */}
            <Card sx={{ 
              flex: 1,
              p: 4,
              background: 'rgba(10, 9, 12, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(144, 221, 240, 0.3)',
              borderRadius: '24px',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '1px solid rgba(144, 221, 240, 0.5)',
                boxShadow: '0 0 30px rgba(144, 221, 240, 0.3)',
              },
            }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                  Branding
                </Box>{' '}
                & Artist Identity
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Entwickle eine starke, authentische Artist-Identität und ein konsistentes Branding, das dich von anderen abhebt.
              </Typography>
              <Button
                variant="contained"
                href="https://swipeup-marketing.com/strategy-session"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  mb: 1,
                  background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                  boxShadow: '0 0 20px rgba(144, 221, 240, 0.3)',
                  '&:hover': {
                    boxShadow: '0 0 30px rgba(144, 221, 240, 0.5)',
                  }
                }}
              >
                Strategy-Session
              </Button>
            </Card>

            {/* Organisches Wachstum */}
            <Card sx={{ 
              flex: 1,
              p: 4,
              background: 'rgba(10, 9, 12, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(44, 102, 110, 0.3)',
              borderRadius: '24px',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '1px solid rgba(44, 102, 110, 0.5)',
                boxShadow: '0 0 30px rgba(44, 102, 110, 0.3)',
              },
            }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                Organisches Wachstum auf{' '}
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'secondary.light' }}>
                  Instagram & TikTok
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Baue eine echte Fanbase auf durch authentischen Content und strategisches Community Building.
              </Typography>
              <Button
                variant="contained"
                href="https://swipeup-marketing.com/365-content-club"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  mb: 1,
                  background: 'linear-gradient(135deg, #2c666e 0%, #07393c 100%)',
                  boxShadow: '0 0 20px rgba(44, 102, 110, 0.3)',
                  '&:hover': {
                    boxShadow: '0 0 30px rgba(44, 102, 110, 0.5)',
                  }
                }}
              >
                365 Content Club
              </Button>
            </Card>
          </Stack>

          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4} sx={{ mt: 4 }}>
            {/* Paid Ads */}
            <Card sx={{ 
              flex: 1,
              p: 4,
              background: 'rgba(10, 9, 12, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(7, 57, 60, 0.3)',
              borderRadius: '24px',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '1px solid rgba(7, 57, 60, 0.5)',
                boxShadow: '0 0 30px rgba(7, 57, 60, 0.3)',
              },
            }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'success.light' }}>
                  Paid Ads
                </Box>{' '}
                als Hebel für Wachstum
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Nutze Instagram & Facebook Ads strategisch, um deine Reichweite auf Autopilot zu skalieren.
              </Typography>
              <Button
                variant="contained"
                href="https://song.so/instagram-ads-blueprint"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  mb: 1,
                  background: 'linear-gradient(135deg, #07393c 0%, #2c666e 100%)',
                  boxShadow: '0 0 20px rgba(7, 57, 60, 0.3)',
                  '&:hover': {
                    boxShadow: '0 0 30px rgba(7, 57, 60, 0.5)',
                  }
                }}
              >
                Instagram Ads Blueprint
              </Button>
            </Card>

            {/* Spotify Algorithmus */}
            <Card sx={{ 
              flex: 1,
              p: 4,
              background: 'rgba(10, 9, 12, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(144, 221, 240, 0.3)',
              borderRadius: '24px',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '1px solid rgba(144, 221, 240, 0.5)',
                boxShadow: '0 0 30px rgba(144, 221, 240, 0.3)',
              },
            }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                  Spotify Algorithmus
                </Box>{' '}
                verstehen & gewinnen
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Lerne, wie der Spotify Algorithmus funktioniert und wie du ihn für maximale Streams nutzt.
              </Typography>
              <Button
                variant="contained"
                href="https://song.so/instagram-ads-blueprint"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  mb: 1,
                  background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                  boxShadow: '0 0 20px rgba(144, 221, 240, 0.3)',
                  '&:hover': {
                    boxShadow: '0 0 30px rgba(144, 221, 240, 0.5)',
                  }
                }}
              >
                Instagram Ads Blueprint
              </Button>
            </Card>
          </Stack>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mt: 4 }}>
            {/* Direct-To-Fan Channels */}
            <Card sx={{ 
              flex: 1,
              p: 4,
              background: 'rgba(10, 9, 12, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(44, 102, 110, 0.3)',
              borderRadius: '24px',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '1px solid rgba(44, 102, 110, 0.5)',
                boxShadow: '0 0 30px rgba(44, 102, 110, 0.3)',
              },
            }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'secondary.light' }}>
                  Direct-To-Fan
                </Box>{' '}
                Channels aufbauen
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Baue E-Mail Listen und WhatsApp Channels auf, um deine Fans direkt zu erreichen und zu monetarisieren.
              </Typography>
              <Button
                variant="contained"
                href="https://song.so"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  mb: 1,
                  background: 'linear-gradient(135deg, #2c666e 0%, #07393c 100%)',
                  boxShadow: '0 0 20px rgba(44, 102, 110, 0.3)',
                  '&:hover': {
                    boxShadow: '0 0 30px rgba(44, 102, 110, 0.5)',
                  }
                }}
              >
                song.so
              </Button>
            </Card>

            {/* Kostenlose Analyse */}
            <Card sx={{ 
              flex: 1,
              p: 4,
              background: 'rgba(10, 9, 12, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(7, 57, 60, 0.3)',
              borderRadius: '24px',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '1px solid rgba(7, 57, 60, 0.5)',
                boxShadow: '0 0 30px rgba(7, 57, 60, 0.3)',
              },
            }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'success.light' }}>
                  Kostenlose
                </Box>{' '}
                Artist-Analyse
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Erhalte eine kostenlose Analyse deiner Artist-Präsenz und individuelle Empfehlungen.
              </Typography>
              <Button
                variant="contained"
                href="https://swipeup-marketing.com/analyse"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  mb: 1,
                  background: 'linear-gradient(135deg, #07393c 0%, #2c666e 100%)',
                  boxShadow: '0 0 20px rgba(7, 57, 60, 0.3)',
                  '&:hover': {
                    boxShadow: '0 0 30px rgba(7, 57, 60, 0.5)',
                  }
                }}
              >
                Kostenlose Profil-Analyse
              </Button>
            </Card>
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
            radial-gradient(circle at 30% 30%, rgba(144, 221, 240, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(44, 102, 110, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" sx={{ 
            mb: 4, 
            fontWeight: 700,
            p: 3,
            background: 'rgba(10, 9, 12, 0.4)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            border: '1px solid rgba(144, 221, 240, 0.2)',
            display: 'inline-block'
          }}>
            Bereit für deine{' '}
            <Box component="span" sx={{ 
              fontFamily: '"Instrument Serif", serif', 
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              maßgeschneiderte Strategie
            </Box>
            ?
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
            Erhalte deine{' '}
            <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
              persönliche Artist-Beratung
            </Box>{' '}
            und entwickle gemeinsam mit uns die perfekte Marketing-Strategie für deine Musikkarriere.
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            href="https://swipeup-marketing.com/strategy-session"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 600,
              backgroundColor: 'white',
              color: '#000000',
              borderRadius: '50px',
              textTransform: 'none',
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
              '&:hover': {
                backgroundColor: 'grey.100',
                color: '#000000',
                transform: 'translateY(-2px)',
                boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Kostenlose{' '}
            <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', ml: 0.5 }}>
              Strategy-Session
            </Box>
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default Home;
