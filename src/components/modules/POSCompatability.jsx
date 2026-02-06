// components/POSCompatibility.tsx
'use client';
import { useEffect } from 'react';
export default function POSCompatibility() {
    useEffect(function () {
        // Check if running on P8 POS
        var isPOSDevice = function () {
            var ua = navigator.userAgent.toLowerCase();
            return /android.*(p8|pos|terminal)/i.test(ua) ||
                /p8.*(pos|terminal)/i.test(ua);
        };
        if (isPOSDevice()) {
            // Disable problematic features on POS
            console.log('Running on POS device - applying compatibility fixes');
            // Fix for console errors that crash POS webview
            var originalError_1 = console.error;
            console.error = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // Filter out common harmless errors
                var errorMsg = args.join(' ');
                if (errorMsg.includes('process is not defined') ||
                    errorMsg.includes('Buffer is not defined') ||
                    errorMsg.includes('Unable to preload CSS')) {
                    console.warn('Filtered POS error:', errorMsg);
                    return;
                }
                originalError_1.apply(console, args);
            };
            // Prevent hydration errors
            if (typeof window !== 'undefined') {
                var originalAddEventListener_1 = window.addEventListener;
                window.addEventListener = function (type, listener, options) {
                    // Filter out certain event listeners that may cause issues
                    if (type === 'error' || type === 'unhandledrejection') {
                        return originalAddEventListener_1.call(this, type, listener, options);
                    }
                    return originalAddEventListener_1.call(this, type, listener, options);
                };
            }
        }
    }, []);
    return null;
}
