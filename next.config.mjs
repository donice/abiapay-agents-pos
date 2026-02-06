import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['your-dependencies'],

  // Target older browsers
  experimental: {
    esmExternals: 'loose'
  },
  ignoreBuildErrors: true,
  // Disable image optimization if POS can't handle it
  images: {
    unoptimized: true,
  },

  // Force legacy browser support
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? false : true,
  },

  // Add webpack config
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Fix for 'process' undefined error
      config.resolve.fallback = {
        ...config.resolve.fallback,
        process: require.resolve('process/browser'),
        buffer: require.resolve('buffer/'),
        util: require.resolve('util/'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
         fs: false,
        net: false,
        tls: false,
        http: false,
        https: false,
        zlib: false,
        os: false,
        path: false,
      };

      // Provide polyfills
      config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        })
      );
    }
    return config;
  },

  // // Allow WebView embedding
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'ALLOWALL', // Allow embedding in WebView
  //         },
  //         {
  //           key: 'Content-Security-Policy',
  //           value: "frame-ancestors 'self' *", // Allow all frame ancestors
  //         },
  //         {
  //           key: 'Access-Control-Allow-Origin',
  //           value: '*', // Allow all origins (for development)
  //         },
  //         {
  //           key: 'Access-Control-Allow-Methods',
  //           value: 'GET, POST, PUT, DELETE, OPTIONS',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value: 'X-Requested-With, Content-Type, Authorization',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
