/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // allow Cloudinary images
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Disable COOP and COEP to fix Google OAuth issues
          { key: "Cross-Origin-Opener-Policy", value: "unsafe-none" },
          { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
        ],
      },
    ];
  },
};

export default nextConfig;
