import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function testAuth() {
  try {
    console.log('🔐 Testing Google Auth...\n');
    console.log('Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    console.log('Project:', process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID);
    
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

    const client = await auth.getClient();
    console.log('\n✅ Auth erfolgreich!');
    console.log('Client type:', client.constructor.name);
    
  } catch (error) {
    console.error('\n❌ Auth Fehler:', error.message);
  }
}

testAuth();
