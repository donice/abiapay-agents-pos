// Polyfill initialization
export function initializePolyfills() {
    if (typeof window === 'undefined')
        return;
    // Polyfill process
    if (!window.process) {
        window.process = {
            env: {
                NODE_ENV: process.env.NODE_ENV || 'production',
                NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://pos.abiaone.com',
            },
            version: '',
            platform: 'browser',
            nextTick: function (cb) { return setTimeout(cb, 0); },
        };
    }
    // Polyfill Buffer
    if (!window.Buffer) {
        try {
            window.Buffer = require('buffer').Buffer;
        }
        catch (e) {
            console.warn('Buffer polyfill not available');
        }
    }
    // Polyfill global
    if (!window.global) {
        window.global = window;
    }
    // POS-specific polyfills
    if (!window.setImmediate) {
        window.setImmediate = function (handler) {
            var id = setTimeout(handler, 0);
            return id;
        };
        window.clearImmediate = function (id) {
            clearTimeout(id);
        };
    }
    // Additional POS fixes
    if (!window.requestIdleCallback) {
        window.requestIdleCallback = function (callback, options) {
            var start = Date.now();
            return setTimeout(function () {
                callback({
                    didTimeout: false,
                    timeRemaining: function () { return Math.max(0, 50 - (Date.now() - start)); },
                });
            }, 1);
        };
        window.cancelIdleCallback = function (id) {
            clearTimeout(id);
        };
    }
}
