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
import UltimativerLeitfaden from './pages/UltimativerLeitfaden';
import MarketingHandbuch from './pages/MarketingHandbuch';
import AdsSchaltenLernen from './pages/AdsSchaltenLernen';
import Blog from './pages/Blog';
import WasIstMusikmarketing from './pages/blog/WasIstMusikmarketing';
import SpotifyVerdienst from './pages/blog/SpotifyVerdienst';
import SongVeroeffentlichenKosten from './pages/blog/SongVeroeffentlichenKosten';
import MusikmarketingTipps from './pages/blog/MusikmarketingTipps';
import MusikplattformVergleich from './pages/blog/MusikplattformVergleich';
import SongVermarkten from './pages/blog/SongVermarkten';
import MusikBekannt from './pages/blog/MusikBekannt';
import InstagramMarketingMusiker from './pages/InstagramMarketingMusiker';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HelmetProvider>
        <Router>
          <PageViewTracker />
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navigation />
            
            <main style={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/musikmarketing-agentur" element={<MusikmarketingAgentur />} />
                <Route path="/ultimativer-leitfaden" element={<UltimativerLeitfaden />} />
                <Route path="/marketing-handbuch-fuer-artists" element={<MarketingHandbuch />} />
                <Route path="/ads-schalten-lernen" element={<AdsSchaltenLernen />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/was-ist-musikmarketing" element={<WasIstMusikmarketing />} />
                <Route path="/blog/spotify-verdienst" element={<SpotifyVerdienst />} />
                <Route path="/blog/song-veroeffentlichen-kosten" element={<SongVeroeffentlichenKosten />} />
                <Route path="/blog/musikmarketing-tipps" element={<MusikmarketingTipps />} />
                <Route path="/blog/musikplattform-vergleich" element={<MusikplattformVergleich />} />
                <Route path="/blog/song-vermarkten" element={<SongVermarkten />} />
                <Route path="/blog/musik-bekannt" element={<MusikBekannt />} />
                <Route path="/instagram-marketing-musiker" element={<InstagramMarketingMusiker />} />
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
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
