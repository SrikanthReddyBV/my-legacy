/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Only use the subfolder path on GitHub (Production)
  // On Localhost, keep it at the root
  basePath: isProd ? "/my-legacy" : undefined,
};

export default nextConfig;