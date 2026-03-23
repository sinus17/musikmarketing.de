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
                    href="#10k-musikmarketing-plan" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    2. Der 10.000€ Plan
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#release-strategie-6-wochen" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    3. Release-Strategie (6-Wochen)
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#meta-ads-strategie-detail" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    4. Meta Ads Strategie
                  </Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <List dense>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#1-prozent-regel" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    5. Die 1% Follower-Regel
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#algorithmus-hacking-spotify" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    6. Algorithmus-Hacking
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#musikmarketing-budget" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    7. Budget & ROI
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#faq" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    8. FAQ
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography 
                    component="a" 
                    href="#naechster-schritt" 
                    sx={{ fontSize: '0.95em', color: '#bbb', textDecoration: 'none', '&:hover': { color: '#fff' }, cursor: 'pointer' }}
                  >
                    9. Nächste Schritte
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

            <Divider sx={{ my: 3, borderColor: '#333' }} />

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Die Psychologie: Musik als Produkt behandeln
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 2 }}>
                  Viele Artists scheitern, weil sie Marketing als notwendiges Übel betrachten. Doch Marketing ist nichts anderes als das Erzählen einer Geschichte, die Menschen dazu bewegt, zuzuhören.
                </Typography>
                
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                  Die Parallele zwischen Produktion und Vermarktung
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.7, mb: 2 }}>
                  Ein Song durchläuft Phasen: Songwriting, Recording, Mixing, Mastering. Marketing sollte exakt denselben Stellenwert einnehmen. Wenn du 40 Stunden in die Produktion investierst, aber nur 2 Stunden in die Vermarktung, ist das Verhältnis gestört.
                </Typography>
                
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                  Den "Unique Style" in der Nische finden
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.7 }}>
                  In der Nische liegt die Macht. Wer versucht, "alle" zu erreichen, erreicht niemanden. Das Ziel des Budgets ist es, die Menschen zu finden, deren Identität mit deiner Musik korreliert.
                </Typography>
              </CardContent>
            </Card>
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
                <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.6, mb: 1 }}>
                  Beispiele: TikTok Videos, Instagram Reels, YouTube Tutorials, Blog-Artikel. Der Schlüssel: Content muss Entertainment, Education oder Inspiration sein — nicht nur Musik-Promotion.
                </Typography>
                <Typography sx={{ fontSize: '0.9em', fontWeight: 700, color: '#4caf50', mt: 1 }}>
                  KPIs: Views, Profilbesuche, Scroll-Stopp-Rate
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
                <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.6, mb: 1 }}>
                  Engagement Funnel: Likes/Views (schwach) → Follows/Subscribers (mittel) → Email-Abos/Discord Members (stark). Mit guten Daten weißt du, wer echtes Interesse hat.
                </Typography>
                <Typography sx={{ fontSize: '0.9em', fontWeight: 700, color: '#4caf50', mt: 1 }}>
                  Werkzeuge: Spotify Canvas, YouTube-Musikvideos, Teaser
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
                <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.6, mb: 1 }}>
                  Tools: Email Newsletter, Discord Server, WhatsApp/Telegram für echte Fans. Der Reciprocity Principle: Du gibst zuerst (kostenlos), dann fragen deine Fans nach Merch/Tickets.
                </Typography>
                <Typography sx={{ fontSize: '0.9em', fontWeight: 700, color: '#4caf50', mt: 1 }}>
                  KPIs: E-Mail Open Rate, Discord Engagement, Community Retention
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
                <Typography sx={{ fontSize: '0.95em', color: '#999', lineHeight: 1.6, mb: 1 }}>
                  Die Kunst: Mit Daten wissen, welche Fan-Gruppe welches Produkt kauft. So maximierst du deinen Umsatz.
                </Typography>
                <Typography sx={{ fontSize: '0.9em', fontWeight: 700, color: '#4caf50', mt: 1 }}>
                  KPIs: Customer Lifetime Value, Conversion Rate, ROI pro Fan
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

          {/* NEW SECTION: Der 10.000€ Musikmarketing Plan */}
          <Box id="10k-musikmarketing-plan" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              Der 10.000€ Musikmarketing Plan (Komplette Jahresstrategie)
            </Typography>

            <Box sx={{ mb: 4, position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#000', borderRadius: '8px' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                src="https://www.youtube.com/embed/Qwb08LqxoRI"
                title="Der 10.000€ Musikmarketing Plan"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 3 }}>
              So würdest du 10.000€ Budget strategisch über 12 Monate verteilen, um maximale Ergebnisse zu erzielen:
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #4caf50', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#4caf50', mb: 2 }}>
                  Budget-Aufteilung für 12 Monate
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                      6.500€ für Release-Kampagnen (10 Singles)
                    </Typography>
                    <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.7 }}>
                      <strong>650€ pro Single:</strong> 20€/Tag für 30 Tage Meta Ads auf Spotify. Damit holst du den Algorithmus optimal ab und generierst 10.000-50.000 Streams pro Release.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                      2.500€ für Follower Growth (365 Tage)
                    </Typography>
                    <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.7 }}>
                      <strong>~7€/Tag:</strong> Kontinuierliche Instagram Follower-Kampagne. Mit der richtigen Strategie gewinnst du qualifizierte Follower für 20-30 Cent.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                      1.000€ Reserve
                    </Typography>
                    <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.7 }}>
                      Für besonders gut performende Songs oder unerwartete Chancen (viraler Moment, Playlist-Platzierung).
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Der Jahresplan im Detail
            </Typography>

            <Stack spacing={2}>
              <Card sx={{ background: '#1a1a1a', border: '1px solid #444' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    📅 10 Singles im 6-Wochen-Rhythmus
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.7 }}>
                    Alle 6 Wochen ein neuer Release. Konsistenz ist wichtiger als Perfektion. Der Algorithmus belohnt regelmäßige Veröffentlichungen.
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ background: '#1a1a1a', border: '1px solid #444' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    🎨 2 Merch Drops (nach 1.000 E-Mail Subscribern)
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.7 }}>
                    Print-on-Demand Drops mit 4-Tage-Zeitfenster. Null Risiko, nur produzieren was verkauft wird. Erwartung: 50-100 Bestellungen pro Drop.
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ background: '#1a1a1a', border: '1px solid #444' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    💿 1 Vinyl Release (am Ende des Jahres)
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.7 }}>
                    Alle 10 Songs auf Vinyl. Verkaufspreis: 35€. Kombiniere mit Ticket-Bundle für erste Show.
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ background: '#1a1a1a', border: '1px solid #444' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                    🎤 1 Release Show (Vinyl + Ticket Bundle)
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb', lineHeight: 1.7 }}>
                    Bundle-Angebot: Vinyl (35€) + Ticket (15€) = 40€. 50% kaufen Bundle, 30% nur Vinyl, 20% nur Ticket. Erwartung: 100-200 Tickets.
                  </Typography>
                </CardContent>
              </Card>
            </Stack>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #666', mt: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  💡 Erwartete Ergebnisse nach 12 Monaten
                </Typography>
                <Stack spacing={0.5} sx={{ pl: 2 }}>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc' }}>✓ 100.000-500.000 Spotify Streams (gesamt)</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc' }}>✓ 5.000-15.000 Instagram Follower</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc' }}>✓ 1.000-2.000 E-Mail Abonnenten</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc' }}>✓ 100-200 Merch/Vinyl Verkäufe</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc' }}>✓ 100-200 verkaufte Show-Tickets</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc', fontWeight: 700, mt: 1 }}>✓ ROI: Budget refinanziert sich in 12-24 Monaten</Typography>
                </Stack>
              </CardContent>
            </Card>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mt: 3 }}>
              Mehr Details zum kompletten System findest du in unserem <Link to="/blog/musikmarketing-ultimate-guide" style={{ color: '#4caf50', textDecoration: 'none', fontWeight: 700 }}>Musikmarketing Ultimate Guide</Link>.
            </Typography>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* NEW SECTION: Release Strategie (6-Wochen-System) */}
          <Box id="release-strategie-6-wochen" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              Die perfekte Release-Strategie: Das 6-Wochen-System
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 3 }}>
              <strong>Konsistenz schlägt Perfektion.</strong> Hier ist das bewährte System für kontinuierliche Releases:
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  Der 6-Wochen-Zyklus
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Woche 1-2: Produktion & Vorbereitung
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>Nächsten Song produzieren, mixen, mastern</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Woche 3-4: Content Creation
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>20+ Videos für den Release erstellen (Mix aus Cinematic & Native)</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Woche 5: Pre-Release Phase (11 Tage vorher)
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>Montag starten, täglich 1 Video posten (organisch, kein Budget)</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Woche 6: Release Week + Kampagne
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>Freitag: Song live + Meta Ads starten (20€/Tag für 30 Tage)</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Die 70/30 Content-Regel
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 2 }}>
                  <strong>Ich brauche auf beiden Seiten eine hohe Qualität</strong> – sowohl bei der Musik als auch beim Marketing. Hier die optimale Content-Verteilung:
                </Typography>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      70% Musik-Content
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>Song-Snippets, Behind-the-Scenes vom Studio, Lyrics, Performance-Clips, Mini-Musikvideos</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      30% Branding-Content
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>Lifestyle, Persönlichkeit, Werte, Off-Topic Content – zeige wer du als Person bist</Typography>
                  </Box>
                </Stack>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mt: 2, fontStyle: 'italic' }}>
                  "Menschen folgen Menschen, nicht nur Musik. Deine Fans wollen dich als Person kennenlernen."
                </Typography>
              </CardContent>
            </Card>

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Wichtig: Am Releasetag startet die Kampagne
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #f44336', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7 }}>
                  <strong>Keine Pre-Save Kampagnen!</strong> Gib kein Geld vor dem Release aus. Die gesamte Pre-Release Phase (11 Tage) läuft organisch. Erst am Freitag, wenn der Song live ist, startest du die Meta Ads Kampagne.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* NEW SECTION: Meta Ads Strategie */}
          <Box id="meta-ads-strategie-detail" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              Meta Ads für Musik: Die exakte Strategie (650€ pro Song)
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 3 }}>
              Meta Ads (Facebook & Instagram) sind 2026 das mächtigste Tool für Musikpromotion. Hier die bewährte Strategie:
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #4caf50', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#4caf50', mb: 2 }}>
                  Das Genre Stack Setup
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 2 }}>
                  Erstelle 3 Ad Sets mit unterschiedlichem Targeting:
                </Typography>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Ad Set 1: Genre Stack
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>Genre 1 + Genre 2 + Spotify Interest (z.B. Hip Hop + Rap + Spotify)</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Ad Set 2: Alternative Genre Stack
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>Genre 3 + Genre 4 + Spotify Interest (z.B. R&B + Pop + Spotify)</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Ad Set 3: Broad Targeting
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>Nur Spotify Interest, kein Genre-Targeting</Typography>
                  </Box>
                </Stack>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mt: 2 }}>
                  <strong>Test-Phase:</strong> Alle 3 Ad Sets für 24 Stunden mit je 20€ testen. Dann die schlechter performenden abschalten und nur mit dem Winning Ad Set weiterlaufen (20€/Tag).
                </Typography>
              </CardContent>
            </Card>

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Warum Creatives wichtiger sind als Targeting
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #ff9800', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#ff9800', mb: 2 }}>
                  "Tracking und Creative Diversity sind viel wichtiger als Targeting."
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 2 }}>
                  Der Creative macht 80% des Erfolgs aus, das Targeting nur 20%. Warum?
                </Typography>
                <Stack spacing={1} sx={{ pl: 2 }}>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>✓ Meta's Algorithmus findet automatisch die richtige Audience</Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>✓ Broad Targeting funktioniert oft besser als enges Targeting</Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>✓ Ein guter Creative überzeugt auch außerhalb deiner Zielgruppe</Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>✓ Creative Fatigue ist der Hauptgrund für steigende Kosten</Typography>
                </Stack>
              </CardContent>
            </Card>

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Creative Testing: 10-20 Videos pro Kampagne
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 2 }}>
                  Packe 10-20 verschiedene Videos in dein Winning Ad Set:
                </Typography>
                <Stack spacing={1} sx={{ pl: 2 }}>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• 10 Cinematic Videos (hochwertig, szenisch)</Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• 10 Native Videos (Handy, authentisch)</Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• Verschiedene Hooks und Intros</Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• Unterschiedliche Vibes und Stimmungen</Typography>
                </Stack>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mt: 2 }}>
                  <strong>Frequency Management:</strong> Sobald eine Ad über 1,5 Frequency kommt, steigen deine Kosten. Füge kontinuierlich neue Videos hinzu.
                </Typography>
              </CardContent>
            </Card>

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Frequency-Cap: Die Magie des 1.5-Werts
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #f44336', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 2 }}>
                  <strong>Frequency-Cap ist entscheidend:</strong> Wir wollen nicht, dass eine Person dieselbe Ad 20 Mal sieht. Ein Frequency-Wert von ca. 1.5 sorgt für maximale Reichweite bei minimalem "Ad-Fatigue".
                </Typography>
                <Stack spacing={1} sx={{ pl: 2 }}>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>
                    ✓ Frequency unter 1.5: Optimal, niedrige Kosten
                  </Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>
                    ⚠️ Frequency 1.5-2.5: Akzeptabel, Kosten steigen leicht
                  </Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>
                    ❌ Frequency über 2.5: Ad-Fatigue, Kosten explodieren
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mt: 2, fontStyle: 'italic' }}>
                  Lösung: Kontinuierlich neue Creatives hinzufügen, auch wenn sie organisch nicht perfekt performen.
                </Typography>
              </CardContent>
            </Card>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8 }}>
              Detaillierte Anleitung findest du hier: <Link to="/blog/die-beste-meta-ads-strategie-fuer-spotify-musik-ads-2026" style={{ color: '#4caf50', textDecoration: 'none', fontWeight: 700 }}>Meta Ads Strategie für Spotify</Link>
            </Typography>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* NEW SECTION: Die 1% Follower Conversion Regel */}
          <Box id="1-prozent-regel" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              Die 1% Regel: Instagram Follower für 20-30 Cent
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 3 }}>
              Parallel zu deinen Release-Kampagnen solltest du kontinuierlich Follower aufbauen. Mit der richtigen Strategie gewinnst du qualifizierte Instagram Follower für 20-30 Cent.
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #4caf50', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#4caf50', mb: 2 }}>
                  Die 1% Conversion Regel
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 2 }}>
                  Damit die Follower-Kampagne funktioniert, braucht dein Content eine <strong>1% Conversion Rate von Reach zu Followern</strong>.
                </Typography>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Beispiel ✅
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>10.000 Reach → 100 neue Follower = 1% Conversion</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Zu niedrig ❌
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>10.000 Reach → 50 neue Follower = 0,5% Conversion</Typography>
                  </Box>
                </Stack>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mt: 2, fontStyle: 'italic' }}>
                  <strong>Wichtig:</strong> Schau auf Reach (erreichte Konten), nicht auf Views. Views können durch mehrfaches Anschauen höher sein.
                </Typography>
              </CardContent>
            </Card>

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Setup für Follower-Kampagne
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 3 }}>
              <CardContent>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Budget
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>5-10€ pro Tag (kontinuierlich)</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Objective
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>Engagement oder Reach (nicht Follower!)</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Creative
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>Storytelling Carousel Posts oder virale Reels</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Targeting
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>Hometown, Region oder Land (je nach Größe)</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Welcher Content funktioniert?
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 2 }}>
                  Storytelling Carousel Posts mit:
                </Typography>
                <Stack spacing={1} sx={{ pl: 2 }}>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>✓ Persönlicher Journey ("Wie ich von 0 auf 10K Follower kam")</Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>✓ Behind-the-Scenes Stories</Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>✓ Struggles und Erfolge</Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>✓ Emotionale Hooks</Typography>
                </Stack>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mt: 2, fontStyle: 'italic' }}>
                  <strong>Challenge nicht deine Audience, challenge dich selbst.</strong> Erzähle deine Story, anstatt zu erwarten, dass Leute sich die Zeit nehmen, dich zu verstehen.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* NEW SECTION: Algorithmus-Hacking */}
          <Box id="algorithmus-hacking-spotify" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              Algorithmus-Hacking: Spotify "Discover Weekly" triggern
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 3 }}>
              Das Ziel der bezahlten Werbung ist es nicht, dauerhaft für Streams zu bezahlen. <strong>Das Ziel ist es, den Algorithmus davon zu überzeugen, dass dein Song gut ist.</strong>
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #4caf50', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#4caf50', mb: 2 }}>
                  Wie der Spotify-Algorithmus funktioniert
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 2 }}>
                  Sobald Spotify merkt, dass Menschen den Song zu Ende hören, ihn in Playlists speichern und teilen, beginnt die organische Ausspielung über:
                </Typography>
                <Stack spacing={1} sx={{ pl: 2 }}>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>
                    🎯 <strong>Discover Weekly:</strong> Personalisierte Playlist für Millionen User
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>
                    🎯 <strong>Release Radar:</strong> Für deine bestehenden Follower
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>
                    🎯 <strong>Spotify Radio:</strong> "Ähnliche Songs" Feature
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>
                    🎯 <strong>Playlist Radar:</strong> Automatische Playlist-Platzierungen
                  </Typography>
                </Stack>
              </CardContent>
            </Card>

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Den Popularity Score in den ersten 48 Stunden maximieren
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 2 }}>
                  Die ersten 48 Stunden nach Release sind entscheidend. Hier wird der "Popularity Score" gesetzt:
                </Typography>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Save Rate (wichtigster Faktor)
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>
                      Wie viele Hörer speichern den Song in ihrer Library oder Playlist? Ziel: &gt;5%
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Completion Rate
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>
                      Wie viele hören den Song zu Ende? Ziel: &gt;60%
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Skip Rate (negativ)
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>
                      Wie viele skippen nach 30 Sekunden? Ziel: &lt;30%
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #666', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  💡 Ab diesem Punkt sinken deine Kosten massiv
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7 }}>
                  Sobald der Algorithmus übernommen hat, zahlst du nicht mehr für jeden Stream. Die organische Reichweite übernimmt und deine effektiven Kosten pro Stream fallen von 0,10€ auf unter 0,01€.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* NEW SECTION: Musikmarketing vs Musikpromotion */}
          <Box id="musikmarketing-vs-promotion" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              Musikmarketing vs. Musikpromotion: Der entscheidende Unterschied
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 3 }}>
              Viele Artists verwechseln Musikmarketing mit Musikpromotion. Der Unterschied ist entscheidend für deinen langfristigen Erfolg:
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  Musikpromotion (Kurzfristig)
                </Typography>
                <Stack spacing={1} sx={{ pl: 2 }}>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>✓ Fokus auf einzelne Releases</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>✓ "Song raus, Post machen, hoffen"</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>✓ Reichweite als Hauptziel</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>✓ Abhängig von Gatekeepern (Playlists, Radio)</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>✓ Keine Datensammlung</Typography>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #4caf50', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#4caf50', mb: 2 }}>
                  Musikmarketing (Langfristig) ✅
                </Typography>
                <Stack spacing={1} sx={{ pl: 2 }}>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>✓ Fokus auf Karriere-Aufbau</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>✓ Strategisches System mit messbaren KPIs</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>✓ Conversion als Hauptziel (Fan → Kunde)</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>✓ Kontrolle über eigene Daten (E-Mail-Liste, CRM)</Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#bbb' }}>✓ Wiederkehrende Umsatzströme</Typography>
                </Stack>
              </CardContent>
            </Card>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 2 }}>
              <strong>Beispiel:</strong> Musikpromotion ist, wenn du 1000€ für Playlist-Pitching ausgibst und hoffst, dass es funktioniert. Musikmarketing ist, wenn du 1000€ in Meta Ads investierst, 500 E-Mail-Adressen sammelst und diese Fans über Jahre monetarisierst.
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8 }}>
              <strong>Die Wahrheit:</strong> Promotion ist ein Teil von Marketing – aber nicht das Ganze. Erfolgreiche Artists nutzen beides: Promotion für einzelne Releases, Marketing für die gesamte Karriere.
            </Typography>
          </Box>

          <Divider sx={{ my: 6, borderColor: '#333' }} />

          {/* NEW SECTION: Musikmarketing Budget */}
          <Box id="musikmarketing-budget" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography component="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3, color: '#fff' }}>
              Musikmarketing Budget 2026: Was kostet professionelles Marketing?
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 3 }}>
              Die häufigste Frage: "Wie viel sollte ich in Musikmarketing investieren?" Die Antwort hängt von deiner Karriere-Phase ab:
            </Typography>

            {/* Budget Level 1 */}
            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 2.5 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  Level 1: Hobby Artist (0-1.000 Fans)
                </Typography>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#4caf50', mb: 2 }}>
                  Budget: 0-500€/Monat
                </Typography>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography sx={{ fontSize: '0.95em', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Strategie:
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb', lineHeight: 1.6 }}>
                      100% Organic Content. Fokus auf Lernen und Experimentieren. Investiere Zeit statt Geld.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.95em', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Budget-Verteilung:
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• 0€ - Komplett organisch</Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• 100-200€ - Erste Test-Ads (optional)</Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• 50€ - Tools (Canva Pro, song.so)</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.95em', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Erwartete Ergebnisse:
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>50-200 neue Follower/Monat, 1.000-5.000 Streams/Monat</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Budget Level 2 */}
            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 2.5 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  Level 2: Aufstrebender Artist (1.000-10.000 Fans)
                </Typography>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#ff9800', mb: 2 }}>
                  Budget: 500-2.000€/Monat
                </Typography>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography sx={{ fontSize: '0.95em', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Strategie:
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb', lineHeight: 1.6 }}>
                      70% Organic, 30% Paid Ads. Skaliere, was funktioniert. Baue E-Mail-Liste auf.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.95em', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Budget-Verteilung:
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• 300-800€ - Meta Ads (Facebook/Instagram)</Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• 200-500€ - TikTok Ads</Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• 100-200€ - Tools (Analytics, CRM)</Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• 200-500€ - Content Production (Equipment, Editing)</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.95em', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Erwartete Ergebnisse:
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>500-2.000 neue Follower/Monat, 10.000-50.000 Streams/Monat</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Budget Level 3 */}
            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  Level 3: Professional Artist (10.000-100.000 Fans)
                </Typography>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#f44336', mb: 2 }}>
                  Budget: 2.000-10.000€/Monat
                </Typography>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography sx={{ fontSize: '0.95em', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Strategie:
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb', lineHeight: 1.6 }}>
                      50% Organic, 50% Paid Ads. Vollzeit-Marketing. Team aufbauen (Manager, Social Media Manager).
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.95em', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Budget-Verteilung:
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• 1.000-4.000€ - Meta Ads</Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• 500-2.000€ - TikTok Ads</Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• 500-1.000€ - Spotify Ads</Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• 1.000-3.000€ - Team (Manager, Content Creator)</Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>• 500€ - Tools & Software</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.95em', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Erwartete Ergebnisse:
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>3.000-10.000 neue Follower/Monat, 100.000-500.000 Streams/Monat</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #666', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  💡 Musikmarketing Budget-Regel
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.8 }}>
                  <strong>Die 80/20 Regel:</strong> Investiere 20% deines Budgets in Produktion (Studio, Mixing), 80% in Marketing. Der beste Song bringt nichts, wenn niemand ihn hört. Viele Artists machen es umgekehrt – und scheitern.
                </Typography>
              </CardContent>
            </Card>

            <Divider sx={{ my: 3, borderColor: '#333' }} />

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Die Ernte: Monetarisierung und ROI nach 12 Monaten
            </Typography>

            <Typography sx={{ fontSize: '1.05rem', color: '#ccc', lineHeight: 1.8, mb: 3 }}>
              Am Ende des Jahres steht die Frage: <strong>Hat es sich gelohnt?</strong> 10.000€ sind ein Investment in den Markenwert. Hier die realistische ROI-Berechnung:
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #4caf50', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#4caf50', mb: 2 }}>
                  Live-Geschäft als Hauptziel
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 2 }}>
                  Das klare Ziel: <strong>100 Personen, die bereit sind, für ein Ticket zu bezahlen.</strong>
                </Typography>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Ticket-Verkauf (100 Tickets × 15-20€)
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>
                      Einnahmen: 1.500-2.000€ pro Show
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Merch am Stand (30% Conversion)
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb' }}>
                      30 Verkäufe × 25€ = 750€ zusätzlich
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Gesamt pro Show
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#4caf50', fontWeight: 700 }}>
                      2.250-2.750€ Umsatz
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              Merchandising & Vinyl: Customer Lifetime Value erhöhen
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #444', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7, mb: 2 }}>
                  Durch strategische Angebote lässt sich der "Customer Lifetime Value" eines Fans massiv erhöhen:
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                      Limitierte Vinyl (35€)
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb', mb: 1 }}>
                      Alle 10 Songs des Jahres auf Vinyl. Limitierte Auflage schafft FOMO.
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#999' }}>
                      Erwartung: 50-100 Verkäufe = 1.750-3.500€
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff', mb: 1 }}>
                      Bundle-Angebote (Vinyl + Ticket = 40€)
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#bbb', mb: 1 }}>
                      Einzeln: 35€ + 15€ = 50€. Bundle: 40€ = 20% Rabatt, aber höhere Conversion.
                    </Typography>
                    <Typography sx={{ fontSize: '0.9em', color: '#999' }}>
                      Erfahrungswert: 50% kaufen Bundle, 30% nur Vinyl, 20% nur Ticket
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, mb: 2, color: '#fff' }}>
              ROI-Berechnung nach 12 Monaten
            </Typography>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #666', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', mb: 2 }}>
                  Realistische Einnahmen-Übersicht
                </Typography>
                <Stack spacing={1}>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc' }}>
                    💿 Streaming (200.000 Streams × 0,003€): 600€
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc' }}>
                    👕 Merch Drops (100 Verkäufe × 25€): 2.500€
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc' }}>
                    💿 Vinyl (75 Verkäufe × 35€): 2.625€
                  </Typography>
                  <Typography sx={{ fontSize: '0.95em', color: '#ccc' }}>
                    🎤 Live-Show (1 Show × 2.500€): 2.500€
                  </Typography>
                  <Divider sx={{ my: 1.5, borderColor: '#555' }} />
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#4caf50' }}>
                    Gesamt: ~8.225€ Umsatz
                  </Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#999', mt: 1 }}>
                    Investment: 10.000€ | ROI: -18% im ersten Jahr
                  </Typography>
                  <Typography sx={{ fontSize: '0.9em', color: '#4caf50', fontWeight: 700, mt: 1 }}>
                    ✓ Aber: Du hast jetzt 5.000-15.000 Follower, 1.000-2.000 E-Mail-Abonnenten und eine funktionierende Marketing-Maschine
                  </Typography>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ background: '#1a1a1a', border: '2px solid #4caf50', mb: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#4caf50', mb: 2 }}>
                  💡 Jahr 2: Profitabilität
                </Typography>
                <Typography sx={{ fontSize: '0.95em', color: '#ccc', lineHeight: 1.7 }}>
                  Mit der aufgebauten Fanbase refinanziert sich das Investment in Jahr 2 komplett. Mehr Shows (3-5), höhere Merch-Verkäufe, Streaming-Katalog wächst. <strong>Erwartete Einnahmen Jahr 2: 15.000-25.000€</strong>
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
                { q: 'Was ist Musikmarketing?', a: 'Musikmarketing ist das strategische System, um deine Musik den richtigen Menschen zu zeigen und sie in zahlende Fans zu verwandeln. Es kombiniert Content-Marketing, Paid Advertising, Fan-CRM und Plattform-Optimierung.' },
                { q: 'Wie viel kostet Musikmarketing?', a: 'Anfänger: 0-500€/Monat (organisch), Aufstrebend: 500-2.000€/Monat, Professional: 2.000-10.000€/Monat. Die 80/20 Regel: 20% Produktion, 80% Marketing.' },
                { q: 'Reicht organic ohne Ads?', a: 'Ja, aber es dauert 10x länger. Mit 1-2 Stunden Content/Tag brauchst du 12+ Monate. Mit 500€/Monat Ads: 3-6 Monate. Empfehlung: Starte organisch, investiere ab Monat 4.' },
                { q: 'Welche Plattform ist am wichtigsten für Musikmarketing?', a: 'Es kommt auf dein Genre an. Top 3: TikTok (Discovery), Instagram (Community), Spotify (Streams). Fokussiere auf 1-2, nicht alles gleichzeitig.' },
                { q: 'Wie lange bis ich Ergebnisse sehe?', a: '30 Tage erste Erfolge, 3 Monate solides Wachstum, 6 Monate echter Durchbruch. Geduld + Konsistenz = Key.' },
                { q: 'Kann ich Musikmarketing alleine schaffen?', a: 'Ja! Mit 5-10 Stunden/Woche kannst du diesen Plan umsetzen. Wenn weniger Zeit: Investiere in Ads (Zeit → Budget).' },
                { q: 'Wie messe ich meinen Musikmarketing Erfolg?', a: 'Nutze Platform Analytics (Instagram Insights, YouTube Analytics, Spotify for Artists). Tracke monatlich: Follower-Wachstum, Engagement Rate, Conversions, Cost per Stream.' },
                { q: 'Was ist der Unterschied zwischen Musikmarketing und Musikpromotion?', a: 'Musikpromotion fokussiert auf einzelne Releases (kurzfristig). Musikmarketing baut deine gesamte Karriere auf (langfristig) mit messbaren KPIs und Fan-CRM.' },
                { q: 'Welche Musikmarketing Tools brauche ich?', a: 'Essentials: Canva (Design), song.so (Link-Tracking), Meta Ads Manager, Spotify for Artists, Google Analytics. Optional: Mailchimp (E-Mail), Discord (Community).' },
                { q: 'Wie baue ich eine E-Mail-Liste für Musikmarketing auf?', a: 'Lead Magnet anbieten (Gratis EP), Landing Page erstellen, über Social Media promoten, Pre-Save-Kampagnen nutzen. Ziel: 100 E-Mails im ersten Monat.' },
                { q: 'Was sind die häufigsten Musikmarketing Fehler?', a: '1) Keine Strategie, 2) Keine Daten tracken, 3) Falsche Plattform, 4) Zu wenig Budget, 5) Nur Streams zählen statt echte Conversions.' },
                { q: 'Brauche ich eine Musikmarketing Agentur?', a: 'Nicht am Anfang. Mache 1-2 Jahre solo, lerne die Basics. Agentur ab 2.000€/Monat Budget sinnvoll für Skalierung und internationale Kampagnen.' },
                { q: 'Wie viel Zeit braucht Musikmarketing pro Woche?', a: 'Minimum: 5 Stunden/Woche (Content + Community). Optimal: 10-15 Stunden/Woche. Professional: 20+ Stunden oder Team einstellen.' },
                { q: 'Was ist wichtiger: TikTok oder Instagram für Musikmarketing?', a: 'TikTok für Discovery (viral gehen), Instagram für Community (Fan-Beziehungen). Starte mit TikTok, baue dann Instagram aus.' },
                { q: 'Wie funktionieren Meta Ads für Musikmarketing?', a: 'Zielgruppe nach Genre/Interessen definieren, Video-Ad erstellen, Budget 5-10€/Tag, auf Spotify/Pre-Save leiten. Cost per Click: 0,10-0,50€.' },
                { q: 'Kann ich Musikmarketing kostenlos machen?', a: 'Ja, mit organischen Strategien. Aber es dauert 10x länger. Mit 500€/Monat wächst du 10x schneller. Empfehlung: Starte organisch, investiere später in Ads.' },
                { q: 'Was ist ein Musikmarketing Plan?', a: 'Ein dokumentiertes Dokument mit: Zielgruppe, Zielen (Streams/Fans/Umsatz), Kanälen, Content-Kalender, Budget, KPIs. Ohne Plan bist du reaktiv statt proaktiv.' },
                { q: 'Wie wichtig ist Spotify für Musikmarketing?', a: 'Sehr wichtig für Streams und Algorithmus-Support. Aber nicht alles: Spotify zahlt schlecht (0,003€/Stream). Fokus auf Fan-CRM und Merch/Tickets für echten Umsatz.' },
                { q: 'Was ist Fan-CRM im Musikmarketing?', a: 'Customer Relationship Management für Fans. E-Mail-Liste, Discord-Community, WhatsApp-Gruppen. Ziel: Direkte Kommunikation ohne Plattform-Abhängigkeit.' },
                { q: 'Wie starte ich mit Musikmarketing als Anfänger?', a: 'Wähle 2 Plattformen (TikTok + Instagram), poste 3-5x/Woche, tracke Daten, starte nach 3 Monaten mit 100-300€ Test-Ads. Nutze den 30-Tage Action Plan.' },
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
