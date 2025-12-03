import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from '@mui/material';

const Home = () => {
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
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://musikmarketing.de/" />
        <meta property="og:title" content="Musikmarketing | Professionelles Marketing für Musiker & Künstler" />
        <meta property="og:description" content="Steigere deine Reichweite mit professionellem Musikmarketing. Instagram Ads, Content-Strategien und Social Media Analyse für Musiker." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://musikmarketing.de/" />
      </Helmet>

      {/* Main Container - Black Background */}
      <Box sx={{ 
        minHeight: '100vh',
        background: '#000000',
        py: 8,
      }}>
        <Container maxWidth="lg">
          {/* Hero Section - Left Aligned */}
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                mb: 3,
                fontWeight: 700,
                color: '#ffffff',
                textAlign: 'left',
              }}
            >
              Lerne Musikmarketing, welches Artists zum wachsen bringt
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4, 
                color: '#9e9e9e',
                maxWidth: '700px',
                textAlign: 'left',
              }}
            >
              Erlerne essenzielle Musikmarketing-Skills, um dich als Artist erfolgreich selbst zu vermarkten in einer Zeit, in der Sichtbarkeit auf Social Media immer wichtiger wird.
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Button
                variant="contained"
                href="https://swipeup-marketing.com/analyse"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kostenlose Beratung erhalten
              </Button>
            </Box>

            {/* Google Reviews */}
            <Box 
              component="a"
              href="https://swipeup-marketing.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'block',
                textDecoration: 'none',
                '&:hover': { opacity: 0.8 }
              }}
            >
              <Typography variant="body2" sx={{ color: '#9e9e9e' }}>
                5.0 ★★★★★ Basierend auf 69 Bewertungen
              </Typography>
            </Box>
          </Box>

          {/* Journey Section */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h2" sx={{ 
              mb: 4, 
              fontWeight: 700, 
              color: '#ffffff',
              textAlign: 'left'
            }}>
              Dein Weg, um als Artist sichtbar zu werden
            </Typography>

            {/* Step 1 */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#ffffff', textAlign: 'left' }}>
                1. Lerne die Grundlagen
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#9e9e9e', textAlign: 'left' }}>
                Wie man in der heutigen Zeit Releases mit modernen und erprobten Strategien vermarktet und mit den 2 Währungen (Zeit und/oder Geld) bezahlt. Lege fest, wie viel du von was einsetzen kannst.
              </Typography>
              
              {/* Currency Options */}
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <Box 
                  onClick={() => setSelectedCurrency('money')}
                  sx={{ 
                    flex: 1,
                    p: 2,
                    background: selectedCurrency === 'money' ? '#1a1a1a' : '#0a0a0a',
                    border: selectedCurrency === 'money' ? '1px solid #4a4a4a' : '1px solid #2a2a2a',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { border: '1px solid #4a4a4a' }
                  }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#ffffff', textAlign: 'left' }}>
                    💰 Nur Geld, keine Zeit
                  </Typography>
                </Box>
                <Box 
                  onClick={() => setSelectedCurrency('balanced')}
                  sx={{ 
                    flex: 1,
                    p: 2,
                    background: '#1a1a1a',
                    border: '1px solid #4a4a4a',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { border: '1px solid #6a6a6a' }
                  }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#ffffff', textAlign: 'left' }}>
                    ⚖️ Etwas Geld, etwas Zeit
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: '#9e9e9e', textAlign: 'left' }}>
                    Empfohlen
                  </Typography>
                </Box>
                <Box 
                  onClick={() => setSelectedCurrency('time')}
                  sx={{ 
                    flex: 1,
                    p: 2,
                    background: selectedCurrency === 'time' ? '#1a1a1a' : '#0a0a0a',
                    border: selectedCurrency === 'time' ? '1px solid #4a4a4a' : '1px solid #2a2a2a',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { border: '1px solid #4a4a4a' }
                  }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#ffffff', textAlign: 'left' }}>
                    ⏰ Nur Zeit, kein Geld
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Step 2 */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#ffffff', textAlign: 'left' }}>
                2. Eigne dir diese Strategien mit Hilfe unserer intensiven Online-Kurse an
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#9e9e9e', textAlign: 'left' }}>
                Kompakte, aber intensive Online-Kurse unter 7 Tagen. Alles was du brauchst, um sofort loszulegen – ohne Zeitverschwendung.
              </Typography>

              {/* Dynamic Recommendations */}
              {selectedCurrency === 'balanced' && (
                <Box sx={{ 
                  p: 3,
                  background: '#1a1a1a',
                  border: '1px solid #4a4a4a',
                  borderRadius: '4px',
                }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#ffffff', textAlign: 'left' }}>
                    🎯 Empfohlen für dich
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, color: '#9e9e9e', textAlign: 'left' }}>
                    Perfekte Balance aus Zeit und Budget - ideal für nachhaltiges Wachstum
                  </Typography>
                  <Button
                    variant="contained"
                    href="https://song.so/instagram-ads-blueprint"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram Ads Blueprint
                  </Button>
                </Box>
              )}

              {selectedCurrency === 'time' && (
                <Box sx={{ 
                  p: 3,
                  background: '#1a1a1a',
                  border: '1px solid #4a4a4a',
                  borderRadius: '4px',
                }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#ffffff', textAlign: 'left' }}>
                    ⏰ Perfekt für dich
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, color: '#9e9e9e', textAlign: 'left' }}>
                    Organisches Wachstum durch Content - investiere Zeit statt Geld
                  </Typography>
                  <Button
                    variant="contained"
                    href="https://swipeup-marketing.com/365-content-club"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    365 Content Club
                  </Button>
                </Box>
              )}

              {selectedCurrency === 'money' && (
                <Box sx={{ 
                  p: 3,
                  background: '#1a1a1a',
                  border: '1px solid #4a4a4a',
                  borderRadius: '4px',
                }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#ffffff', textAlign: 'left' }}>
                    💰 Ideal für dich
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, color: '#9e9e9e', textAlign: 'left' }}>
                    Schnelle Ergebnisse durch professionelle Beratung - investiere Geld statt Zeit
                  </Typography>
                  <Button
                    variant="contained"
                    href="https://swipeup-marketing.com/strategy-session"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Strategy-Session buchen
                  </Button>
                </Box>
              )}
            </Box>

            {/* Step 3 */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#ffffff', textAlign: 'left' }}>
                3. Setze deine Strategie um und wachse
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#9e9e9e', textAlign: 'left' }}>
                Implementiere das Gelernte konsequent und beobachte, wie deine Reichweite und Fanbase wächst.
              </Typography>
            </Box>
          </Box>

          {/* CTA Section */}
          <Box sx={{ 
            p: 4,
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '4px',
            textAlign: 'left'
          }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: '#ffffff' }}>
              Bereit durchzustarten?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: '#9e9e9e' }}>
              Buche jetzt deine kostenlose Strategy-Session und erhalte einen individuellen Plan für deine Musikkarriere.
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="https://swipeup-marketing.com/strategy-session"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jetzt kostenlose Beratung buchen
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
