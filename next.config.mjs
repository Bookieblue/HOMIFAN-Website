/** @type {import('next').NextConfig} */
const nextConfig = {
    // async rewrites() {
    //   return [
    //     {
    //       source: '/api/:path*',
    //       destination: 'https://v2.base-borderless.com/api/:path*',
    //     },
    //   ];
    // },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,POST,PUT,DELETE,OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
