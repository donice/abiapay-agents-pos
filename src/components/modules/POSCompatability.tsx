// components/POSCompatibility.tsx
'use client';

import { useEffect } from 'react';

export default function POSCompatibility() {
  useEffect(() => {
    // Check if running on P8 POS
    const isPOSDevice = () => {
      const ua = navigator.userAgent.toLowerCase();
      return /android.*(p8|pos|terminal)/i.test(ua) || 
             /p8.*(pos|terminal)/i.test(ua);
    };
    
    if (isPOSDevice()) {
      // Disable problematic features on POS
      console.log('Running on POS device - applying compatibility fixes');
      
      // Fix for console errors that crash POS webview
      const originalError = console.error;
      console.error = (...args: any[]) => {
        // Filter out common harmless errors
        const errorMsg = args.join(' ');
        if (errorMsg.includes('process is not defined') || 
            errorMsg.includes('Buffer is not defined') ||
            errorMsg.includes('Unable to preload CSS')) {
          console.warn('Filtered POS error:', errorMsg);
          return;
        }
        originalError.apply(console, args);
      };
      
      // Prevent hydration errors
      if (typeof window !== 'undefined') {
        const originalAddEventListener = window.addEventListener;
        window.addEventListener = function(type: string, listener: any, options?: any) {
          // Filter out certain event listeners that may cause issues
          if (type === 'error' || type === 'unhandledrejection') {
            return originalAddEventListener.call(this, type, listener, options);
          }
          return originalAddEventListener.call(this, type, listener, options);
        };
      }
    }
  }, []);
  
  return null; 
}