/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiUrl = process.env.API_BASE_URL;
    // Remove trailing slash if present to avoid double slashes
    const cleanApiUrl = apiUrl.replace(/\/$/, '');

    return [
      {
        source: '/api/v1/:path*', // Match requests to /api/v1/...
        destination: `${cleanApiUrl}/:path*`, // Proxy to backend
      },
    ];
  },
};

export default nextConfig;
