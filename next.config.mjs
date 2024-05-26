/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://v2.base-borderless.com/api/:path*',
            },
        ];
    },
};

export default nextConfig;
