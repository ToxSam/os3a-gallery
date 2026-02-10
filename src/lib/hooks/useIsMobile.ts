'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook that detects if the current viewport is a mobile device
 * @param breakpoint - The maximum width to consider as mobile (default: 768px)
 * @returns boolean indicating if the current viewport is mobile
 */
export const useIsMobile = (breakpoint = 768) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Function to check if screen is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Set initial value
    checkIsMobile();

    // Add event listener
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  // Return false during SSR, return actual value after mounting
  return hasMounted ? isMobile : false;
}; 