# SEO Quick Start Guide 🚀

## Immediate Actions After Setup

### 1. Update Your Domain in Configuration
Replace `musikmarketing.de` with your actual domain in:
- `vite.config.ts` (sitemap hostname)
- `src/utils/seo.ts` (all schema URLs)
- `src/utils/seoExamples.tsx` (all example URLs)

### 2. Add SEO to Your Existing Pages

#### Homepage Example
```tsx
import { HomePageSEO } from '../utils/seoExamples';

function Home() {
  return (
    <>
      <HomePageSEO />
      {/* Your existing content */}
    </>
  );
}
```

#### Custom Page Example
```tsx
import SEO from '../components/SEO';

function MyPage() {
  return (
    <>
      <SEO
        title="Your Page Title - Musikmarketing.de"
        description="A compelling description under 160 characters"
        keywords={['musik', 'marketing', 'relevant', 'keywords']}
        canonical="https://musikmarketing.de/your-page"
      />
      {/* Your content */}
    </>
  );
}
```

### 3. Build and Test

```bash
# Build the project
npm run build

# Check generated files
ls dist/sitemap.xml
ls dist/robots.txt

# Preview production build
npm run preview
```

### 4. Submit to Google Search Console

1. Go to https://search.google.com/search-console
2. Add your property (domain or URL prefix)
3. Verify ownership
4. Submit sitemap: `https://your-domain.com/sitemap.xml`

### 5. Test Your SEO

**Rich Results Test:**
https://search.google.com/test/rich-results

**PageSpeed Insights:**
https://pagespeed.web.dev/

**Schema Validator:**
https://validator.schema.org/

### 6. Monitor Web Vitals

Check Google Analytics 4 → Events → Web Vitals to see:
- CLS (Cumulative Layout Shift)
- FCP (First Contentful Paint)
- LCP (Largest Contentful Paint)
- TTFB (Time to First Byte)
- INP (Interaction to Next Paint)

## Common Tasks

### Adding a New Page to Sitemap

Edit `vite.config.ts`:
```typescript
sitemap({
  hostname: 'https://musikmarketing.de',
  dynamicRoutes: [
    '/',
    '/musikmarketing-agentur',
    '/blog',
    '/your-new-page', // Add here
  ],
  // ...
})
```

### Creating Blog Post SEO

```tsx
import { BlogPostSEO } from '../utils/seoExamples';

function BlogPost() {
  return (
    <>
      <BlogPostSEO
        title="Your Blog Post Title"
        description="Post description"
        slug="post-slug"
        publishedDate="2024-01-15T10:00:00Z"
        modifiedDate="2024-01-15T12:00:00Z"
        author="Author Name"
        imageUrl="https://musikmarketing.de/blog-image.jpg"
        keywords={['keyword1', 'keyword2']}
      />
      {/* Your blog content */}
    </>
  );
}
```

### Blocking AI Bots (if needed)

Edit `vite.config.ts` to disallow specific bots:
```typescript
{
  userAgent: 'GPTBot',
  disallow: ['/'], // Block from entire site
}
```

## SEO Checklist ✅

- [ ] Updated all domain URLs in config files
- [ ] Added SEO component to all pages
- [ ] Created unique titles and descriptions for each page
- [ ] Added Schema.org markup to content
- [ ] Tested with Rich Results Test
- [ ] Submitted sitemap to Google Search Console
- [ ] Verified mobile responsiveness
- [ ] Optimized images with alt text
- [ ] Checked Core Web Vitals scores
- [ ] Set up canonical URLs
- [ ] Added Open Graph images

## Need Help?

See full documentation in `SEO_SETUP.md`
