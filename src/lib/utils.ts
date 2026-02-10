import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Sets up the mobile gesture help indicator.
 * This shows a brief instruction overlay that fades out after 3 seconds for first-time users.
 */
export const setupMobileGestureHelp = () => {
  try {
    // Check if we're on a touch device
    if ('ontouchstart' in window) {
      // Check if this is the first visit
      const hasSeenHelp = localStorage.getItem('hasSeenGestureHelp');
      
      if (!hasSeenHelp) {
        // Show the help indicator
        const helpElement = document.getElementById('mobile-gesture-help');
        if (helpElement) {
          helpElement.style.display = 'block';
          
          // Fade it out after 3 seconds
          setTimeout(() => {
            helpElement.style.opacity = '0';
            helpElement.style.transition = 'opacity 1s ease-out';
            
            // Remove from DOM after fade out
            setTimeout(() => {
              helpElement.style.display = 'none';
            }, 1000);
          }, 3000);
          
          // Save that user has seen the help
          localStorage.setItem('hasSeenGestureHelp', 'true');
        }
      }
    }
  } catch (error) {
    // Silent fail in case of localStorage issues
    console.error('Error setting up mobile gesture help:', error);
  }
};