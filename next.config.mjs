/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  // The end-to-end tests build into their own folder so they never touch a running dev server's .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    unoptimized: true, // Disables Next.js image optimization for static exports
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  swcMinify: true,
};

export default nextConfig;
