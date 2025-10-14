/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add remotePatterns to whitelist specific external domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '', // Leave empty if default ports (80/443) are used
        pathname: '/images/**', // Allow any path under /images on this host
      },
    ],
    // If you were using a simple list of domains:
    // domains: ['example.com'], // This is the older format, remotePatterns is recommended
  },
};

module.exports = nextConfig;