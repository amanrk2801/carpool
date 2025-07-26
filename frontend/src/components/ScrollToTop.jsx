import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * This component automatically scrolls to the top of the page
 * whenever the route changes. It should be placed inside the Router
 * but outside the Routes component.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to top on route change
    if (window.scrollTo) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      // Fallback for older browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
