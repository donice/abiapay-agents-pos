/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["tms.tax"],
  },

  // Disable code splitting for WebView compatibility
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Combine everything into fewer chunks
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 1,
          },
        },
      };
    }
    return config;
  },

  // Allow WebView embedding
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Use standalone output for better compatibility
  output: 'standalone',
};

export default nextConfig;