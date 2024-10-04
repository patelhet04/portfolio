/** @type {import('next').NextConfig} */
const isStaticExport = process.env.EXPORT_STATIC === "true";
const nextConfig = {
  reactStrictMode: true,
  output: isStaticExport ? "export" : undefined,

  // images: { unoptimized: true },
};

export default nextConfig;
