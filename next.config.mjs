/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:transactions*',
            destination: 'https://v2.base-borderless.com/api/:transactions*',
          },
        ]
      },
};

export default nextConfig;
