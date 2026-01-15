import type { Organization, WebSite, Article, BreadcrumbList, FAQPage, HowTo, Service } from 'schema-dts';

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export const generateMetaTags = (metadata: SEOMetadata) => {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = 'https://musikmarketing.de/og-image.jpg',
    ogType = 'website',
    articlePublishedTime,
    articleModifiedTime,
    articleAuthor,
    noindex = false,
    nofollow = false,
  } = metadata;

  const robots = [];
  if (noindex) robots.push('noindex');
  if (nofollow) robots.push('nofollow');
  if (!noindex && !nofollow) robots.push('index', 'follow');

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords.join(', ') },
      { name: 'robots', content: robots.join(', ') },
      
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: canonical || window.location.href },
      { property: 'og:site_name', content: 'Musikmarketing.de' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      
      // Article specific
      ...(articlePublishedTime ? [{ property: 'article:published_time', content: articlePublishedTime }] : []),
      ...(articleModifiedTime ? [{ property: 'article:modified_time', content: articleModifiedTime }] : []),
      ...(articleAuthor ? [{ property: 'article:author', content: articleAuthor }] : []),
    ],
    link: canonical ? [{ rel: 'canonical', href: canonical }] : [],
  };
};

export const generateOrganizationSchema = (): Organization => {
  return {
    '@type': 'Organization',
    '@id': 'https://musikmarketing.de/#organization',
    name: 'Musikmarketing.de',
    url: 'https://musikmarketing.de',
    logo: {
      '@type': 'ImageObject',
      url: 'https://musikmarketing.de/logo.png',
    },
    description: 'Professionelle Musikmarketing-Lösungen für Künstler und Labels',
    sameAs: [
      'https://www.instagram.com/musikmarketing.de',
      'https://www.facebook.com/musikmarketing.de',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@musikmarketing.de',
    },
  };
};

export const generateWebSiteSchema = (): WebSite => {
  return {
    '@type': 'WebSite',
    '@id': 'https://musikmarketing.de/#website',
    url: 'https://musikmarketing.de',
    name: 'Musikmarketing.de',
    description: 'Musikmarketing Strategien, Tipps und professionelle Dienstleistungen',
    publisher: {
      '@id': 'https://musikmarketing.de/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://musikmarketing.de/blog?search={search_term_string}',
      },
    },
  };
};

export const generateArticleSchema = (
  title: string,
  description: string,
  publishedTime: string,
  modifiedTime: string,
  author: string,
  imageUrl: string,
  url: string
): Article => {
  return {
    '@type': 'Article',
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@id': 'https://musikmarketing.de/#organization',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>): BreadcrumbList => {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>): FAQPage => {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

export const generateHowToSchema = (
  name: string,
  description: string,
  steps: Array<{ name: string; text: string; image?: string }>
): HowTo => {
  return {
    '@type': 'HowTo',
    name: name,
    description: description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: {
          '@type': 'ImageObject',
          url: step.image,
        },
      }),
    })),
  };
};

export const generateServiceSchema = (
  name: string,
  description: string
): Service => {
  return {
    '@type': 'Service',
    name: name,
    description: description,
    provider: {
      '@id': 'https://musikmarketing.de/#organization',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    serviceType: 'Music Marketing',
  };
};

export const injectStructuredData = (schema: any) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    ...schema,
  });
  
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.replaceWith(script);
  } else {
    document.head.appendChild(script);
  }
};
