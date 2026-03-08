import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Pagination,
} from '@mui/material';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  videoId: string;
}

const Podcast = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 12;

  useEffect(() => {
    fetchYouTubeVideos();
  }, []);

  const fetchYouTubeVideos = async () => {
    try {
      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
      const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

      if (!API_KEY || !CHANNEL_ID) {
        throw new Error('YouTube API credentials not configured');
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50&type=video`
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

  const paginatedVideos = videos.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage
  );

  return (
    <>
      <Helmet>
        <title>Podcast | Musikmarketing.de</title>
        <meta
          name="description"
          content="Entdecke unsere YouTube Videos und Podcast-Episoden rund um Musikmarketing, Social Media Strategien und Artist Development."
        />
        <meta property="og:title" content="Podcast | Musikmarketing.de" />
        <meta
          property="og:description"
          content="Entdecke unsere YouTube Videos und Podcast-Episoden rund um Musikmarketing, Social Media Strategien und Artist Development."
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
            Podcast & Videos
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 6,
              color: '#9e9e9e',
              maxWidth: '800px',
              fontSize: '1.1rem',
            }}
          >
            Entdecke unsere YouTube Videos mit Tipps, Strategien und Insights rund um Musikmarketing
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
          ) : videos.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography sx={{ color: '#999' }}>
                Noch keine Videos verfügbar
              </Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {paginatedVideos.map((video) => (
                  <Grid item xs={12} sm={6} md={4} key={video.id}>
                    <Card
                      component="a"
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        bgcolor: '#0a0a0a',
                        border: '1px solid #2a2a2a',
                        borderRadius: 2,
                        transition: 'border-color 0.2s, transform 0.2s',
                        textDecoration: 'none',
                        display: 'block',
                        height: '100%',
                        '&:hover': {
                          borderColor: '#4a4a4a',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={video.thumbnail}
                        alt={video.title}
                        sx={{
                          aspectRatio: '16/9',
                          objectFit: 'cover',
                        }}
                      />
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

              {videos.length > videosPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                  <Pagination
                    count={Math.ceil(videos.length / videosPerPage)}
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
