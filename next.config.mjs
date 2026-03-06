/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "z-p3-scontent.fdac3-2.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fdac4-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "penvlkeadpgaozfmdnrr.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {},
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js"
      }
    }
  }
}
export default nextConfig
