// contexts/SEOContext.tsx
import { createContext, useContext } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
  structuredData?: any;
}

const SEOContext = createContext<SEOProps | null>(null);

export const useSEO = () => {
  const context = useContext(SEOContext);
  if (!context) throw new Error('useSEO must be used within SEOProvider');
  return context;
};

export default SEOContext;
