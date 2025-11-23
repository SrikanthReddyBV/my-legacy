/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // This tells Next.js to serve the site from the /my-legacy subpath
  basePath: "/my-legacy",
};

export default nextConfig;