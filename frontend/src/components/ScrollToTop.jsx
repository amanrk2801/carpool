import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.scrollTo) {
      window.scrollTo({ 
        top: 0, 
        left: 0, 
        behavior: 'instant'
      });
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    const scrollableElements = document.querySelectorAll('[style*="overflow"]');
    scrollableElements.forEach(element => {
      element.scrollTop = 0;
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
