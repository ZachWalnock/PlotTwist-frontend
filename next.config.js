/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    // Handle @react-pdf/renderer
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-pdf/renderer': require.resolve('@react-pdf/renderer'),
    }

    // Ignore canvas dependency for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        'pdfkit': false,
        'fontkit': false,
      }
    }

    return config
  },
}

module.exports = nextConfig 