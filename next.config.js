/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure dist/icons.json is included in the build
  serverRuntimeConfig: {
    iconsPath: './dist/icons.json',
  },
}

module.exports = nextConfig

