import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
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
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HelmetProvider>
        <Router>
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
              </Routes>
            </main>
            
            <Footer />
          </div>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
