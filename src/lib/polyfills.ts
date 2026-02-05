// lib/polyfills.ts
// Type declarations for global polyfills
declare global {
  interface Window {
    process?: {
      env: Record<string, string | undefined>;
      version?: string;
      platform?: string;
      nextTick?: (callback: () => void) => void;
    };
    Buffer?: typeof Buffer;
    global?: typeof globalThis;
    setImmediate?: (callback: () => void) => NodeJS.Immediate;
    clearImmediate?: (immediateId: NodeJS.Immediate) => void;
  }
}

// Polyfill initialization
export function initializePolyfills() {
  if (typeof window === 'undefined') return;
  
  // Polyfill process
  if (!window.process) {
    window.process = {
      env: {
        NODE_ENV: process.env.NODE_ENV || 'production',
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://pos.abiaone.com',
      },
      version: '',
      platform: 'browser',
      nextTick: (cb: () => void) => setTimeout(cb, 0),
    };
  }
  
  // Polyfill Buffer
  if (!window.Buffer) {
    try {
      window.Buffer = require('buffer').Buffer;
    } catch (e) {
      console.warn('Buffer polyfill not available');
    }
  }
  
  // Polyfill global
  if (!window.global) {
    window.global = window;
  }
  
  // POS-specific polyfills
  if (!window.setImmediate) {
    window.setImmediate = (handler: () => void) => {
      const id = setTimeout(handler, 0);
      return id as unknown as NodeJS.Immediate;
    };
    
    window.clearImmediate = (id: NodeJS.Immediate) => {
      clearTimeout(id as unknown as number);
    };
  }
  
  // Additional POS fixes
  if (!window.requestIdleCallback) {
    window.requestIdleCallback = (callback: IdleRequestCallback, options?: IdleRequestOptions) => {
      const start = Date.now();
      return setTimeout(() => {
        callback({
          didTimeout: false,
          timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
        });
      }, 1) as unknown as number;
    };
    
    window.cancelIdleCallback = (id: number) => {
      clearTimeout(id);
    };
  }
}