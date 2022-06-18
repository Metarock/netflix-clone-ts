const withTM = require('next-transpile-modules')([
  '@stripe/firestore-stripe-payments',
]) // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = config.experiments || {}
    config.experiments.topLevelAwait = true
    return config
  },
  images: {
    domains: ['rb.gy', 'image.tmdb.org'],
  },
})
