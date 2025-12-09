/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  experimental: {
    // Use turbo engine which handles Windows paths better
    turbo: {
      resolveAlias: {},
    },
  },
  webpack: (config, { isServer }) => {
    // Completely disable symlink resolution for Windows compatibility
    config.resolve.symlinks = false;
    
    // Override webpack's filesystem to avoid readlink calls on Windows
    if (!isServer) {
      config.resolve.cache = false;
    }
    
    return config;
  }
};

export default nextConfig;
