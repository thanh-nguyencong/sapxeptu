/** @type {import('next').NextConfig} */
const nextConfig = {
  target: 'experimental-serverless-trace',
  webpack(config, options) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    return config;
  }
};

export default nextConfig;
