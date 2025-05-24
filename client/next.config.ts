// next.config.js
module.exports = {
  images: {
    domains: ['localhost'], // Add your production domain when you deploy
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
    ],
  },
};