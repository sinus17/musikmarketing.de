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
  Pagination,
} from '@mui/material';
import { supabase } from '../lib/supabase';
import { generateOrganizationSchema, generateWebSiteSchema, generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo';

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

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  videoId: string;
}

const HomeFullGuide = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  useEffect(() => {
    fetchLatestPosts();
    fetchYouTubeVideos();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('musikmarketing_de_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(60);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchYouTubeVideos = async () => {
    try {
      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
      const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

      if (!API_KEY || !CHANNEL_ID) {
        console.error('YouTube API credentials not configured');
        return;
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&type=video`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch YouTube videos');
      }

      const data = await response.json();

      const videoList: YouTubeVideo[] = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        videoId: item.id.videoId,
      }));

      setVideos(videoList);
    } catch (err: any) {
      console.error('Error fetching YouTube videos:', err);
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

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://musikmarketing.de/' }
  ]);

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
        <title>Musikmarketing für Artists 2026: Komplette Strategie | Meta Ads, TikTok & Spotify</title>
        <meta 
          name="description" 
          content="Musikmarketing 2026: Komplette Strategie für Independent Artists. Meta Ads, TikTok Marketing, Spotify Promotion & Fan-CRM. Lerne, wie du mit €500/Monat 10.000+ Hörer erreichst. Inklusive 30-Tage-Plan & bewährten Frameworks. Kostenlos & sofort umsetzbar." 
        />
        <meta name="keywords" content="Musikmarketing 2026, Musikmarketing Deutschland, Meta Ads für Musiker, TikTok Ads Musik, Spotify Marketing, Artist Marketing, Social Media Marketing, Fan-CRM, Musik Promotion" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://musikmarketing.de/" />
        <meta property="og:title" content="Musikmarketing für Artists 2026: Komplette Strategie | Meta Ads & TikTok" />
        <meta property="og:description" content="Musikmarketing 2026: Komplette Strategie für Independent Artists. Meta Ads, TikTok Marketing, Spotify Promotion & Fan-CRM. Lerne, wie du mit €500/Monat 10.000+ Hörer erreichst." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://musikmarketing.de/" />
        <meta property="og:image" content="https://musikmarketing.de/musikmarketing-hero.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Musikmarketing für Artists 2026: Komplette Strategie" />
        <meta name="twitter:description" content="Musikmarketing 2026: Komplette Strategie für Independent Artists. Meta Ads, TikTok Marketing, Spotify Promotion & Fan-CRM. Lerne, wie du mit €500/Monat 10.000+ Hörer erreichst." />
        <meta name="twitter:image" content="https://musikmarketing.de/musikmarketing-hero.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [organizationSchema, websiteSchema, faqSchema, breadcrumbSchema]
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
            Musikmarketing für Artists: Die komplette Strategie 2026
            <br />
            Meta Ads, TikTok & Spotify Marketing für Independent Musicians
          </Typography>
          
          <Typography 
            sx={{ 
              fontSize: { xs: '1rem', md: '1.1rem' },
              mb: 1,
              color: '#ccc',
              lineHeight: 1.6,
            }}
          >
            Professionelles Musikmarketing für Independent Artists. Lerne die bewährten Strategien, um deine Musikkarriere aufzubauen: Social Media Reichweite aufbauen, Spotify Hörer steigern & mehr Tickets verkaufen.
          </Typography>
          
          <Typography 
            sx={{ 
              fontSize: { xs: '0.9rem', md: '1rem' },
              mb: 3,
              color: '#999',
              lineHeight: 1.5,
            }}
          >
            Meta Ads, TikTok Marketing, Spotify Promotion & Fan-CRM Strategien – bewährt mit über €3,5M Werbebudget Erfahrung.
          </Typography>
        </Container>
      </Box>

      {/* ============================================
          YOUTUBE VIDEOS GRID
          ============================================ */}
      {videos.length > 0 && (
        <Box sx={{ pb: 6, background: '#0a0a0a' }}>
          <Container maxWidth="lg">
            <Typography
              sx={{
                fontSize: { xs: '1.8rem', md: '2rem' },
                fontWeight: 700,
                mb: 4,
                color: '#fff',
                textAlign: 'center',
              }}
            >
              Neueste Videos
            </Typography>
            <Grid container spacing={3}>
              {videos.map((video) => (
                <Grid item xs={12} sm={6} md={4} key={video.id}>
                  <Card
                    component="a"
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: '#1a1a1a',
                      border: '2px solid #555',
                      borderRadius: 2,
                      transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                      textDecoration: 'none',
                      display: 'block',
                      height: '100%',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(255,255,255,0.1)',
                        borderColor: '#fff',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        paddingTop: '56.25%',
                        backgroundImage: `url(${video.thumbnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(100%)',
                        transition: 'filter 0.3s',
                        '&:hover': {
                          filter: 'grayscale(0%)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 60,
                          height: 60,
                          bgcolor: 'rgba(255, 0, 0, 0.8)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&:hover': {
                            bgcolor: 'rgba(255, 0, 0, 1)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 0,
                            height: 0,
                            borderLeft: '15px solid white',
                            borderTop: '10px solid transparent',
                            borderBottom: '10px solid transparent',
                            ml: '5px',
                          }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#fff',
                          mb: 1,
                          lineHeight: 1.4,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {video.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          color: '#9e9e9e',
                          mb: 1.5,
                          lineHeight: 1.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {video.description}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          color: '#6e6e6e',
                        }}
                      >
                        {formatDate(video.publishedAt)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

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
              Musikmarketing für Artists ist das <strong>strategische System, um deine Musik den richtigen Menschen zu zeigen</strong> und sie in <strong>zahlende Fans zu verwandeln</strong>. Professionelles Musikmarketing kombiniert Content-Strategien, Paid Advertising und Community-Building. Es ist nicht:
            </Typography>

            <Stack spacing={1} sx={{ pl: 2, mb: 3 }}>
              <Typography sx={{ fontSize: '1em', color: '#bbb' }}>❌ Einfach einen Song auf Spotify hochladen und hoffen</Typography>
              <Typography sx={{ fontSize: '1em', color: '#bbb' }}>❌ Random Posts auf Instagram machen</Typography>
              <Typography sx={{ fontSize: '1em', color: '#bbb' }}>❌ 10.000 Bot-Follower kaufen</Typography>
              <Typography sx={{ fontSize: '1em', color: '#bbb' }}>❌ Geld für Ads verschwenden ohne zu tracken</Typography>
            </Stack>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 2 }}>
              Erfolgreiches Musikmarketing <strong>ist</strong>:
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
              99% der Musikmarketing Guides und Musikmarketing Tipps sagen dir WAS du tun sollst. Sie ignorieren aber das Wichtigste: <strong>Wie du misst, ob dein Musikmarketing funktioniert</strong>.
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
              <strong>Die Lösung:</strong> Du brauchst echte Daten für dein Musikmarketing. Welche Fans zahlen? Welche gehen konzertieren? Welche kaufen Merch? Mit echten Metriken + strategischem Musikmarketing Plan wird deine Strategie 10x effektiver.
            </Typography>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* KAPITEL 2 */}
          <Box id="4-schritt-framework" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              2. Das 4-Schritt Musikmarketing Framework (Bewährt &amp; Messbar)
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 4 }}>
              Erfolgreiches Musikmarketing für Independent Artists folgt einem bewährten System. Die folgenden 4 Schritte des Musikmarketing Frameworks funktionieren für jeden Musiker — vom Anfänger bis zum Chart-Künstler:
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
              3. Musikmarketing Plattformen: Platform Deep-Dives 2026
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 3 }}>
              Nicht alle Plattformen sind gleich für dein Musikmarketing. Hier sind die Top 5 Musikmarketing Plattformen für 2026:
            </Typography>

            {/* TikTok */}
            <Link to="/blog/was-ist-musikmarketing" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ mb: 2.5, background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { borderColor: '#666', boxShadow: '0 8px 16px rgba(200, 200, 200, 0.1)', transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    🔴 TikTok — Musikmarketing mit viralem Potenzial
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
            <Link to="/blog/was-ist-musikmarketing" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ mb: 2.5, background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { borderColor: '#666', boxShadow: '0 8px 16px rgba(200, 200, 200, 0.1)', transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    📷 Instagram — Musikmarketing für Community Building
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
            <Link to="/blog/song-so-review" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ mb: 2.5, background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { borderColor: '#666', boxShadow: '0 8px 16px rgba(200, 200, 200, 0.1)', transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    🎵 Spotify — Musikmarketing für Streaming Erfolg
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 1 }}>
                    <strong>Beste für:</strong> Streams, Algorithmus Support, Revenue
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.7 }}>
                    <strong>Strategie:</strong> Pre-Save Kampagnen, Playlist Pitching, Consistent Releases. <strong>Resultat:</strong> 10.000-100.000 Streams/Release.
                  </Typography>
                </CardContent>
              </Card>
            </Link>

            {/* YouTube */}
            <Link to="/blog/was-ist-musikmarketing" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ mb: 2.5, background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { borderColor: '#666', boxShadow: '0 8px 16px rgba(200, 200, 200, 0.1)', transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    🎥 YouTube — Musikmarketing mit Video Content
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
            <Link to="/blog/was-ist-musikmarketing" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ mb: 3, background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { borderColor: '#666', boxShadow: '0 8px 16px rgba(200, 200, 200, 0.1)', transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    📊 Häufige Musikmarketing Fehler vermeiden
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
            <Link to="/blog/was-ist-musikmarketing" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ mb: 3, background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { borderColor: '#666', boxShadow: '0 8px 16px rgba(200, 200, 200, 0.1)', transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    💰 Musikmarketing Budget & ROI berechnen
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
              {posts
                .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
                .map((post) => (
                <Grid item xs={12} sm={6} md={3} key={post.id}>
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

            {posts.length > postsPerPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination
                  count={Math.ceil(posts.length / postsPerPage)}
                  page={currentPage}
                  onChange={(_, page) => setCurrentPage(page)}
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: '#fff',
                      borderColor: '#555',
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                      bgcolor: '#fff',
                      color: '#000',
                    },
                  }}
                />
              </Box>
            )}
          </Container>
        </Box>
      )}
    </>
  );
};

export default HomeFullGuide;
