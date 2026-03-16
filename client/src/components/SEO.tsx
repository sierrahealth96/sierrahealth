// components/SEO.tsx
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';
import { BASE_URL } from "@/Url";

interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  structuredData?: any;
}

export function SEO({ 
  title, 
  description, 
  keywords, 
  image = '/og-image.jpg',
  structuredData 
}: SEOProps) {
  const [location] = useLocation();
  
  const pageTitle = `${title} | Sierra Health`;
  const canonicalUrl = `${BASE_URL}${location}`;
  const metaImage = `${BASE_URL}${image}`;

  return (
    <Helmet>
      {/* ✅ Basic Meta */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* ✅ Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Sierra Health" />
      
      {/* ✅ Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />
      
      {/* ✅ Canonical & Robots */}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />
      
      {/* ✅ Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
