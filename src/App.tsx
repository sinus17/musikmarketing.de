import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, CircularProgress } from '@mui/material';
import { useEffect, Suspense, lazy } from 'react';
import ReactGA from 'react-ga4';
import CookieConsent from 'react-cookie-consent';
import { Analytics } from '@vercel/analytics/react';
import theme from './theme';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Lazy load main pages for code splitting
const Home = lazy(() => import('./pages/HomeClean'));
const MusikmarketingAgentur = lazy(() => import('./pages/MusikmarketingAgentur'));
const MarketingHandbuch = lazy(() => import('./pages/MarketingHandbuch'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));
const Podcast = lazy(() => import('./pages/Podcast'));

// Admin Pages - lazy loaded
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const BlogManagement = lazy(() => import('./pages/admin/BlogManagement'));
const BlogCreate = lazy(() => import('./pages/admin/BlogCreate'));
const BlogEdit = lazy(() => import('./pages/admin/BlogEdit'));
const YouTubeArticleGenerator = lazy(() => import('./pages/admin/YouTubeArticleGenerator'));

// Initialize Google Analytics
ReactGA.initialize('G-13021393531');

// Loading fallback component
function PageLoader() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#000',
      }}
    >
      <CircularProgress sx={{ color: '#fff' }} />
    </Box>
  );
}

// Component to track page views
function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return null;
}

// Layout wrapper to conditionally show Navigation/Footer
function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blog" element={<BlogManagement />} />
          <Route path="/admin/blog/create" element={<BlogCreate />} />
          <Route path="/admin/blog/edit/:id" element={<BlogEdit />} />
          <Route path="/admin/youtube-article" element={<YouTubeArticleGenerator />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      <main style={{ flexGrow: 1 }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/musikmarketing-agentur" element={<MusikmarketingAgentur />} />
            <Route path="/marketing-handbuch-fuer-artists" element={<MarketingHandbuch />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/podcast" element={<Podcast />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      
      {/* Cookie Consent Banner */}
      <CookieConsent
        location="bottom"
        buttonText="Akzeptieren"
        declineButtonText="Ablehnen"
        enableDeclineButton
        onAccept={() => {
          ReactGA.gtag('consent', 'update', {
            analytics_storage: 'granted'
          });
        }}
        onDecline={() => {
          ReactGA.gtag('consent', 'update', {
            analytics_storage: 'denied'
          });
        }}
        style={{
          background: '#000000',
          borderTop: '1px solid #2a2a2a',
          padding: '20px',
          alignItems: 'center',
        }}
        buttonStyle={{
          background: '#ffffff',
          color: '#000000',
          fontSize: '14px',
          fontWeight: 500,
          borderRadius: '4px',
          padding: '8px 16px',
          border: 'none',
          cursor: 'pointer',
        }}
        declineButtonStyle={{
          background: 'transparent',
          color: '#9e9e9e',
          fontSize: '14px',
          borderRadius: '4px',
          padding: '8px 16px',
          border: '1px solid #2a2a2a',
          cursor: 'pointer',
        }}
        contentStyle={{
          flex: '1 0 300px',
          margin: '0 20px',
        }}
      >
        <span style={{ fontSize: '14px', color: '#9e9e9e' }}>
          Diese Website verwendet Cookies, um die Nutzererfahrung zu verbessern und Analysen durchzuführen. 
          Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu.{' '}
          <a 
            href="/datenschutz" 
            style={{ 
              color: '#ffffff', 
              textDecoration: 'underline',
              fontWeight: 400 
            }}
          >
            Mehr erfahren
          </a>
        </span>
      </CookieConsent>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HelmetProvider>
        <Router>
          <PageViewTracker />
          <AppLayout />
        </Router>
        <Analytics />
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
