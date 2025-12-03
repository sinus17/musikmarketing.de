import PageLayout from '../components/PageLayout';
import { Typography, Box, Stack } from '@mui/material';

const MusikmarketingAgentur = () => {
  const services = [
    {
      title: "Instagram Marketing",
      description: "Professionelle Instagram Strategien für Artists und Musiker"
    },
    {
      title: "TikTok Marketing",
      description: "Datenbasierte TikTok Strategien für Musikpromotion"
    },
    {
      title: "Instagram Ads",
      description: "Professionelle Instagram Werbeanzeigen für Artists"
    },
    {
      title: "Spotify Marketing",
      description: "Pre-Save Kampagnen und Playlist Pitching"
    }
  ];

  return (
    <PageLayout
      title="Musikmarketing Agentur"
      description="SwipeUp Marketing ist eine der führenden Musikmarketing Agenturen in Deutschland und betreibt das Ratgeber Portal musikmarketing.de."
      keywords="Musikmarketing Agentur, SwipeUp Marketing, musikmarketing.de, Organic Marketing, Paid Ads, Instagram Marketing, TikTok Marketing"
      ctaTitle="Bereit für professionelles Musikmarketing?"
      ctaDescription="Buche jetzt eine kostenlose Strategy-Session und erhalte einen individuellen Plan für deine Musikkarriere."
      ctaButtonText="Kostenlose Strategy-Session buchen"
      ctaButtonLink="https://swipeup-marketing.com/strategy-session"
    >
      <Typography variant="h2">
        Über SwipeUp Marketing
      </Typography>
      <Typography variant="body1">
        SwipeUp Marketing ist eine der führenden Musikmarketing Agenturen in Deutschland. Wir betreiben das Ratgeber Portal musikmarketing.de und helfen Artists dabei, ihre Musik erfolgreich zu vermarkten.
      </Typography>
      <Typography variant="body1">
        Unsere Mission ist es, Artists die Tools und das Wissen zu geben, um ihre Musikkarriere selbst in die Hand zu nehmen. Durch unsere Online-Kurse, Beratungen und Done-For-You Services unterstützen wir Artists auf jedem Level.
      </Typography>

      <Typography variant="h2">
        Unsere Services
      </Typography>
      <Stack spacing={2}>
        {services.map((service, index) => (
          <Box
            key={index}
            sx={{
              p: 3,
              background: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: '4px',
            }}
          >
            <Typography variant="h3" sx={{ fontSize: '1.25rem', mb: 1 }}>
              {service.title}
            </Typography>
            <Typography variant="body1">
              {service.description}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Typography variant="h2">
        Warum SwipeUp Marketing?
      </Typography>
      <ul>
        <li><strong>Erfahrung:</strong> Über 4 Jahre Erfahrung im Musikmarketing</li>
        <li><strong>Ergebnisse:</strong> Hunderte erfolgreiche Kampagnen für Artists</li>
        <li><strong>Transparenz:</strong> Klare Kommunikation und ehrliche Beratung</li>
        <li><strong>Bildung:</strong> Wir teilen unser Wissen durch Kurse und Content</li>
      </ul>

      <Typography variant="h2">
        Für wen sind wir geeignet?
      </Typography>
      <Typography variant="body1">
        Unsere Services sind perfekt für:
      </Typography>
      <ul>
        <li>Independent Artists, die ihre Reichweite steigern wollen</li>
        <li>Labels, die ihre Artists professionell vermarkten möchten</li>
        <li>Musiker, die von ihrer Musik leben wollen</li>
        <li>Artists, die ihre Social Media Präsenz aufbauen wollen</li>
      </ul>

      <Typography variant="h2">
        Unsere Philosophie
      </Typography>
      <Typography variant="body1">
        Wir glauben daran, dass jeder Artist die Möglichkeit haben sollte, seine Musik erfolgreich zu vermarkten. Deshalb bieten wir nicht nur Done-For-You Services an, sondern auch Online-Kurse, die Artists befähigen, ihr Marketing selbst in die Hand zu nehmen.
      </Typography>
      <Typography variant="body1">
        Unser Ziel ist es nicht, dich abhängig zu machen, sondern dir die Tools und das Wissen zu geben, um langfristig erfolgreich zu sein.
      </Typography>
    </PageLayout>
  );
};

export default MusikmarketingAgentur;
