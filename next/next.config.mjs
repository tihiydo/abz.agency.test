/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '**',
            port: '3001', // укажите порт, если требуется
            pathname: '/photo/**', // укажите путь, если требуется
          },
        ],
    },
    reactStrictMode: false
};

export default nextConfig;
