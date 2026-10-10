/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode for React — catches common bugs early
  reactStrictMode: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(self), microphone=(self), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' checkout.razorpay.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              "frame-src 'self' api.razorpay.com",
              "connect-src 'self' api.razorpay.com",
              "img-src 'self' data: blob:",
              "media-src 'self' blob:",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // Rewrites: proxy API calls to backend in dev (avoids CORS in browser)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL ?? 'http://localhost:4000'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
