/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true, // Disables Next.js image optimization for static exports
  },

  // images: { unoptimized: true },
};

export default nextConfig;
