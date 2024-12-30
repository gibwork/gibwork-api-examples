import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api2.gib.work/:path*' // Proxy to Backend
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*' 
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'OPTIONS, POST, GET, PUT, DELETE' 
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token'
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true' 
          }
        ]
      }
    ];
  }
};

export default nextConfig;
