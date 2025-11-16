import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, Button, Card } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import BlogAuthor from '../../components/BlogAuthor';
import InternalLinks from '../../components/InternalLinks';

export default function SongVermarkten() {
  const publishDate = '2025-01-16';
  const modifiedDate = '2025-01-16';
  
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Wie vermarkte ich meinen Song? 7-Schritte-Plan für Artists [2025]",
    "description": "Kompletter Leitfaden zur Song-Vermarktung: Pre-Save, Release-Strategie, Social Media, Playlists & Paid Ads. Schritt-für-Schritt Anleitung für Independent Artists.",
    "image": "https://musikmarketing.de/musikmarketing.png",
    "author": {
      "@type": "Person",
      "name": "Philipp Lützenburger",
      "url": "https://www.linkedin.com/in/philipp-l%C3%BCtzenburger-7b9b9b1b0/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SwipeUp Marketing",
      "logo": {
        "@type": "ImageObject",
        "url": "https://musikmarketing.de/musikmarketing.png"
      }
    },
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://musikmarketing.de/blog/song-vermarkten"
    },
    "articleSection": "Musikmarketing",
    "keywords": "Song vermarkten, Musik promoten, Release Strategie, Pre-Save Kampagne, Playlist Pitching, Instagram Ads für Musik",
    "wordCount": 850,
    "inLanguage": "de-DE"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie vermarkte ich meinen Song?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Um deinen Song erfolgreich zu vermarkten, folge diesem 7-Schritte-Plan: 1) Starte eine Pre-Save Kampagne 3 Wochen vor Release, 2) Erstelle einen Content-Plan mit 20-30 Posts, 3) Pitche deinen Song an Spotify Editorial Playlists, 4) Führe einen starken Release Day Push durch, 5) Schalte Instagram & TikTok Ads mit 5-10€/Tag, 6) Kontaktiere User-Generated Playlist Kuratoren, 7) Halte das Momentum mindestens 4 Wochen aufrecht."
        }
      },
      {
        "@type": "Question",
        "name": "Wann sollte ich mit der Song-Vermarktung beginnen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Beginne mindestens 3-4 Wochen vor dem Release-Datum mit der Vermarktung. Starte mit einer Pre-Save Kampagne 3 Wochen vorher und plane deinen Content im Voraus. Marketing beginnt nicht am Release-Tag, sondern deutlich früher."
        }
      },
      {
        "@type": "Question",
        "name": "Wie viel Budget brauche ich für Song-Vermarktung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mit einem Budget von 100-200€ pro Release kannst du bereits viel erreichen. Plane 5-10€/Tag für Instagram Ads ein und teste verschiedene Creatives. Auch mit kleinem Budget ist professionelles Marketing möglich."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Plattformen sind wichtig für Song-Vermarktung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die wichtigsten Plattformen sind: Instagram (für Reels und Stories), TikTok (für virale Reichweite), Spotify (für Playlist Pitching), YouTube (für Musikvideos) und E-Mail Marketing (für deine treue Fanbase). Fokussiere dich auf 2-3 Plattformen statt alle gleichzeitig zu bespielen."
        }
      }
    ]
  };

  const steps = [
    {
      title: "Pre-Save Kampagne starten (3 Wochen vor Release)",
      description: "Nutze Tools wie FeatureFM oder Spotify Pre-Save, um vor dem Release Momentum aufzubauen. Teile den Pre-Save Link auf allen Social Media Kanälen und in deiner E-Mail Liste."
    },
    {
      title: "Content-Plan erstellen",
      description: "Plane 20-30 Posts für die ersten 2 Wochen nach Release: Teasers, Behind-the-Scenes, Lyrics, Fan-Reactions, etc. Konsistenz ist wichtiger als Perfektion."
    },
    {
      title: "Spotify Playlist Pitching",
      description: "Pitche deinen Song 2 Wochen vor Release über Spotify for Artists an Editorial Playlists. Fülle alle Felder detailliert aus und sei ehrlich über deine Musik."
    },
    {
      title: "Release Day Push",
      description: "Am Release-Tag: Story-Countdown, Feed-Post, Reel mit Song-Snippet, E-Mail an deine Liste. Bitte Fans um Shares und Playlist-Adds."
    },
    {
      title: "Instagram & TikTok Ads schalten",
      description: "Starte mit 5-10€/Tag für Instagram Ads. Teste verschiedene Creatives (Lyric Video, Performance Clip, Behind-the-Scenes). Optimiere nach 3-5 Tagen."
    },
    {
      title: "User-Generated Playlists targeten",
      description: "Recherchiere Playlists in deinem Genre auf Spotify und kontaktiere die Kuratoren. Nutze Tools wie SubmitHub oder direkte DMs auf Instagram."
    },
    {
      title: "Momentum aufrechterhalten",
      description: "Poste auch nach Release-Woche weiter über den Song. Teile Fan-Covers, Playlist-Adds, Meilensteine. Nutze den Song in deinen TikToks und Reels."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Wie vermarkte ich meinen Song? 7-Schritte-Plan für Artists [2025]</title>
        <meta name="description" content="Kompletter Leitfaden zur Song-Vermarktung: Pre-Save, Release-Strategie, Social Media, Playlists & Paid Ads. Schritt-für-Schritt Anleitung für Independent Artists." />
        <meta name="keywords" content="Song vermarkten, Musik promoten, Release Strategie, Pre-Save Kampagne, Playlist Pitching, Instagram Ads für Musik" />
        <link rel="canonical" href="https://musikmarketing.de/blog/song-vermarkten" />
        <meta property="og:title" content="Wie vermarkte ich meinen Song? 7-Schritte-Plan für Artists" />
        <meta property="og:description" content="Kompletter Leitfaden zur Song-Vermarktung: Pre-Save, Release-Strategie, Social Media, Playlists & Paid Ads." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://musikmarketing.de/blog/song-vermarkten" />
        <script type="application/ld+json">
          {JSON.stringify(blogPostingSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Box sx={{ background: 'linear-gradient(135deg, #07393c 0%, #0a090c 100%)', pt: { xs: 10, md: 14 }, pb: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.5rem' }, fontWeight: 800, color: '#90ddf0', mb: { xs: 2, md: 3 }, lineHeight: 1.2 }}>
            Wie vermarkte ich meinen Song? 7-Schritte-Plan [2025]
          </Typography>
          
          <BlogAuthor date="16. Januar 2025" readTime="8 Min. Lesezeit" />
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 }, background: '#0a090c' }}>
        <Container maxWidth="md">
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Card sx={{ background: 'rgba(144, 221, 240, 0.1)', border: '2px solid #90ddf0', borderRadius: 3, p: { xs: 3, md: 4 } }}>
              <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' }, fontWeight: 700, mb: 3, color: '#90ddf0' }}>
                Kurze Antwort
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary' }}>
                Erfolgreiche Song-Vermarktung beginnt 3 Wochen vor Release mit Pre-Save Kampagnen, gefolgt von strategischem Content auf Social Media, Playlist Pitching und Paid Ads. Der Schlüssel ist ein durchdachter Plan und konsequente Umsetzung.
              </Typography>
            </Card>
          </Box>

          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: { xs: 3, md: 4 }, color: '#90ddf0' }}>
              Der 7-Schritte-Plan zur Song-Vermarktung
            </Typography>

            {steps.map((step, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 2, color: '#90ddf0' }}>
                  Schritt {index + 1}: {step.title}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary' }}>
                  {step.description}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: { xs: 3, md: 4 }, color: '#90ddf0' }}>
              Häufige Fehler vermeiden
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 3 }}>
              <Typography component="li" variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 2 }}>
                <strong>Zu spät starten:</strong> Marketing beginnt nicht am Release-Tag, sondern 3-4 Wochen vorher
              </Typography>
              <Typography component="li" variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 2 }}>
                <strong>Kein Budget einplanen:</strong> Auch mit kleinem Budget (100-200€) kannst du viel erreichen
              </Typography>
              <Typography component="li" variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 2 }}>
                <strong>Nach einer Woche aufgeben:</strong> Momentum braucht Zeit, bleib mindestens 4 Wochen dran
              </Typography>
            </Box>
          </Box>

          <Card sx={{ background: 'rgba(144, 221, 240, 0.1)', border: '2px solid #90ddf0', borderRadius: 3, p: { xs: 3, md: 4 }, textAlign: 'center' }}>
            <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 2, color: '#90ddf0' }}>
              Professionelle Release-Strategie gewünscht?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.primary', mb: 3 }}>
              Wir entwickeln mit dir eine maßgeschneiderte Release-Strategie und setzen sie gemeinsam um.
            </Typography>
            <Button variant="contained" size="large" href="https://swipeup-marketing.com/strategy-session" target="_blank" endIcon={<ArrowForwardIcon />} sx={{ py: 2, px: 4 }}>
              Kostenlose Strategy-Session buchen
            </Button>
          </Card>
        </Container>
      </Box>

      <InternalLinks currentPath="/blog/song-vermarkten" />
    </>
  );
}
