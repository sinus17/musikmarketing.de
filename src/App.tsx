import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import Home from './pages/HomeClean';
import MusikmarketingAgentur from './pages/MusikmarketingAgentur';
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
