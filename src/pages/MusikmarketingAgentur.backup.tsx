import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Stack,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Campaign as CampaignIcon,
  Instagram as InstagramIcon,
  MusicNote as MusicNoteIcon,
} from '@mui/icons-material';

const MusikmarketingAgentur = () => {
  return (
    <>
      <Helmet>
        <title>Musikmarketing Agentur | SwipeUp Marketing betreibt musikmarketing.de</title>
        <meta 
          name="description" 
          content="SwipeUp Marketing ist eine der führenden Musikmarketing Agenturen in Deutschland und betreibt das Ratgeber Portal musikmarketing.de. Professionelle Dienstleistungen in Organic & Paid Marketing für Artists & Labels." 
        />
        <meta name="keywords" content="Musikmarketing Agentur, SwipeUp Marketing, musikmarketing.de, Organic Marketing, Paid Ads, Instagram Marketing, TikTok Marketing" />
        
        {/* Schema.org JSON-LD for Marketing Agency */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "SwipeUp Marketing - Musikmarketing Agentur",
            "description": "Führende Musikmarketing Agentur in Deutschland. Spezialisiert auf Organic & Paid Marketing für Artists und Labels.",
            "url": "https://musikmarketing.de/musikmarketing-agentur",
            "telephone": "+49-XXX-XXXXXXX",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "DE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "addressCountry": "DE"
            },
            "openingHours": "Mo-Fr 09:00-18:00",
            "priceRange": "€€€",
            "serviceType": "Marketing Agency",
            "areaServed": {
              "@type": "Country",
              "name": "Germany"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Musikmarketing Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Instagram Marketing für Musiker",
                    "description": "Professionelle Instagram Strategien für Artists und Musiker"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "TikTok Marketing für Artists",
                    "description": "Datenbasierte TikTok Strategien für Musikpromotion"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Instagram Ads für Musikpromotion",
                    "description": "Professionelle Instagram Werbeanzeigen für Artists"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "TikTok Ads für Releases",
                    "description": "Effektive TikTok Werbung für Musikreleases"
                  }
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "150"
            }
          })}
        </script>
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "SwipeUp Marketing",
            "image": "https://musikmarketing.de/musikmarketing.png",
            "description": "Professionelle Musikmarketing Agentur für Artists & Labels. Organic & Paid Marketing Strategien.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "DE"
            },
            "url": "https://musikmarketing.de/musikmarketing-agentur",
            "sameAs": [
              "https://swipeup-marketing.com"
            ],
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday", 
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            }
          })}
        </script>
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://musikmarketing.de/musikmarketing-agentur" />
        <meta property="og:title" content="Musikmarketing Agentur | SwipeUp Marketing" />
        <meta property="og:description" content="Führende Musikmarketing Agentur in Deutschland. Organic & Paid Marketing für Artists & Labels." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://musikmarketing.de/musikmarketing-agentur" />
        <meta property="og:image" content="https://musikmarketing.de/musikmarketing.png" />
      </Helmet>

      {/* Hero Section */}
      <Box sx={{ 
        py: 12, 
        background: 'linear-gradient(135deg, #0a090c 0%, #07393c 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(144, 221, 240, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(44, 102, 110, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h1" sx={{ 
              mb: 4, 
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
              lineHeight: 1.1,
              color: 'text.primary',
            }}>
              SwipeUp Marketing:{' '}
              <Box component="span" sx={{ 
                fontFamily: '"Instrument Serif", serif', 
                fontStyle: 'italic', 
                background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Die Musikmarketing Agentur
              </Box>
              <br />
              hinter musikmarketing.de
            </Typography>
            
            <Typography variant="h5" sx={{ 
              mb: 6, 
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.5,
            }}>
              Als eine der führenden{' '}
              <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                Musikmarketing Agenturen in Deutschland
              </Box>{' '}
              betreiben wir das Ratgeber Portal musikmarketing.de und bieten professionelle Dienstleistungen für Artists & Labels.
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
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ py: 12, background: 'linear-gradient(135deg, #07393c 0%, #0a090c 100%)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" sx={{ 
              mb: 4, 
              fontWeight: 700, 
              color: 'text.primary',
            }}>
              Über{' '}
              <Box component="span" sx={{ 
                fontFamily: '"Instrument Serif", serif', 
                fontStyle: 'italic', 
                background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                SwipeUp Marketing
              </Box>
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'text.secondary', 
              maxWidth: '700px', 
              mx: 'auto',
              lineHeight: 1.6,
            }}>
              SwipeUp Marketing ist eine der führenden Musikmarketing Agenturen in Deutschland und betreibt das 
              Ratgeber Portal{' '}
              <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                musikmarketing.de
              </Box>
              . Wir haben bereits über{' '}
              <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'success.light' }}>
                3,5 Millionen € Ad Spend
              </Box>{' '}
              für Artists aus Major- und Indie-Bereich erfolgreich umgesetzt.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 12, background: 'linear-gradient(135deg, #0a090c 0%, #07393c 100%)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" sx={{ 
              mb: 4, 
              fontWeight: 700, 
              color: 'text.primary',
            }}>
              Unsere{' '}
              <Box component="span" sx={{ 
                fontFamily: '"Instrument Serif", serif', 
                fontStyle: 'italic', 
                background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Dienstleistungen
              </Box>
            </Typography>
          </Box>

          {/* Organic Marketing */}
          <Box sx={{ mb: 12 }}>
            <Typography variant="h3" sx={{ 
              mb: 6, 
              fontWeight: 600, 
              color: 'text.primary',
              textAlign: 'center',
            }}>
              <Box component="span" sx={{ 
                fontFamily: '"Instrument Serif", serif', 
                fontStyle: 'italic', 
                color: 'success.light',
              }}>
                Organic Marketing
              </Box>{' '}
              - Organisch wachsen auf Social Media
            </Typography>
            
            <Typography variant="body1" sx={{ 
              mb: 6, 
              color: 'rgba(255, 255, 255, 0.9)', 
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}>
              Organisches Wachstum auf Social Media ist für Musiker:innen heute der Schlüssel zu langfristigem Erfolg. 
              Anstatt auf kurzfristige Reichweite zu setzen, geht es darum, eine echte Community aufzubauen, die deine 
              Musik liebt, teilt und unterstützt.
            </Typography>

            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
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
                <Box sx={{ mb: 3 }}>
                  <InstagramIcon sx={{ fontSize: '3rem', color: 'primary.light' }} />
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
                    Instagram Strategie
                  </Box>{' '}
                  für Musiker:innen
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6 }}>
                  Instagram bleibt einer der wichtigsten Kanäle für Artists, um Nähe zu Fans aufzubauen. 
                  Mit einer gezielten Content-Strategie, optimierten Reels und Storytelling schaffen wir 
                  Reichweite und Engagement.
                </Typography>
              </Card>

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
                <Box sx={{ mb: 3 }}>
                  <MusicNoteIcon sx={{ fontSize: '3rem', color: 'secondary.light' }} />
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'secondary.light' }}>
                    TikTok Strategien
                  </Box>{' '}
                  für Künstler:innen
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6 }}>
                  TikTok ist heute die wichtigste Plattform, um neue Fans zu erreichen. Wir entwickeln 
                  datenbasierte TikTok-Strategien, die Trends verstehen und deine Songs organisch in die Feeds bringen.
                </Typography>
              </Card>
            </Stack>
          </Box>

          {/* Paid Marketing */}
          <Box>
            <Typography variant="h3" sx={{ 
              mb: 6, 
              fontWeight: 600, 
              color: 'text.primary',
              textAlign: 'center',
            }}>
              <Box component="span" sx={{ 
                fontFamily: '"Instrument Serif", serif', 
                fontStyle: 'italic', 
                color: 'error.light',
              }}>
                Paid Marketing
              </Box>{' '}
              - Release- und Tour-Marketing skalieren
            </Typography>
            
            <Typography variant="body1" sx={{ 
              mb: 6, 
              color: 'rgba(255, 255, 255, 0.9)', 
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}>
              Paid Ads sind die effektivste Möglichkeit, um Releases, Tourneen oder Merch gezielt zu bewerben. 
              Mit datengetriebenen Kampagnen auf Instagram und TikTok Ads erreichen wir genau die Hörer:innen, 
              die zu deiner Musik passen.
            </Typography>

            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
              <Card sx={{ 
                flex: 1,
                p: 4,
                background: 'rgba(10, 9, 12, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(244, 67, 54, 0.3)',
                borderRadius: '24px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '1px solid rgba(244, 67, 54, 0.5)',
                  boxShadow: '0 0 30px rgba(244, 67, 54, 0.3)',
                },
              }}>
                <Box sx={{ mb: 3 }}>
                  <CampaignIcon sx={{ fontSize: '3rem', color: 'error.light' }} />
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'error.light' }}>
                    Instagram Ads
                  </Box>{' '}
                  für Musikpromotion
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6 }}>
                  Mit Instagram Ads für Artists erreichst du neue Fans, steigerst Streams und machst deine Songs sichtbar. 
                  Wir setzen auf kreative Video-Ads mit smartem Targeting über Meta Conversion API.
                </Typography>
                <Button
                  variant="contained"
                  href="https://song.so/instagram-ads-blueprint"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                    boxShadow: '0 0 20px rgba(244, 67, 54, 0.3)',
                    '&:hover': {
                      boxShadow: '0 0 30px rgba(244, 67, 54, 0.5)',
                    }
                  }}
                >
                  Instagram Ads Blueprint
                </Button>
              </Card>

              <Card sx={{ 
                flex: 1,
                p: 4,
                background: 'rgba(10, 9, 12, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 193, 7, 0.3)',
                borderRadius: '24px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '1px solid rgba(255, 193, 7, 0.5)',
                  boxShadow: '0 0 30px rgba(255, 193, 7, 0.3)',
                },
              }}>
                <Box sx={{ mb: 3 }}>
                  <TrendingUpIcon sx={{ fontSize: '3rem', color: 'warning.light' }} />
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'warning.light' }}>
                    TikTok Ads
                  </Box>{' '}
                  für Releases
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6 }}>
                  TikTok Ads sind perfekt, um Songs viral zu pushen. Wir kombinieren kreative Kurzvideos mit 
                  datengetriebener Optimierung und nutzen die Plattformmechanik gezielt aus.
                </Typography>
                <Button
                  variant="contained"
                  href="https://swipeup-marketing.com/strategy-session"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                    color: '#000',
                    boxShadow: '0 0 20px rgba(255, 193, 7, 0.3)',
                    '&:hover': {
                      boxShadow: '0 0 30px rgba(255, 193, 7, 0.5)',
                    }
                  }}
                >
                  TikTok Ads Beratung
                </Button>
              </Card>
            </Stack>
          </Box>
        </Container>
      </Box>


      {/* CTA Section */}
      <Box sx={{ 
        py: 12, 
        background: 'linear-gradient(135deg, #0a090c 0%, #07393c 100%)', 
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
            Bereit, deine Musik auf das{' '}
            <Box component="span" sx={{ 
              fontFamily: '"Instrument Serif", serif', 
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              nächste Level
            </Box>{' '}
            zu bringen?
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
            Kontaktiere SwipeUp Marketing für eine{' '}
            <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: 'primary.light' }}>
              kostenlose Strategy-Session
            </Box>{' '}
            und lass uns gemeinsam deine Musikkarriere auf das nächste Level bringen.
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
            Jetzt{' '}
            <Box component="span" sx={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', ml: 0.5 }}>
              Kontakt aufnehmen
            </Box>
          </Button>
          
          {/* Google Reviews Component */}
          <Box 
            component="a"
            href="https://swipeup-marketing.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mt: 4,
              textDecoration: 'none',
              transition: 'opacity 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 2,
              '&:hover': {
                opacity: 0.8,
              }
            }}
          >
            <Box sx={{ flexShrink: 0 }}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 640 640" 
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  fill: '#88D3E5' 
                }}
              >
                <path d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z"/>
              </svg>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 900, 
                  color: '#88D3E5',
                  mb: 0.5,
                  fontSize: '1.5rem'
                }}
              >
                5.0 <Box component="span" sx={{ color: '#B8860B' }}>★★★★★</Box>
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.875rem',
                  fontStyle: 'italic'
                }}
              >
                Basierend auf 69 Bewertungen
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MusikmarketingAgentur;
