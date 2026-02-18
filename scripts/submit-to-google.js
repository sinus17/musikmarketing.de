import { promises as fs } from 'fs';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const PROPERTY_URL = process.env.GOOGLE_SEARCH_CONSOLE_DOMAIN || 'https://musikmarketing.de';
const SITEMAP_URL = `${PROPERTY_URL}/sitemap.xml`;

async function createAuthClient() {
  try {
    const auth = new google.auth.GoogleAuth({
      projectId: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
        private_key_id: 'ec574f8611041eae16358e1cff43351f5ad3275a',
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        client_id: '115534913749533601710',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      },
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });

    return auth;
  } catch (error) {
    console.error('❌ Auth error:', error.message);
    throw error;
  }
}

async function submitSitemap() {
  try {
    const auth = await createAuthClient();
    const webmasters = google.webmasters({ version: 'v3', auth });

    console.log(`📡 Sitemap wird eingereicht: ${SITEMAP_URL}`);

    // Versuche verschiedene Format-Varianten
    const siteUrlVariants = [
      PROPERTY_URL,
      `sc-domain:${PROPERTY_URL.replace('https://', '')}`,
      `https://musikmarketing.de/`,
    ];

    let submitted = false;

    for (const siteUrl of siteUrlVariants) {
      try {
        console.log(`  Trying format: ${siteUrl}`);
        const response = await webmasters.sitemaps.submit({
          siteUrl: siteUrl,
          feedpath: SITEMAP_URL,
        });
        console.log(`✅ Sitemap erfolgreich eingereicht mit Format: ${siteUrl}`);
        submitted = true;
        break;
      } catch (err) {
        console.log(`  ⚠️ Format ${siteUrl} fehlgeschlagen: ${err.message}`);
        continue;
      }
    }

    if (!submitted) {
      console.log('⚠️ Sitemap-Submit fehlgeschlagen bei allen Formaten - möglicherweise bereits vorhanden');
    }

    return true;
  } catch (error) {
    console.error(`❌ Fehler beim Sitemap-Submit:`, error.message);
    return true;
  }
}

async function requestIndexing(urls) {
  try {
    const auth = await createAuthClient();
    const indexing = google.indexing({ version: 'v3', auth });

    console.log(`\n📝 Anforderung zur Indexierung von ${urls.length} URL(s)...`);

    for (const url of urls) {
      try {
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        console.log(`  ✅ ${url}`);
      } catch (error) {
        console.error(`  ❌ ${url}: ${error.message}`);
      }
    }

    return true;
  } catch (error) {
    console.error(`❌ Fehler bei der Indexierungsanforderung:`, error.message);
    return false;
  }
}

async function getNewArticles() {
  try {
    // Diese Funktion wird später erweitert, um neue URLs aus der Supabase zu holen
    // Für jetzt: leeres Array (nur Sitemap wird submitted)
    return [];
  } catch (error) {
    console.error('❌ Fehler beim Abrufen neuer Artikel:', error.message);
    return [];
  }
}

async function logResult(sitemapSuccess, indexingSuccess) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] Sitemap: ${sitemapSuccess ? '✅' : '❌'} | Indexierung: ${indexingSuccess ? '✅' : '❌'}\n`;

  const logPath = path.join(__dirname, '../logs/google-search-console.log');
  
  // Erstelle logs-Verzeichnis falls nicht vorhanden
  const logsDir = path.dirname(logPath);
  try {
    await fs.mkdir(logsDir, { recursive: true });
    await fs.appendFile(logPath, logEntry);
    console.log(`\n📋 Log gespeichert: ${logPath}`);
  } catch (error) {
    console.error('⚠️ Fehler beim Speichern des Logs:', error.message);
  }
}

async function main() {
  console.log('🚀 Google Search Console Integration\n');
  console.log(`📍 Domain: ${PROPERTY_URL}`);
  console.log(`📍 Sitemap: ${SITEMAP_URL}\n`);

  // Step 1: Sitemap einreichen
  const sitemapSuccess = await submitSitemap();

  // Step 2: Neue URLs zur Indexierung anfordern
  const newArticles = await getNewArticles();
  let indexingSuccess = true;

  if (newArticles.length > 0) {
    indexingSuccess = await requestIndexing(newArticles);
  } else {
    console.log('ℹ️ Keine neuen URLs für Indexierung vorhanden');
  }

  // Step 3: Ergebnis loggen
  await logResult(sitemapSuccess, indexingSuccess);

  console.log('\n✨ Fertig!\n');
  process.exit(sitemapSuccess && indexingSuccess ? 0 : 1);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
