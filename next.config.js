const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true
  },
  output: 'export',
  basePath: '/sirensandsecurity',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'BASE_PATH': '"/sirensandsecurity"'
      }
    })
  ]
}

module.exports = nextConfig
