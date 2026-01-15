import SEO from '../components/SEO';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateServiceSchema,
} from './seo';

export const HomePageSEO = () => (
  <SEO
    title="Musikmarketing.de - Professionelle Musikmarketing Strategien & Tipps"
    description="Entdecke bewährte Musikmarketing-Strategien für Künstler und Labels. Instagram, TikTok, Spotify Marketing und mehr. Kostenlose Tipps und professionelle Beratung."
    keywords={[
      'Musikmarketing',
      'Musik Marketing',
      'Instagram Marketing Musiker',
      'Spotify Marketing',
      'TikTok für Musiker',
      'Musikmarketing Agentur',
      'Social Media Marketing Musik',
    ]}
    canonical="https://musikmarketing.de/"
    ogImage="https://musikmarketing.de/og-home.jpg"
    schema={{
      '@context': 'https://schema.org',
      '@graph': [
        generateOrganizationSchema(),
        generateWebSiteSchema(),
      ],
    }}
  />
);

export const BlogPostSEO = ({
  title,
  description,
  slug,
  publishedDate,
  modifiedDate,
  author,
  imageUrl,
  keywords = [],
}: {
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  modifiedDate: string;
  author: string;
  imageUrl: string;
  keywords?: string[];
}) => (
  <SEO
    title={`${title} | Musikmarketing.de Blog`}
    description={description}
    keywords={keywords}
    canonical={`https://musikmarketing.de/blog/${slug}`}
    ogImage={imageUrl}
    ogType="article"
    articlePublishedTime={publishedDate}
    articleModifiedTime={modifiedDate}
    articleAuthor={author}
    schema={{
      '@context': 'https://schema.org',
      '@graph': [
        generateArticleSchema(
          title,
          description,
          publishedDate,
          modifiedDate,
          author,
          imageUrl,
          `https://musikmarketing.de/blog/${slug}`
        ),
        generateBreadcrumbSchema([
          { name: 'Home', url: 'https://musikmarketing.de' },
          { name: 'Blog', url: 'https://musikmarketing.de/blog' },
          { name: title, url: `https://musikmarketing.de/blog/${slug}` },
        ]),
      ],
    }}
  />
);

export const ServicePageSEO = () => (
  <SEO
    title="Musikmarketing Agentur - Professionelle Beratung & Kampagnen | Musikmarketing.de"
    description="Professionelle Musikmarketing-Agentur für Künstler und Labels. Individuelle Strategien, Social Media Kampagnen, Spotify Promotion und mehr."
    keywords={[
      'Musikmarketing Agentur',
      'Musik Marketing Beratung',
      'Social Media Kampagnen Musik',
      'Spotify Promotion',
      'Instagram Marketing Service',
    ]}
    canonical="https://musikmarketing.de/musikmarketing-agentur"
    ogImage="https://musikmarketing.de/og-agentur.jpg"
    schema={{
      '@context': 'https://schema.org',
      '@graph': [
        generateServiceSchema(
          'Musikmarketing Agentur',
          'Professionelle Musikmarketing-Dienstleistungen für Künstler und Labels'
        ),
        generateBreadcrumbSchema([
          { name: 'Home', url: 'https://musikmarketing.de' },
          { name: 'Musikmarketing Agentur', url: 'https://musikmarketing.de/musikmarketing-agentur' },
        ]),
      ],
    }}
  />
);
