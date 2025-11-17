// hooks/useDataSectionScroll.js
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export const useSectionScroll = () => {
  const [searchParams] = useSearchParams();
  const sectionName = searchParams.get('section');

  useEffect(() => {
    if (!sectionName) return;

    let attempts = 0;
    const maxAttempts = 10;

    const tryScroll = () => {
      attempts++;
      const element = document.querySelector(`[data-section="${sectionName}"]`);
      
      if (element ) { // Vérifier que l'élément est visible
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else if (attempts < maxAttempts) {
        // Réessayer avec un délai progressif
        setTimeout(tryScroll, attempts * 200);
      }
    };

    // Premier essai après un court délai
    const timer = setTimeout(tryScroll, 100);
    
    return () => clearTimeout(timer);
  }, [sectionName]);
};