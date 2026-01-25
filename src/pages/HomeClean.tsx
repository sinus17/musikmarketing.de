import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  Chip,
} from '@mui/material';
import { supabase } from '../lib/supabase';
import { generateOrganizationSchema, generateWebSiteSchema, generateFAQSchema } from '../utils/seo';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  status: 'draft' | 'published';
  published_date: string | null;
  author: string;
  tags: string[];
  created_at: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('musikmarketing_de_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_date', { ascending: false, nullsFirst: false })
        .limit(6);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  
  const faqSchema = generateFAQSchema([
    {
      question: 'Was ist Musikmarketing?',
      answer: 'Musikmarketing ist die strategische Vermarktung deiner Musik und deiner Künstlermarke. Es umfasst alle Maßnahmen, um deine Reichweite zu steigern, neue Fans zu gewinnen und deine Musik erfolgreich zu promoten. Dazu gehören Social Media Marketing, Instagram Ads, Spotify Promotion, Content-Strategien und vieles mehr.'
    },
    {
      question: 'Wie viel kostet Musikmarketing?',
      answer: 'Die Kosten für Musikmarketing variieren stark. Du kannst mit einem Budget von 5-10€ pro Tag für Instagram Ads starten. Professionelle Musikmarketing Agenturen bieten Pakete ab 500€ pro Monat an. Viele Strategien wie organisches Social Media Marketing sind kostenlos, erfordern aber Zeit und Know-how.'
    },
    {
      question: 'Welche Social Media Plattform ist am besten für Musikmarketing?',
      answer: 'Instagram und TikTok sind aktuell die wichtigsten Plattformen für Musikmarketing. Instagram eignet sich hervorragend für Community-Building und Paid Ads. TikTok bietet das größte virale Potenzial für neue Songs. Spotify ist essentiell für Streaming-Promotion. Die beste Strategie kombiniert mehrere Plattformen.'
    },
    {
      question: 'Wie bekomme ich mehr Spotify Streams?',
      answer: 'Um mehr Spotify Streams zu bekommen, solltest du: 1) Pre-Save Kampagnen vor dem Release starten, 2) Instagram Ads auf deine Spotify-Songs schalten, 3) Playlist Pitching betreiben, 4) organischen Content auf TikTok und Instagram erstellen, 5) mit anderen Artists kollaborieren. Konsistenz und Qualität sind entscheidend.'
    },
    {
      question: 'Brauche ich eine Musikmarketing Agentur?',
      answer: 'Eine Musikmarketing Agentur ist sinnvoll, wenn du: 1) keine Zeit für Marketing hast, 2) schnell professionelle Ergebnisse willst, 3) komplexe Kampagnen wie Instagram Ads schalten möchtest, 4) Expertise und Erfahrung nutzen willst. Viele Artists starten selbst und holen sich später professionelle Unterstützung.'
    },
    {
      question: 'Wie lange dauert es, bis Musikmarketing Ergebnisse zeigt?',
      answer: 'Paid Ads zeigen sofort Ergebnisse (innerhalb von Tagen). Organisches Wachstum braucht 3-6 Monate für sichtbare Erfolge. Eine nachhaltige Fanbase aufzubauen dauert 6-12 Monate. Wichtig ist Konsistenz: Regelmäßiger Content, kontinuierliche Promotion und Geduld führen zu langfristigem Erfolg.'
    }
  ]);

  return (
    <>
      <Helmet>
        <title>Musikmarketing: Professionelle Strategien für Musiker & Künstler 2026</title>
        <meta 
          name="description" 
          content="Musikmarketing Strategien & Tipps für Künstler. Lerne Instagram Ads, Spotify Promotion & Social Media Marketing für deine Musikkarriere." 
        />
        <meta name="keywords" content="Musikmarketing, Musik Marketing, Musikpromotion, Musiker Marketing, Social Media Marketing, Instagram Marketing, Spotify Marketing, Künstler Marketing, Musik vermarkten" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://musikmarketing.de/" />
        <meta property="og:title" content="Musikmarketing: Professionelle Strategien für Musiker & Künstler 2026" />
        <meta property="og:description" content="Musikmarketing Strategien & Tipps für Künstler. Lerne Instagram Ads, Spotify Promotion & Social Media Marketing für deine Musikkarriere." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://musikmarketing.de/" />
        <meta property="og:image" content="https://musikmarketing.de/musikmarketing.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [organizationSchema, websiteSchema, faqSchema]
          })}
        </script>
      </Helmet>

      {/* Main Container - Black Background */}
      <Box sx={{ 
        minHeight: '100vh',
        background: '#000000',
        py: 8,
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Main Content - Left Side */}
            <Grid item xs={12} md={8}>
          {/* Hero Section - SEO Optimized */}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography 
              component="h1" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                color: '#ffffff',
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Musikmarketing für Künstler & Musiker
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 400,
                color: '#9e9e9e',
                mb: 4,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Professionelle Musikmarketing-Strategien, die wirklich funktionieren
            </Typography>
            
            {/* SEO Content Section */}
            <Box sx={{ 
              textAlign: 'left', 
              maxWidth: '900px', 
              mx: 'auto', 
              mb: 6,
              p: 4,
              background: '#0a0a0a',
              border: '1px solid #2a2a2a',
              borderRadius: '8px',
            }}>
              <Typography variant="h2" sx={{ 
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#ffffff',
                mb: 3,
              }}>
                Was ist Musikmarketing?
              </Typography>
              <Typography sx={{ color: '#b0b0b0', mb: 3, lineHeight: 1.8 }}>
                <strong style={{ color: '#ffffff' }}>Musikmarketing</strong> ist die strategische Vermarktung deiner Musik und deiner Künstlermarke. 
                In der heutigen digitalen Musikindustrie reicht Talent allein nicht mehr aus – erfolgreiche Musiker nutzen gezieltes 
                <strong style={{ color: '#ffffff' }}> Musik Marketing</strong>, um ihre Reichweite zu steigern und eine treue Fanbase aufzubauen.
              </Typography>
              
              <Typography variant="h3" sx={{ 
                fontSize: '1.35rem',
                fontWeight: 600,
                color: '#ffffff',
                mb: 2,
                mt: 4,
              }}>
                Warum ist Musikmarketing so wichtig?
              </Typography>
              <Typography sx={{ color: '#b0b0b0', mb: 3, lineHeight: 1.8 }}>
                Ohne professionelles <strong style={{ color: '#ffffff' }}>Musikmarketing</strong> geht deine Musik in der Masse unter. 
                Jeden Tag werden über 100.000 neue Songs auf Spotify hochgeladen. Mit den richtigen Musikmarketing-Strategien hebst du dich ab:
              </Typography>
              
              <Box component="ul" sx={{ color: '#b0b0b0', pl: 3, mb: 3 }}>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: '#ffffff' }}>Instagram Ads für Musiker</strong> – Erreiche gezielt deine Zielgruppe</li>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: '#ffffff' }}>Spotify Marketing</strong> – Steigere deine Streams und Playlist-Platzierungen</li>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: '#ffffff' }}>Social Media Marketing</strong> – Baue eine engagierte Community auf</li>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: '#ffffff' }}>Content-Strategien</strong> – Erstelle viralen Content für TikTok & Instagram</li>
              </Box>

              <Typography variant="h3" sx={{ 
                fontSize: '1.35rem',
                fontWeight: 600,
                color: '#ffffff',
                mb: 2,
                mt: 4,
              }}>
                Musikmarketing lernen – Deine nächsten Schritte
              </Typography>
              <Typography sx={{ color: '#b0b0b0', mb: 3, lineHeight: 1.8 }}>
                Auf musikmarketing.de findest du alles, was du für erfolgreiches <strong style={{ color: '#ffffff' }}>Musiker Marketing</strong> brauchst. 
                Von Grundlagen bis zu fortgeschrittenen Strategien – wir zeigen dir, wie du deine Musik erfolgreich vermarktest.
              </Typography>

              {/* Internal Links */}
              <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  component={Link}
                  to="/musikmarketing-agentur"
                  variant="outlined"
                  sx={{
                    color: '#fff',
                    borderColor: '#2a2a2a',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#4a4a4a',
                      background: '#1a1a1a',
                    }
                  }}
                >
                  Musikmarketing Agentur
                </Button>
                <Button
                  component={Link}
                  to="/blog"
                  variant="outlined"
                  sx={{
                    color: '#fff',
                    borderColor: '#2a2a2a',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#4a4a4a',
                      background: '#1a1a1a',
                    }
                  }}
                >
                  Musikmarketing Tipps im Blog
                </Button>
              </Box>
            </Box>
          </Box>

          {/* FAQ Section */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h2" sx={{ 
              fontWeight: 700, 
              color: '#ffffff',
              mb: 4,
              textAlign: 'center'
            }}>
              Häufig gestellte Fragen zum Musikmarketing
            </Typography>
            
            <Stack spacing={2} sx={{ maxWidth: '900px', mx: 'auto' }}>
              <Box sx={{ 
                p: 3, 
                background: '#0a0a0a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
              }}>
                <Typography variant="h3" sx={{ 
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  mb: 1.5,
                }}>
                  Was ist Musikmarketing?
                </Typography>
                <Typography sx={{ color: '#b0b0b0', lineHeight: 1.7 }}>
                  Musikmarketing ist die strategische Vermarktung deiner Musik und deiner Künstlermarke. Es umfasst alle Maßnahmen, um deine Reichweite zu steigern, neue Fans zu gewinnen und deine Musik erfolgreich zu promoten. Dazu gehören Social Media Marketing, Instagram Ads, Spotify Promotion, Content-Strategien und vieles mehr.
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                background: '#0a0a0a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
              }}>
                <Typography variant="h3" sx={{ 
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  mb: 1.5,
                }}>
                  Wie viel kostet Musikmarketing?
                </Typography>
                <Typography sx={{ color: '#b0b0b0', lineHeight: 1.7 }}>
                  Die Kosten für Musikmarketing variieren stark. Du kannst mit einem Budget von 5-10€ pro Tag für Instagram Ads starten. Professionelle Musikmarketing Agenturen bieten Pakete ab 500€ pro Monat an. Viele Strategien wie organisches Social Media Marketing sind kostenlos, erfordern aber Zeit und Know-how.
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                background: '#0a0a0a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
              }}>
                <Typography variant="h3" sx={{ 
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  mb: 1.5,
                }}>
                  Welche Social Media Plattform ist am besten für Musikmarketing?
                </Typography>
                <Typography sx={{ color: '#b0b0b0', lineHeight: 1.7 }}>
                  Instagram und TikTok sind aktuell die wichtigsten Plattformen für Musikmarketing. Instagram eignet sich hervorragend für Community-Building und Paid Ads. TikTok bietet das größte virale Potenzial für neue Songs. Spotify ist essentiell für Streaming-Promotion. Die beste Strategie kombiniert mehrere Plattformen.
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                background: '#0a0a0a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
              }}>
                <Typography variant="h3" sx={{ 
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  mb: 1.5,
                }}>
                  Wie bekomme ich mehr Spotify Streams?
                </Typography>
                <Typography sx={{ color: '#b0b0b0', lineHeight: 1.7 }}>
                  Um mehr Spotify Streams zu bekommen, solltest du: 1) Pre-Save Kampagnen vor dem Release starten, 2) Instagram Ads auf deine Spotify-Songs schalten, 3) Playlist Pitching betreiben, 4) organischen Content auf TikTok und Instagram erstellen, 5) mit anderen Artists kollaborieren. Konsistenz und Qualität sind entscheidend.
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                background: '#0a0a0a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
              }}>
                <Typography variant="h3" sx={{ 
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  mb: 1.5,
                }}>
                  Brauche ich eine Musikmarketing Agentur?
                </Typography>
                <Typography sx={{ color: '#b0b0b0', lineHeight: 1.7 }}>
                  Eine Musikmarketing Agentur ist sinnvoll, wenn du: 1) keine Zeit für Marketing hast, 2) schnell professionelle Ergebnisse willst, 3) komplexe Kampagnen wie Instagram Ads schalten möchtest, 4) Expertise und Erfahrung nutzen willst. Viele Artists starten selbst und holen sich später professionelle Unterstützung.
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                background: '#0a0a0a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
              }}>
                <Typography variant="h3" sx={{ 
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  mb: 1.5,
                }}>
                  Wie lange dauert es, bis Musikmarketing Ergebnisse zeigt?
                </Typography>
                <Typography sx={{ color: '#b0b0b0', lineHeight: 1.7 }}>
                  Paid Ads zeigen sofort Ergebnisse (innerhalb von Tagen). Organisches Wachstum braucht 3-6 Monate für sichtbare Erfolge. Eine nachhaltige Fanbase aufzubauen dauert 6-12 Monate. Wichtig ist Konsistenz: Regelmäßiger Content, kontinuierliche Promotion und Geduld führen zu langfristigem Erfolg.
                </Typography>
              </Box>
            </Stack>
          </Box>
            </Grid>

            {/* Blog Sidebar - Right Side */}
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                position: 'sticky',
                top: 100,
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h2" sx={{ 
                    fontWeight: 700, 
                    color: '#ffffff',
                    fontSize: '1.5rem',
                  }}>
                    Neueste Artikel
                  </Typography>
                  <Button
                    component={Link}
                    to="/blog"
                    sx={{
                      color: '#fff',
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      '&:hover': { color: '#9e9e9e' }
                    }}
                  >
                    Alle →
                  </Button>
                </Box>

                {!loadingPosts && posts.length > 0 && (
                  <Stack spacing={2}>
                    {posts.slice(0, 6).map((post) => (
                      <Link key={post.id} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                        <Box
                          sx={{
                            background: '#0a0a0a',
                            border: '1px solid #2a2a2a',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            transition: 'all 0.3s',
                            '&:hover': {
                              border: '1px solid #4a4a4a',
                              transform: 'translateY(-2px)',
                            }
                          }}
                        >
                          {post.cover_image && (
                            <Box
                              component="img"
                              src={post.cover_image}
                              alt={post.title}
                              sx={{
                                width: '100%',
                                height: 140,
                                objectFit: 'cover',
                              }}
                            />
                          )}
                          <Box sx={{ p: 2 }}>
                            {post.tags && post.tags.length > 0 && (
                              <Chip
                                label={post.tags[0]}
                                size="small"
                                sx={{
                                  bgcolor: '#1a1a1a',
                                  color: '#fff',
                                  border: '1px solid #333',
                                  mb: 1,
                                  fontWeight: 600,
                                  fontSize: '0.65rem',
                                  height: 'auto',
                                  py: 0.5,
                                }}
                              />
                            )}
                            <Typography
                              variant="h5"
                              sx={{
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: '#ffffff',
                                mb: 1,
                                lineHeight: 1.3,
                              }}
                            >
                              {post.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                              {formatDate(post.published_date || post.created_at)}
                            </Typography>
                          </Box>
                        </Box>
                      </Link>
                    ))}
                  </Stack>
                )}

                {!loadingPosts && posts.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
                      Noch keine Artikel
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>

          {/* CTA Section - Full Width */}
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
