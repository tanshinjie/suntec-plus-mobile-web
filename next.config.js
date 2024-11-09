const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sunteccity.com.sg",
        port: "",
      },
      {
        protocol: "https",
        hostname: "d2mp9k8h4rf7ge.cloudfront.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "incrm-solutions.s3.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "platform-public-suntec-prod.s3.ap-southeast-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname:
          "suntec-merchant-image-upload-prod.s3.ap-southeast-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
      },
    ],
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/stores",
        destination: "/directories",
        permanent: false,
      },
    ];
  },
};

// Configuration object tells the next-pwa plugin
const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});

// Export the combined configuration for Next.js with PWA support
module.exports = withPWA(nextConfig);
