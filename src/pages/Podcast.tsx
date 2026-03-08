import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Pagination,
} from '@mui/material';

interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  audioUrl: string;
  duration: string;
  link: string;
}

const Podcast = () => {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 12;

  useEffect(() => {
    fetchPodcastEpisodes();
  }, []);

  const fetchPodcastEpisodes = async () => {
    try {
      const RSS_FEED_URL = 'https://anchor.fm/s/10c5f7b68/podcast/rss';
      
      // Try direct fetch first (works if CORS is enabled), fallback to CORS proxy
      let response;
      try {
        response = await fetch(RSS_FEED_URL);
      } catch {
        // Fallback to CORS proxy
        response = await fetch(`https://corsproxy.io/?${encodeURIComponent(RSS_FEED_URL)}`);
      }

      if (!response.ok) {
        throw new Error('Failed to fetch podcast RSS feed');
      }

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      const items = xmlDoc.querySelectorAll('item');
      const episodeList: PodcastEpisode[] = Array.from(items).map((item, index) => {
        const title = item.querySelector('title')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const enclosure = item.querySelector('enclosure');
        const audioUrl = enclosure?.getAttribute('url') || '';
        const originalLink = item.querySelector('link')?.textContent || '';
        
        // Convert podcasters.spotify.com link to open.spotify.com
        let spotifyLink = originalLink;
        if (originalLink.includes('podcasters.spotify.com')) {
          // Try to get Spotify episode ID from guid
          const guid = item.querySelector('guid')?.textContent || '';
          const spotifyIdMatch = guid.match(/episode\/([a-zA-Z0-9]+)/);
          if (spotifyIdMatch && spotifyIdMatch[1]) {
            spotifyLink = `https://open.spotify.com/episode/${spotifyIdMatch[1]}`;
          }
        }
        
        // Try multiple ways to get the image
        const itunesImage = item.querySelector('itunes\\:image')?.getAttribute('href') || 
                           item.getElementsByTagName('itunes:image')[0]?.getAttribute('href') ||
                           xmlDoc.querySelector('channel itunes\\:image')?.getAttribute('href') ||
                           xmlDoc.getElementsByTagName('itunes:image')[0]?.getAttribute('href') ||
                           xmlDoc.querySelector('channel > image > url')?.textContent || '';
        
        const duration = item.querySelector('itunes\\:duration')?.textContent || 
                        item.getElementsByTagName('itunes:duration')[0]?.textContent || '';

        return {
          id: `episode-${index}`,
          title,
          description: description.replace(/<[^>]*>/g, ''), // Strip HTML tags
          thumbnail: itunesImage,
          publishedAt: pubDate,
          audioUrl,
          duration,
          link: spotifyLink,
        };
      });

      setEpisodes(episodeList);
    } catch (err: any) {
      console.error('Error fetching podcast episodes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
      <Helmet>
        <title>musikmarketing.de – Der Marketing-Podcast für Artists & Labels</title>
        <meta
          name="description"
          content="Lerne, wie Du eine echte Fanbase aufbaust, Deine Releases erfolgreich vermarktest und mehr Tickets verkaufst. Mit Strategien aus echten Kampagnen und Einblicken von spannenden Gästen aus der Musikindustrie."
        />
        <meta property="og:title" content="musikmarketing.de – Der Marketing-Podcast für Artists & Labels" />
        <meta
          property="og:description"
          content="Lerne, wie Du eine echte Fanbase aufbaust, Deine Releases erfolgreich vermarktest und mehr Tickets verkaufst. Mit Strategien aus echten Kampagnen und Einblicken von spannenden Gästen aus der Musikindustrie."
        />
        <link rel="canonical" href="https://musikmarketing.de/podcast" />
      </Helmet>

      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#000',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: '#fff',
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            musikmarketing.de – Der Marketing-Podcast für Artists & Labels
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 6,
              color: '#9e9e9e',
              maxWidth: '800px',
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            Lerne, wie Du eine echte Fanbase aufbaust, Deine Releases erfolgreich vermarktest und mehr Tickets verkaufst. Mit Strategien aus echten Kampagnen und Einblicken von spannenden Gästen aus der Musikindustrie.
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#fff' }} />
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography sx={{ color: '#999' }}>
                Fehler beim Laden der Videos: {error}
              </Typography>
            </Box>
          ) : episodes.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography sx={{ color: '#999' }}>
                Noch keine Podcast-Episoden verfügbar
              </Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {episodes
                  .slice((currentPage - 1) * episodesPerPage, currentPage * episodesPerPage)
                  .map((episode) => (
                  <Grid item xs={12} sm={6} md={4} key={episode.id}>
                    <Card
                      component="a"
                      href={episode.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        bgcolor: '#0a0a0a',
                        border: '1px solid #2a2a2a',
                        borderRadius: 2,
                        transition: 'border-color 0.2s, transform 0.2s',
                        textDecoration: 'none',
                        display: 'flex',
                        height: '100%',
                        '&:hover': {
                          borderColor: '#4a4a4a',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      {/* Play Button */}
                      <Box
                        sx={{
                          width: 80,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: '#1a1a1a',
                          borderRight: '1px solid #2a2a2a',
                          flexShrink: 0,
                        }}
                      >
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            bgcolor: '#fff',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 0,
                              height: 0,
                              borderLeft: '15px solid #000',
                              borderTop: '10px solid transparent',
                              borderBottom: '10px solid transparent',
                              ml: '5px',
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Content */}
                      <CardContent sx={{ p: 2.5, flex: 1 }}>
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
                          {episode.title}
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
                          {episode.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography
                            sx={{
                              fontSize: '0.75rem',
                              color: '#6e6e6e',
                            }}
                          >
                            {formatDate(episode.publishedAt)}
                          </Typography>
                          {episode.duration && (
                            <Typography
                              sx={{
                                fontSize: '0.75rem',
                                color: '#6e6e6e',
                              }}
                            >
                              {episode.duration}
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {episodes.length > episodesPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                  <Pagination
                    count={Math.ceil(episodes.length / episodesPerPage)}
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
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Podcast;
