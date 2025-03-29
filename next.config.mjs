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


    images: {
      domains: ['res.cloudinary.com'],
    },

  
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
                    {
                        key: "Content-Security-Policy",
                        value: `
                          default-src 'self';
                          script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.paystack.com https://www.googletagmanager.com;
                          frame-src https://checkout.paystack.com;
                          connect-src 'self' https://api.paystack.co;
                        `,
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
