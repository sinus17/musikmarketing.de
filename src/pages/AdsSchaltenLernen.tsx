import PageLayout from '../components/PageLayout';
import { Typography, Box } from '@mui/material';
import { generateHowToSchema, generateBreadcrumbSchema, generateFAQSchema } from '../utils/seo';

const AdsSchaltenLernen = () => {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://musikmarketing.de' },
    { name: 'Ads schalten lernen', url: 'https://musikmarketing.de/ads-schalten-lernen' },
  ]);

  const howToSchema = generateHowToSchema(
    'Instagram Ads für Musiker schalten',
    'Schritt-für-Schritt Anleitung, wie du Instagram Ads, Facebook Ads und TikTok Ads für deine Musik schaltest.',
    [
      { name: 'Ziel definieren', text: 'Definiere was du erreichen willst: Mehr Spotify Streams, Instagram Follower, Pre-Saves oder Ticket-Verkäufe' },
      { name: 'Zielgruppe festlegen', text: 'Definiere deine Zielgruppe nach Alter, Geschlecht, Standort, Interessen und Verhalten' },
      { name: 'Creative erstellen', text: 'Erstelle hochwertige Visuals mit Hook in den ersten 3 Sekunden und klarem Call-to-Action' },
      { name: 'Budget festlegen', text: 'Starte mit 5-10€ pro Tag als Anfänger und skaliere bei Erfolg' },
      { name: 'Kampagne starten und optimieren', text: 'Warte 3-5 Tage für erste Daten, analysiere Performance und optimiere kontinuierlich' },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'Wie viel Budget brauche ich für Instagram Ads?',
      answer: 'Als Anfänger solltest du mit 5-10€ pro Tag starten. Das reicht aus, um erste Daten zu sammeln und zu testen, was funktioniert. Fortgeschrittene nutzen 20-50€ pro Tag, Profis 100€+ pro Tag. Wichtig: Starte klein und skaliere nur erfolgreiche Kampagnen.'
    },
    {
      question: 'Welche Ad-Plattform ist am besten für Musiker?',
      answer: 'Instagram Ads sind aktuell am effektivsten für Musiker. Die Plattform bietet exzellentes Targeting und verschiedene Formate (Stories, Feed, Reels). TikTok Ads haben hohes virales Potenzial. Facebook Ads eignen sich gut für Retargeting. Die beste Strategie kombiniert mehrere Plattformen.'
    },
    {
      question: 'Wie lange dauert es, bis Ads Ergebnisse zeigen?',
      answer: 'Erste Ergebnisse siehst du sofort nach dem Start. Für aussagekräftige Daten solltest du 3-5 Tage warten. Der Algorithmus braucht Zeit zum Lernen. Nach 7-10 Tagen kannst du fundierte Optimierungsentscheidungen treffen. Geduld ist wichtig - pausiere Kampagnen nicht zu früh.'
    },
    {
      question: 'Was ist ein guter CPM für Musik Ads?',
      answer: 'Ein guter CPM (Cost per 1000 Impressions) liegt bei 3-8€. Das variiert je nach Zielgruppe und Land. Deutschland ist teurer als andere Länder. Wichtiger als der CPM ist aber die Conversion Rate - wie viele Klicks führen zur gewünschten Aktion (Stream, Follow, Pre-Save).'
    },
    {
      question: 'Brauche ich professionelle Creatives für Ads?',
      answer: 'Hochwertige Creatives sind wichtig, aber sie müssen nicht teuer produziert sein. Authentische, gut gemachte Smartphone-Videos funktionieren oft besser als überproduzierte Inhalte. Der Hook in den ersten 3 Sekunden ist entscheidend. Teste verschiedene Varianten und optimiere basierend auf Daten.'
    }
  ]);

  return (
    <PageLayout
      title="Ads schalten lernen für Musiker: Instagram, Facebook & TikTok Ads 2026"
      description="Lerne Instagram Ads, Facebook Ads und TikTok Ads für deine Musik zu schalten. Schritt-für-Schritt Anleitung mit praxiserprobten Strategien."
      keywords="Instagram Ads, Facebook Ads, TikTok Ads, Musikwerbung, Paid Ads für Musiker, Ads schalten lernen, Social Media Ads, Musik Promotion"
      canonical="https://musikmarketing.de/ads-schalten-lernen"
      schema={{
        '@graph': [breadcrumbSchema, howToSchema, faqSchema]
      }}
      ctaTitle="Lerne Ads professionell zu schalten"
      ctaDescription="Unser Instagram Ads Blueprint zeigt dir Schritt für Schritt, wie du profitable Ads für deine Musik schaltest."
      ctaButtonText="Zum Instagram Ads Blueprint"
      ctaButtonLink="https://song.so/instagram-ads-blueprint"
    >
      <Typography variant="h2">
        Warum Ads für Musiker wichtig sind
      </Typography>
      <Typography variant="body1">
        Paid Ads sind der schnellste Weg, um neue Hörer zu erreichen. Während organisches Wachstum Zeit braucht, kannst du mit Ads sofort Ergebnisse sehen und deine Reichweite skalieren.
      </Typography>

      <Typography variant="h2">
        Die wichtigsten Ad-Plattformen für Musiker
      </Typography>

      <Typography variant="h3">
        1. Instagram Ads
      </Typography>
      <Typography variant="body1">
        Instagram Ads sind perfekt für Musiker. Du kannst gezielt deine Zielgruppe ansprechen und verschiedene Formate nutzen:
      </Typography>
      <ul>
        <li>Story Ads: Volle Aufmerksamkeit im Vollbild-Format</li>
        <li>Feed Ads: Klassische Posts mit hoher Reichweite</li>
        <li>Reels Ads: Maximale Reichweite durch den Algorithmus</li>
      </ul>

      <Typography variant="h3">
        2. Facebook Ads
      </Typography>
      <Typography variant="body1">
        Facebook Ads bieten die beste Targeting-Möglichkeit:
      </Typography>
      <ul>
        <li>Detailliertes Targeting nach Interessen</li>
        <li>Lookalike Audiences</li>
        <li>Retargeting von Website-Besuchern</li>
      </ul>

      <Typography variant="h3">
        3. TikTok Ads
      </Typography>
      <Typography variant="body1">
        TikTok Ads sind ideal für virale Reichweite:
      </Typography>
      <ul>
        <li>In-Feed Ads: Native Ads im For You Feed</li>
        <li>Spark Ads: Booste organische Posts</li>
        <li>TopView Ads: Maximale Sichtbarkeit</li>
      </ul>

      <Typography variant="h2">
        Schritt-für-Schritt: Deine erste Ad-Kampagne
      </Typography>

      <Typography variant="h3">
        Schritt 1: Ziel definieren
      </Typography>
      <Typography variant="body1">
        Was willst du erreichen?
      </Typography>
      <ul>
        <li>Mehr Spotify Streams</li>
        <li>Instagram Follower</li>
        <li>Pre-Saves für einen Release</li>
        <li>Ticket-Verkäufe</li>
      </ul>

      <Typography variant="h3">
        Schritt 2: Zielgruppe festlegen
      </Typography>
      <Typography variant="body1">
        Definiere deine Zielgruppe genau:
      </Typography>
      <ul>
        <li>Alter und Geschlecht</li>
        <li>Standort</li>
        <li>Interessen (ähnliche Artists, Genres)</li>
        <li>Verhalten (Spotify-Nutzer, Konzertbesucher)</li>
      </ul>

      <Typography variant="h3">
        Schritt 3: Creative erstellen
      </Typography>
      <Typography variant="body1">
        Dein Ad-Creative ist entscheidend:
      </Typography>
      <ul>
        <li>Nutze hochwertige Visuals</li>
        <li>Hook in den ersten 3 Sekunden</li>
        <li>Klarer Call-to-Action</li>
        <li>Teste verschiedene Varianten</li>
      </ul>

      <Typography variant="h3">
        Schritt 4: Budget festlegen
      </Typography>
      <Typography variant="body1">
        Starte mit einem kleinen Budget:
      </Typography>
      <ul>
        <li>Anfänger: 5-10€ pro Tag</li>
        <li>Fortgeschritten: 20-50€ pro Tag</li>
        <li>Profis: 100€+ pro Tag</li>
      </ul>

      <Typography variant="h3">
        Schritt 5: Kampagne starten und optimieren
      </Typography>
      <Typography variant="body1">
        Nach dem Start:
      </Typography>
      <ul>
        <li>Warte 3-5 Tage für erste Daten</li>
        <li>Analysiere die Performance</li>
        <li>Pausiere schlechte Ads</li>
        <li>Skaliere erfolgreiche Ads</li>
      </ul>

      <Typography variant="h2">
        Wichtige Metriken
      </Typography>
      <Typography variant="body1">
        Diese Metriken solltest du im Auge behalten:
      </Typography>
      <ul>
        <li><strong>CPM:</strong> Cost per 1000 Impressions</li>
        <li><strong>CPC:</strong> Cost per Click</li>
        <li><strong>CTR:</strong> Click-Through-Rate</li>
        <li><strong>Conversion Rate:</strong> Wie viele Klicks führen zur gewünschten Aktion</li>
      </ul>

      <Typography variant="h2">
        Häufige Fehler vermeiden
      </Typography>
      <ul>
        <li>Zu breite Zielgruppe</li>
        <li>Schlechte Creatives</li>
        <li>Zu wenig Budget zum Testen</li>
        <li>Kampagne zu früh stoppen</li>
        <li>Keine Analyse der Ergebnisse</li>
      </ul>

      <Typography variant="h2">
        Fazit
      </Typography>
      <Typography variant="body1">
        Ads schalten ist eine Kunst und Wissenschaft zugleich. Mit den richtigen Strategien und kontinuierlichem Testing kannst du profitable Kampagnen aufbauen und deine Musik erfolgreich vermarkten.
      </Typography>

      <Typography variant="h2">
        Häufig gestellte Fragen zu Ads für Musiker
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3">
          Wie viel Budget brauche ich für Instagram Ads?
        </Typography>
        <Typography variant="body1">
          Als Anfänger solltest du mit 5-10€ pro Tag starten. Das reicht aus, um erste Daten zu sammeln und zu testen, was funktioniert. Fortgeschrittene nutzen 20-50€ pro Tag, Profis 100€+ pro Tag. Wichtig: Starte klein und skaliere nur erfolgreiche Kampagnen.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h3">
          Welche Ad-Plattform ist am besten für Musiker?
        </Typography>
        <Typography variant="body1">
          Instagram Ads sind aktuell am effektivsten für Musiker. Die Plattform bietet exzellentes Targeting und verschiedene Formate (Stories, Feed, Reels). TikTok Ads haben hohes virales Potenzial. Facebook Ads eignen sich gut für Retargeting. Die beste Strategie kombiniert mehrere Plattformen.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h3">
          Wie lange dauert es, bis Ads Ergebnisse zeigen?
        </Typography>
        <Typography variant="body1">
          Erste Ergebnisse siehst du sofort nach dem Start. Für aussagekräftige Daten solltest du 3-5 Tage warten. Der Algorithmus braucht Zeit zum Lernen. Nach 7-10 Tagen kannst du fundierte Optimierungsentscheidungen treffen. Geduld ist wichtig - pausiere Kampagnen nicht zu früh.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h3">
          Was ist ein guter CPM für Musik Ads?
        </Typography>
        <Typography variant="body1">
          Ein guter CPM (Cost per 1000 Impressions) liegt bei 3-8€. Das variiert je nach Zielgruppe und Land. Deutschland ist teurer als andere Länder. Wichtiger als der CPM ist aber die Conversion Rate - wie viele Klicks führen zur gewünschten Aktion (Stream, Follow, Pre-Save).
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h3">
          Brauche ich professionelle Creatives für Ads?
        </Typography>
        <Typography variant="body1">
          Hochwertige Creatives sind wichtig, aber sie müssen nicht teuer produziert sein. Authentische, gut gemachte Smartphone-Videos funktionieren oft besser als überproduzierte Inhalte. Der Hook in den ersten 3 Sekunden ist entscheidend. Teste verschiedene Varianten und optimiere basierend auf Daten.
        </Typography>
      </Box>
    </PageLayout>
  );
};

export default AdsSchaltenLernen;
