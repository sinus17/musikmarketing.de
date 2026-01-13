import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import CookieConsent from 'react-cookie-consent';
import theme from './theme';
import Home from './pages/HomeClean';
import MusikmarketingAgentur from './pages/MusikmarketingAgentur';
import Blog from './pages/Blog';
import BlogPost from './pages/blog/BlogPost';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogManagement from './pages/admin/BlogManagement';
import BlogCreate from './pages/admin/BlogCreate';
import BlogEdit from './pages/admin/BlogEdit';

// Initialize Google Analytics
ReactGA.initialize('G-13021393531');

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
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/blog" element={<BlogManagement />} />
        <Route path="/admin/blog/create" element={<BlogCreate />} />
        <Route path="/admin/blog/edit/:id" element={<BlogEdit />} />
      </Routes>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/musikmarketing-agentur" element={<MusikmarketingAgentur />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
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
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
