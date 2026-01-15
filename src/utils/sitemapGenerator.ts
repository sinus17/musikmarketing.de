export interface SitemapRoute {
  path: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  lastmod?: Date;
}

export const generateDynamicSitemap = async (baseUrl: string = 'https://musikmarketing.de'): Promise<SitemapRoute[]> => {
  const staticRoutes: SitemapRoute[] = [
    {
      path: '/',
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date(),
    },
    {
      path: '/musikmarketing-agentur',
      changefreq: 'monthly',
      priority: 0.9,
      lastmod: new Date(),
    },
    {
      path: '/blog',
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date(),
    },
  ];

  try {
    const response = await fetch(`${baseUrl}/api/blog-posts`);
    if (response.ok) {
      const blogPosts = await response.json();
      const blogRoutes: SitemapRoute[] = blogPosts.map((post: any) => ({
        path: `/blog/${post.slug}`,
        changefreq: 'monthly' as const,
        priority: 0.7,
        lastmod: new Date(post.updated_at || post.created_at),
      }));
      return [...staticRoutes, ...blogRoutes];
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return staticRoutes;
};

export const generateSitemapXML = (routes: SitemapRoute[], baseUrl: string = 'https://musikmarketing.de'): string => {
  const urlEntries = routes.map(route => `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    ${route.lastmod ? `<lastmod>${route.lastmod.toISOString()}</lastmod>` : ''}
    ${route.changefreq ? `<changefreq>${route.changefreq}</changefreq>` : ''}
    ${route.priority !== undefined ? `<priority>${route.priority}</priority>` : ''}
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};
