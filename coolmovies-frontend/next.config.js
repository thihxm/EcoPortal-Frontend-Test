/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: `${process.env.GRAPHQL_API_URL}/graphql`,
      },
    ]
  },
  reactStrictMode: true,
}
