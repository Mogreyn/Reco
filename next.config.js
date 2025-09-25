/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hairexpertreco.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'reco-one.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'oneclick-dev-s3-backend-media-new.s3.eu-north-1.amazonaws.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", 
        destination: "https://clickone.space/api/:path*", // проброс на реальный бэк
      },
    ];
  },
};

module.exports = nextConfig;
