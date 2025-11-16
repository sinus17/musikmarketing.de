import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Chip,
} from '@mui/material';
import {
  MusicNote as MusicNoteIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Bolt as BoltIcon,
  BarChart as BarChartIcon,
  EmojiEvents as AwardIcon,
} from '@mui/icons-material';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Musikmarketing | Professionelles Marketing für Musiker & Künstler</title>
        <meta 
          name="description" 
          content="Professionelles Musikmarketing für Musiker & Künstler. Steigere deine Reichweite mit unseren bewährten Marketing-Strategien, Instagram Ads und Social Media Tools." 
        />
        <meta name="keywords" content="Musikmarketing, Musik Marketing, Musik Promotion, Musik vermarkten, Social Media Marketing, Instagram Marketing, Musik streamen, Künstler Marketing, Musiker Promotion" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://musikmarketing.de/" />
        <meta property="og:title" content="Musikmarketing | Professionelles Marketing für Musiker & Künstler" />
        <meta property="og:description" content="Steigere deine Reichweite mit professionellem Musikmarketing. Instagram Ads, Content-Strategien und Social Media Analyse für Musiker." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://musikmarketing.de/" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-primary-900 to-slate-800 overflow-hidden bg-mesh">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_50%)]"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-scale">
          <div className="mb-8">
            <div className="relative inline-block">
              <Music className="h-16 w-16 text-primary-400 mx-auto mb-6 animate-float shadow-glow" />
              <div className="absolute inset-0 h-16 w-16 mx-auto animate-ping bg-primary-400/20 rounded-full"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight animate-slide-in-up">
            <span className="font-serif italic text-gradient-primary animate-shimmer">Professionelles</span><br />
            <span className="bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent">
              Musikmarketing
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-in-up" style={{animationDelay: '0.2s'}}>
            Verwandle deine <span className="font-serif italic text-primary-400 relative">
              <span className="absolute inset-0 bg-primary-400/20 blur-sm rounded"></span>
              <span className="relative">Musik</span>
            </span> in eine 
            <span className="font-serif italic text-primary-400 relative">
              <span className="absolute inset-0 bg-primary-400/20 blur-sm rounded"></span>
              <span className="relative"> erfolgreiche Marke</span>
            </span>. 
            Mit bewährten Strategien, die <span className="font-serif italic text-primary-400 relative">
              <span className="absolute inset-0 bg-primary-400/20 blur-sm rounded"></span>
              <span className="relative">tausende Künstler</span>
            </span> bereits nutzen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-in-up" style={{animationDelay: '0.4s'}}>
            <a 
              href="https://song.so/instagram-ads-blueprint" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-primary-700 hover:via-primary-800 hover:to-primary-700 transition-all duration-500 inline-flex items-center justify-center shadow-2xl hover:shadow-glow-lg hover:scale-110 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Zap className="mr-3 h-5 w-5 group-hover:animate-pulse relative z-10" />
              <span className="relative z-10">Instagram Ads Blueprint</span>
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
            </a>
            <a 
              href="https://swipeup-marketing.com/analyse" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group glass border-2 border-primary-400/50 text-primary-400 px-10 py-4 rounded-full text-lg font-semibold hover:bg-primary-400 hover:text-white transition-all duration-500 inline-flex items-center justify-center hover:scale-110 hover:shadow-glow"
            >
              <BarChart3 className="mr-3 h-5 w-5 group-hover:animate-pulse" />
              Kostenlose <span className="font-serif italic ml-1">Analyse</span>
            </a>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center shadow-glow">
              <div className="w-1 h-3 bg-primary-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-32 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-32 left-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-10 w-80 h-80 bg-blue-100 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20 animate-fade-in-scale">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Unsere <span className="font-serif italic text-gradient-primary animate-shimmer">Premium</span> Services
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Entdecke die <span className="font-serif italic text-primary-600 relative">
                <span className="absolute inset-0 bg-primary-100 blur-sm rounded -z-10"></span>
                <span className="relative">bewährtesten Tools</span>
              </span> und 
              Strategien für <span className="font-serif italic text-primary-600 relative">
                <span className="absolute inset-0 bg-primary-100 blur-sm rounded -z-10"></span>
                <span className="relative">erfolgreiches</span>
              </span> Musikmarketing
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Instagram Ads Blueprint */}
            <div className="group relative bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-gray-100/50 hover:shadow-glow-lg hover:scale-105 transition-all duration-500 overflow-hidden animate-fade-in-scale">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-transparent rounded-bl-full group-hover:from-primary-500/30 transition-colors duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-glow animate-glow">
                  <Target className="h-8 w-8 text-white group-hover:animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Instagram Ads <span className="font-serif italic text-primary-600">Blueprint</span>
                </h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Lerne, wie du mit <span className="font-serif italic">professionellen</span> Instagram Ads deine Musik 
                  erfolgreich bewirbst und <span className="font-serif italic">neue Fans</span> gewinnst.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="font-serif italic">Schritt-für-Schritt</span> Anleitung
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    Bewährte <span className="font-serif italic">Kampagnen-Strategien</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="font-serif italic">Targeting</span> & Optimierung
                  </li>
                </ul>
                <a 
                  href="https://song.so/instagram-ads-blueprint" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/btn block w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center py-4 rounded-2xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="inline-flex items-center">
                    Jetzt <span className="font-serif italic mx-1">starten</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>
            </div>

            {/* 365 Content Club */}
            <div className="group relative bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-gray-100/50 hover:shadow-glow-lg hover:scale-105 transition-all duration-500 overflow-hidden animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-transparent rounded-bl-full group-hover:from-primary-500/30 transition-colors duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-glow animate-glow">
                  <TrendingUp className="h-8 w-8 text-white group-hover:animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  365 <span className="font-serif italic text-primary-600">Content</span> Club
                </h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Täglich <span className="font-serif italic">virale</span> Content-Ideen für deine Social Media Kanäle. 
                  Nie wieder ohne <span className="font-serif italic">Inspiration</span>!
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="font-serif italic">365</span> Content-Ideen pro Jahr
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="font-serif italic">Viral-optimierte</span> Formate
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="font-serif italic">Plattform-spezifische</span> Tipps
                  </li>
                </ul>
                <a 
                  href="https://swipeup-marketing.com/365-content-club" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/btn block w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center py-4 rounded-2xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="inline-flex items-center">
                    Jetzt <span className="font-serif italic mx-1">entdecken</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>
            </div>

            {/* Social Media Analyse */}
            <div className="group relative bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-gray-100/50 hover:shadow-glow-lg hover:scale-105 transition-all duration-500 overflow-hidden animate-fade-in-scale" style={{animationDelay: '0.4s'}}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full group-hover:from-green-500/30 transition-colors duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-glow animate-glow">
                  <Users className="h-8 w-8 text-white group-hover:animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Social Media <span className="font-serif italic text-primary-600">Analyse</span>
                </h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  <span className="font-serif italic">Kostenlose</span> Analyse deiner Social Media Profile mit 
                  konkreten <span className="font-serif italic">Verbesserungsvorschlägen</span>.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    Komplett <span className="font-serif italic">kostenlos</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="font-serif italic">Detaillierte</span> Analyse
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    Konkrete <span className="font-serif italic">Handlungsempfehlungen</span>
                  </li>
                </ul>
                <a 
                  href="https://swipeup-marketing.com/analyse" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/btn block w-full bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="inline-flex items-center">
                    Jetzt <span className="font-serif italic mx-1">analysieren</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="about" className="py-32 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden bg-mesh">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-200/40 to-transparent rounded-full -translate-y-48 translate-x-48 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-transparent rounded-full translate-y-32 -translate-x-32 animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Warum <span className="font-serif italic text-primary-600">Musikmarketing</span> 
              <br />so <span className="font-serif italic text-primary-600">entscheidend</span> ist
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              In der heutigen <span className="font-serif italic text-primary-600">digitalen Musiklandschaft</span> reicht 
              Talent allein nicht aus. <span className="font-serif italic text-primary-600">Erfolgreiche Künstler</span> verstehen 
              das Geheimnis des professionellen Musikmarketings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20">
            <div className="group text-center">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                <span className="font-serif italic text-primary-600">Reichweite</span> steigern
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Erreiche <span className="font-serif italic">neue Fans</span> und vergrößere deine 
                <span className="font-serif italic">Audience</span> nachhaltig
              </p>
            </div>
            
            <div className="group text-center">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <BarChart3 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                <span className="font-serif italic text-primary-600">Streaming-Zahlen</span> verbessern
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Mehr <span className="font-serif italic">Plays</span> auf Spotify, Apple Music und 
                anderen <span className="font-serif italic">Plattformen</span>
              </p>
            </div>
            
            <div className="group text-center">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                <span className="font-serif italic text-primary-600">Professionelle</span> Präsenz
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Baue eine <span className="font-serif italic">starke Marke</span> und professionelle 
                <span className="font-serif italic">Online-Präsenz</span> auf
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 p-12 rounded-3xl shadow-2xl border border-gray-100 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Starte jetzt <span className="font-serif italic text-primary-600">durch</span>!
              </h3>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Nutze unsere <span className="font-serif italic text-primary-600">bewährtesten</span> Musikmarketing-Tools 
                und -Strategien, um deine <span className="font-serif italic text-primary-600">Karriere</span> auf das nächste Level zu bringen.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="https://song.so/instagram-ads-blueprint" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 inline-flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <Zap className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                  Instagram Ads <span className="font-serif italic mx-1">Blueprint</span>
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="https://swipeup-marketing.com/365-content-club" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300 inline-flex items-center justify-center"
                >
                  <TrendingUp className="mr-3 h-5 w-5" />
                  365 <span className="font-serif italic mx-1">Content</span> Club
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-800 relative overflow-hidden bg-mesh">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.2),transparent_50%)]"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <Music className="h-16 w-16 text-primary-400 mx-auto mb-8 animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Bereit für <span className="font-serif italic text-primary-400">erfolgreiches</span><br />
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Musikmarketing?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Starte noch <span className="font-serif italic text-primary-400">heute</span> mit unseren bewährtesten Tools und Strategien. 
            <span className="font-serif italic text-primary-400">Tausende Musiker</span> vertrauen bereits auf unsere 
            <span className="font-serif italic text-primary-400">Expertise</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a 
              href="https://swipeup-marketing.com/analyse" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white text-primary-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center shadow-2xl hover:shadow-white/25 hover:scale-105"
            >
              <BarChart3 className="mr-3 h-5 w-5 group-hover:animate-pulse" />
              Kostenlose <span className="font-serif italic mx-1">Analyse</span> starten
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="mailto:info@musikmarketing.de"
              className="group border-2 border-primary-400 text-primary-400 px-10 py-4 rounded-full text-lg font-semibold hover:bg-primary-400 hover:text-white transition-all duration-300 inline-flex items-center justify-center backdrop-blur-sm"
            >
              <Users className="mr-3 h-5 w-5" />
              <span className="font-serif italic">Kontakt</span> aufnehmen
            </a>
          </div>
          
          <div className="text-center text-gray-400">
            <p className="text-lg">
              Schließe dich <span className="font-serif italic text-primary-400">tausenden erfolgreichen</span> Musikern an
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
