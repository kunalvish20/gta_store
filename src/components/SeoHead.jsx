import {useEffect} from 'react';
import {getSeoPage} from '../data/seo';
import {useRoute} from '../hooks/useRoute';

function setMeta(attribute, name, content) {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function SeoHead() {
  const route = useRoute();

  useEffect(() => {
    const page = getSeoPage(route);
    document.title = page.title;
    setMeta('name', 'description', page.description);
    setMeta('name', 'robots', page.robots);
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:type', route.includes('/product/') ? 'product' : 'website');
    setMeta('property', 'og:url', page.url);
    setMeta('property', 'og:image', page.image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'twitter:image', page.image);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = page.url;

    let structuredData = document.getElementById('seo-json-ld');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'seo-json-ld';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({'@context': 'https://schema.org', '@graph': page.graph});
  }, [route]);

  return null;
}
