/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "amzirlodp-prd-s3.s3.amazonaws.com",
        pathname: "/documents/images/**",
      },
      {
        protocol: "https",
        hostname: "marketplace.canva.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
