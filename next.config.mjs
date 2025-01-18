/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.stablediffusionapi.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
