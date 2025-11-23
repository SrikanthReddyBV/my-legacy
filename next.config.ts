/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Tells Next.js to generate HTML files only
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization
  },
  basePath: process.env.NODE_ENV === 'production' ? '/legacy-site' : '', // Replace 'legacy-site' with your repo name later
};

export default nextConfig;