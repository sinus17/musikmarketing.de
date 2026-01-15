import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import type { SEOMetadata } from '../utils/seo';
import { generateMetaTags, injectStructuredData } from '../utils/seo';

interface SEOProps extends SEOMetadata {
  schema?: any;
}

export default function SEO({ schema, ...metadata }: SEOProps) {
  const metaTags = generateMetaTags(metadata);

  useEffect(() => {
    if (schema) {
      injectStructuredData(schema);
    }
  }, [schema]);

  return (
    <Helmet>
      <title>{metaTags.title}</title>
      {metaTags.meta.map((tag, index) => {
        if ('name' in tag) {
          return <meta key={index} name={tag.name} content={tag.content} />;
        } else if ('property' in tag) {
          return <meta key={index} property={tag.property} content={tag.content} />;
        }
        return null;
      })}
      {metaTags.link.map((link, index) => (
        <link key={index} rel={link.rel} href={link.href} />
      ))}
    </Helmet>
  );
}
