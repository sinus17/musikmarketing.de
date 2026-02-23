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
  Divider,
  List,
  ListItem,
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

const HomeFullGuide = () => {
  const [posts, setPosts] = useState<Post[]>([]);

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
        .limit(3);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
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
      answer: 'Musikmarketing ist das System, um deine Musik den richtigen Menschen zu zeigen und sie in zahlende Fans zu verwandeln. Es kombiniert Content-Creation, Community-Building und strategische Werbung.'
    },
    {
      question: 'Wie viel kostet professionelles Musikmarketing?',
      answer: 'Das hängt von deinen Zielen ab. Anfänger: 500-2000€/Monat. Aufstrebende Artists: 2000-5000€/Monat. Chart-Aspiranten: 5000€+/Monat. Wichtig: Du zahlst für Strategie + Umsetzung, nicht nur Hoffnung.'
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
    },
    {
      question: 'Kann ich Musikmarketing kostenlos machen?',
      answer: 'Ja, mit organischen Strategien. Aber es dauert 10x länger. Mit Paid Ads (bereits 500€/Monat) wachst du 10x schneller. Empfehlung: Starte organisch, investiere später in Ads wenn es funktioniert.'
    }
  ]);

  return (
    <>
      <Helmet>
        <title>musikmarketing.de | Tipps & Strategien für Musiker:innen</title>
        <meta 
          name="description" 
          content="Praktische Musik-Marketing Tipps & bewährte Strategien. Organisches Wachstum, Paid Ads, TikTok, Spotify, Instagram. Kostenlos & sofort umsetzbar." 
        />
        <meta name="keywords" content="Musikmarketing, Musikmarketing Deutschland, Musik vermarkten, Musikpromotion, Artist Marketing, Social Media Marketing, Spotify, Instagram Ads, TikTok Marketing" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://musikmarketing.de/" />
        <meta property="og:title" content="musikmarketing.de | Tipps & Strategien für Musiker:innen" />
        <meta property="og:description" content="Praktische Musik-Marketing Tipps & bewährte Strategien. Organisches Wachstum, Paid Ads, TikTok, Spotify, Instagram. Kostenlos & sofort umsetzbar." />
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
          SECTION 1: HERO + H1
          ============================================ */}
      <Box sx={{ 
        background: '#000',
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
              color: '#fff',
            }}
          >
            Musikmarketing in Deutschland 2026
            <br />
            Der komplette Leitfaden
          </Typography>
          
          <Typography 
            sx={{ 
              fontSize: { xs: '1rem', md: '1.1rem' },
              mb: 1,
              color: '#ccc',
              lineHeight: 1.6,
            }}
          >
            Fans aufbauen. Streams messen. Musik vermarkten.
            <br />
            <strong>Vollständig kostenlos. Praktisch umzusetzen. Für jeden Musiker.</strong>
          </Typography>
        </Container>
      </Box>

      {/* ============================================
          TABLE OF CONTENTS
          ============================================ */}
      <Box sx={{ py: 4, background: '#1a1a1a', borderBottom: '1px solid #333' }}>
        <Container maxWidth="md">
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
            Inhaltsverzeichnis
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <List dense>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#was-ist-musikmarketing" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    1. Definition + Kernproblem
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#4-schritt-framework" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    2. Das 4-Schritt-Framework
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#platform-deep-dives-2026" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    3. Platform Deep-Dives 2026
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#traffic-strategien-organic-vs-paid" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    4. Traffic-Strategien
                  </Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <List dense>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#haeufige-fehler" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    5. Häufige Fehler
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#30-tage-action-plan" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    6. 30-Tage Action Plan
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#faq" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    7. FAQ
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#naechster-schritt" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    8. Nächste Schritte
                  </Typography>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ============================================
          MAIN CONTENT CONTAINER
          ============================================ */}
      <Box sx={{ py: { xs: 4, md: 6 }, background: '#0a0a0a' }}>
        <Container maxWidth="md">

          {/* KAPITEL 1 */}
          <Box id="was-ist-musikmarketing" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              1. Was ist Musikmarketing? (Und warum funktionieren Standard-Tipps nicht)
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 2 }}>
              Musikmarketing ist das <strong>System, um deine Musik den richtigen Menschen zu zeigen</strong> und sie in <strong>zahlende Fans zu verwandeln</strong>. Es ist nicht:
            </Typography>

            <Stack spacing={1} sx={{ pl: 2, mb: 3 }}>
              <Typography sx={{ fontSize: '1em', color: '#bbb' }}>❌ Einfach einen Song auf Spotify hochladen und hoffen</Typography>
              <Typography sx={{ fontSize: '1em', color: '#bbb' }}>❌ Random Posts auf Instagram machen</Typography>
              <Typography sx={{ fontSize: '1em', color: '#bbb' }}>❌ 10.000 Bot-Follower kaufen</Typography>
              <Typography sx={{ fontSize: '1em', color: '#bbb' }}>❌ Geld für Ads verschwenden ohne zu tracken</Typography>
            </Stack>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 2 }}>
              Musikmarketing <strong>ist</strong>:
            </Typography>

            <Stack spacing={1} sx={{ pl: 2, mb: 3 }}>
              <Typography sx={{ fontSize: '1em', color: '#bbb' }}>✅ Eine strategische Abfolge (Framework)</Typography>
              <Typography sx={{ fontSize: '1em', color: '#bbb' }}>✅ Basierend auf echten Daten (nicht Hoffnungen)</Typography>
              <Typography sx={{ fontSize: '1em', color: '#bbb' }}>✅ Messbar &amp; optimierbar</Typography>
              <Typography sx={{ fontSize: '1em', color: '#bbb' }}>✅ Funktioniert für jeden Musiker (Anfänger bis Charts)</Typography>
            </Stack>

            <Divider sx={{ my: 3, borderColor: '#333' }} />

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Das Kernproblem: Vague Metrics statt echte Conversion
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 2 }}>
              99% der Musikmarketing Guides sagen dir WAS du tun sollst. Sie ignorieren aber das Wichtigste: <strong>Wie du misst, ob es funktioniert</strong>.
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #555', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  Beispiele unbrauchbarer Metriken:
                </Typography>

                <Stack spacing={1.5}>
                  <Box>
                    <Typography sx={{ fontSize: '1em', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Streams
                    </Typography>
                    <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.6 }}>
                      Dein Song wurde 100.000x gestreamt. Klingt cool. Kostet dich aber 0,003€ pro Stream = 300€ Einnahmen. Ein echter Fan gibt dir 100€+ aus. <strong>100 Streams ≠ 1 Fan.</strong>
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: '1em', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Followers
                    </Typography>
                    <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.6 }}>
                      Du hast 50.000 Instagram-Follower. Aber wie viele kommen zu deinen Konzerten? Wie viele kaufen dein Merch? <strong>Followers ≠ Umsatz.</strong>
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: '1em', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Ad Spend
                    </Typography>
                    <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.6 }}>
                      Du gibst 1000€ für Meta Ads aus. Weißt aber nicht, wie viele echte Fans entstehen. <strong>Budget ≠ Ergebnis.</strong>
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8 }}>
              <strong>Die Lösung:</strong> Du brauchst echte Daten. Welche Fans zahlen? Welche gehen konzertieren? Welche kaufen Merch? Mit echten Metriken + strategischem Denken wird dein Musikmarketing 10x effektiver.
            </Typography>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* KAPITEL 2 */}
          <Box id="4-schritt-framework" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              2. Das 4-Schritt-Framework (Bewährt &amp; Messbar)
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 4 }}>
              Erfolgreiches Musikmarketing folgt einem bewährten System. Die folgenden 4 Schritte funktionieren für jeden Musiker — vom Anfänger bis zum Chart-Künstler:
            </Typography>

            {/* Step 1 */}
            <Card sx={{ border: '1px solid #444', borderLeft: '5px solid #888', mb: 2.5, background: '#1a1a1a' }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                  Schritt 1: AUFMERKSAMKEIT — Content-Marketing
                </Typography>
                <Typography sx={{ fontSize: '1em', color: '#ccc', lineHeight: 1.8, mb: 1 }}>
                  <strong>Das Fundament.</strong> Ohne Content keine Aufmerksamkeit. Mit dem richtigen Content erreichen deine Inhalte die richtigen Menschen — auf TikTok, Instagram, YouTube oder deinem Blog.
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.6 }}>
                  Beispiele: TikTok Videos, Instagram Reels, YouTube Tutorials, Blog-Artikel. Der Schlüssel: Content muss Entertainment, Education oder Inspiration sein — nicht nur Musik-Promotion.
                </Typography>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card sx={{ border: '1px solid #444', borderLeft: '5px solid #888', mb: 2.5, background: '#1a1a1a' }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                  Schritt 2: BEGEISTERUNG — Engagement Messen
                </Typography>
                <Typography sx={{ fontSize: '1em', color: '#ccc', lineHeight: 1.8, mb: 1 }}>
                  <strong>Nicht alle Zuschauer sind gleich.</strong> Aus deinen Followers entstehen echte Fans — wenn du die Richtigen identifizierst und ansprichst.
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.6 }}>
                  Engagement Funnel: Likes/Views (schwach) → Follows/Subscribers (mittel) → Email-Abos/Discord Members (stark). Mit guten Daten weißt du, wer echtes Interesse hat.
                </Typography>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card sx={{ border: '1px solid #444', borderLeft: '5px solid #888', mb: 2.5, background: '#1a1a1a' }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                  Schritt 3: VERBINDUNG — Fan-Beziehungen Aufbauen
                </Typography>
                <Typography sx={{ fontSize: '1em', color: '#ccc', lineHeight: 1.8, mb: 1 }}>
                  <strong>Deine Superfans sind wertvoll.</strong> Mit direkter Kommunikation baust du eine Community auf, die deine Musik liebt — und dafür bezahlt.
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.6 }}>
                  Tools: Email Newsletter, Discord Server, WhatsApp/Telegram für echte Fans. Der Reciprocity Principle: Du gibst zuerst (kostenlos), dann fragen deine Fans nach Merch/Tickets.
                </Typography>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card sx={{ border: '1px solid #444', borderLeft: '5px solid #888', mb: 3, background: '#1a1a1a' }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                  Schritt 4: MEHRWERT — Monetisierung
                </Typography>
                <Typography sx={{ fontSize: '1em', color: '#ccc', lineHeight: 1.8, mb: 1 }}>
                  <strong>Musik ist kostenlos geworden.</strong> Aber Exklusivität ist wertvoll. Merch, Konzerte, Fan-Clubs, Exclusive Releases — damit verdienst du wirklich mit deiner Musik.
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.6 }}>
                  Die Kunst: Mit Daten wissen, welche Fan-Gruppe welches Produkt kauft. So maximierst du deinen Umsatz.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* KAPITEL 3 */}
          <Box id="platform-deep-dives-2026" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              3. Platform Deep-Dives 2026
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 3 }}>
              Nicht alle Plattformen sind gleich. Hier sind die Top 5 für Musikmarketing 2026:
            </Typography>

            {/* TikTok */}
            <Link to="/blog/tiktok-musikmarketing-guide" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ mb: 2.5, background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { borderColor: '#666', boxShadow: '0 8px 16px rgba(200, 200, 200, 0.1)', transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    🔴 TikTok — Das virale Potenzial
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 1 }}>
                    <strong>Beste für:</strong> Schnelles Wachstum, virales Potenzial, Neue Listener Discovery
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.7 }}>
                    <strong>Strategie:</strong> 3-5 Posts pro Woche, Trending Audio nutzen, TikTok Ads ab 200€/Monat. <strong>Resultat:</strong> 1000-10.000 neue Listener/Monat (mit Konsistenz).
                  </Typography>
                </CardContent>
              </Card>
            </Link>

            {/* Instagram */}
            <Link to="/blog/instagram-reels-musik-strategie" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ mb: 2.5, background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { borderColor: '#666', boxShadow: '0 8px 16px rgba(200, 200, 200, 0.1)', transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    📷 Instagram — Community Building
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 1 }}>
                    <strong>Beste für:</strong> Community-Aufbau, Direct Engagement, Merchandise Verkauf
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.7 }}>
                    <strong>Strategie:</strong> 4 Reels/Woche, Stories täglich, Carousel Posts. <strong>Resultat:</strong> 50-500 neue Follower/Monat + direkte Verkäufe.
                  </Typography>
                </CardContent>
              </Card>
            </Link>

            {/* Spotify */}
            <Link to="/blog/spotify-marketing-streams" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ mb: 2.5, background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { borderColor: '#666', boxShadow: '0 8px 16px rgba(200, 200, 200, 0.1)', transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    🎵 Spotify — Streaming Dominanz
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 1 }}>
                    <strong>Beste für:</strong> Streams, Algorithmus Support, Revenue
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.7 }}>
                    <strong>Strategie:</strong> Pre-Save Kampagnen, Playlist Pitching, Consistent Releases (1x alle 4-6 Wochen). <strong>Resultat:</strong> 10.000-100.000 Streams/Release.
                  </Typography>
                </CardContent>
              </Card>
            </Link>

            {/* YouTube */}
            <Link to="/blog/youtube-shorts-musikmarketing" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ mb: 2.5, background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { borderColor: '#666', boxShadow: '0 8px 16px rgba(200, 200, 200, 0.1)', transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    🎥 YouTube — Long-Form Content
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 1 }}>
                    <strong>Beste für:</strong> Monetisierung, Evergreen Content, Tutorials
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.7 }}>
                    <strong>Strategie:</strong> Music Videos, Production Vlogs, 1-2 Videos/Woche. <strong>Resultat:</strong> 500-5000 Subscribers + Monetisierung.
                  </Typography>
                </CardContent>
              </Card>
            </Link>

            {/* Fehler vermeiden */}
            <Link to="/blog/musikmarketing-fehler-vermeiden" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ mb: 3, background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { borderColor: '#666', boxShadow: '0 8px 16px rgba(200, 200, 200, 0.1)', transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    📊 Häufige Fehler vermeiden
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 1 }}>
                    <strong>Beste für:</strong> Realistische Erwartungen, häufige Anfängerfehler verstehen
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.7 }}>
                    <strong>Inhalte:</strong> Die 5 größten Fehler, Lösungen, Best Practices. <strong>Resultat:</strong> Vermeide teure Fehler und lerne von Anfang an richtig.
                  </Typography>
                </CardContent>
              </Card>
            </Link>

            {/* Budget & ROI */}
            <Link to="/blog/musikmarketing-budget-roi" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ mb: 3, background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { borderColor: '#666', boxShadow: '0 8px 16px rgba(200, 200, 200, 0.1)', transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    💰 Budget & ROI berechnen
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 1 }}>
                    <strong>Beste für:</strong> Budgetplanung, ROI Berechnung, Kostenoptimierung
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.7 }}>
                    <strong>Strategie:</strong> Realistisches Budget für Anfänger, mittlere Künstler, Profis. <strong>Resultat:</strong> Weiß, wie viel zu investieren und welche Ergebnisse zu erwarten sind.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* KAPITEL 4 */}
          <Box id="traffic-strategien-organic-vs-paid" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              4. Traffic-Strategien 2026: Organic vs. Paid
            </Typography>

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Organic (Kostenlos, aber langsam)
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 2 }}>
                  <strong>Realistische Erwartungen:</strong>
                </Typography>
                <Stack spacing={0.5} sx={{ pl: 1 }}>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>Monat 1-2: 50-200 neue Follower</Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>Monat 3-6: 200-1000 neue Follower</Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>Monat 6-12: 1000-5000 neue Follower (mit Konsistenz)</Typography>
                </Stack>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mt: 2, mb: 2 }}>
                  <strong>Strategie:</strong> 3-5 Posts/Woche, Trending nutzen, täglich interagieren, Discord Community aufbauen.
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7 }}>
                  <strong>Aufwand:</strong> 5-10 Stunden pro Woche
                </Typography>
              </CardContent>
            </Card>

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Paid Ads (Geld, aber schnell)
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 2 }}>
                  <strong>Realistische Erwartungen:</strong>
                </Typography>
                <Stack spacing={0.5} sx={{ pl: 1 }}>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>500€/Monat: 500-2000 neue Listener/Monat</Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>2000€/Monat: 3000-10.000 neue Listener/Monat</Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>5000€/Monat: 10.000-30.000 neue Listener/Monat (mit Optimization)</Typography>
                </Stack>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mt: 2 }}>
                  <strong>Best Practice:</strong> Meta Ads (Zielgruppe nach Genre), TikTok Ads (junge Audiences), Spotify Ads (Genre-Fans), YouTube Ads (Music Video Watchers).
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  Die Hybrid-Strategie (EMPFOHLEN)
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7 }}>
                  <strong>Monat 1-3:</strong> 100% Organic (teste Content)
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7 }}>
                  <strong>Monat 4+:</strong> 70% Organic + 30% Paid (Ads für besten Organic Content)
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7 }}>
                  <strong>Resultat:</strong> Du findest organisch, was funktioniert + beschleunigst mit Ads.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* KAPITEL 5 */}
          <Box id="haeufige-fehler" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              5. Häufige Fehler (Und wie du sie vermeidest)
            </Typography>

            <Stack spacing={2}>
              <Card sx={{ background: '#1a1a1a', borderLeft: '5px solid #666' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#ccc', mb: 1 }}>
                    ❌ Fehler 1: Ohne Strategie starten
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.7 }}>
                    Du machst Content, schreibst Posts, hoffst auf Erfolg. Resultat: Zufallsergebnisse statt System. <strong>Lösung:</strong> Nutze das 4-Schritt-Framework.
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ background: '#1a1a1a', borderLeft: '5px solid #666' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#ccc', mb: 1 }}>
                    ❌ Fehler 2: Keine Daten tracken
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.7 }}>
                    Du gibst Budget aus, weißt aber nicht, welcher Content funktioniert. <strong>Lösung:</strong> Nutze Analytics (Instagram Insights, Spotify for Artists, YouTube Analytics).
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ background: '#1a1a1a', borderLeft: '5px solid #666' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#ccc', mb: 1 }}>
                    ❌ Fehler 3: Die falsche Platform wählen
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.7 }}>
                    Du postest auf Facebook, aber deine Fans sind auf TikTok. Verschwendete Energie. <strong>Lösung:</strong> Teste alle, optimiere auf die 1-2 besten.
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ background: '#1a1a1a', borderLeft: '5px solid #666' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#ccc', mb: 1 }}>
                    ❌ Fehler 4: Zu wenig Budget
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.7 }}>
                    Du versuchst organisch zu wachsen, während andere in Ads investieren. <strong>Lösung:</strong> Start organisch, ab Monat 4 minimal 500€/Monat in Ads.
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ background: '#1a1a1a', borderLeft: '5px solid #666' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#ccc', mb: 1 }}>
                    ❌ Fehler 5: Nur Streams zählen
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.7 }}>
                    100K Streams klingt cool, aber 1 zahlender Fan verdient 100x mehr. <strong>Lösung:</strong> Nutze echte Konversions-Metriken, nicht nur Streams.
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* KAPITEL 6 */}
          <Box id="30-tage-action-plan" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              6. 30-Tage Action Plan
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 3 }}>
              Dein realistischer Wochenplan zum Starten:
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '1px solid #444', mb: 2.5 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  Woche 1: Setup &amp; Foundation
                </Typography>
                <Stack spacing={1} sx={{ pl: 1 }}>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>[ ] Installiere song.so (optional, aber empfohlen)</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>[ ] Erstelle Discord Server</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>[ ] Schreibe deine Artist Bio (2-3 Sätze)</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>[ ] Wähle deine Top 2 Plattformen (TikTok + Instagram empfohlen)</Typography>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ background: '#1a1a1a', border: '1px solid #444', mb: 2.5 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  Woche 2-3: Content Production
                </Typography>
                <Stack spacing={1} sx={{ pl: 1 }}>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>[ ] Poste 3-5x pro Woche auf TikTok</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>[ ] Poste 1-2 Reels + Stories täglich auf Instagram</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>[ ] Interagiere täglich mit anderen Artists (5-10 Comments/DMs)</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>[ ] Check Analytics (welcher Content konvertiert)</Typography>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ background: '#1a1a1a', border: '1px solid #444', mb: 2.5 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  Woche 4: Paid Ads (Optional, aber empfohlen)
                </Typography>
                <Stack spacing={1} sx={{ pl: 1 }}>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>[ ] Erstelle erste Meta Ad (basierend auf best-performing Content)</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>[ ] Budget: 100-300€ zum Testen</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>[ ] Monitore Daten täglich</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>[ ] Nächsten Monat: Optimiere basierend auf Daten</Typography>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #666' }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  Nach 30 Tagen erwartete Ergebnisse
                </Typography>
                <Stack spacing={0.5} sx={{ pl: 1 }}>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc' }}>200-500 neue Follower (organisch)</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc' }}>1000-5000 neue Listener (mit paid ads)</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc' }}>Daten zum Optimieren für nächsten Monat</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc' }}>Foundation für skalierendes Wachstum</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* KAPITEL 7 */}
          <Box id="faq" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 4, color: '#fff' }}>
              7. FAQ
            </Typography>

            <Stack spacing={2}>
              {[
                { q: 'Reicht organic ohne Ads?', a: 'Ja, aber es dauert 10x länger. Mit 1-2 Stunden Content/Tag brauchst du 12+ Monate. Mit 500€/Monat Ads: 3-6 Monate. Empfehlung: Starte organisch, investiere ab Monat 4.' },
                { q: 'Welche Plattform ist am wichtigsten?', a: 'Es kommt auf dein Genre an. Top 3: TikTok (Discovery), Instagram (Community), Spotify (Streams). Fokussiere auf 1-2, nicht alles gleichzeitig.' },
                { q: 'Wie lange bis ich Ergebnisse sehe?', a: '30 Tage erste Erfolge, 3 Monate solides Wachstum, 6 Monate echter Durchbruch. Geduld + Konsistenz = Key.' },
                { q: 'Kann ich das alleine schaffen?', a: 'Ja! Mit 5-10 Stunden/Woche kannst du diesen Plan umsetzen. Wenn weniger Zeit: Investiere in Ads (Zeit → Budget).' },
                { q: 'Wie messe ich meinen Erfolg?', a: 'Nutze Platform Analytics (Instagram Insights, YouTube Analytics, Spotify for Artists). Tracke monatlich: Follower-Wachstum, Engagement Rate, Conversions.' },
                { q: 'Was ist die eine Sache, die ich JETZT machen sollte?', a: 'Wähle deine Top 2 Plattformen aus und poste MORGEN deinen ersten Content. Action über Planung. Start klein, iterate oft.' }
              ].map((item, idx) => (
                <Card key={idx} sx={{ background: '#1a1a1a', border: '1px solid #333' }}>
                  <CardContent>
                    <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                      F: {item.q}
                    </Typography>
                    <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.8 }}>
                      <strong>A:</strong> {item.a}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* KAPITEL 8 */}
          <Box id="naechster-schritt" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              8. Dein nächster Schritt
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #555', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 2 }}>
                  Du hast jetzt das komplette System. Nicht Theorie — Praxis. Nicht Hoffnung — Framework.
                </Typography>

                <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  Dein nächster Schritt:
                </Typography>

                <Stack spacing={1} sx={{ pl: 2 }}>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>1. Wähle deine Top 2 Plattformen</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>2. Starte 30-Tage Action Plan (Woche 1 = Setup)</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>3. Poste MORGEN deinen ersten Content</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>4. Tracke Daten wöchentlich</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>5. Optimiere basierend auf Ergebnissen</Typography>
                </Stack>

                <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mt: 3 }}>
                  <strong>Das Wichtigste:</strong> Action schlägt Perfektion. Starte JETZT, nicht wenn du "bereit" bist.
                </Typography>
              </CardContent>
            </Card>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 2 }}>
              <strong>Zusätzliche Ressourcen:</strong>
            </Typography>

            <Stack spacing={1} sx={{ pl: 2 }}>
              <Typography sx={{ fontSize: '0.95em', color: '#999' }}>
                → Schaue dir unsere spezifischen Platform-Guides an (TikTok, Instagram, Spotify)
              </Typography>
              <Typography sx={{ fontSize: '0.95em', color: '#999' }}>
                → Tools wie Conversion Tracking helfen, dein Marketing zu messen (optional, aber empfohlen)
              </Typography>
              <Typography sx={{ fontSize: '0.95em', color: '#999' }}>
                → Community Discord für Support + Exchange mit anderen Artists
              </Typography>
            </Stack>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* FINAL SECTION */}
          <Box sx={{ textAlign: 'center', py: 4, background: '#1a1a1a', border: '2px solid #333', borderRadius: 2, px: 3 }}>
            <Typography sx={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', mb: 2 }}>
              Bereit, dein Musikmarketing zu revolutionieren?
            </Typography>

            <Typography sx={{ fontSize: '1em', color: '#ccc', lineHeight: 1.8, mb: 3 }}>
              Du hast den kompletten Guide. Jetzt brauchst du nur noch Action.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
              <Button 
                variant="contained"
                sx={{
                  background: '#fff',
                  color: '#000',
                  px: 4,
                  py: 1.8,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': { background: '#e0e0e0' },
                }}
              >
                Starte deinen 30-Tage Plan
              </Button>
              
              <Button 
                variant="outlined"
                sx={{
                  color: '#fff',
                  borderColor: '#555',
                  px: 4,
                  py: 1.8,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': { background: '#333' },
                }}
              >
                Tritt unserer Community bei
              </Button>
            </Stack>

            <Typography sx={{ fontSize: '0.9em', color: '#666', mt: 3 }}>
              Kostenlos. Praktisch. Für jeden Musiker.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ============================================
          LATEST BLOG POSTS (OPTIONAL)
          ============================================ */}
      {posts.length > 0 && (
        <Box sx={{ py: { xs: 4, md: 6 }, background: '#0a0a0a', borderTop: '1px solid #333' }}>
          <Container maxWidth="lg">
            <Typography 
              component="h2" 
              sx={{ 
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                fontWeight: 700,
                mb: 4,
                color: '#fff',
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
                      background: '#1a1a1a',
                      border: '2px solid #555',
                      transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(255,255,255,0.1)',
                        borderColor: '#fff',
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
                      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 1, color: '#fff' }}>
                        {post.title}
                      </Typography>
                      <Typography sx={{ color: '#999', fontSize: '0.9rem', mb: 1.5 }}>
                        {post.excerpt}
                      </Typography>
                      <Typography sx={{ color: '#666', fontSize: '0.85rem' }}>
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

export default HomeFullGuide;
