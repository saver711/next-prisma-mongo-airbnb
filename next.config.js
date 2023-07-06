// const withTM = require("next-transpile-modules")(["sharp"])


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "res.cloudinary.com" },
    ],
  },

  // webpack: (
  //   config,
  //   { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack, dir }
  // ) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //     }
  //   }
  //   // config.externals.push({ sharp: "nodeModules sharp" })
  //   config.module.rules.push({ test: /\.node$/, use: "node-loader" })
  //   return config
  // },
}

module.exports = nextConfig
