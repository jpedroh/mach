/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ }))
        return config
    },
}

module.exports = nextConfig