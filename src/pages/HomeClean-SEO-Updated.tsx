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
  Card,
  CardContent,
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

const HomeUpdated = () => {
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
      answer: 'Musikmarketing ist das System, um deine Musik den richtigen Menschen zu zeigen und sie in zahlende Fans zu verwandeln. Es kombiniert Content-Creation, Community-Building und strategische Werbung. Mit song.so Conversion Tracking kannst du auch messen, was wirklich funktioniert.'
    },
    {
      question: 'Wie viel kostet professionelles Musikmarketing?',
      answer: 'Das hängt von deinen Zielen ab. Anfänger: 500-2000€/Monat. Aufstrebende Artists: 2000-5000€/Monat. Chart-Aspiranten: 5000€+/Monat. Wichtig: Du zahlst für Strategie + Umsetzung, nicht nur Hoffnung.'
    },
    {
      question: 'Was ist song.so und warum brauche ich es?',
      answer: 'song.so ist ein Conversion Tracking Tool speziell für Musiker. Es zeigt dir, welche deiner Fans kaufen, welche konzertgehen und welche nur zuhören. Damit kennst du deine echten Super-Fans und kannst sie gezielt anwerben. Resultat: 2-3x bessere Ad Performance.'
    },
    {
      question: 'Organic oder Paid Ads — Was funktioniert besser?',
      answer: 'Beides! Organic ist langsam, aber kostenlos. Paid Ads sind schnell, kosten aber Geld. Die beste Strategie kombiniert beide: Organic für Community-Building, Paid für beschleunigtes Wachstum.'
    },
    {
      question: 'Wie lange dauert es, bis ich Ergebnisse sehe?',
      answer: 'Mit richtigem System: 30 Tage für erste Erfolge, 3 Monate für solides Wachstum, 6 Monate für echten Durchbruch. Unser 30-Tage Action Plan zeigt dir exakt, was wann zu tun ist.'
    },
    {
      question: 'Welche Plattformen sollte ich 2026 nutzen?',
      answer: 'Es kommt auf dein Genre an. Top 3 sind: TikTok (schnell viral), Instagram (Community), Spotify (Streams). Nicht alles gleichzeitig! Fokussiere auf 1-2 Plattformen zuerst.'
    }
  ]);

  return (
    <>
      <Helmet>
        <title>Musikmarketing in Deutschland 2026: Der komplette Leitfaden</title>
        <meta 
          name="description" 
          content="Musikmarketing Komplettanleitung 2026: 4-Step Framework + song.so Conversion Tracking. Fans aufbauen, Streams messen, Musik vermarkten. Hub-Artikel + 7 Spokes." 
        />
        <meta name="keywords" content="Musikmarketing, Musikmarketing Deutschland, Musik vermarkten, song.so, Conversion Tracking, Musikpromotion, Artist Marketing, Streaming" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://musikmarketing.de/" />
        <meta property="og:title" content="Musikmarketing in Deutschland 2026: Der komplette Leitfaden" />
        <meta property="og:description" content="Musikmarketing Komplettanleitung mit song.so Conversion Tracking. 4-Schritt-Framework, Platform-Strategien, 30-Tage Action Plan." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://musikmarketing.de/" />
        <meta property="og:image" content="https://musikmarketing.de/musikmarketing-hero.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [organizationSchema, websiteSchema, faqSchema]
          })}
        </script>
      </Helmet>

      {/* ============================================
          SECTION 1: HERO
          ============================================ */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: 'white',
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}>
        <Container maxWidth="md">
          <Typography 
            component="h1" 
            sx={{ 
              fontSize: { xs: '2rem', md: '2.8rem' },
              fontWeight: 800,
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Musikmarketing in Deutschland 2026
            <br />
            <span style={{ color: '#00d4ff' }}>Der komplette Leitfaden</span>
          </Typography>
          
          <Typography 
            sx={{ 
              fontSize: { xs: '1rem', md: '1.1rem' },
              mb: 1,
              color: '#e0e0e0',
              lineHeight: 1.6,
            }}
          >
            Fans aufbauen. Streams messen. Musik vermarkten.
            <br />
            <strong>Der einzige deutschsprachige Guide mit song.so Conversion Tracking.</strong>
          </Typography>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            sx={{ mt: 4, justifyContent: 'center' }}
          >
            <Button 
              component={Link}
              to="/blog/musikmarketing-2026-kompletter-leitfaden"
              variant="contained"
              sx={{
                background: '#00d4ff',
                color: 'black',
                px: 4,
                py: 1.8,
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': { background: '#00a8d4' },
              }}
            >
              Kompletten Leitfaden kostenlos lesen →
            </Button>
          </Stack>

          <Stack direction="row" spacing={3} sx={{ mt: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Chip label="6000+ Wörter" size="small" variant="outlined" sx={{ color: '#b0b0b0', borderColor: '#b0b0b0' }} />
            <Chip label="Aktualisiert 2026" size="small" variant="outlined" sx={{ color: '#b0b0b0', borderColor: '#b0b0b0' }} />
            <Chip label="Praktische Umsetzung" size="small" variant="outlined" sx={{ color: '#b0b0b0', borderColor: '#b0b0b0' }} />
            <Chip label="Mit song.so Integration" size="small" variant="outlined" sx={{ color: '#b0b0b0', borderColor: '#b0b0b0' }} />
          </Stack>
        </Container>
      </Box>

      {/* ============================================
          SECTION 2: PROBLEM STATEMENT
          ============================================ */}
      <Box sx={{ py: { xs: 4, md: 6 }, background: 'white' }}>
        <Container maxWidth="md">
          <Typography 
            component="h2" 
            sx={{ 
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 700,
              mb: 3,
              color: '#1a1a1a',
            }}
          >
            Warum Standard Musikmarketing Tipps nicht funktionieren
          </Typography>

          <Card sx={{ 
            background: '#f5f5f5', 
            border: '4px solid #ff6b6b',
            borderLeft: '8px solid #ff6b6b',
            mb: 3,
          }}>
            <CardContent>
              <Typography sx={{ mb: 2, fontSize: '1.05rem', color: '#333', lineHeight: 1.8 }}>
                <strong>Das Kernproblem:</strong> 99% der Musikmarketing Guides beschreiben nur <em>was</em> du tun sollst. Sie ignorieren aber das Wichtigste: <strong>Wie du misst, ob es funktioniert</strong>.
              </Typography>

              <Stack spacing={1.5} sx={{ mt: 2 }}>
                <Typography sx={{ fontSize: '1rem', color: '#333', lineHeight: 1.7 }}>
                  <strong>❌ Spotify Streams ≠ Wirkliche Fans</strong> — Ein Stream kostet 0,003€. Ein zahlender Fan bringt 100x mehr Wert.
                </Typography>
                <Typography sx={{ fontSize: '1rem', color: '#333', lineHeight: 1.7 }}>
                  <strong>❌ Instagram Followers ≠ Ticket Verkäufe</strong> — 10.000 Follower bedeuten nicht automatisch ausverkaufte Shows.
                </Typography>
                <Typography sx={{ fontSize: '1rem', color: '#333', lineHeight: 1.7 }}>
                  <strong>❌ Ads ohne Tracking = Geld verbrennen</strong> — Du gibst 1000€ für Facebook Ads aus und weißt nicht, ob auch nur EIN echter Fan entsteht.
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          <Typography sx={{ fontSize: '1.05rem', color: '#555', mb: 2, lineHeight: 1.8 }}>
            <strong>Die Lösung: song.so Conversion Tracking</strong>
          </Typography>

          <Typography sx={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.8 }}>
            song.so ist das <strong>einzige deutsche Musikmarketing-Tool</strong>, das dir zeigt, was <em>wirklich funktioniert</em>. Nicht Versprechungen. Nicht Theorien. <strong>Echte Daten.</strong>
          </Typography>
        </Container>
      </Box>

      {/* ============================================
          SECTION 3: 4-STEP FRAMEWORK
          ============================================ */}
      <Box sx={{ py: { xs: 4, md: 6 }, background: '#f9f9f9' }}>
        <Container maxWidth="md">
          <Typography 
            component="h2" 
            sx={{ 
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 700,
              mb: 4,
              color: '#1a1a1a',
            }}
          >
            Das 4-Schritt Framework für erfolgreichen Musikmarketing
          </Typography>

          <Typography sx={{ fontSize: '1.05rem', color: '#555', mb: 3, lineHeight: 1.8 }}>
            Erfolgreiches Musikmarketing folgt einem bewährten System. Die folgenden 4 Schritte funktionieren für jeden Musiker — vom Anfänger bis zum Chart-Künstler:
          </Typography>

          <Stack spacing={2.5}>
            {/* Step 1 */}
            <Card sx={{ border: '1px solid #e0e0e0', borderLeft: '5px solid #00d4ff' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
                  <Box sx={{ 
                    background: '#00d4ff', 
                    color: 'black', 
                    px: 1.5, 
                    py: 0.5, 
                    borderRadius: 1,
                    fontWeight: 'bold',
                    minWidth: '30px',
                    textAlign: 'center',
                  }}>
                    1
                  </Box>
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a' }}>
                    AUFMERKSAMKEIT — Content-Marketing
                  </Typography>
                </Box>
                <Typography sx={{ color: '#555', fontSize: '1rem', lineHeight: 1.8, mt: 1 }}>
                  Das Fundament. Ohne Content keine Aufmerksamkeit. Mit dem richtigen Content erreichen deine Inhalte die richtigen Menschen — auf TikTok, Instagram, YouTube oder deinem Blog.
                </Typography>
                <Typography sx={{ color: '#777', fontSize: '0.95rem', mt: 1.5, fontStyle: 'italic' }}>
                  <strong>Messung mit song.so:</strong> Welche Content-Formate bringen echte Musik-Hörer?
                </Typography>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card sx={{ border: '1px solid #e0e0e0', borderLeft: '5px solid #00d4ff' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
                  <Box sx={{ 
                    background: '#00d4ff', 
                    color: 'black', 
                    px: 1.5, 
                    py: 0.5, 
                    borderRadius: 1,
                    fontWeight: 'bold',
                    minWidth: '30px',
                    textAlign: 'center',
                  }}>
                    2
                  </Box>
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a' }}>
                    BEGEISTERUNG — Engagement messen
                  </Typography>
                </Box>
                <Typography sx={{ color: '#555', fontSize: '1rem', lineHeight: 1.8, mt: 1 }}>
                  Nicht alle Zuschauer sind gleich. Aus deinen Followers entstehen echte Fans — wenn du die Richtigen identifizierst und ansprichst. Mit song.so siehst du, wer wirklich interessiert ist.
                </Typography>
                <Typography sx={{ color: '#777', fontSize: '0.95rem', mt: 1.5, fontStyle: 'italic' }}>
                  <strong>Messung mit song.so:</strong> Welche Zuschauer werden zu zahlenden Fans?
                </Typography>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card sx={{ border: '1px solid #e0e0e0', borderLeft: '5px solid #00d4ff' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
                  <Box sx={{ 
                    background: '#00d4ff', 
                    color: 'black', 
                    px: 1.5, 
                    py: 0.5, 
                    borderRadius: 1,
                    fontWeight: 'bold',
                    minWidth: '30px',
                    textAlign: 'center',
                  }}>
                    3
                  </Box>
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a' }}>
                    VERBINDUNG — Fan-Beziehungen aufbauen
                  </Typography>
                </Box>
                <Typography sx={{ color: '#555', fontSize: '1rem', lineHeight: 1.8, mt: 1 }}>
                  Deine Superfans sind wertvoll. Mit direkter Kommunikation (Email, Discord, WhatsApp) baust du eine Community auf, die deine Musik liebt — und dafür bezahlt.
                </Typography>
                <Typography sx={{ color: '#777', fontSize: '0.95rem', mt: 1.5, fontStyle: 'italic' }}>
                  <strong>Messung mit song.so:</strong> Welche Fan-Gruppen sind am wertvollsten?
                </Typography>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card sx={{ border: '1px solid #e0e0e0', borderLeft: '5px solid #00d4ff' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
                  <Box sx={{ 
                    background: '#00d4ff', 
                    color: 'black', 
                    px: 1.5, 
                    py: 0.5, 
                    borderRadius: 1,
                    fontWeight: 'bold',
                    minWidth: '30px',
                    textAlign: 'center',
                  }}>
                    4
                  </Box>
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a' }}>
                    MEHRWERT — Monetisierung
                  </Typography>
                </Box>
                <Typography sx={{ color: '#555', fontSize: '1rem', lineHeight: 1.8, mt: 1 }}>
                  Musik ist kostenlos geworden. Aber Exklusivität ist wertvoll. Merch, Konzerte, Fan-Clubs, Exclusive Releases — damit verdienst du wirklich mit deiner Musik.
                </Typography>
                <Typography sx={{ color: '#777', fontSize: '0.95rem', mt: 1.5, fontStyle: 'italic' }}>
                  <strong>Messung mit song.so:</strong> Welches Produkt macht am meisten Umsatz?
                </Typography>
              </CardContent>
            </Card>
          </Stack>

          <Typography sx={{ 
            fontSize: '1.05rem', 
            color: '#1a1a1a', 
            mt: 4, 
            fontWeight: 'bold',
            lineHeight: 1.8,
          }}>
            <strong>Das Besondere:</strong> Mit song.so's Conversion Tracking siehst du genau, in welchem Schritt Fans wegfallen — und wo du anpassen musst.
          </Typography>
        </Container>
      </Box>

      {/* ============================================
          SECTION 4: song.so UNIQUE ANGLE
          ============================================ */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #003d7a 0%, #0066cc 100%)',
        color: 'white',
        py: { xs: 4, md: 6 },
      }}>
        <Container maxWidth="md">
          <Typography 
            component="h2" 
            sx={{ 
              fontSize: { xs: '1.8rem', md: '2rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            song.so: Die einzige deutsche Lösung für Musik-Conversion Tracking
          </Typography>

          <Typography sx={{ fontSize: '1.05rem', mb: 3, opacity: 0.95, lineHeight: 1.8 }}>
            Während andere Guides dir nur Tipps geben, zeigen wir dir mit <strong>song.so</strong>, wie du wirklich misst, was funktioniert.
          </Typography>

          <Card sx={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', mb: 3 }}>
            <CardContent>
              <Typography sx={{ color: 'white', fontSize: '1.2rem', fontWeight: 700, mb: 2 }}>
                song.so's Superkraft: Conversion Tracking ohne Ad Blocker-Probleme
              </Typography>

              <Stack spacing={1.5}>
                <Typography sx={{ fontSize: '1rem', lineHeight: 1.8 }}>
                  <strong>✓ Bypass Ad Blockers</strong> — Erreiche echte Hörer, nicht nur Bot-Traffic
                </Typography>
                <Typography sx={{ fontSize: '1rem', lineHeight: 1.8 }}>
                  <strong>✓ Filter Bot-Traffic automatisch</strong> — Zähle nur echte Menschen
                </Typography>
                <Typography sx={{ fontSize: '1rem', lineHeight: 1.8 }}>
                  <strong>✓ Track End-to-End Conversions</strong> — Von Song bis Ticket/Merch bis Umsatz
                </Typography>
                <Typography sx={{ fontSize: '1rem', lineHeight: 1.8 }}>
                  <strong>✓ Sende Clean Data an Meta & TikTok</strong> — Bessere Ad-Optimierung = Niedrigere CPC
                </Typography>
                <Typography sx={{ fontSize: '1rem', lineHeight: 1.8 }}>
                  <strong>✓ Deutsche DSGVO-Konformität</strong> — Keine Probleme mit Datenschutz
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ background: 'rgba(255, 255, 255, 0.05)', border: 'none' }}>
            <CardContent>
              <Typography sx={{ fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
                <strong>Resultat:</strong> Artists, die song.so nutzen, sehen im Durchschnitt <strong>2-3x bessere Ad Performance</strong>, weil Meta & TikTok mit echten Daten arbeiten statt mit Schätzungen.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* ============================================
          SECTION 5: HÄUFIGE FEHLER
          ============================================ */}
      <Box sx={{ py: { xs: 4, md: 6 }, background: 'white' }}>
        <Container maxWidth="md">
          <Typography 
            component="h2" 
            sx={{ 
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 700,
              mb: 4,
              color: '#1a1a1a',
            }}
          >
            Die 5 häufigsten Fehler beim Musikmarketing
          </Typography>

          <Grid container spacing={2}>
            {/* Fehler 1 */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ background: '#fff5f5', border: '4px solid #ff6b6b', height: '100%' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                    ❌ Fehler 1: Ohne Strategie starten
                  </Typography>
                  <Typography sx={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    Du machst Content, schreibst Posts, hoffst auf Erfolg. Resultat: Zufallsergebnisse statt System.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Fehler 2 */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ background: '#fff5f5', border: '4px solid #ff6b6b', height: '100%' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                    ❌ Fehler 2: Keine Daten tracken
                  </Typography>
                  <Typography sx={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    Du gibst Budget aus, weißt aber nicht, welcher Content funktioniert. song.so löst das.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Fehler 3 */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ background: '#fff5f5', border: '4px solid #ff6b6b', height: '100%' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                    ❌ Fehler 3: Die falsche Platform wählen
                  </Typography>
                  <Typography sx={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    Du postest auf Facebook, aber deine Fans sind auf TikTok. Verschwendete Energie.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Fehler 4 */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ background: '#fff5f5', border: '4px solid #ff6b6b', height: '100%' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                    ❌ Fehler 4: Zu wenig Budget für Ads
                  </Typography>
                  <Typography sx={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    Du versuchst, organic zu wachsen, während andere 1000€/Monat in Meta Ads investieren.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Fehler 5 */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ background: '#fff5f5', border: '4px solid #ff6b6b', height: '100%' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                    ❌ Fehler 5: Nur Streams zählen
                  </Typography>
                  <Typography sx={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    100K Streams klingt cool, aber 1 zahlender Fan verdient 100x mehr. Falsche Metrik.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Success */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ background: '#f0f9ff', border: '4px solid #0066cc', height: '100%' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#0066cc', mb: 1 }}>
                    ✓ Die Lösung: Dieser Leitfaden
                  </Typography>
                  <Typography sx={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    Lerne das 4-Schritt-System, das Tausende Artists nutzen — um diese Fehler zu vermeiden.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ============================================
          SECTION 6: HUB ARTICLE TEASER + CTA
          ============================================ */}
      <Box sx={{ py: { xs: 4, md: 6 }, background: 'linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)' }}>
        <Container maxWidth="md">
          <Typography 
            component="h2" 
            sx={{ 
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 700,
              mb: 3,
              color: '#1a1a1a',
            }}
          >
            Der komplette Musikmarketing Leitfaden
          </Typography>

          <Card sx={{ 
            background: 'white', 
            border: '2px solid #00d4ff',
            mb: 3,
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography sx={{ fontSize: '1.25rem', color: '#1a1a1a', mb: 2, fontWeight: 700 }}>
                Musikmarketing in Deutschland 2026 — Der komplette Leitfaden
              </Typography>

              <Typography sx={{ color: '#555', fontSize: '1rem', lineHeight: 1.8, mb: 2 }}>
                <strong>6000+ Wörter</strong> Praktisches Wissen, das dich vom Anfänger zum Profi macht. Dieser Leitfaden ist gratis und enthält:
              </Typography>

              <Stack component="ul" spacing={1} sx={{ pl: 2, mb: 3 }}>
                <Typography component="li" sx={{ color: '#555', fontSize: '0.95em', lineHeight: 1.7 }}>
                  <strong>1. Definition + Warum Standard-Tipps fehlschlagen</strong> — Das Fundament verstehen
                </Typography>
                <Typography component="li" sx={{ color: '#555', fontSize: '0.95em', lineHeight: 1.7 }}>
                  <strong>2. Das 4-Schritt-Framework im Detail</strong> — Mit praktischen Beispielen
                </Typography>
                <Typography component="li" sx={{ color: '#555', fontSize: '0.95em', lineHeight: 1.7 }}>
                  <strong>3. Platform Deep-Dives 2026</strong> — TikTok, Instagram, Spotify, Meta, Discord
                </Typography>
                <Typography component="li" sx={{ color: '#555', fontSize: '0.95em', lineHeight: 1.7 }}>
                  <strong>4. song.so Integration</strong> — Wie du Conversion Tracking implementierst
                </Typography>
                <Typography component="li" sx={{ color: '#555', fontSize: '0.95em', lineHeight: 1.7 }}>
                  <strong>5. Traffic-Strategien 2026</strong> — Organic vs. Paid, Meta Ads, Organic Community
                </Typography>
                <Typography component="li" sx={{ color: '#555', fontSize: '0.95em', lineHeight: 1.7 }}>
                  <strong>6. Häufige Fehler vermeiden</strong> — Was Tausende Musiker falsch machen
                </Typography>
                <Typography component="li" sx={{ color: '#555', fontSize: '0.95em', lineHeight: 1.7 }}>
                  <strong>7. 30-Tage Action Plan</strong> — Woche für Woche Umsetzung
                </Typography>
                <Typography component="li" sx={{ color: '#555', fontSize: '0.95em', lineHeight: 1.7 }}>
                  <strong>8. FAQ</strong> — Die wichtigsten Fragen beantwortet
                </Typography>
              </Stack>

              <Typography sx={{ color: '#777', fontSize: '0.9em', fontStyle: 'italic' }}>
                + Vergleich mit Top-Konkurrenten + Real Case Studies + Zusammenfassung als PDF zum Download
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Button 
              component={Link}
              to="/blog/musikmarketing-2026-kompletter-leitfaden"
              variant="contained"
              sx={{
                background: '#00d4ff',
                color: 'black',
                px: 5,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': { background: '#00a8d4' },
              }}
            >
              Zum kompletten Leitfaden →
            </Button>
          </Box>

          <Typography sx={{ color: '#777', fontSize: '0.9em', textAlign: 'center' }}>
            Kostenlos. Komplett. Aktualisiert 2026.
          </Typography>
        </Container>
      </Box>

      {/* ============================================
          SECTION 7: FAQ
          ============================================ */}
      <Box sx={{ py: { xs: 4, md: 6 }, background: 'white' }}>
        <Container maxWidth="md">
          <Typography 
            component="h2" 
            sx={{ 
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 700,
              mb: 4,
              color: '#1a1a1a',
            }}
          >
            Häufig gestellte Fragen zum Musikmarketing
          </Typography>

          <Stack spacing={2}>
            {[
              {
                q: 'Was ist Musikmarketing?',
                a: 'Musikmarketing ist das System, um deine Musik den richtigen Menschen zu zeigen und sie in zahlende Fans zu verwandeln. Es kombiniert Content-Creation, Community-Building und strategische Werbung. Mit song.so Conversion Tracking kannst du auch messen, was wirklich funktioniert.'
              },
              {
                q: 'Wie viel kostet professionelles Musikmarketing?',
                a: 'Das hängt von deinen Zielen ab. Anfänger: 500-2000€/Monat. Aufstrebende Artists: 2000-5000€/Monat. Chart-Aspiranten: 5000€+/Monat. Wichtig: Du zahlst für Strategie + Umsetzung, nicht nur Hoffnung.'
              },
              {
                q: 'Was ist song.so und warum brauche ich es?',
                a: 'song.so ist ein Conversion Tracking Tool speziell für Musiker. Es zeigt dir, welche deiner Fans kaufen, welche konzertgehen und welche nur zuhören. Damit kennst du deine echten Super-Fans und kannst sie gezielt anwerben. Resultat: 2-3x bessere Ad Performance.'
              },
              {
                q: 'Organic oder Paid Ads — Was funktioniert besser?',
                a: 'Beides! Organic ist langsam, aber kostenlos. Paid Ads sind schnell, kosten aber Geld. Die beste Strategie kombiniert beide: Organic für Community-Building, Paid für beschleunigtes Wachstum.'
              },
              {
                q: 'Wie lange dauert es, bis ich Ergebnisse sehe?',
                a: 'Mit richtigem System: 30 Tage für erste Erfolge, 3 Monate für solides Wachstum, 6 Monate für echten Durchbruch. Unser 30-Tage Action Plan zeigt dir exakt, was wann zu tun ist.'
              },
              {
                q: 'Welche Plattformen sollte ich 2026 nutzen?',
                a: 'Es kommt auf dein Genre an. Top 3 sind: TikTok (schnell viral), Instagram (Community), Spotify (Streams). Nicht alles gleichzeitig! Fokussiere auf 1-2 Plattformen zuerst.'
              }
            ].map((item, idx) => (
              <Card key={idx} sx={{ background: '#f9f9f9', border: '1px solid #e0e0e0' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                    ➤ {item.q}
                  </Typography>
                  <Typography sx={{ color: '#555', fontSize: '0.95em', lineHeight: 1.8, margin: 0 }}>
                    {item.a}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* ============================================
          SECTION 8: FINAL CTA
          ============================================ */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: 'white',
        py: { xs: 4, md: 6 },
        textAlign: 'center',
      }}>
        <Container maxWidth="sm">
          <Typography 
            component="h2" 
            sx={{ 
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Bereit, dein Musikmarketing zu revolutionieren?
          </Typography>

          <Typography sx={{ fontSize: '1.1rem', mb: 3, lineHeight: 1.8, opacity: 0.95 }}>
            Der komplette 2026 Leitfaden wartet auf dich. Kostenlos. Mit song.so Integration. Kein Spam, nur echter Wert.
          </Typography>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'center', mb: 3 }}
          >
            <Button 
              component={Link}
              to="/blog/musikmarketing-2026-kompletter-leitfaden"
              variant="contained"
              sx={{
                background: '#00d4ff',
                color: 'black',
                px: 4,
                py: 1.8,
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': { background: '#00a8d4' },
              }}
            >
              Leitfaden jetzt lesen
            </Button>
            
            <Button 
              component="a"
              href="https://app.song.so"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: '#00d4ff',
                px: 4,
                py: 1.8,
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': { background: 'rgba(0, 212, 255, 0.1)', borderColor: '#00d4ff' },
              }}
            >
              song.so nutzen
            </Button>
          </Stack>

          <Typography sx={{ fontSize: '0.95em', opacity: 0.8 }}>
            <strong>6000+ Wörter</strong> • <strong>8 Kapitel</strong> • <strong>Praktische Umsetzung</strong> • <strong>Aktualisiert 2026</strong>
          </Typography>
        </Container>
      </Box>

      {/* ============================================
          SECTION 9: LATEST BLOG POSTS
          ============================================ */}
      {posts.length > 0 && (
        <Box sx={{ py: { xs: 4, md: 6 }, background: 'white' }}>
          <Container maxWidth="lg">
            <Typography 
              component="h2" 
              sx={{ 
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                fontWeight: 700,
                mb: 4,
                color: '#1a1a1a',
              }}
            >
              Weitere Artikel zum Musikmarketing
            </Typography>

            <Grid container spacing={3}>
              {posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Card 
                    component={Link}
                    to={`/blog/${post.slug}`}
                    sx={{
                      height: '100%',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      }
                    }}
                  >
                    {post.cover_image && (
                      <Box
                        sx={{
                          height: 200,
                          backgroundImage: `url(${post.cover_image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    )}
                    <CardContent>
                      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                        {post.title}
                      </Typography>
                      <Typography sx={{ color: '#777', fontSize: '0.9rem', mb: 1.5 }}>
                        {post.excerpt}
                      </Typography>
                      <Typography sx={{ color: '#999', fontSize: '0.85rem' }}>
                        {formatDate(post.published_date)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};

export default HomeUpdated;
