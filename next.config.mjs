/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ih1.redbubble.net',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/photos/**'
            },
            {
                protocol: 'https',
                hostname: 'utfs.io',
             
            }
        ]
    },
};

export default nextConfig;
